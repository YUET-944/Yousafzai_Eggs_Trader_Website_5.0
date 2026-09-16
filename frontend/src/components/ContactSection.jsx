import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Send, Phone, Mail, MapPin, Building2, User, Briefcase, Package, ShieldCheck } from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';
import { api } from '../lib/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_OPTIONS = [
  { label: 'Commercial Grade A White Eggs', value: 'Commercial Grade A White' },
  { label: 'Free-Range Brown Eggs', value: 'Free-Range Brown' },
  { label: 'Organic Egg Options', value: 'Certified Organic' },
  { label: 'Liquid Whole Egg', value: 'Processing Grade' },
  { label: 'Mixed / Multiple Categories', value: 'Mixed / Multiple' },
];

const INITIAL_FORM = {
  companyName: '', industry: 'Hotel / Restaurant / Cafe',
  contactName: '', jobTitle: '', email: '', phone: '',
  productType: '', deliveryLocation: '', notes: '',
};

const FIELD_IDS = {
  companyName: 'quote-company-name',
  industry: 'quote-industry',
  contactName: 'quote-contact-name',
  jobTitle: 'quote-job-title',
  email: 'quote-email',
  phone: 'quote-phone',
  productType: 'quote-product-type',
  deliveryLocation: 'quote-delivery-location',
  notes: 'quote-notes',
};

