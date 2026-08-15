import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCMSStore } from '../../store/useCMSStore';
import AdminLayout from '../../components/admin/AdminLayout';
import SchemaEditor from '../../components/admin/SchemaEditor';
import { MAIN_SITE_SCHEMAS, EGG_TRADERS_SCHEMAS } from '../../components/admin/schemas';
import {
  FileText, Package, Image as ImageIcon, Globe2, CheckCircle2, ArrowRight,
} from 'lucide-react';

const SECTION_LABELS = {
  hero: 'Home Hero',
  about: 'About',
  overview: 'Company Overview',
  products: 'Products & Grades',
  solutions: 'Trading Solutions',
  supplyChain: 'Supply Chain',
  distribution: 'Distribution',
  whyUs: 'Why Choose Us',
  statsBand: 'Statistics',
  industries: 'Industries',
  process: 'Our Process',
  quality: 'Quality',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  contact: 'Contact',
  company: 'Company Info',
  ourCompanies: 'Our Companies',
  footer: 'Footer',
  banners: 'Page Heroes',
  cta: 'Call to Action',
  aboutScenes: 'About Page Story',
};

const EGG_TRADERS_SECTION_LABELS = {
  company: 'Company Info',
  hero: 'Hero',
  about: 'About',
  services: 'Services',
  products: 'Products',
  solutions: 'Solutions',
  process: 'Process',
  quality: 'Quality',
  contact: 'Contact',
};

