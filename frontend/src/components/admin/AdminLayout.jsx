import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useCMSStore } from '../../store/useCMSStore';
import {
  Menu, X, ShieldCheck, LogOut, ExternalLink, LayoutDashboard,
  Home, FileText, Package, Boxes, Truck, Shield, Star, HelpCircle,
  Building2, BadgeCheck, Layers, Settings2, Newspaper, ListChecks,
  Search, PanelLeftClose, PanelLeft, Globe, ChefHat, Image as ImageIcon, Briefcase, Users,
} from 'lucide-react';

const mainNavItems = [
  { label: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'Jobs', key: 'jobs', icon: Briefcase },
  { label: 'Applications', key: 'applications', icon: Users },
  { label: 'Home Hero', key: 'hero', icon: Home },
  { label: 'About', key: 'about', icon: FileText },
  { label: 'Company Overview', key: 'overview', icon: Building2 },
  { label: 'Products & Grades', key: 'products', icon: Package },
  { label: 'Trading Solutions', key: 'solutions', icon: Layers },
  { label: 'Supply Chain', key: 'supplyChain', icon: Truck },
  { label: 'Distribution', key: 'distribution', icon: Globe },
  { label: 'Why Choose Us', key: 'whyUs', icon: ListChecks },
  { label: 'Statistics', key: 'statsBand', icon: BadgeCheck },
  { label: 'Industries', key: 'industries', icon: ChefHat },
  { label: 'Our Process', key: 'process', icon: Settings2 },
  { label: 'Quality', key: 'quality', icon: Shield },
  { label: 'Testimonials', key: 'testimonials', icon: Star },
  { label: 'FAQ', key: 'faq', icon: HelpCircle },
  { label: 'Contact', key: 'contact', icon: Boxes },
  { label: 'Company Info', key: 'company', icon: Building2 },
  { label: 'Our Companies', key: 'ourCompanies', icon: Boxes },
  { label: 'Footer', key: 'footer', icon: Newspaper },
  { label: 'Page Heroes', key: 'banners', icon: ImageIcon },
  { label: 'Call to Action', key: 'cta', icon: BadgeCheck },
  { label: 'About Page Story', key: 'aboutScenes', icon: FileText },
];

const eggTradersNavItems = [
  { label: 'Egg Traders Company', key: 'eggTradersCompany', icon: Building2 },
  { label: 'Egg Traders Hero', key: 'eggTradersHero', icon: Home },
  { label: 'Egg Traders About', key: 'eggTradersAbout', icon: FileText },
  { label: 'Egg Traders Services', key: 'eggTradersServices', icon: Layers },
  { label: 'Egg Traders Products', key: 'eggTradersProducts', icon: Package },
  { label: 'Egg Traders Solutions', key: 'eggTradersSolutions', icon: Layers },
  { label: 'Egg Traders Process', key: 'eggTradersProcess', icon: Settings2 },
  { label: 'Egg Traders Quality', key: 'eggTradersQuality', icon: Shield },
  { label: 'Egg Traders Contact', key: 'eggTradersContact', icon: Boxes },
];

