import { useEffect, useState } from 'react';
import { CheckCircle2, Edit3, Loader2, RefreshCw, Save, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import AdminConfirmDialog from './AdminConfirmDialog';
import AdminState from './AdminState';
import { formatDate, toArray } from './adminDataUtils';

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Remote'];
const JOB_STATUSES = ['active', 'closed'];

const emptyJobForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full-Time',
  status: 'active',
  description: '',
  requirements: '',
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [pendingDeleteJob, setPendingDeleteJob] = useState(null);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [form, setForm] = useState(emptyJobForm);

  const loadJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getJobs();
      setJobs(toArray(res));
    } catch (err) {
      setError(err.message || 'Jobs could not be loaded.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const setField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const resetForm = () => {
    setEditingJob(null);
    setForm(emptyJobForm);
  };

  const startEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Full-Time',
      status: job.status || 'active',
      description: job.description || '',
      requirements: job.requirements || '',
    });
  };

  const submitJob = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      title: form.title.trim(),
      department: form.department.trim(),
      location: form.location.trim(),
      type: form.type,
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      ...(editingJob ? { status: form.status } : {}),
    };

    try {
      if (editingJob) {
        await api.updateJob(editingJob.id, payload);
        setSuccess('Job updated successfully.');
      } else {
        await api.createJob(payload);
        setSuccess('Job created successfully.');
      }
      resetForm();
      await loadJobs();
    } catch (err) {
      setError(err.message || 'Job could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const openDeleteDialog = (job) => {
    setPendingDeleteJob(job);
    setDeleteError('');
    setSuccess('');
  };

  const closeDeleteDialog = () => {
    if (deletingJobId) return;
    setPendingDeleteJob(null);
    setDeleteError('');
  };

  const confirmDeleteJob = async () => {
    if (!pendingDeleteJob || deletingJobId) return;
    setDeletingJobId(pendingDeleteJob.id);
    setError('');
    setDeleteError('');
    setSuccess('');
    try {
      await api.deleteJob(pendingDeleteJob.id);
      setSuccess('Job deleted successfully.');
      if (editingJob?.id === pendingDeleteJob.id) resetForm();
      setPendingDeleteJob(null);
      await loadJobs();
    } catch (err) {
      setDeleteError(err.message || 'Job could not be deleted. Please try again.');
    } finally {
      setDeletingJobId(null);
    }
  };

  return (
    <div className="admin-panel-wrap">
      <div className="admin-section-head">
        <div>
          <span className="admin-kicker">Careers</span>
          <h2>Jobs</h2>
          <p>Jobs are loaded from the real backend. The public Careers page continues to use the same /api/jobs data.</p>
        </div>
        <button className="admin-secondary-btn" onClick={loadJobs} disabled={loading || saving || Boolean(deletingJobId)}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      {error && <AdminState type="error" title="Jobs action failed." message={error} />}
      {success && <div className="admin-success"><CheckCircle2 size={15} /> {success}</div>}

      <div className="admin-jobs-grid">
        <form className="admin-form-card" onSubmit={submitJob}>
          <div className="admin-form-head">
            <h3>{editingJob ? 'Edit Job' : 'Create Job'}</h3>
            {editingJob && <button type="button" className="admin-link-button" onClick={resetForm}>Cancel edit</button>}
          </div>

          <div className="admin-form-grid">
            <label>
              <span>Title</span>
              <input value={form.title} onChange={setField('title')} required />
            </label>
            <label>
              <span>Department</span>
              <input value={form.department} onChange={setField('department')} required />
            </label>
            <label>
              <span>Location</span>
              <input value={form.location} onChange={setField('location')} required />
            </label>
            <label>
              <span>Type</span>
              <select value={form.type} onChange={setField('type')}>
                {JOB_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            {editingJob && (
              <label>
                <span>Status</span>
                <select value={form.status} onChange={setField('status')}>
                  {JOB_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>
            )}
            <label className="wide">
              <span>Description</span>
              <textarea value={form.description} onChange={setField('description')} required rows={5} />
            </label>
            <label className="wide">
              <span>Requirements</span>
              <textarea value={form.requirements} onChange={setField('requirements')} rows={4} />
            </label>
          </div>

          <button className="admin-primary-btn" type="submit" disabled={saving}>
            {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
            {editingJob ? 'Save Job' : 'Create Job'}
          </button>
        </form>

        <div className="admin-table-card">
          {loading ? (
            <AdminState type="loading" title="Loading jobs" message="Fetching active jobs from the backend." />
          ) : jobs.length === 0 ? (
            <AdminState title="No jobs are currently available." />
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-data-table compact">
                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <strong>{job.title}</strong>
                        <span>{[job.department, job.location].filter(Boolean).join(' / ')}</span>
                      </td>
                      <td>{job.type || 'Full-Time'}</td>
                      <td><span className="admin-status-pill">{job.status || 'active'}</span></td>
                      <td>{formatDate(job.createdAt)}</td>
                      <td>
                        <div className="admin-action-row">
                          <button type="button" className="admin-icon-action" onClick={() => startEdit(job)} aria-label={`Edit ${job.title}`} disabled={deletingJobId === job.id}>
                            <Edit3 size={15} />
                          </button>
                          <button type="button" className="admin-icon-action danger" onClick={() => openDeleteDialog(job)} aria-label={`Delete ${job.title}`} disabled={deletingJobId === job.id}>
                            {deletingJobId === job.id ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AdminConfirmDialog
        open={Boolean(pendingDeleteJob)}
        title="Delete Job?"
        message={(<>Are you sure you want to delete this job?<br />This action cannot be undone.</>)}
        confirmLabel="Delete Job"
        loading={Boolean(pendingDeleteJob && deletingJobId === pendingDeleteJob.id)}
        error={deleteError}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDeleteJob}
      >
        {pendingDeleteJob && (
          <>
            <strong>{pendingDeleteJob.title || 'Untitled job'}</strong>
            <span>{[pendingDeleteJob.department, pendingDeleteJob.location].filter(Boolean).join(' / ') || 'Job details unavailable'}</span>
          </>
        )}
      </AdminConfirmDialog>
    </div>
  );
}
