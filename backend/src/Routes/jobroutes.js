import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../Controllers/jobcontroller.js';
import {
  applyForJob,
  getApplicationsByJob,
  getAllApplications,
  deleteApplication,
  downloadResume,
  downloadResumeByFilename,
} from '../Controllers/jobApplicationController.js';
import { handleResumeUpload } from '../Controllers/uploadcontroller.js';
import { protect, authorize } from '../Middleware/Auth.js';

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/', getJobs);

// ==========================================
// PROTECTED ADMIN ROUTES (SuperAdmin Only)
// ==========================================

// Fetch ALL applications across all jobs (Put this BEFORE /:id)
router.get('/applications/all', protect, authorize('SuperAdmin'), getAllApplications);

// Download / View resume files (Protected SuperAdmin - supports Bearer token and ?token= query)
router.get('/applications/:applicationId/resume', protect, authorize('SuperAdmin'), downloadResume);
router.get('/applications/resumes/:filename', protect, authorize('SuperAdmin'), downloadResumeByFilename);

// Delete one application by its primary key
router.delete('/applications/:applicationId', protect, authorize('SuperAdmin'), deleteApplication);

// Fetch applications for a SPECIFIC job ID
router.get('/:jobId/applications', protect, authorize('SuperAdmin'), getApplicationsByJob);

// Single Job Details & Admin Operations
router.get('/:id', getJobById);
router.post('/', protect, authorize('SuperAdmin'), createJob);
router.put('/:id', protect, authorize('SuperAdmin'), updateJob);
router.delete('/:id', protect, authorize('SuperAdmin'), deleteJob);

// Public Apply Route (with resume upload middleware)
router.post('/:jobId/apply', handleResumeUpload, applyForJob);

export default router;