import fs from 'fs';
import path from 'path';
import JobApplication from '../Model/application.js';
import Job from '../Model/job.js';
import { RESUME_UPLOAD_DIR } from './uploadcontroller.js';

const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

// Helper to serve resume file safely with security headers
const serveResumeFile = (res, filename, applicantName) => {
  const safeFilename = path.basename(filename || '');
  if (!safeFilename || safeFilename === '.' || safeFilename === '..') {
    return res.status(400).json({ success: false, message: 'Invalid resume file name.' });
  }

  const uploadDirResolved = path.resolve(RESUME_UPLOAD_DIR);
  const filePath = path.resolve(uploadDirResolved, safeFilename);

  // Strict path traversal defense: must stay inside RESUME_UPLOAD_DIR
  if (!filePath.startsWith(uploadDirResolved)) {
    return res.status(403).json({ success: false, message: 'Access denied: invalid file path.' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Resume file not found on server.' });
  }

  const ext = path.extname(safeFilename).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const downloadName = applicantName
    ? `${applicantName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Resume${ext}`
    : safeFilename;

  // Strict security headers: prevent execution as script, force correct MIME
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `inline; filename="${downloadName}"`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'none'");
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');

  return res.sendFile(filePath);
};

// @desc    Submit job application (Public)
// @route   POST /api/jobs/:jobId/apply
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const parsedJobId = Number(jobId);

    if (!jobId || isNaN(parsedJobId)) {
      return res.status(400).json({
        success: false,
        message: 'A valid numeric job ID is required.',
      });
    }

    // Verify job exists and is active
    const job = await Job.findByPk(parsedJobId);
    if (!job || job.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Job listing is not available or has been closed.',
      });
    }

    const {
      fullName,
      email,
      phone,
      city,
      education,
      experience,
      linkedinUrl,
      portfolioUrl,
      coverLetter,
    } = req.body || {};

    // Validate mandatory text fields
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required.',
      });
    }

    // Validate resume file stored on disk
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required (PDF, DOC, or DOCX).',
      });
    }

    // Store relative API route to download resume
    const resumeUrl = `/api/jobs/applications/resumes/${req.file.filename}`;

    const application = await JobApplication.create({
      jobId: parsedJobId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      resume: resumeUrl,
      city: city ? city.trim() : null,
      education: education ? education.trim() : null,
      experience: experience ? experience.trim() : null,
      linkedinUrl: linkedinUrl ? linkedinUrl.trim() : null,
      portfolioUrl: portfolioUrl ? portfolioUrl.trim() : null,
      coverLetter: coverLetter ? coverLetter.trim() : null,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Download / View resume by application ID (Admin Only)
// @route   GET /api/jobs/applications/:applicationId/resume
export const downloadResume = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.applicationId);
    if (!application || !application.resume) {
      return res.status(404).json({ success: false, message: 'Application or resume not found.' });
    }

    // Support legacy Cloudinary or external URLs
    if (/^https?:\/\//i.test(application.resume)) {
      return res.redirect(application.resume);
    }

    const filename = path.basename(application.resume);
    return serveResumeFile(res, filename, application.fullName);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving resume: ' + err.message });
  }
};

// @desc    Download / View resume by filename (Admin Only)
// @route   GET /api/jobs/applications/resumes/:filename
export const downloadResumeByFilename = async (req, res) => {
  try {
    const filename = path.basename(req.params.filename || '');
    return serveResumeFile(res, filename);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving resume: ' + err.message });
  }
};

// @desc    Get applications for a job (Admin Only)
// @route   GET /api/jobs/:jobId/applications
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await JobApplication.findAll({
      where: { jobId: req.params.jobId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, data: applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Get ALL job applications (Admin Only)
// @route   GET /api/jobs/applications/all
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.findAll({
      include: [
        {
          model: Job,
          attributes: ['title', 'department', 'location'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Delete one job application (Admin Only)
// @route   DELETE /api/jobs/applications/:applicationId
export const deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Clean up server-stored resume file if exists
    if (application.resume && !/^https?:\/\//i.test(application.resume)) {
      const filename = path.basename(application.resume);
      const uploadDirResolved = path.resolve(RESUME_UPLOAD_DIR);
      const filePath = path.resolve(uploadDirResolved, filename);
      if (filePath.startsWith(uploadDirResolved) && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.warn(`Could not delete resume file ${filePath}: ${unlinkErr.message}`);
        }
      }
    }

    await application.destroy();

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};
