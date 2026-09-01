import JobApplication from '../Model/application.js';
import Job from '../Model/job.js';

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

    // Validate resume file
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required (PDF, DOC, or DOCX).',
      });
    }

    const resumeUrl = req.file.path;

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
          attributes: ['title', 'department', 'location'], // Include associated job details
        },
      ],
      order: [['createdAt', 'DESC']], // Newest applications first
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

    await application.destroy();

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};
