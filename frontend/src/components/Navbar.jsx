import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useCMSStore } from '../store/useCMSStore';
import { useQuoteModalStore } from '../store/useQuoteModalStore';

export default function Navbar() {
  const company = useCMSStore((s) => s.company) || {};
  const openQuoteModal = useQuoteModalStore((s) => s.openModal);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    setScrolled(!isHome);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/our-journey', label: 'Our Journey' },
    { path: '/our-team', label: 'Our Team' },
    { path: '/products', label: 'Our Products' },
    { path: '/process', label: 'Our Process' },
    { path: '/quality', label: 'Quality' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`nav-glass ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-brand" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt={company.name ? `${company.name} logo` : 'Yousafzai Eggs Traders logo'}
              className="nav-logo"
            />
          </Link>

          {/* Nav Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span className={`nav-link-underline ${isActive(link.path) ? 'is-active' : ''}`} />
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="nav-actions">
            <button
              type="button"
              className="nav-cta-btn"
              onClick={() => {
                setMobileOpen(false);
                openQuoteModal();
              }}
            >
              <span>Request Quote</span>
              <ArrowRight size={14} className="cta-arrow" />
            </button>

            <button
              className="nav-mobile-toggle"
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} color="#FFFFFF" /> : <Menu size={20} color="#FFFFFF" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-nav-list">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              className="mobile-cta"
              onClick={() => {
                setMobileOpen(false);
                openQuoteModal();
              }}
            >
              <span>Request Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* ═══════════════════════════════════════
           NAVBAR GLASS STYLING
           ═══════════════════════════════════════ */
        .nav-glass {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          --nav-pad: 20px;
          padding: var(--nav-pad) 0;
          background: rgba(63, 98, 49, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(222, 81, 10, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-glass.is-scrolled {
          --nav-pad: 8px;
          padding: var(--nav-pad) 0;
          background: rgba(44, 71, 36, 0.96);
          border-bottom-color: rgba(222, 81, 10, 0.5);
          box-shadow: 0 10px 30px rgba(63, 98, 49, 0.35);
        }

        .nav-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex: 0 0 auto;
        }

        .nav-logo {
          height: 52px;
          width: auto;
          max-width: none;
          display: block;
          flex-shrink: 0;
          object-fit: contain;
          transition: height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s;
          filter: drop-shadow(0 10px 18px rgba(0,0,0,0.18));
        }

        .nav-glass.is-scrolled .nav-logo {
          height: 42px;
        }

        .nav-brand:hover .nav-logo {
          transform: translateY(-1px) scale(1.02);
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .nav-link-item {
          position: relative;
          color: rgba(255, 255, 255, 0.88);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          white-space: nowrap;
          padding: 6px 0;
          transition: color 0.25s ease;
        }

        .nav-link-item:hover,
        .nav-link-item.active {
          color: #FFFFFF;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #DE510A;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-link-item:hover .nav-link-underline,
        .nav-link-underline.is-active {
          transform: scaleX(1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #DE510A;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(222, 81, 10, 0.3);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-cta-btn:hover {
          background: #C44305;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(222, 81, 10, 0.45);
        }

        .cta-arrow {
          transition: transform 0.25s ease;
        }

        .nav-cta-btn:hover .cta-arrow {
          transform: translateX(3px);
        }

        .nav-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-drawer {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: rgba(44, 71, 36, 0.98);
          backdrop-filter: blur(24px);
          padding: 24px;
          border-bottom: 1px solid rgba(222, 81, 10, 0.4);
          z-index: 499;
          animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-link {
          color: rgba(255, 255, 255, 0.85);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
        }

        .mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: #DE510A;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 8px;
        }

        @media (max-width: 1080px) {
          .nav-links-desktop {
            gap: 14px;
          }
          .nav-link-item {
            font-size: 13px;
          }
        }

        @media (max-width: 960px) {
          .nav-links-desktop {
            display: none;
          }
          .nav-cta-btn {
            display: none;
          }
          .nav-mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
