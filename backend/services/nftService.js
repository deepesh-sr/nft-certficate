const { createDynamicNFT } = require('../umiDynamic.cjs');
const fs = require("fs");
const path = require("path");

class NFTCertificateService {
  constructor() {
    console.log('✅ NFT Certificate Service initialized with dynamic UMI');
  }

  async createNFTCertificate(certificateData, imageFile = null) {
    try {
      console.log('📝 Creating NFT Certificate with data:', certificateData);
      
      let imagePath = null;
      
      // Handle uploaded image file or use default
      if (imageFile) {
        imagePath = imageFile.path;
        console.log('� Using uploaded image:', imageFile.originalname);
      } else {
        // Use default certificate image
        const defaultImagePath = path.join(__dirname, '..', 'assets', 'certificate.png');
        if (fs.existsSync(defaultImagePath)) {
          imagePath = defaultImagePath;
          console.log('📎 Using default certificate image');
        } else {
          throw new Error('No image provided and default certificate image not found');
        }
      }

      // Set keypair path
      const keypairPath = path.join(__dirname, '..', 'keypair.json');
      
      if (!fs.existsSync(keypairPath)) {
        throw new Error(`Keypair not found at ${keypairPath}`);
      }

      // Call the dynamic NFT creation function
      const result = await createDynamicNFT(certificateData, imagePath, keypairPath);
      
      // Clean up uploaded file if it exists
      if (imageFile && fs.existsSync(imageFile.path)) {
        fs.unlinkSync(imageFile.path);
        console.log('🗑️ Cleaned up uploaded file');
      }

      return result;
    } catch (error) {
      console.error('❌ Error creating NFT certificate:', error);
      
      // Clean up uploaded file on error
      if (imageFile && fs.existsSync(imageFile.path)) {
        fs.unlinkSync(imageFile.path);
        console.log('🗑️ Cleaned up uploaded file after error');
      }
      
      throw error;
    }
  }
}

module.exports = NFTCertificateService;
