import { useEffect, useState } from 'react';
import { CheckCircle2, Eye, Loader2, Mail, MessageSquare, Phone, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { api } from '../../lib/api';
import AdminConfirmDialog from './AdminConfirmDialog';
import AdminState from './AdminState';
import { formatDate, toArray } from './adminDataUtils';

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadQuotes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAllQuotes();
      setQuotes(toArray(res));
    } catch (err) {
      setError(err.message || 'Quotes could not be loaded.');
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const openDeleteModal = (quote) => {
    setPendingDelete(quote);
    setDeleteError('');
    setSuccess('');
  };

  const closeDeleteModal = () => {
    if (deletingId) return;
    setPendingDelete(null);
    setDeleteError('');
  };

  const confirmDeleteQuote = async () => {
    if (!pendingDelete || deletingId) return;

    setDeletingId(pendingDelete.id);
    setDeleteError('');
    setError('');
    setSuccess('');
    try {
      await api.deleteQuote(pendingDelete.id);
      setSuccess('Quote request deleted successfully.');
      if (selected?.id === pendingDelete.id) setSelected(null);
      setPendingDelete(null);
      await loadQuotes();
    } catch (err) {
      setDeleteError(err.message || 'Quote request could not be deleted.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    if (!searchQuery.trim()) return true;
    const term = searchQuery.toLowerCase();
    return (
      (q.contactName || '').toLowerCase().includes(term) ||
      (q.companyName || '').toLowerCase().includes(term) ||
      (q.email || '').toLowerCase().includes(term) ||
      (q.phone || '').toLowerCase().includes(term) ||
      (q.productType || '').toLowerCase().includes(term) ||
      (q.deliveryLocation || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="admin-panel-wrap">
      <div className="admin-section-head">
        <div>
          <span className="admin-kicker">Commercial Management</span>
          <h2>Quote Requests</h2>
          <p>View and manage all B2B quotation requests and commercial inquiries submitted through the portal.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="admin-secondary-btn" onClick={loadQuotes} disabled={loading || Boolean(deletingId)}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {success && <div className="admin-success"><CheckCircle2 size={15} /> {success}</div>}

      <div className="dash-card" style={{ marginBottom: '20px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            placeholder="Search by contact name, company, email, product or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '13.5px',
              color: '#0F172A',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '13px' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <AdminState type="loading" title="Loading quote requests" message="Fetching submissions from the database." />
      ) : error ? (
        <AdminState type="error" title="Quotes failed to load." message={error} action={<button className="admin-secondary-btn" onClick={loadQuotes}>Retry</button>} />
      ) : filteredQuotes.length === 0 ? (
        <AdminState title={searchQuery ? `No quotes match "${searchQuery}"` : "No quote requests received yet."} />
      ) : (
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Client / Contact</th>
                  <th>Company & Industry</th>
                  <th>Product Category</th>
                  <th>Volume</th>
                  <th>Delivery Location</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => {
                  const isDeleting = deletingId === q.id;
                  return (
                    <tr key={q.id}>
                      <td>
                        <strong>{q.contactName || 'Unnamed contact'}</strong>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <a href={`mailto:${q.email}`} style={{ color: '#2563EB', textDecoration: 'none' }}>{q.email}</a>
                          {q.phone && <span>• {q.phone}</span>}
                        </div>
                      </td>
                      <td>
                        <strong>{q.companyName || 'Not Specified'}</strong>
                        <span>{q.industry || 'General'}</span>
                      </td>
                      <td>
                        <span className="admin-status-pill" style={{ background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
                          {q.productType || 'Standard'}
                        </span>
                      </td>
                      <td>{q.weeklyVolume || 'N/A'}</td>
                      <td>{q.deliveryLocation || 'Not provided'}</td>
                      <td>{formatDate(q.createdAt)}</td>
                      <td>
                        <div className="admin-action-row">
                          <button className="admin-icon-action" onClick={() => setSelected(q)} aria-label="View quote detail" disabled={isDeleting}>
                            <Eye size={15} />
                          </button>
                          <button className="admin-icon-action danger" onClick={() => openDeleteModal(q)} aria-label="Delete quote request" disabled={isDeleting}>
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

      {selected && <QuoteDetail quote={selected} onClose={() => setSelected(null)} />}
      <AdminConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Quote Request?"
        message={(
          <>
            Are you sure you want to delete this quote request?<br />
            This action cannot be undone.
          </>
        )}
        confirmLabel="Delete Request"
        loading={Boolean(pendingDelete && deletingId === pendingDelete.id)}
        error={deleteError}
        onCancel={closeDeleteModal}
        onConfirm={confirmDeleteQuote}
      >
        {pendingDelete && (
          <>
            <strong>Contact: {pendingDelete.contactName || 'Unnamed contact'}</strong>
            <span>Company: {pendingDelete.companyName || 'Not specified'}</span>
          </>
        )}
      </AdminConfirmDialog>
    </div>
  );
}

function QuoteDetail({ quote, onClose }) {
  const fields = [
    ['Contact Name', quote.contactName],
    ['Company Name', quote.companyName],
    ['Industry', quote.industry],
    ['Job Title', quote.jobTitle],
    ['Email', quote.email],
    ['Phone / WhatsApp', quote.phone],
    ['Product Requested', quote.productType],
    ['Required Volume', quote.weeklyVolume],
    ['Delivery Location', quote.deliveryLocation],
    ['Date Submitted', formatDate(quote.createdAt)],
  ];

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="quote-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <span className="admin-kicker">Quote Request Detail</span>
            <h2 id="quote-detail-title">{quote.contactName || 'Quote Request'}</h2>
          </div>
          <button className="admin-icon-action" onClick={onClose} aria-label="Close detail modal">
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

        <div className="admin-link-row" style={{ marginTop: '16px' }}>
          {quote.email && (
            <a href={`mailto:${quote.email}`} target="_blank" rel="noreferrer" className="admin-secondary-btn">
              <Mail size={14} /> Send Email
            </a>
          )}
          {quote.phone && (
            <a href={`tel:${quote.phone}`} target="_blank" rel="noreferrer" className="admin-secondary-btn">
              <Phone size={14} /> Call Phone
            </a>
          )}
        </div>

        <div className="admin-cover-letter" style={{ marginTop: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={13} /> Special Specifications / Requirements Notes
          </span>
          <p>{quote.notes || 'No additional notes provided.'}</p>
        </div>
      </div>
    </div>
  );
}
