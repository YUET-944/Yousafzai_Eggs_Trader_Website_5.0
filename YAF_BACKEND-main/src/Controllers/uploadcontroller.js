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

// 2. Define Storage Rules & Validation Limits (Max 5MB, format filter)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yousafzai_egro_cms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, quality: 'auto' }] // Automatically optimizes image sizes
  }
});

// 3. Create Multer Parsing Middleware
export const uploadParser = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Strict 5MB file size limit threshold
});

// 4. Handle Execution Response
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
    console.error('Image upload failed:', error);
    return res.status(500).json({ 
      error: 'Unable to upload image right now.',
      code: 'INTERNAL_ERROR' 
    });
  }
};
