import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, CheckCircle2, FileText, Inbox, RefreshCw, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { useCMSStore } from '../../store/useCMSStore';
import { EGG_TRADERS_SCHEMAS, MAIN_SITE_SCHEMAS } from './schemas';
import AdminState from './AdminState';
import { getJobTitle, toArray, unwrapData } from './adminDataUtils';

export default function AdminDashboard() {
  const saveStatus = useCMSStore((s) => s.saveStatus);
  const saveMessage = useCMSStore((s) => s.saveMessage);
  const [state, setState] = useState({
    loading: true,
    error: '',
    jobs: [],
    applications: [],
    stats: null,
    cmsSections: 0,
  });

  const loadDashboard = async () => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    const [jobsRes, applicationsRes, statsRes, cmsRes] = await Promise.allSettled([
      api.getJobs(),
      api.getAllApplications(),
      api.getStats(),
      api.getCmsAll(),
    ]);

    const rejected = [jobsRes, applicationsRes, statsRes, cmsRes].find((res) => res.status === 'rejected');
    setState({
      loading: false,
      error: rejected?.reason?.message || '',
      jobs: jobsRes.status === 'fulfilled' ? toArray(jobsRes.value) : [],
      applications: applicationsRes.status === 'fulfilled' ? toArray(applicationsRes.value) : [],
      stats: statsRes.status === 'fulfilled' ? unwrapData(statsRes.value) : null,
      cmsSections: cmsRes.status === 'fulfilled' ? Object.keys(unwrapData(cmsRes.value) || {}).length : 0,
    });
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    { label: 'Active Jobs', value: state.loading ? '...' : state.jobs.length, icon: Briefcase, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Applications', value: state.loading ? '...' : state.applications.length, icon: Users, color: '#0F766E', bg: '#F0FDFA' },
    { label: 'New Leads', value: state.loading ? '...' : Number(state.stats?.newLeads || 0), icon: Inbox, color: '#B45309', bg: '#FFFBEB' },
    { label: 'CMS Sections', value: state.loading ? '...' : state.cmsSections, icon: FileText, color: '#7C3AED', bg: '#F5F3FF' },
  ];

  const recentApplications = state.applications.slice(0, 5);

  return (
    <div className="dash-wrap admin-panel-wrap">
      <div className="dash-hero">
        <div>
          <span className="dash-eyebrow">Admin Overview</span>
          <h2 className="dash-title">Live operational data from the backend.</h2>
          <p className="dash-sub">
            Dashboard counts come from the Jobs, Applications, Stats, and CMS APIs. Empty backend data is shown as zero instead of sample content.
          </p>
        </div>
        <div className="dash-actions">
          <div className={`dash-hero-badge dash-hero-badge-${saveStatus}`} role="status" aria-live="polite" aria-atomic="true">
            <CheckCircle2 size={18} />
            <span>{saveMessage || 'Changes save automatically'}</span>
          </div>
          <button className="admin-secondary-btn dark" onClick={loadDashboard} disabled={state.loading}>
            <RefreshCw size={14} className={state.loading ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {state.error && (
        <AdminState
          type="error"
          title="Some dashboard data could not be loaded."
          message={state.error}
          action={<button className="admin-secondary-btn" onClick={loadDashboard}>Retry</button>}
        />
      )}

      <div className="dash-stats">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="dash-stat">
              <div className="dash-stat-icon" style={{ background: item.bg, color: item.color }}>
                <Icon size={22} />
              </div>
              <div>
                <div className="dash-stat-value">{item.value}</div>
                <div className="dash-stat-label">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">Recent Applications</span>
            <button className="dash-inline-btn" onClick={loadDashboard} disabled={state.loading}>
              <RefreshCw size={12} className={state.loading ? 'spin' : ''} />
              Sync
            </button>
          </div>
          {state.loading ? (
            <AdminState type="loading" title="Loading applications" />
          ) : recentApplications.length === 0 ? (
            <AdminState title="No applications have been received yet." />
          ) : (
            <div className="dash-section-list">
              {recentApplications.map((app) => (
                <div key={app.id} className="dash-section-row">
                  <span className="dash-section-name">{app.fullName || 'Unnamed applicant'}</span>
                  <span className="dash-section-count">{getJobTitle(app)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">CMS Coverage</span>
            <Link to="/" target="_blank" className="dash-view-link">View site <ArrowRight size={12} /></Link>
          </div>
          <div className="dash-section-list">
            <div className="dash-section-row">
              <span className="dash-section-name">Main Website Editors</span>
              <span className="dash-section-count">{Object.keys(MAIN_SITE_SCHEMAS).length} sections</span>
            </div>
            <div className="dash-section-row">
              <span className="dash-section-name">Egg Traders Editors</span>
              <span className="dash-section-count">{Object.keys(EGG_TRADERS_SCHEMAS).length} sections</span>
            </div>
            <div className="dash-section-row">
              <span className="dash-section-name">Backend CMS Records</span>
              <span className="dash-section-count">{state.loading ? '...' : state.cmsSections}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
