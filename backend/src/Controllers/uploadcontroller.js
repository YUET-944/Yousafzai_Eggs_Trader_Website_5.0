import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv'

dotenv.config();
// 1. Configure Cloudinary Credentials (Frontend CDN storage)
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

// Safe Console Log to check if your .env keys are loading properly
console.log("Cloudinary Config Check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "HIDDEN_SECRET_LOADED" : "MISSING"
});

// 2. Define Storage Rules & Validation Limits (Max 5MB, format filter)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yousafzai_egro_cms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, quality: 'auto' }] // Automatically optimizes image sizes
  }
});

// 3. Create Multer Parsing Middleware for Images (CMS)
export const uploadParser = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Strict 5MB file size limit threshold
});

// 4. Define Storage & Parser for Job Applications (Resumes: PDF, DOC, DOCX - 10MB limit)
const resumeFileFilter = (req, file, cb) => {
  const allowedExts = ['.pdf', '.doc', '.docx'];
  const dotIndex = file.originalname.lastIndexOf('.');
  const ext = dotIndex !== -1 ? file.originalname.slice(dotIndex).toLowerCase() : '';
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    const error = new Error('Invalid resume file type. Only PDF, DOC, and DOCX files are allowed.');
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'yousafzai_resumes',
      resource_type: 'raw',
      public_id: `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    };
  }
});

export const resumeUploadParser = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB centralized limit
});

export const handleResumeUpload = (req, res, next) => {
  resumeUploadParser.single('resume')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'Resume file size exceeds the 10MB limit.',
            code: 'FILE_TOO_LARGE'
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
          code: 'UPLOAD_ERROR'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid resume file.',
        code: err.code || 'VALIDATION_ERROR'
      });
    }
    next();
  });
};

// 5. Handle Execution Response
// @desc    Upload an image file and return its public CDN URL
// @route   POST /api/upload
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No image file uploaded or format not supported', 
        code: 'VALIDATION_ERROR' 
      });
    }

    // Match output schema exactly to Section 4 contract requirement
    return res.status(201).json({
      url: req.file.path // This is the live secure HTTPS URL string pointing to the image
    });

  } catch (error) {
    return res.status(500).json({ 
      error: 'Upload Engine Failure: ' + error.message, 
      code: 'INTERNAL_ERROR' 
    });
  }
};