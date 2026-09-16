import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCMSStore } from '../../store/useCMSStore';
import { api } from '../../lib/api';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const OFFICIAL_PHONE_TEL = '+92937269601';
const HERO_IMAGE = '/images/placeholders/truck_delievry.png';

export default function EggTradersContact() {
  const data = useCMSStore((s) => s.eggTraders.contact);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.contact);
  const ref = useRef(null);
  const [form, setForm] = useState({
    companyName: '', industry: 'Other', contactName: '', jobTitle: '', email: '', phone: '',
    productType: 'Commercial Grade A White', weeklyVolume: 'Under 50',
    deliveryLocation: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);
    if (!form.companyName || !form.contactName || !form.email || !form.phone || !form.deliveryLocation) {
      setSubmitResult({ ok: false, msg: 'Please fill in all required fields.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.submitQuote({ ...form, source: 'egg-traders' });
      setSubmitResult({ ok: true, msg: res.message || 'Request submitted successfully. Our team will reach out within 2 business hours.' });
      setForm({
        companyName: '', industry: 'Other', contactName: '', jobTitle: '', email: '', phone: '',
        productType: 'Commercial Grade A White', weeklyVolume: 'Under 50',
        deliveryLocation: '', notes: '',
      });
    } catch (err) {
      setSubmitResult({ ok: false, msg: err.message || 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  const icons = {
    Phone: <path d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 7V5z" />,
    Mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    MapPin: <><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></>,
    Clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  };

  return (
    <>
      <EggTradersPageBanner
        title={banner?.title || 'Contact Us'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 55%"
      />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-contact-grid">
              <div className="et-contact-info reveal">
                {data.info.map((item, i) => (
                  <div key={i} className="et-ci-item">
                    <div className="et-ci-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="19" height="19">
                        {icons[item.icon]}
                      </svg>
                    </div>
                    <div>
                      <div className="et-ci-label">{item.label}</div>
                      <div className="et-ci-value">
                        {item.icon === 'Phone' ? (
                          <a href={`tel:${OFFICIAL_PHONE_TEL}`} className="et-ci-link">{item.value}</a>
                        ) : item.icon === 'MapPin' ? (
                          <div>
                            <div>{item.value}</div>
                            <div style={{ marginTop: '8px' }}>
                              <a
                                href="https://www.google.com/maps/dir/?api=1&destination=34.190814,72.048577"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  backgroundColor: '#0047BB',
                                  color: '#FFFFFF',
                                  fontSize: '12.5px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                  boxShadow: '0 2px 8px rgba(0,71,187,0.25)',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                  <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
                                  <circle cx="12" cy="9" r="2.4" />
                                </svg>
                                Get Directions
                              </a>
                            </div>
                          </div>
                        ) : item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="et-form-card reveal" data-lenis-prevent="false">
                <form onSubmit={handleSubmit}>
                  {submitResult && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 9, fontSize: 13, marginBottom: 16, background: submitResult.ok ? '#F0FDF4' : '#FEF2F2', color: submitResult.ok ? '#166534' : '#B91C1C' }}>
                      {submitResult.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      {submitResult.msg}
                    </div>
                  )}
                  <div className="et-form-row">
                    <div className="et-f-group">
                      <label className="et-f-label">Company name *</label>
                      <input className="et-f-input" type="text" placeholder="Your company name" value={form.companyName} onChange={set('companyName')} disabled={submitting} />
                    </div>
                    <div className="et-f-group">
                      <label className="et-f-label">Your name *</label>
                      <input className="et-f-input" type="text" placeholder="Full name" value={form.contactName} onChange={set('contactName')} disabled={submitting} />
                    </div>
                  </div>
                  <div className="et-form-row">
                    <div className="et-f-group">
                      <label className="et-f-label">Email *</label>
                      <input className="et-f-input" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} disabled={submitting} />
                    </div>
                    <div className="et-f-group">
                      <label className="et-f-label">Phone *</label>
                      <input className="et-f-input" type="tel" placeholder="+92 XXX XXXXXXX" value={form.phone} onChange={set('phone')} disabled={submitting} />
                    </div>
                  </div>
                  <div className="et-form-row">
                    <div className="et-f-group">
                      <label className="et-f-label">Product</label>
                      <select className="et-f-input" value={form.productType} onChange={set('productType')} disabled={submitting}>
                        <option value="Commercial Grade A White">Farm-fresh white eggs</option>
                        <option value="Free-Range Brown">Free-range brown eggs</option>
                        <option value="Certified Organic">Certified organic eggs</option>
                        <option value="Processing Grade">Liquid whole egg</option>
                        <option value="Mixed / Multiple">Mixed / Multiple</option>
                      </select>
                    </div>
                    <div className="et-f-group">
                      <label className="et-f-label">Weekly volume *</label>
                      <select className="et-f-input" value={form.weeklyVolume} onChange={set('weeklyVolume')} disabled={submitting}>
                        <option>Under 50</option>
                        <option>50-199</option>
                        <option>200-499</option>
                        <option>500-1,999</option>
                        <option>2,000+</option>
                      </select>
                    </div>
                  </div>
                  <div className="et-f-group">
                    <label className="et-f-label">Delivery location *</label>
                    <input className="et-f-input" type="text" placeholder="City / address for delivery" value={form.deliveryLocation} onChange={set('deliveryLocation')} disabled={submitting} />
                  </div>
                  <div className="et-f-group">
                    <label className="et-f-label">Notes</label>
                    <textarea className="et-f-input" placeholder="Share any special requirements." value={form.notes} onChange={set('notes')} rows={3} disabled={submitting} />
                  </div>
                  <button type="submit" disabled={submitting} style={{
                    width: '100%', padding: '13px 26px', borderRadius: 9, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                    background: 'linear-gradient(135deg,#0047BB,#003399)', color: '#ffffff',
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13.5,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 10px 24px rgba(0,71,187,0.3)',
                    opacity: submitting ? 0.7 : 1, transition: 'transform .25s, box-shadow .25s',
                  }}
                    onMouseEnter={(e) => { if (!submitting) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 14px 32px rgba(0,71,187,0.4)'; } }}
                    onMouseLeave={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 10px 24px rgba(0,71,187,0.3)'; }}
                  >
                    {submitting ? 'Submitting...' : 'Request a Quote'}
                  </button>
                </form>
                <div className="et-form-note"><Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Our team will reach out within 2 business hours.</div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .et-contact-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 48px; }
          .et-contact-info { display: flex; flex-direction: column; gap: 26px; }
          .et-ci-item { display: flex; gap: 16px; align-items: flex-start; min-width: 0; }
          .et-ci-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(0,71,187,0.08); border: 1px solid rgba(0,71,187,0.18); display: flex; align-items: center; justify-content: center; color: #0047BB; flex-shrink: 0; }
          .et-ci-label { font-size: 12px; color: rgba(20,20,20,0.58); letter-spacing: 0; font-weight: 600; margin-bottom: 4px; }
          .et-ci-value { font-size: 14.5px; color: #111111; font-weight: 600; min-width: 0; overflow-wrap: anywhere; }
          .et-ci-link { color: inherit; text-decoration: none; white-space: nowrap; }
          .et-ci-link:hover { color: #0047BB; }
          .et-form-card { background: #FFFFFF; border: 1px solid #e3e9f2; border-radius: 24px; padding: 42px; box-shadow: 0 20px 50px rgba(0,27,77,0.12); }
          .et-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
          .et-f-group { margin-bottom: 20px; }
          .et-f-label { display: block; font-size: 12.5px; font-weight: 600; color: #001B4D; margin-bottom: 8px; }
          .et-f-input { width: 100%; padding: 13px 16px; border: 1.4px solid #d5dce8; border-radius: 9px; font-size: 13.5px; font-family: 'Inter',sans-serif; color: #001B4D; background: #FFFFFF; transition: border-color .25s, box-shadow .25s; }
          .et-f-input::placeholder { color: rgba(20,20,20,0.38); }
          .et-f-input:focus { outline: none; border-color: #0047BB; box-shadow: 0 0 0 3px rgba(0,71,187,0.14); }
          select.et-f-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23001B4D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 38px; }
          select.et-f-input option { background: #001B4D; color: #ffffff; }
          textarea.et-f-input { resize: vertical; min-height: 90px; }
          .et-form-note { font-size: 12px; color: rgba(20,20,20,0.6); text-align: center; margin-top: 14px; }
          @media (max-width: 860px) { .et-contact-grid { grid-template-columns: 1fr; gap: 32px; } .et-form-row { grid-template-columns: 1fr; } .et-form-card { padding: 32px 24px; } }
          @media (max-width: 420px) { .et-form-card { padding: 20px 16px; border-radius: 20px; } .et-f-label { font-size: 12px; } .et-f-input { padding: 11px 14px; font-size: 13px; } }
        `}</style>
      </div>
    </>
  );
}
