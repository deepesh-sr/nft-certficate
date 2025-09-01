const { createMasterEditionV3, createNft, mplTokenMetadata } = require("@metaplex-foundation/mpl-token-metadata");
const {
  createGenericFile,
  generateSigner,
  percentAmount,
  signerIdentity,
  sol,
  createSignerFromKeypair,
  none,
} = require("@metaplex-foundation/umi");
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const { irysUploader } = require("@metaplex-foundation/umi-uploader-irys");
const { base58 } = require("@metaplex-foundation/umi/serializers");
const fs = require("fs");
const path = require("path");

/**
 * Dynamic NFT Certificate Creator (CommonJS version)
 * @param {Object} certificateData - Certificate information
 * @param {string} certificateData.studentName - Student's name
 * @param {string} certificateData.university - University name
 * @param {string} certificateData.course - Course name
 * @param {string} certificateData.year - Year of completion
 * @param {string} certificateData.certificateId - Certificate ID
 * @param {string} certificateData.cgpa - CGPA (optional)
 * @param {string} certificateData.description - Custom description (optional)
 * @param {string} imagePath - Path to the certificate image file (optional, defaults to ./assets/certificate.png)
 * @param {string} keypairPath - Path to the keypair JSON file (optional, defaults to ./keypair.json)
 * @returns {Object} NFT creation result with transaction details
 */
const createDynamicNFT = async (certificateData, imagePath = null, keypairPath = './keypair.json') => {
  try {
    console.log('🚀 Starting dynamic NFT creation...');
    console.log('📝 Certificate data:', certificateData);

    // Initialize UMI
    const umi = createUmi("https://api.devnet.solana.com")
      .use(mplTokenMetadata())
      .use(
        irysUploader({
          address: "https://devnet.irys.xyz",
        })
      );

    // Load keypair
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
    const umiKeypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer = createSignerFromKeypair(umi, umiKeypair);
    umi.use(signerIdentity(signer));

    console.log('🔑 Signer public key:', signer.publicKey);

    // Determine image path
    const finalImagePath = imagePath || './assets/certificate.png';
    
    if (!fs.existsSync(finalImagePath)) {
      throw new Error(`Image file not found at: ${finalImagePath}`);
    }

    // Read and upload image
    const imageFile = fs.readFileSync(finalImagePath);
    const fileExtension = path.extname(finalImagePath).toLowerCase();
    const mimeType = getMimeType(fileExtension);
    
    console.log('📁 Using image:', finalImagePath);
    console.log('🖼️ Image type:', mimeType);

    const umiImageFile = createGenericFile(imageFile, path.basename(finalImagePath), {
      tags: [{ name: 'Content-Type', value: mimeType }],
    });

    const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
      throw new Error(`Image upload failed: ${err.message}`);
    });

    console.log('✅ Image uploaded to:', imageUri[0]);

    // Create dynamic metadata
    const metadata = createMetadata(certificateData, imageUri[0], mimeType);
    console.log('📋 Generated metadata:', JSON.stringify(metadata, null, 2));

    // Upload metadata
    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(`Metadata upload failed: ${err.message}`);
    });

    console.log('✅ Metadata uploaded to:', metadataUri);

    // Create the NFT
    const nftSigner = generateSigner(umi);

    const tx = await createNft(umi, {
      mint: nftSigner,
      name: metadata.name,
      symbol: 'CERT',
      sellerFeeBasisPoints: 0,
      isMutable: false,
      decimals: 0,
      uri: metadataUri,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    const result = {
      success: true,
      message: 'NFT Certificate created successfully!',
      transactionSignature: signature,
      nftMintAddress: nftSigner.publicKey,
      transactionUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      nftUrl: `https://explorer.solana.com/address/${nftSigner.publicKey}?cluster=devnet`,
      metadata: metadata,
      metadataUri: metadataUri,
      imageUri: imageUri[0]
    };

    console.log('🎉 NFT Created Successfully!');
    console.log('🔗 Transaction:', result.transactionUrl);
    console.log('🎨 NFT:', result.nftUrl);

    return result;

  } catch (error) {
    console.error('❌ Error creating NFT:', error);
    throw error;
  }
};

/**
 * Create metadata object from certificate data
 */
function createMetadata(certificateData, imageUri, mimeType) {
  const {
    studentName,
    university,
    course,
    year,
    certificateId,
    cgpa,
    description
  } = certificateData;

  // Generate default description if not provided
  const defaultDescription = description || 
    `This NFT certifies that ${studentName} has successfully completed the ${course} course at ${university}.`;

  return {
    name: "Certificate of Completion",
    description: defaultDescription,
    image: imageUri,
    external_url: "https://example.com/certificate",
    attributes: [
      {
        trait_type: "University",
        value: university
      },
      {
        trait_type: "Course",
        value: course
      },
      {
        trait_type: "Year",
        value: year.toString()
      },
      {
        trait_type: "Certificate ID",
        value: certificateId
      },
      {
        trait_type: "Student",
        value: studentName
      },
      // Only add CGPA if provided
      ...(cgpa ? [{
        trait_type: "CGPA",
        value: cgpa.toString()
      }] : [])
    ],
    properties: {
      files: [
        {
          uri: imageUri,
          type: mimeType
        }
      ],
      category: "image"
    }
  };
}

/**
 * Get MIME type from file extension
 */
function getMimeType(extension) {
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  
  return mimeTypes[extension] || 'image/png';
}

// For backward compatibility - run original function if called directly
const createOriginalNFT = async () => {
  const originalData = {
    studentName: "Deepesh Singh Rathore",
    university: "Centurion University of Technology and Management, Bhubaneswar",
    course: "Blockchain Development",
    year: "2025",
    certificateId: "12345",
    cgpa: "9.1",
    description: "This NFT certifies that Deepesh Singh Rathore has successfully completed the Blockchain Development course at Centurion University."
  };

  return await createDynamicNFT(originalData);
};

module.exports = {
  createDynamicNFT,
  createOriginalNFT
};
