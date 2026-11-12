import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 1. CLOUDINARY CONFIGURATION (For CMS Images)
// ==========================================
export const isCloudinaryConfigured = () => {
  if (process.env.CLOUDINARY_URL) return true;
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (process.env.CLOUDINARY_URL) {
  cloudinary.config();
  console.log('📡 Cloudinary configured via CLOUDINARY_URL');
} else if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('📡 Cloudinary credentials configured successfully');
} else {
  console.warn('⚠️ Cloudinary credentials are not set. Media image uploads will return 503 until configured.');
}

const cmsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yousafzai_egro_cms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, quality: 'auto' }],
  },
});

export const uploadParser = multer({
  storage: cmsStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for CMS images
});

// ==========================================
// 2. SERVER-SIDE STORAGE FOR RESUMES (Zero Cloudinary Dependency)
// ==========================================

// Dedicated server directory for candidate CVs: backend/uploads/resumes
export const RESUME_UPLOAD_DIR = process.env.RESUME_UPLOAD_DIR
  ? path.resolve(process.env.RESUME_UPLOAD_DIR)
  : path.resolve(__dirname, '../../uploads/resumes');

// Ensure upload directory exists automatically on server start
if (!fs.existsSync(RESUME_UPLOAD_DIR)) {
  fs.mkdirSync(RESUME_UPLOAD_DIR, { recursive: true });
}

// File extension and MIME type validation
export const resumeFileFilter = (req, file, cb) => {
  const allowedExts = ['.pdf', '.doc', '.docx'];
  const allowedMimes = [
    'application/pdf',
    'application/x-pdf',
    'application/msword',
    'application/vnd.ms-word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream', // Fallback for browsers sending generic stream
  ];

  const original = file.originalname || '';
  const dotIndex = original.lastIndexOf('.');
  const ext = dotIndex !== -1 ? original.slice(dotIndex).toLowerCase() : '';
  const mime = (file.mimetype || '').toLowerCase();

  // Validate extension
  if (!allowedExts.includes(ext)) {
    const error = new Error('Invalid resume file type. Only PDF, DOC, and DOCX files are allowed.');
    error.code = 'INVALID_FILE_TYPE';
    return cb(error, false);
  }

  // Validate MIME type (if provided and not generic)
  if (mime && mime !== 'application/octet-stream' && !allowedMimes.includes(mime)) {
    const error = new Error('Invalid resume MIME type. Only PDF, DOC, and DOCX files are allowed.');
    error.code = 'INVALID_MIME_TYPE';
    return cb(error, false);
  }

  cb(null, true);
};

// Filename sanitizer: strips path traversal, sanitizes characters, and guarantees uniqueness
export const sanitizeFileName = (originalName) => {
  const baseOnly = path.basename(originalName || 'resume');
  const dotIndex = baseOnly.lastIndexOf('.');
  const ext = dotIndex !== -1 ? baseOnly.slice(dotIndex).toLowerCase() : '.pdf';
  const rawBase = dotIndex !== -1 ? baseOnly.slice(0, dotIndex) : baseOnly;
  const sanitizedBase = rawBase
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 60);

  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${randomSuffix}_${sanitizedBase || 'resume'}${ext}`;
};

// Disk storage engine for resumes
export const resumeDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(RESUME_UPLOAD_DIR)) {
        fs.mkdirSync(RESUME_UPLOAD_DIR, { recursive: true });
      }
      cb(null, RESUME_UPLOAD_DIR);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      const safeName = sanitizeFileName(file.originalname);
      cb(null, safeName);
    } catch (err) {
      cb(err);
    }
  },
});

export const resumeUploadParser = multer({
  storage: resumeDiskStorage,
  fileFilter: resumeFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const handleResumeUpload = (req, res, next) => {
  resumeUploadParser.single('resume')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error: 'Resume file size exceeds the 10MB limit.',
            message: 'Resume file size exceeds the 10MB limit.',
            code: 'FILE_TOO_LARGE',
          });
        }
        return res.status(400).json({
          success: false,
          error: `Upload error: ${err.message}`,
          message: `Upload error: ${err.message}`,
          code: 'UPLOAD_ERROR',
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'Invalid resume file.',
        message: err.message || 'Invalid resume file.',
        code: err.code || 'VALIDATION_ERROR',
      });
    }
    next();
  });
};

// ==========================================
// 3. IMAGE UPLOAD EXECUTION (CMS)
// ==========================================
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image file uploaded or format not supported',
        code: 'VALIDATION_ERROR',
      });
    }

    return res.status(201).json({
      url: req.file.path,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Upload Engine Failure: ' + error.message,
      code: 'INTERNAL_ERROR',
    });
  }
};
