import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, Package, MapPin, MessageSquare, Scale } from 'lucide-react';
import { useQuoteModalStore } from '../store/useQuoteModalStore';
import { api } from '../lib/api';

const PRODUCT_OPTIONS = [
  'Whole Egg Liquid',
  'Liquid Egg Yolk',
  'Liquid Egg White',
  'Customized Liquid Blend',
  'Other',
];

const INITIAL_FORM = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productInterest: 'Whole Egg Liquid',
  requiredVolume: '',
  deliveryLocation: '',
  notes: '',
};

export default function QuoteModal() {
  const { isOpen, preselectedProduct, closeModal } = useQuoteModalStore();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (preselectedProduct && PRODUCT_OPTIONS.includes(preselectedProduct)) {
        setForm((f) => ({ ...f, productInterest: preselectedProduct }));
      } else {
        setForm((f) => ({ ...f, productInterest: 'Whole Egg Liquid' }));
      }
    } else {
      document.body.style.overflow = '';
      setSubmitResult(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preselectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    if (!form.fullName || !form.email || !form.phone || !form.productInterest) {
      setSubmitResult({ ok: false, msg: 'Please fill in all required fields marked with *.' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        companyName: form.companyName || 'Not Specified',
        industry: 'Commercial Food Production',
        contactName: form.fullName,
        jobTitle: 'Buyer / Procurement',
        email: form.email,
        phone: form.phone,
        productType: form.productInterest,
        weeklyVolume: form.requiredVolume || '500 kg',
        deliveryLocation: form.deliveryLocation || 'Pakistan',
        notes: form.notes ? `[Volume: ${form.requiredVolume || 'N/A'}] ${form.notes}` : `Required Volume: ${form.requiredVolume || 'N/A'}`,
      };

      await api.submitQuote(payload);
      setSubmitResult({
        ok: true,
        msg: 'Thank you. Your quote request has been received. Our commercial team will be in touch shortly.',
      });
      setForm(INITIAL_FORM);
    } catch (err) {
      const msg = err.status === 400
        ? 'Please check your information and try again.'
        : "We couldn't submit your request. Please check your details and try again.";
      setSubmitResult({ ok: false, msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quote-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="quote-modal-close" onClick={closeModal} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quote-modal-header">
          <div className="quote-modal-badge">COMMERCIAL SUPPLY</div>
          <h2 id="quote-modal-title" className="quote-modal-title">Request a Commercial Quote</h2>
          <p className="quote-modal-sub">Tell us your product needs and our sales team will respond with custom pricing.</p>
        </div>

        {submitResult && (
          <div className={`quote-modal-alert ${submitResult.ok ? 'alert-success' : 'alert-error'}`} role="alert">
            {submitResult.ok ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{submitResult.msg}</span>
          </div>
        )}

        {submitResult?.ok ? (
          <div className="quote-modal-done">
            <button className="btn-modal-done" onClick={closeModal}>Close Window</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="quote-modal-form">
            <div className="quote-form-grid">
              {/* Full Name */}
              <div className="quote-field-group">
                <label htmlFor="qm-fullname" className="quote-field-label">
                  <User size={13} /> Full Name *
                </label>
                <input
                  id="qm-fullname"
                  type="text"
                  className="quote-field-input"
                  placeholder="e.g. Muhammad Ali"
                  value={form.fullName}
                  onChange={set('fullName')}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Company Name */}
              <div className="quote-field-group">
                <label htmlFor="qm-company" className="quote-field-label">
                  <Building2 size={13} /> Company Name
                </label>
                <input
                  id="qm-company"
                  type="text"
                  className="quote-field-input"
                  placeholder="e.g. Grand Bakery Ltd"
                  value={form.companyName}
                  onChange={set('companyName')}
                  disabled={submitting}
                />
              </div>

              {/* Email */}
              <div className="quote-field-group">
                <label htmlFor="qm-email" className="quote-field-label">
                  <Mail size={13} /> Email Address *
                </label>
                <input
                  id="qm-email"
                  type="email"
                  className="quote-field-input"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={set('email')}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="quote-field-group">
                <label htmlFor="qm-phone" className="quote-field-label">
                  <Phone size={13} /> Phone / WhatsApp *
                </label>
                <input
                  id="qm-phone"
                  type="tel"
                  className="quote-field-input"
                  placeholder="+92 3XX XXXXXXX"
                  value={form.phone}
                  onChange={set('phone')}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Product Interest */}
              <div className="quote-field-group">
                <label htmlFor="qm-product" className="quote-field-label">
                  <Package size={13} /> Product Interest *
                </label>
                <select
                  id="qm-product"
                  className="quote-field-select"
                  value={form.productInterest}
                  onChange={set('productInterest')}
                  disabled={submitting}
                  required
                >
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Required Quantity / Volume */}
              <div className="quote-field-group">
                <label htmlFor="qm-volume" className="quote-field-label">
                  <Scale size={13} /> Required Quantity / Volume
                </label>
                <input
                  id="qm-volume"
                  type="text"
                  className="quote-field-input"
                  placeholder="e.g. 500 kg / 1000 kg"
                  value={form.requiredVolume}
                  onChange={set('requiredVolume')}
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Delivery Location */}
            <div className="quote-field-group full-width">
              <label htmlFor="qm-location" className="quote-field-label">
                <MapPin size={13} /> Delivery Location
              </label>
              <input
                id="qm-location"
                type="text"
                className="quote-field-input"
                placeholder="e.g. Lahore / Rashakai SEZ"
                value={form.deliveryLocation}
                onChange={set('deliveryLocation')}
                disabled={submitting}
              />
            </div>

            {/* Message / Requirements */}
            <div className="quote-field-group full-width">
              <label htmlFor="qm-notes" className="quote-field-label">
                <MessageSquare size={13} /> Message / Requirements
              </label>
              <textarea
                id="qm-notes"
                className="quote-field-textarea"
                rows="3"
                placeholder="Describe your product specifications, delivery frequency, or custom requirements..."
                value={form.notes}
                onChange={set('notes')}
                disabled={submitting}
              />
            </div>

            <button type="submit" className="quote-modal-submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .quote-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(17, 17, 17, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
          animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .quote-modal-card {
          position: relative;
          width: 100%;
          max-width: 620px;
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid rgba(63, 98, 49, 0.2);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
          padding: 32px 36px;
          max-height: 90vh;
          overflow-y: auto;
          box-sizing: border-box;
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .quote-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(63, 98, 49, 0.08);
          border: none;
          color: #3F6231;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quote-modal-close:hover {
          background: #DE510A;
          color: #FFFFFF;
        }

        .quote-modal-header {
          margin-bottom: 24px;
        }

        .quote-modal-badge {
          display: inline-block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #DE510A;
          background: rgba(222, 81, 10, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .quote-modal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #111111;
          margin: 0 0 6px;
        }

        .quote-modal-sub {
          font-size: 14px;
          color: rgba(20, 20, 20, 0.65);
          margin: 0;
          line-height: 1.5;
        }

        .quote-modal-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.45;
          margin-bottom: 20px;
        }

        .quote-modal-alert.alert-success {
          background: rgba(63, 98, 49, 0.1);
          border: 1px solid rgba(63, 98, 49, 0.3);
          color: #2C4724;
        }

        .quote-modal-alert.alert-error {
          background: rgba(222, 81, 10, 0.1);
          border: 1px solid rgba(222, 81, 10, 0.3);
          color: #B9320D;
        }

        .quote-modal-done {
          text-align: center;
          padding: 20px 0;
        }

        .btn-modal-done {
          padding: 12px 28px;
          background: #3F6231;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .quote-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .quote-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .quote-field-group.full-width {
          grid-column: 1 / -1;
          margin-bottom: 16px;
        }

        .quote-field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #3F6231;
        }

        .quote-field-input,
        .quote-field-select,
        .quote-field-textarea {
          width: 100%;
          padding: 10px 14px;
          background: #FBF7F0;
          border: 1px solid rgba(63, 98, 49, 0.25);
          border-radius: 10px;
          font-size: 14px;
          color: #111111;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .quote-field-input:focus,
        .quote-field-select:focus,
        .quote-field-textarea:focus {
          border-color: #DE510A;
          box-shadow: 0 0 0 3px rgba(222, 81, 10, 0.12);
        }

        .quote-modal-submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: #DE510A;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(222, 81, 10, 0.3);
          transition: all 0.25s ease;
          margin-top: 8px;
        }

        .quote-modal-submit-btn:hover:not(:disabled) {
          background: #C44305;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(222, 81, 10, 0.45);
        }

        .quote-modal-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .quote-modal-card {
            padding: 24px 20px;
            border-radius: 16px;
          }

          .quote-form-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .quote-modal-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
