import Job from '../Model/job.js';

// @desc    Get all active jobs (Public)
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { status: 'active' },
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
    const { title, department, location, type, description, requirements } = req.body;

    if (!title || !department || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, department, location, and description are required.',
      });
    }

    const newJob = await Job.create({
      title,
      department,
      location,
      type: type || 'Full-Time',
      description,
      requirements: requirements || '',
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

    await job.update(req.body);
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