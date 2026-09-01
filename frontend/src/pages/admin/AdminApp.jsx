import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCMSStore } from '../../store/useCMSStore';
import AdminLayout from '../../components/admin/AdminLayout';
import SchemaEditor from '../../components/admin/SchemaEditor';
import AdminApplications from '../../components/admin/AdminApplications';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminJobs from '../../components/admin/AdminJobs';
import { MAIN_SITE_SCHEMAS, EGG_TRADERS_SCHEMAS } from '../../components/admin/schemas';
import '../../components/admin/adminViews.css';

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
    if (active === 'applications') return <AdminApplications />;
    if (active === 'jobs') return <AdminJobs />;

    if (active.startsWith('eggTraders')) {
      const rawKey = active.replace('eggTraders', '');
      const schemaKey = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
      const schema = EGG_TRADERS_SCHEMAS[schemaKey];
      if (!schema) return <p className="dash-sub">Select a section to edit.</p>;
      return <EggTradersEditor schemaKey={schemaKey} schema={schema} />;
    }

    const schema = MAIN_SITE_SCHEMAS[active];
    const updaterName = MAIN_UPDATERS[active];
    if (!schema || !updaterName) return <p className="dash-sub">Select a section to edit.</p>;
    return <MainSectionEditor schema={schema} active={active} updaterName={updaterName} />;
  };

  return (
    <AdminLayout activeSection={active} setActiveSection={setActive}>
      {renderEditor()}
    </AdminLayout>
  );
}
