import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import logo from '../../assets/internallogo-navbar.png';

const navLinks = [
  { path: '/egg-traders/about', label: 'About' },
  { path: '/egg-traders/products', label: 'Products' },
  { path: '/egg-traders/process', label: 'Process' },
  { path: '/egg-traders/quality', label: 'Quality' },
  { path: '/egg-traders/contact', label: 'Contact' },
];

export default function EggTradersNavbar({ scrolled, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, setMobileOpen]);

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`et-nav-glass ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="et-nav-container">
          <Link
            to="/egg-traders"
            className="et-nav-brand"
            aria-label="Yousafzai Egg Traders"
            onClick={() => setMobileOpen(false)}
          >
            <span className="et-logo-mark" aria-hidden="true">
              <img src={logo} alt="Yousafzai Egg Traders logo" className="et-logo-mark-img" />
            </span>
          </Link>

          {/* Nav Links */}
          <div className="et-nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`et-nav-link-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span className={`et-nav-underline ${isActive(link.path) ? 'is-active' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="et-nav-actions">
            <Link to="/egg-traders/contact" className="et-cta-gold">
              <span>Request a Quote</span>
              <ArrowRight size={14} className="cta-arrow" />
            </Link>

            <Link to="/" className="et-main-site-btn">
              <ExternalLink size={13} />
              <span>Main website</span>
            </Link>

            <button
              className="et-mobile-toggle"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} color="#FFFFFF" /> : <Menu size={20} color="#FFFFFF" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="et-mobile-drawer" onClick={() => setMobileOpen(false)}>
          <div className="et-mobile-nav-list">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="et-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/egg-traders/contact"
              className="et-mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              <span>Request a Quote</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/"
              className="et-mobile-secondary"
              onClick={() => setMobileOpen(false)}
            >
              Main website
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .et-nav-glass {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          --et-nav-pad-y: 18px;
          padding: var(--et-nav-pad-y) 0;
          background: rgba(0, 27, 77, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .et-nav-glass.is-scrolled {
          --et-nav-pad-y: 12px;
          background: rgba(0, 27, 77, 0.96);
          border-bottom-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 10px 30px rgba(0, 27, 77, 0.35);
        }

        .et-nav-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
        }

        .et-nav-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex: 0 0 auto;
          min-width: 0;
          line-height: 0;
        }

        .et-logo-mark {
          width: clamp(128px, 14vw, 200px);
          min-width: 128px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          flex: 0 0 auto;
          position: relative;
        }

        .et-logo-mark-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 52px;
          object-fit: contain;
          object-position: center;
          transition: transform .25s ease;
        }

        .et-nav-brand:hover .et-logo-mark-img { transform: scale(1.02); }

        .et-nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
          min-width: 0;
        }

        .et-nav-link-item {
          position: relative;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.82);
          padding: 6px 0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .et-nav-link-item:hover, .et-nav-link-item.active {
          color: #FFFFFF;
        }

        .et-nav-underline {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #D0DEBB;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .et-nav-link-item:hover .et-nav-underline,
        .et-nav-underline.is-active {
          width: 100%;
        }

        .et-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 0 0 auto;
        }

        .et-cta-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          padding: 10px 22px;
          border-radius: 12px;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          color: #FFFFFF;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 8px 24px rgba(185, 50, 13, 0.3);
        }

        .et-cta-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(185, 50, 13, 0.42);
        }

        .et-main-site-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 9px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .et-main-site-btn:hover {
          color: #FFFFFF;
          border-color: rgba(255,255,255,0.42);
          background: rgba(255,255,255,0.14);
        }

        .et-mobile-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .et-mobile-toggle:focus-visible,
        .et-cta-gold:focus-visible,
        .et-main-site-btn:focus-visible,
        .et-nav-link-item:focus-visible {
          outline: 3px solid rgba(208, 222, 187, 0.9);
          outline-offset: 3px;
        }

        .et-mobile-drawer {
          position: fixed;
          inset: 0;
          background: rgba(0, 27, 77, 0.98);
          backdrop-filter: blur(24px);
          z-index: 480;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          overflow-y: auto;
        }

        .et-mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          max-width: 320px;
        }

        .et-mobile-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        .et-mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          color: #ffffff;
          text-decoration: none;
          margin-top: 16px;
        }

        .et-mobile-secondary {
          color: rgba(255,255,255,0.76);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        @media (min-width: 961px) and (max-width: 1180px) {
          .et-nav-container { padding: 0 24px; gap: 16px; }
          .et-nav-links-desktop { gap: 18px; }
          .et-nav-link-item { font-size: 12.8px; }
          .et-cta-gold { padding: 9px 16px; font-size: 12.5px; }
          .et-main-site-btn { display: none; }
        }

        @media (max-width: 960px) {
          .et-nav-links-desktop { display: none; }
          .et-mobile-toggle { display: flex; }
          .et-nav-actions { margin-left: auto; gap: 10px; }
          .et-cta-gold { padding: 9px 15px; font-size: 12.5px; white-space: nowrap; }
          .et-logo-mark { width: 46px; height: 46px; flex-basis: 46px; }
          .et-logo-mark-img { height: 46px; transform: translateX(-112px); }
          .et-nav-brand:hover .et-logo-mark-img { transform: translateX(-112px) scale(1.03); }
          .et-brand-primary { font-size: 17px; }
          .et-brand-secondary { font-size: 7.2px; margin-left: 33px; }
        }

        @media (max-width: 480px) {
          .et-nav-glass { --et-nav-pad-y: 14px; }
          .et-nav-glass.is-scrolled { --et-nav-pad-y: 10px; }
          .et-nav-container { padding: 0 16px; }
          .et-logo-mark { width: 36px; height: 36px; flex-basis: 36px; }
          .et-logo-mark-img { height: 36px; transform: translateX(-87px); }
          .et-nav-brand:hover .et-logo-mark-img { transform: translateX(-87px) scale(1.03); }
          .et-brand-primary { font-size: 15px; }
          .et-brand-secondary { font-size: 6.4px; margin-left: 29px; }
          .et-main-site-btn { display: none; }
          .et-cta-gold {
            padding: 8px 10px;
            min-height: 36px;
            font-size: 11.5px;
            border-radius: 10px;
          }
          .et-cta-gold .cta-arrow { width: 12px; height: 12px; }
          .et-mobile-toggle { width: 36px; height: 36px; border-radius: 10px; flex: 0 0 36px; }
        }

        @media (max-width: 640px) {
          .et-main-site-btn {
            display: none;
          }
          .et-cta-gold {
            display: none;
          }
        }

        @media (max-width: 380px) {
          .et-nav-container { padding: 0 10px; gap: 8px; }
          .et-nav-actions { gap: 6px; }
          .et-logo-mark { width: 34px; height: 34px; flex-basis: 34px; }
          .et-logo-mark-img { height: 34px; transform: translateX(-82px); }
          .et-nav-brand:hover .et-logo-mark-img { transform: translateX(-82px) scale(1.03); }
          .et-brand-primary { font-size: 14px; }
          .et-brand-secondary { font-size: 6px; margin-left: 27px; }
        }
      `}</style>
    </>
  );
}
