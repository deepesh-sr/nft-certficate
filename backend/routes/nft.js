const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const NFTCertificateService = require('../services/nftService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Initialize the NFT service
const nftService = new NFTCertificateService();

// Validation middleware
const validateCertificateData = (req, res, next) => {
  const { studentName, university, course, year, certificateId } = req.body;

  // Check required fields
  if (!studentName || !university || !course || !year || !certificateId) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['studentName', 'university', 'course', 'year', 'certificateId'],
      received: Object.keys(req.body)
    });
  }

  // Validate year
  const currentYear = new Date().getFullYear();
  if (year < 2000 || year > currentYear + 10) {
    return res.status(400).json({
      error: 'Invalid year',
      message: `Year must be between 2000 and ${currentYear + 10}`
    });
  }

  // Validate CGPA if provided
  if (req.body.cgpa && (req.body.cgpa < 0 || req.body.cgpa > 10)) {
    return res.status(400).json({
      error: 'Invalid CGPA',
      message: 'CGPA must be between 0 and 10'
    });
  }

  next();
};

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'Image file must be smaller than 10MB'
      });
    }
    return res.status(400).json({
      error: 'File upload error',
      message: err.message
    });
  }
  
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({
      error: 'Invalid file type',
      message: 'Only image files (PNG, JPG, JPEG, GIF, WebP) are allowed'
    });
  }
  
  next(err);
};

// POST /api/create-nft - Create a new NFT certificate
router.post('/create-nft', (req, res, next) => {
  upload.single('certificateImage')(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
}, validateCertificateData, async (req, res) => {
  try {
    console.log('📨 Received NFT creation request:', req.body);
    if (req.file) {
      console.log('📎 Received image file:', req.file.originalname);
    }

    const result = await nftService.createNFTCertificate(req.body, req.file);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error in create-nft route:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create NFT certificate',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET /api/nft-status/:signature - Check transaction status
router.get('/nft-status/:signature', async (req, res) => {
  try {
    const { signature } = req.params;
    
    // This is a placeholder - you could implement actual transaction status checking
    res.json({
      signature,
      status: 'confirmed',
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    });
  } catch (error) {
    console.error('❌ Error checking NFT status:', error);
    res.status(500).json({
      error: 'Failed to check NFT status',
      message: error.message
    });
  }
});

// GET /api/certificates - Get list of created certificates (placeholder)
router.get('/certificates', async (req, res) => {
  try {
    // This is a placeholder - you could implement a database to track certificates
    res.json({
      message: 'Certificate history not implemented yet',
      suggestion: 'Consider implementing a database to track created certificates'
    });
  } catch (error) {
    console.error('❌ Error fetching certificates:', error);
    res.status(500).json({
      error: 'Failed to fetch certificates',
      message: error.message
    });
  }
});

module.exports = router;