export default function AdminLayout({ activeSection, setActiveSection, children }) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const saveStatus = useCMSStore((s) => s.saveStatus);
  const saveMessage = useCMSStore((s) => s.saveMessage);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allItems = useMemo(
    () => [
      ...mainNavItems.map((i) => ({ ...i, group: 'main' })),
      ...eggTradersNavItems.map((i) => ({ ...i, group: 'et' })),
    ],
    []
  );

  const filteredMain = query
    ? mainNavItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : mainNavItems;
  const filteredEt = query
    ? eggTradersNavItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : eggTradersNavItems;

  const select = (key) => {
    setActiveSection(key);
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-root">
      {/* Mobile Topbar */}
      <div className="admin-mobile-bar">
        <div className="mobile-brand">
          <div className="mobile-brand-badge"><ShieldCheck size={18} /></div>
          <span className="mobile-title">Yousafzai CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <button
          className="admin-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <ShieldCheck size={22} />
          </div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-title">YOUSAFZAI</span>
              <span className="brand-sub">Content Management</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="sidebar-search">
            <Search size={14} className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections..."
              className="search-input"
            />
            {query && (
              <button
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear section search"
              >
                x
              </button>
            )}
          </div>
        )}

        <nav className="sidebar-nav" data-lenis-prevent-wheel data-lenis-prevent-touch>
          {!collapsed && <span className="nav-group-label">Admin & Main Website</span>}
          {filteredMain.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => select(item.key)}
                className={`nav-item ${activeSection === item.key ? 'is-active' : ''}`}
                title={item.label}
              >
                <Icon size={16} className="nav-item-icon" />
                <span className="nav-text">{collapsed ? '' : item.label}</span>
                {activeSection === item.key && <span className="nav-active-dot" />}
              </button>
            );
          })}

          {filteredMain.length > 0 && filteredEt.length > 0 && !collapsed && (
            <span className="nav-group-label" style={{ marginTop: 18 }}>Egg Traders Website</span>
          )}
          {filteredEt.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => select(item.key)}
                className={`nav-item ${activeSection === item.key ? 'is-active' : ''}`}
                title={item.label}
              >
                <Icon size={16} className="nav-item-icon" />
                <span className="nav-text">{collapsed ? '' : item.label}</span>
                {activeSection === item.key && <span className="nav-active-dot" />}
              </button>
            );
          })}

          {!collapsed && query && filteredMain.length === 0 && filteredEt.length === 0 && (
            <div className="no-results">No sections match "{query}"</div>
          )}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="user-profile">
              <span className="user-avatar">{(user?.email || 'A')[0].toUpperCase()}</span>
              <div className="user-meta">
                <span className="user-email">{user?.email || 'admin@yousafzaigroup.com'}</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/admin/login', { replace: true }); }}
            className="logout-btn"
          >
            <LogOut size={15} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="main-header">
          <div className="header-left">
            <span className="header-eyebrow">
              {activeSection === 'jobs' || activeSection === 'applications' ? 'Admin Operations' : activeSection.startsWith('eggTraders') ? 'Egg Traders Website' : 'Main Website'}
            </span>
            <h1 className="header-title">
              {allItems.find((i) => i.key === activeSection)?.label || activeSection.toUpperCase()}
            </h1>
          </div>
          <div className="header-right">
            <span
              className={`save-status save-status-${saveStatus}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {saveMessage || 'Changes save automatically'}
            </span>
            <Link to="/" target="_blank" className="live-site-btn">
              <ExternalLink size={14} />
              <span>View Main Website</span>
            </Link>
            <Link to="/egg-traders" target="_blank" className="live-site-btn et-btn">
              <Globe size={14} />
              <span>View Egg Traders Website</span>
            </Link>
          </div>
        </header>

        <div className="main-content-body">{children}</div>
      </main>

      <style>{`
        /* -----------------------------------------------
           ADMIN ROOT
           ----------------------------------------------- */
        .admin-root {
          display: flex;
          min-height: 100vh;
          background: #F4F6FB;
          color: #0F172A;
          font-family: 'Inter', sans-serif;
        }

        /* -----------------------------------------------
           MOBILE BAR
           ----------------------------------------------- */
        .admin-mobile-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: #0F172A;
          color: #FFFFFF;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .mobile-brand { display: flex; align-items: center; gap: 10px; }
        .mobile-brand-badge {
          width: 32px; height: 32px; border-radius: 9px;
          background: linear-gradient(135deg, #2563EB, #1E40AF);
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; }
        .mobile-toggle { background: none; border: none; color: #FFFFFF; cursor: pointer; display: flex; }

        /* -----------------------------------------------
           SIDEBAR
           ----------------------------------------------- */
        .admin-sidebar {
          width: 264px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #0F172A 0%, #111C33 100%);
          color: #CBD5E1;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          max-height: 100vh;
          min-height: 0;
          overflow: hidden;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 40;
          border-right: 1px solid rgba(148, 163, 184, 0.1);
        }
        .admin-sidebar.is-collapsed { width: 72px; }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 22px 20px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          flex-shrink: 0;
        }
        .brand-logo {
          width: 40px; height: 40px; border-radius: 11px;
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          display: flex; align-items: center; justify-content: center;
          color: #FFFFFF; flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);
        }
        .brand-text { display: flex; flex-direction: column; }
        .brand-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.02em;
        }
        .brand-sub {
          font-size: 10.5px; color: #9AA9C7; letter-spacing: 0; margin-top: 2px;
        }

        .sidebar-search {
          position: relative;
          margin: 16px 16px 6px;
          flex-shrink: 0;
        }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #64748B; }
        .search-input {
          width: 100%;
          padding: 9px 30px 9px 34px;
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: rgba(148, 163, 184, 0.08);
          color: #E2E8F0;
          font-size: 12.5px;
          outline: none;
          box-sizing: border-box;
        }
        .search-input::placeholder { color: #64748B; }
        .search-input:focus { border-color: #3B82F6; }
        .search-clear {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #64748B; font-size: 15px; cursor: pointer;
        }

        .sidebar-nav {
          flex-grow: 1;
          min-height: 0;
          padding: 10px 12px 16px;
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-gutter: stable;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-nav::-webkit-scrollbar { width: 6px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 3px; }

        .nav-group-label {
          font-size: 11px;
          color: #94A3B8;
          letter-spacing: 0;
          font-weight: 600;
          padding: 10px 12px 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #94A3B8;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
          position: relative;
          white-space: nowrap;
        }
        .nav-item-icon { flex-shrink: 0; color: #64748B; transition: color 0.2s; }
        .nav-item:hover { color: #E2E8F0; background: rgba(148, 163, 184, 0.1); }
        .nav-item:hover .nav-item-icon { color: #93C5FD; }
        .nav-item.is-active {
          color: #FFFFFF;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.6));
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          font-weight: 600;
        }
        .nav-item.is-active .nav-item-icon { color: #FFFFFF; }
        .nav-active-dot {
          position: absolute; right: 12px;
          width: 6px; height: 6px; border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 8px rgba(255,255,255,0.8);
        }
        .no-results { padding: 14px 12px; color: #64748B; font-size: 12px; }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(148, 163, 184, 0.12);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }
        .user-profile { display: flex; align-items: center; gap: 10px; }
        .user-avatar {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #2563EB, #1E40AF);
          color: #FFFFFF; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.28);
        }
        .user-meta { display: flex; flex-direction: column; min-width: 0; }
        .user-email {
          font-size: 12px; color: #E2E8F0; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .user-role { font-size: 10.5px; color: #34D399; letter-spacing: 0; margin-top: 2px; }

        .logout-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 9px; border-radius: 9px;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.25);
          color: #FCA5A5; font-size: 12px; font-weight: 600; cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: rgba(248, 113, 113, 0.2); color: #FECACA; }

        .collapse-btn {
          position: absolute;
          top: 24px; right: -12px;
          width: 26px; height: 26px; border-radius: 50%;
          background: #1E293B;
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #94A3B8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.25s, color 0.25s;
        }
        .collapse-btn:hover { color: #FFFFFF; transform: scale(1.08); }

        /* -----------------------------------------------
           MAIN CONTENT
           ----------------------------------------------- */
        .admin-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #F4F6FB;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 36px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E9F2;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .header-eyebrow {
          font-size: 11px;
          color: #2563EB;
          letter-spacing: 0;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }
        .header-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          color: #0F172A;
        }
        .header-right { display: flex; align-items: center; justify-content: flex-end; gap: 10px; flex-wrap: wrap; min-width: 0; }
        .save-status {
          font-size: 12px; color: #10B981; font-weight: 600;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 20px; background: #ECFDF5;
        }
        .save-status-idle {
          color: #64748B;
          background: #F8FAFC;
          border: 1px solid #E5E9F2;
        }
        .save-status-dirty {
          color: #1D4ED8;
          background: #DBEAFE;
          border: 1px solid #BFDBFE;
        }
        .save-status-saving {
          color: #1D4ED8;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
        }
        .save-status-saved {
          color: #047857;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
        }
        .save-status-error,
        .save-status-session-expired {
          color: #B91C1C;
          background: #FEF2F2;
          border: 1px solid #FECACA;
        }
        .live-site-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          color: #1D4ED8;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 8px 14px; border-radius: 9px; text-decoration: none;
          transition: all 0.2s;
        }
        .live-site-btn:hover { background: #DBEAFE; box-shadow: 0 2px 8px rgba(37,99,235,0.15); }
        .live-site-btn.et-btn {
          color: #1D4ED8;
          background: #EFF6FF;
          border-color: #BFDBFE;
          box-shadow: inset 3px 0 0 rgba(249, 115, 22, 0.36);
        }
        .live-site-btn.et-btn svg { color: #F97316; }
        .live-site-btn.et-btn:hover { background: #DBEAFE; }

        .main-content-body { flex-grow: 1; padding: 32px 36px; overflow-y: auto; min-width: 0; max-width: 100%; box-sizing: border-box; }

        /* -----------------------------------------------
           SCHEMA EDITOR STYLES
           ----------------------------------------------- */
        .cm-schema-editor {
          max-width: 960px;
        }
        .cm-field { margin-bottom: 18px; }
        .cm-field-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;
        }
        .cm-field-hint {
          font-weight: 400; font-style: normal; color: #64748B; font-size: 12px;
        }
        .cm-color-row { display: flex; gap: 10px; }
        .cm-color-swatch {
          width: 44px; height: 40px; padding: 0; border: 1.4px solid #DBDFE6;
          border-radius: 8px; cursor: pointer; background: #FFFFFF;
        }
        .cm-array {
          background: #FFFFFF;
          border: 1px solid #E5E9F2;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .cm-array-head {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .cm-array-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700; color: #0F172A;
        }
        .cm-array-head .cm-field-hint { flex: 1; }
        .cm-btn {
          border: none; cursor: pointer; font-weight: 600; border-radius: 9px;
          transition: all 0.2s;
        }
        .cm-btn-add {
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #FFFFFF; padding: 9px 16px; font-size: 12.5px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .cm-btn-add:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,0.4); }
        .cm-array-empty {
          padding: 18px; text-align: center; color: #94A3B8; font-size: 13px;
          border: 1.5px dashed #E5E9F2; border-radius: 10px;
        }
        .cm-array-item {
          background: #F8FAFC;
          border: 1px solid #E9EDF5;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .cm-array-item-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px;
          background: #F1F5F9;
          border-bottom: 1px solid #E9EDF5;
        }
        .cm-item-toggle {
          background: none; border: none; color: #64748B; font-size: 12px;
          cursor: pointer; width: 20px; text-align: center;
        }
        .cm-item-label {
          font-weight: 700; font-size: 12.5px; color: #334155; flex: 1;
          font-family: 'Space Grotesk', sans-serif;
        }
        .cm-item-actions { display: flex; gap: 6px; }
        .cm-icon-btn {
          width: 28px; height: 28px; border-radius: 7px;
          border: 1px solid #E2E8F0; background: #FFFFFF;
          color: #475569; font-size: 13px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .cm-icon-btn:hover:not(:disabled) { background: #EFF6FF; color: #1D4ED8; }
        .cm-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .cm-icon-btn-danger:hover { background: #FEF2F2; color: #DC2626; }
        .cm-array-item-body { padding: 16px 14px; }
        .cm-array-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
        .cm-array-fields > .cm-field,
        .cm-array-fields > .cm-array { grid-column: 1 / -1; }
        .cm-structure-note {
          grid-column: 1 / -1;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #64748B;
          padding: 14px;
          border-radius: 10px;
          font-size: 12.5px;
        }
        .cm-object-block {
          background: #FFFFFF; border: 1px solid #E5E9F2; border-radius: 14px;
          padding: 20px; margin-bottom: 24px;
        }
        .cm-object-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 700; color: #0F172A; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .cm-object-title::before {
          content: ''; width: 8px; height: 8px; border-radius: 2px;
          background: linear-gradient(135deg, #2563EB, #7C3AED); display: inline-block;
        }
        .cm-dirty-hint {
          position: sticky; bottom: 16px; text-align: center;
          font-size: 12px; color: #1D4ED8; font-weight: 600;
          background: #DBEAFE; border: 1px solid #BFDBFE;
          padding: 8px; border-radius: 10px; margin-top: 10px;
        }

        @media (max-width: 640px) {
          .cm-array-fields { grid-template-columns: 1fr; }
        }

        /* -----------------------------------------------
           RESPONSIVE
           ----------------------------------------------- */
        .admin-drawer-backdrop { display: none; }

        @media (max-width: 1024px) {
          .main-header { align-items: flex-start; gap: 16px; }
          .header-right { max-width: 520px; }
        }

        @media (max-width: 900px) {
          .admin-root { flex-direction: column; }
          .admin-mobile-bar { display: flex; }
          .admin-drawer-backdrop {
            display: block;
            position: fixed;
            inset: 58px 0 0 0;
            z-index: 35;
            border: 0;
            background: rgba(15, 23, 42, 0.42);
            cursor: pointer;
          }
          .admin-sidebar {
            display: flex;
            width: min(340px, 88vw);
            max-width: 100vw;
            height: calc(100vh - 58px);
            max-height: calc(100vh - 58px);
            position: fixed;
            inset: 58px auto 0 0;
            background: #0F172A;
            transform: translateX(-105%);
            transition: transform 0.24s ease;
            box-shadow: 18px 0 40px rgba(15, 23, 42, 0.24);
          }
          .admin-sidebar.mobile-open { transform: translateX(0); }
          .admin-sidebar.is-collapsed { width: min(340px, 88vw); }
          .collapse-btn { display: none; }
          .main-header { padding: 18px 20px; flex-wrap: wrap; }
          .header-right { justify-content: flex-start; max-width: 100%; }
          .main-content-body { padding: 20px; }
        }

        @media (max-width: 640px) {
          .main-header { flex-direction: column; align-items: stretch; }
          .header-title { font-size: 20px; overflow-wrap: anywhere; }
          .header-right { align-items: stretch; }
          .save-status, .live-site-btn { width: 100%; box-sizing: border-box; justify-content: center; }
          .cm-array { padding: 16px; }
          .cm-array-item-bar { align-items: flex-start; flex-wrap: wrap; }
          .cm-item-actions { width: 100%; justify-content: flex-end; }
        }
      `}</style>
    </div>
  );
}