const OFFICIAL_PHONE_TEL = '+92937269601';
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export default function ContactSection() {
  const contact = useCMSStore((s) => s.contact);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);
    if (!form.contactName || !form.email || !form.phone || !form.productType || !form.deliveryLocation) {
      setSubmitResult({ ok: false, msg: 'Please fill in all required fields marked with *.' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        companyName: form.companyName || 'Not Specified',
        industry: form.industry || 'General Inquiry',
        contactName: form.contactName,
        jobTitle: form.jobTitle || 'Buyer / Customer',
        email: form.email,
        phone: form.phone,
        productType: form.productType,
        deliveryLocation: form.deliveryLocation,
        notes: form.notes,
      };
      await api.submitQuote(payload);
      setSubmitResult({ ok: true, msg: 'Your quote request has been submitted successfully.' });
      setForm(INITIAL_FORM);
    } catch (err) {
      const msg = err.message || (err.status === 400
        ? 'Please check the information and try again.'
        : "We couldn't submit your request. Please check your details and try again.");
      setSubmitResult({ ok: false, msg });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      const isNarrow = window.matchMedia('(max-width: 900px)').matches;

      // Header Animation
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: '.cnt-header', start: 'top 80%' }
      });
      hTl
        .fromTo('.cnt-heading', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
        .fromTo('.cnt-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.cnt-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

      // Contact info items stagger
      gsap.fromTo('.cnt-info-card',
        { x: isNarrow ? 0 : -50, y: isNarrow ? 24 : 0, autoAlpha: 0 },
        {
          x: 0, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' }
        }
      );

      // Form card slide in
      gsap.fromTo(formRef.current,
        { x: isNarrow ? 0 : 50, y: isNarrow ? 24 : 0, autoAlpha: 0, rotationY: isNarrow ? 0 : 4 },
        {
          x: 0, y: 0, autoAlpha: 1, rotationY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactIcons = {
    Phone: <Phone className="cnt-ic" />,
    Mail: <Mail className="cnt-ic" />,
    MapPin: <MapPin className="cnt-ic" />,
    Clock: <Clock className="cnt-ic" />,
  };

  const renderContactValue = (item) => {
    const value = item.value || '';
    const isEmail = item.icon === 'Mail' || value.includes('@');
    const isPhone = item.icon === 'Phone';

    if (isEmail) {
      const emails = value.match(EMAIL_PATTERN) || value.split(/\s*(?:Â·|\u00b7|,|;)\s*/).filter(Boolean);
      return emails.map((email) => (
        <a key={email} href={`mailto:${email.trim()}`} className="cnt-info-link cnt-info-link-email">
          {email.trim()}
        </a>
      ));
    }

    if (isPhone) {
      return (
        <a href={`tel:${OFFICIAL_PHONE_TEL}`} className="cnt-info-link cnt-info-link-phone">
          {value}
        </a>
      );
    }

    if (item.icon === 'MapPin') {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('34.1205,72.0305')}`;
      return (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="cnt-info-link cnt-info-link-address">
          {value}
        </a>
      );
    }

    return value;
  };

  return (
    <section id="contact" ref={sectionRef} className="cnt-section">
      {/* Ambient background */}
      <div className="cnt-bg-grid" />
      <div className="cnt-orb cnt-orb-1" />
      <div className="cnt-orb cnt-orb-2" />

      <div className="cnt-container">
        {/* Header */}
        <div className="cnt-header">
          <h2 className="cnt-heading">{contact.title}</h2>
          <p className="cnt-sub">{contact.subtitle}</p>
          <div className="cnt-divider-line" />
        </div>

        <div className="cnt-layout">
          {/* LEFT: Info Cards & Guarantee */}
          <div ref={infoRef} className="cnt-info-column">
            <div className="cnt-info-list">
              {contact.info.map((item, i) => (
                <div key={i} className="cnt-info-card">
                  <div className="cnt-icon-wrap">
                    {contactIcons[item.icon] || <Phone className="cnt-ic" />}
                  </div>
                  <div className="cnt-info-text">
                    <span className="cnt-info-label">{item.label}</span>
                    <span className="cnt-info-value">{renderContactValue(item)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SLA Guarantee Box */}
            <div className="cnt-sla-box">
              <div className="sla-badge">
                <ShieldCheck size={16} />
                <span>Commercial Support</span>
              </div>
              <h4 className="sla-title">Rapid Commercial Response</h4>
              <p className="sla-desc">
                Submit a quote request and our commercial team will send a formal quotation.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div id="request-quote" ref={formRef} className="cnt-form-card" style={{ visibility: 'hidden', scrollMarginTop: '110px' }}>
            <div className="form-card-glow" />

            <div className="form-header-bar">
              <div className="form-title-group">
                <h3 className="form-heading">Request a Commercial Quote</h3>
              </div>
            </div>

            {submitResult && (
              <div className={`form-alert ${submitResult.ok ? 'alert-success' : 'alert-error'}`} role="alert" aria-live="polite">
                {submitResult.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{submitResult.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Company Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.companyName}>
                    <Building2 size={13} /> Company Name (Optional)
                  </label>
                  <input
                    id={FIELD_IDS.companyName}
                    className="form-input"
                    type="text"
                    placeholder="e.g. Grand Palace Hotel"
                    value={form.companyName}
                    onChange={set('companyName')}
                    disabled={submitting}
                    autoComplete="organization"
                  />
                </div>

                {/* Industry */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.industry}>
                    <Briefcase size={13} /> Industry (Optional)
                  </label>
                  <select
                    id={FIELD_IDS.industry}
                    className="form-input"
                    value={form.industry}
                    onChange={set('industry')}
                    disabled={submitting}
                  >
                    <option>Hotel / Restaurant / Cafe</option>
                    <option>Bakery / Confectionery</option>
                    <option>Retail / Supermarket</option>
                    <option>Food Manufacturer</option>
                    <option>Hospital / Institution</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Contact Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.contactName}>
                    <User size={13} /> Contact Name *
                  </label>
                  <input
                    id={FIELD_IDS.contactName}
                    className="form-input"
                    type="text"
                    placeholder="Full name"
                    value={form.contactName}
                    onChange={set('contactName')}
                    disabled={submitting}
                    required
                    aria-required="true"
                    autoComplete="name"
                  />
                </div>

                {/* Job Title */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.jobTitle}>Job Title</label>
                  <input
                    id={FIELD_IDS.jobTitle}
                    className="form-input"
                    type="text"
                    placeholder="e.g. Procurement Manager"
                    value={form.jobTitle}
                    onChange={set('jobTitle')}
                    disabled={submitting}
                    autoComplete="organization-title"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.email}>
                    <Mail size={13} /> Email Address *
                  </label>
                  <input
                    id={FIELD_IDS.email}
                    className="form-input"
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={set('email')}
                    disabled={submitting}
                    required
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor={FIELD_IDS.phone}>
                    <Phone size={13} /> Phone Number *
                  </label>
                  <input
                    id={FIELD_IDS.phone}
                    className="form-input"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={set('phone')}
                    disabled={submitting}
                    required
                    aria-required="true"
                    autoComplete="tel"
                  />
                </div>

                {/* Product Type */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label" htmlFor={FIELD_IDS.productType}>
                    <Package size={13} /> Product Category *
                  </label>
                  <select
                    id={FIELD_IDS.productType}
                    className="form-input"
                    value={form.productType}
                    onChange={set('productType')}
                    disabled={submitting}
                    required
                    aria-required="true"
                  >
                    <option value="" disabled>Select a product</option>
                    {PRODUCT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="form-group">
                <label className="form-label" htmlFor={FIELD_IDS.deliveryLocation}>
                  <MapPin size={13} /> Delivery City / Address *
                </label>
                <input
                  id={FIELD_IDS.deliveryLocation}
                  className="form-input"
                  type="text"
                  placeholder="e.g. Mardan, Attock, Peshawar, Lahore"
                  value={form.deliveryLocation}
                  onChange={set('deliveryLocation')}
                  disabled={submitting}
                  required
                  aria-required="true"
                  autoComplete="street-address"
                />
              </div>

              {/* Additional Notes */}
              <div className="form-group">
                <label className="form-label" htmlFor={FIELD_IDS.notes}>Special Specifications / Notes</label>
                <textarea
                  id={FIELD_IDS.notes}
                  className="form-input form-textarea"
                  placeholder="Share grading needs, packaging preference, delivery dates, or special terms."
                  value={form.notes}
                  onChange={set('notes')}
                  disabled={submitting}
                  autoComplete="off"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`form-submit-btn ${submitting ? 'btn-submitting' : ''}`}
              >
                <span>{submitting ? 'Submitting Request...' : 'Submit Quote Request'}</span>
                <Send size={16} />
              </button>
            </form>

            <div className="form-note">
              <Clock size={13} />
              <span>Your request is handled confidentially by our commercial team.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           SECTION BASE
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        .cnt-section {
          background: #FBF7F0;
          color: #111111;
          padding: 120px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .cnt-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .cnt-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .cnt-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          top: 15%; left: -150px;
        }

        .cnt-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.06), transparent 70%);
          bottom: 10%; right: -150px;
        }

        .cnt-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           HEADER
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        .cnt-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 80px;
        }

        .cnt-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #DE510A;
          display: block;
          margin-bottom: 16px;
          visibility: hidden;
        }

        .cnt-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .cnt-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
          visibility: hidden;
        }

        .cnt-divider-line {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           LAYOUT
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        .cnt-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 40px;
          align-items: start;
          min-width: 0;
        }

        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           LEFT: INFO COLUMN
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        .cnt-info-column {
          display: flex;
          flex-direction: column;
          gap: 28px;
          min-width: 0;
        }

        .cnt-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        .cnt-info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px;
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          box-shadow: 0 12px 30px rgba(63,98,49,0.08);
          visibility: hidden;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }

        .cnt-info-card:hover {
          border-color: rgba(222,81,10,0.3);
          box-shadow: 0 16px 40px rgba(222,81,10,0.12);
          transform: translateX(6px);
        }

        .cnt-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(222,81,10,0.1);
          border: 1px solid rgba(222,81,10,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          flex-shrink: 0;
        }

        .cnt-ic {
          width: 20px;
          height: 20px;
        }

        .cnt-info-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .cnt-info-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(20,20,20,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cnt-info-value {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15.5px;
          font-weight: 600;
          color: #111111;
          line-height: 1.4;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .cnt-info-link {
          color: inherit;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        .cnt-info-link-phone {
          white-space: nowrap;
        }

        .cnt-info-link-email {
          overflow-wrap: anywhere;
          word-break: normal;
        }

        .cnt-info-link:hover {
          color: #B9320D;
        }

        /* SLA Box */
        .cnt-sla-box {
          border-radius: 20px;
          padding: 30px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 40px rgba(63,98,49,0.1);
          position: relative;
          overflow: hidden;
        }

        .sla-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: #DE510A;
          background: rgba(222,81,10,0.08);
          border: 1px solid rgba(222,81,10,0.25);
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .sla-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px;
          color: #111111;
        }

        .sla-desc {
          font-size: 14px;
          color: rgba(20,20,20,0.6);
          line-height: 1.65;
          margin: 0 0 20px;
        }

        .sla-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 10px;
          color: #3F6231;
          letter-spacing: 0.08em;
        }

        .sla-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3F6231;
          box-shadow: 0 0 8px rgba(63,98,49,0.5);
        }

        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           RIGHT: FORM CARD
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        .cnt-form-card {
          position: relative;
          border-radius: 20px;
          padding: 28px 32px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 45px rgba(63,98,49,0.12);
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }

        .form-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(20,20,20,0.08);
          padding-bottom: 14px;
        }

        .form-eyebrow {
          font-family: monospace;
          font-size: 10px;
          color: #DE510A;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 4px;
        }

        .form-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 21px;
          font-weight: 700;
          margin: 0;
          color: #111111;
        }

        .form-badge {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: #DE510A;
          background: rgba(222,81,10,0.08);
          border: 1px solid rgba(222,81,10,0.25);
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.1em;
        }

        .form-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .alert-success {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          color: #16a34a;
        }

        .alert-error {
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.3);
          color: #dc2626;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          min-width: 0;
        }

        .form-group {
          margin-bottom: 14px;
          min-width: 0;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #3F6231;
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          color: #111111;
          background: #FFFFFF;
          border: 1.4px solid #d5dce8;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(20,20,20,0.4);
        }

        .form-input:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #DE510A;
          box-shadow: 0 0 0 3px rgba(222,81,10,0.15);
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%233F6231' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        select.form-input option {
          background: #3F6231;
          color: #ffffff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 72px;
          line-height: 1.5;
        }

        .form-submit-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          color: #ffffff;
          transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease;
          box-shadow: 0 10px 30px rgba(222,81,10,0.25);
          margin-top: 10px;
        }

        .form-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(222,81,10,0.4);
        }

        .btn-submitting {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: monospace;
          font-size: 11px;
          color: rgba(20,20,20,0.4);
          margin-top: 20px;
          text-align: center;
        }

        /* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
           MOBILE
           Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
        @media (max-width: 900px) {
          .cnt-section {
            padding: 80px 16px;
          }
          .cnt-layout {
            grid-template-columns: 1fr;
            gap: 40px;
            width: 100%;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .cnt-form-card {
            padding: 28px 20px;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
