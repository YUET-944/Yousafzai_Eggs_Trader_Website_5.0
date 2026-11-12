import jwt from 'jsonwebtoken';
import Job from '../Model/job.js';
import User from '../Model/user.js';

// Helper to verify SuperAdmin from Bearer token
const verifySuperAdmin = async (req) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return { ok: false, status: 401, message: 'Authentication token required to access all or non-active job listings.' };
  }

  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, { attributes: ['id', 'email', 'role'] });
    if (!user) {
      return { ok: false, status: 401, message: 'User record not found.' };
    }
    if (user.role !== 'SuperAdmin') {
      return { ok: false, status: 403, message: 'Access denied: SuperAdmin role required.' };
    }
    return { ok: true, user };
  } catch (err) {
    return { ok: false, status: 401, message: 'Invalid or expired authentication token.' };
  }
};

// @desc    Get all jobs (Active by default; all/filtered jobs restricted to authenticated SuperAdmin)
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const where = {};
    const requestsPrivilegedList = req.query.all === 'true' || (req.query.status && req.query.status !== 'active');

    if (requestsPrivilegedList) {
      const authResult = await verifySuperAdmin(req);
      if (!authResult.ok) {
        return res.status(authResult.status).json({ success: false, message: authResult.message });
      }

      if (req.query.status && req.query.status !== 'all') {
        where.status = req.query.status;
      }
      // If req.query.all === 'true' or req.query.status === 'all', return all jobs without status restriction
    } else {
      // Public view: strictly active jobs only
      where.status = 'active';
    }

    const jobs = await Job.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Get single job by ID (Public)
// @route   GET /api/jobs/:id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Create a new job (Admin Only)
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const { title, department, location, type, description, requirements, applicationFormUrl } = req.body;

    if (!title || !department || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, department, location, and description are required.',
      });
    }

    let sanitizedFormUrl = null;
    if (applicationFormUrl !== undefined && applicationFormUrl !== null && String(applicationFormUrl).trim() !== '') {
      const trimmedUrl = String(applicationFormUrl).trim();
      if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
        return res.status(400).json({
          success: false,
          message: 'Google Form URL must be a valid HTTP or HTTPS URL.',
        });
      }
      sanitizedFormUrl = trimmedUrl;
    }

    const newJob = await Job.create({
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type || 'Full-Time',
      description: description.trim(),
      requirements: requirements ? String(requirements).trim() : '',
      applicationFormUrl: sanitizedFormUrl,
    });

    return res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Update a job (Admin Only)
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const updateData = { ...req.body };

    if (updateData.applicationFormUrl !== undefined) {
      if (updateData.applicationFormUrl === null || String(updateData.applicationFormUrl).trim() === '') {
        updateData.applicationFormUrl = null;
      } else {
        const trimmedUrl = String(updateData.applicationFormUrl).trim();
        if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
          return res.status(400).json({
            success: false,
            message: 'Google Form URL must be a valid HTTP or HTTPS URL.',
          });
        }
        updateData.applicationFormUrl = trimmedUrl;
      }
    }

    if (updateData.title) updateData.title = String(updateData.title).trim();
    if (updateData.department) updateData.department = String(updateData.department).trim();
    if (updateData.location) updateData.location = String(updateData.location).trim();
    if (updateData.description) updateData.description = String(updateData.description).trim();

    await job.update(updateData);
    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Delete a job (Admin Only)
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await job.destroy();
    return res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};