function AdminDashboard() {
  const all = useCMSStore();
  const saveStatus = useCMSStore((s) => s.saveStatus);
  const saveMessage = useCMSStore((s) => s.saveMessage);
  const countItems = (obj, acc = { count: 0, images: 0 }) => {
    if (!obj || typeof obj !== 'object') return acc;
    if (Array.isArray(obj)) {
      acc.count += obj.length;
      obj.forEach((i) => countItems(i, acc));
      return acc;
    }
    for (const v of Object.values(obj)) {
      if (typeof v === 'string') {
        if (v.startsWith('data:') || v.startsWith('http') && /\.(png|jpe?g|webp|svg|gif)/i.test(v)) acc.images++;
      } else if (v && typeof v === 'object') {
        countItems(v, acc);
      }
    }
    return acc;
  };

  const mainKeys = Object.keys(MAIN_SITE_SCHEMAS);
  const etKeys = Object.keys(EGG_TRADERS_SCHEMAS);

  const tally = (keys, source) =>
    keys.reduce((acc, k) => {
      const v = source[k];
      if (v === undefined) return acc;
      const c = countItems(v);
      acc.count += c.count;
      acc.images += c.images;
      return acc;
    }, { count: 0, images: 0 });

  const mainItems = tally(mainKeys, all);
  const etItems = tally(etKeys, all.eggTraders || {});

  const stats = [
    { label: 'Editable Sections', value: String(mainKeys.length + etKeys.length), icon: FileText, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Content Items', value: String(mainItems.count + etItems.count), icon: Package, color: '#7C3AED', bg: '#F5F3FF' },
    { label: 'Images Managed', value: String(mainItems.images + etItems.images), icon: ImageIcon, color: '#0F766E', bg: '#F0FDFA' },
    { label: 'Websites Live', value: '2', icon: Globe2, color: '#10B981', bg: '#ECFDF5' },
  ];

  return (
    <div className="dash-wrap">
      <div className="dash-hero">
        <div>
          <span className="dash-eyebrow">Content Management</span>
          <h2 className="dash-title">Manage editable content across both websites.</h2>
          <p className="dash-sub">
            Manage page text, lists, images, and key settings for the <strong>Main Website</strong> and the{' '}
            <strong>Egg Traders Website</strong>. Select a section from the sidebar. Changes save automatically when the system is connected.
          </p>
        </div>
        <div
          className={`dash-hero-badge dash-hero-badge-${saveStatus}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <CheckCircle2 size={18} />
          <span>{saveMessage || 'Changes save automatically'}</span>
        </div>
      </div>

      <div className="dash-stats">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="dash-stat">
              <div className="dash-stat-icon" style={{ background: s.bg, color: s.color }}>
                <Icon size={22} />
              </div>
              <div>
                <div className="dash-stat-value">{s.value}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">Main Website</span>
            <Link to="/" target="_blank" className="dash-view-link">View site <ArrowRight size={12} /></Link>
          </div>
          <div className="dash-section-list">
            {mainKeys.map((k) => (
              <div key={k} className="dash-section-row">
                <span className="dash-section-name">{SECTION_LABELS[k] || k}</span>
                <span className="dash-section-count">Editable content</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card-head">
            <span className="dash-card-title">Egg Traders Website</span>
            <Link to="/egg-traders" target="_blank" className="dash-view-link">View site <ArrowRight size={12} /></Link>
          </div>
          <div className="dash-section-list">
            {etKeys.map((k) => (
              <div key={k} className="dash-section-row">
                <span className="dash-section-name">{EGG_TRADERS_SECTION_LABELS[k] || k}</span>
                <span className="dash-section-count">Editable content</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dash-wrap { max-width: 1100px; }
        .dash-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
          border-radius: 18px;
          padding: 32px 36px;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 24px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
        }
        .dash-eyebrow { font-size: 12px; letter-spacing: 0; color: #93C5FD; font-weight: 700; }
        .dash-title { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; margin: 8px 0 10px; }
        .dash-sub { font-size: 14px; color: #CBD5E1; line-height: 1.65; max-width: 640px; margin: 0; }
        .dash-sub strong { color: #FFFFFF; }
        .dash-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(16, 185, 129, 0.18);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6EE7B7;
          font-size: 12px; font-weight: 600;
          padding: 8px 14px; border-radius: 20px; white-space: nowrap;
        }
        .dash-hero-badge-idle {
          background: rgba(148, 163, 184, 0.14);
          border-color: rgba(148, 163, 184, 0.28);
          color: #CBD5E1;
        }
        .dash-hero-badge-dirty,
        .dash-hero-badge-saving {
          background: rgba(96, 165, 250, 0.16);
          border-color: rgba(147, 197, 253, 0.34);
          color: #BFDBFE;
        }
        .dash-hero-badge-saved {
          background: rgba(16, 185, 129, 0.18);
          border-color: rgba(16, 185, 129, 0.4);
          color: #6EE7B7;
        }
        .dash-hero-badge-error,
        .dash-hero-badge-session-expired {
          background: rgba(248, 113, 113, 0.14);
          border-color: rgba(248, 113, 113, 0.36);
          color: #FECACA;
        }
        .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .dash-stat {
          background: #FFFFFF; border: 1px solid #E5E9F2; border-radius: 14px;
          padding: 18px; display: flex; align-items: center; gap: 14px;
        }
        .dash-stat-icon {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .dash-stat-value { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; color: #0F172A; }
        .dash-stat-label { font-size: 12px; color: #64748B; margin-top: 2px; }
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .dash-card {
          background: #FFFFFF; border: 1px solid #E5E9F2; border-radius: 14px;
          padding: 22px;
        }
        .dash-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .dash-card-title {
          font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700;
          color: #2563EB; letter-spacing: 0;
        }
        .dash-view-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600; color: #2563EB; text-decoration: none;
        }
        .dash-section-list { display: flex; flex-direction: column; }
        .dash-section-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 12px; border-radius: 8px;
        }
        .dash-section-row:nth-child(odd) { background: #F8FAFC; }
        .dash-section-name { font-size: 13px; color: #334155; font-weight: 500; }
        .dash-section-count { font-size: 12px; color: #64748B; }
        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
          .dash-grid { grid-template-columns: 1fr; }
          .dash-hero { flex-direction: column; }
        }
        @media (max-width: 480px) { .dash-stats { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

const MAIN_UPDATERS = {
  hero: 'updateHero',
  about: 'updateAbout',
  overview: 'updateOverview',
  products: 'updateProducts',
  solutions: 'updateSolutions',
  supplyChain: 'updateSupplyChain',
  distribution: 'updateDistribution',
  whyUs: 'updateWhyUs',
  statsBand: 'updateStatsBand',
  industries: 'updateIndustries',
  process: 'updateProcess',
  quality: 'updateQuality',
  testimonials: 'updateTestimonials',
  faq: 'updateFaq',
  contact: 'updateContact',
  company: 'updateCompany',
  ourCompanies: 'updateOurCompanies',
  footer: 'updateFooter',
  banners: 'updateBanners',
  cta: 'updateCta',
  aboutScenes: 'updateAboutScenes',
};

function MainSectionEditor({ schema, active, updaterName }) {
  const updater = useCMSStore((s) => s[updaterName]);
  const value = useCMSStore((s) => s[active]);
  return <SchemaEditor value={value} onChange={updater} schema={schema} />;
}

function EggTradersEditor({ schemaKey, schema }) {
  const eggTraders = useCMSStore((s) => s.eggTraders);
  const updateEggTraders = useCMSStore((s) => s.updateEggTraders);
  const value = eggTraders?.[schemaKey];
  const updater = (data) => updateEggTraders({ [schemaKey]: { ...(eggTraders?.[schemaKey] || {}), ...data } });
  return <SchemaEditor value={value} onChange={updater} schema={schema} />;
}

export default function AdminApp() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [active, setActive] = useState('dashboard');

  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const renderEditor = () => {
    if (active === 'dashboard') return <AdminDashboard />;

    if (active.startsWith('eggTraders')) {
      const schemaKey = active.replace('eggTraders', '').charAt(0).toLowerCase() + active.replace('eggTraders', '').slice(1);
      const schema = EGG_TRADERS_SCHEMAS[schemaKey];
      if (!schema) return <p className="dash-sub">Select a section to edit.</p>;
      return (
        <EggTradersEditor schemaKey={schemaKey} schema={schema} />
      );
    }

    const schema = MAIN_SITE_SCHEMAS[active];
    const updaterName = MAIN_UPDATERS[active];
    if (!schema || !updaterName) return <p className="dash-sub">Select a section to edit.</p>;
    return (
      <MainSectionEditor
        schema={schema}
        active={active}
        updaterName={updaterName}
      />
    );
  };

  return (
    <AdminLayout activeSection={active} setActiveSection={setActive}>
      {renderEditor()}
    </AdminLayout>
  );
}
