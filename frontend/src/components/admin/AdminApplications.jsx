import { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, Eye, FileText, Loader2, RefreshCw, Trash2, X } from 'lucide-react';
import { api } from '../../lib/api';
import AdminConfirmDialog from './AdminConfirmDialog';
import AdminState from './AdminState';
import { formatDate, getJobMeta, getJobTitle, isUsableUrl, toArray } from './adminDataUtils';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const loadApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAllApplications();
      setApplications(toArray(res));
    } catch (err) {
      setError(err.message || 'Applications could not be loaded.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const openDeleteModal = (application) => {
    setPendingDelete(application);
    setDeleteError('');
    setSuccess('');
  };

  const closeDeleteModal = () => {
    if (deletingId) return;
    setPendingDelete(null);
    setDeleteError('');
  };

  const confirmDeleteApplication = async () => {
    if (!pendingDelete || deletingId) return;

    setDeletingId(pendingDelete.id);
    setDeleteError('');
    setError('');
    setSuccess('');
    try {
      await api.deleteApplication(pendingDelete.id);
      setSuccess('Application deleted successfully.');
      if (selected?.id === pendingDelete.id) setSelected(null);
      setPendingDelete(null);
      await loadApplications();
    } catch (err) {
      setDeleteError(err.message || 'Application could not be deleted.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-panel-wrap">
      <div className="admin-section-head">
        <div>
          <span className="admin-kicker">Recruitment</span>
          <h2>Job Applications</h2>
          <p>Applications are loaded from the protected backend endpoint. No sample applicants are shown.</p>
        </div>
        <button className="admin-secondary-btn" onClick={loadApplications} disabled={loading || Boolean(deletingId)}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      {success && <div className="admin-success"><CheckCircle2 size={15} /> {success}</div>}

      {loading ? (
        <AdminState type="loading" title="Loading applications" message="Fetching real submissions from the backend." />
      ) : error ? (
        <AdminState type="error" title="Applications action failed." message={error} action={<button className="admin-secondary-btn" onClick={loadApplications}>Retry</button>} />
      ) : applications.length === 0 ? (
        <AdminState title="No applications have been received yet." />
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const isDeleting = deletingId === app.id;
                  return (
                    <tr key={app.id}>
                      <td>
                        <strong>{app.fullName || 'Not provided'}</strong>
                        <span>{app.education || 'Education not provided'}</span>
                      </td>
                      <td>
                        <strong>{getJobTitle(app)}</strong>
                        <span>{getJobMeta(app) || `Job ID ${app.jobId || 'not provided'}`}</span>
                      </td>
                      <td>
                        <strong>{app.email || 'No email'}</strong>
                        <span>{app.phone || 'No phone'}</span>
                      </td>
                      <td>{app.city || 'Not provided'}</td>
                      <td><span className="admin-status-pill">{app.status || 'pending'}</span></td>
                      <td>{formatDate(app.createdAt)}</td>
                      <td>
                        <div className="admin-action-row">
                          <button className="admin-icon-action" onClick={() => setSelected(app)} aria-label={`View ${app.fullName || 'application'}`} disabled={isDeleting}>
                            <Eye size={15} />
                          </button>
                          <button className="admin-icon-action danger" onClick={() => openDeleteModal(app)} aria-label={`Delete ${app.fullName || 'application'}`} disabled={isDeleting}>
                            {isDeleting ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && <ApplicationDetail application={selected} onClose={() => setSelected(null)} />}
      <AdminConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Application?"
        message={(
          <>
            Are you sure you want to delete this application?<br />
            This action cannot be undone.
          </>
        )}
        confirmLabel="Delete Application"
        loading={Boolean(pendingDelete && deletingId === pendingDelete.id)}
        error={deleteError}
        onCancel={closeDeleteModal}
        onConfirm={confirmDeleteApplication}
      >
        {pendingDelete && (
          <>
            <strong>Applicant: {pendingDelete.fullName || 'Unnamed applicant'}</strong>
            <span>Job: {getJobTitle(pendingDelete)}</span>
          </>
        )}
      </AdminConfirmDialog>
    </div>
  );
}

function ApplicationDetail({ application, onClose }) {
  const fields = [
    ['Full Name', application.fullName],
    ['Email', application.email],
    ['Phone', application.phone],
    ['City', application.city],
    ['Education', application.education],
    ['Experience', application.experience],
    ['Job', getJobTitle(application)],
    ['Job Details', getJobMeta(application)],
    ['Submitted', formatDate(application.createdAt)],
  ];

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="application-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <span className="admin-kicker">Application Detail</span>
            <h2 id="application-detail-title">{application.fullName || 'Applicant'}</h2>
          </div>
          <button className="admin-icon-action" onClick={onClose} aria-label="Close application detail">
            <X size={18} />
          </button>
        </div>

        <div className="admin-detail-grid">
          {fields.map(([label, value]) => (
            <div key={label} className="admin-detail-item">
              <span>{label}</span>
              <strong>{value || 'Not provided'}</strong>
            </div>
          ))}
        </div>

        <div className="admin-link-row">

          {isUsableUrl(application.resume) && (
            <a href={application.resume} target="_blank" rel="noreferrer"><FileText size={14} /> Resume</a>
          )}
        </div>

        {!isUsableUrl(application.resume) && application.resume && (
          <div className="admin-detail-item full">
            <span>Resume reference</span>
            <strong>{application.resume}</strong>
          </div>
        )}

        <div className="admin-cover-letter">
          <span>Cover Letter</span>
          <p>{application.coverLetter || 'No cover letter was provided.'}</p>
        </div>
      </div>
    </div>
  );
}
