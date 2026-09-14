import { Link } from 'react-router-dom';
import logo from '../../assets/internallogo-navbar.png';
import { useCMSStore } from '../../store/useCMSStore';

export default function EggTradersFooter() {
  const company = useCMSStore((s) => s.company) || {};
  const footer = useCMSStore((s) => s.footer) || {};
  const companyName = company.name || 'Yousafzai Eggs Traders';
  const locations = (footer.locations || 'Mardan · Attock · Peshawar').replace(/\bMalakand\b/g, 'Peshawar');

  const linkStyle = {
    display: 'block',
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.72)',
    marginBottom: 12,
    textDecoration: 'none',
  };

  return (
    <footer style={{ background: 'linear-gradient(180deg, #001B4D 0%, #00285E 100%)', color: 'rgba(255,255,255,0.82)', padding: '60px 0 0', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="container">
        <div className="et-footer-grid">
          <div>
            <Link to="/egg-traders" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, textDecoration: 'none' }}>
              <img src={logo} alt={`${companyName} logo`} style={{ height: 56, width: 'auto', maxWidth: '100%', objectFit: 'contain', flexShrink: 0, display: 'block' }} />
            </Link>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, maxWidth: 320 }}>
              A {companyName} company. Connecting verified poultry farms to commercial buyers with transparency and efficiency.
            </p>
          </div>
          <div>
            <div className="et-f-col-title">Company</div>
            <Link to="/egg-traders/about" style={linkStyle}>About</Link>
            <Link to="/egg-traders/products" style={linkStyle}>Products & Grades</Link>
            <Link to="/egg-traders/contact" style={linkStyle}>Contact</Link>
          </div>
          <div>
            <div className="et-f-col-title">Website</div>
            <Link to="/egg-traders/process" style={linkStyle}>How it works</Link>
            <Link to="/egg-traders/quality" style={linkStyle}>Quality</Link>
          </div>
          <div>
            <div className="et-f-col-title">Our group</div>
            <Link to="/" style={linkStyle}>{companyName}</Link>
            <Link to="/egg-traders" style={linkStyle}>Egg Traders</Link>
          </div>
        </div>
        <div className="et-footer-bottom">
          <span>Copyright 2026 {company.name} {company.sub}. All rights reserved.</span>
          <div className="et-footer-meta">
            <span>{locations}</span>
            <span className="et-developer-credit">
              <span className="et-developer-credit-muted">Designed and developed by</span>
              <span className="et-developer-credit-name">Algohub</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .et-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 50px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.14); }
        .et-f-col-title { font-size: 13px; font-weight: 700; letter-spacing: 0; color: #FFFFFF; margin-bottom: 20px; }
        .et-footer-bottom { padding: 26px 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; font-size: 12.5px; color: rgba(255,255,255,0.55); }
        .et-footer-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; line-height: 1.45; }
        .et-developer-credit { display: inline-flex; align-items: baseline; gap: 5px; color: rgba(255,255,255,0.58); }
        .et-developer-credit-muted { font-size: 11.5px; }
        .et-developer-credit-name {
          position: relative;
          color: #D0DEBB;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 650;
          transition: color .25s ease, transform .25s ease;
        }
        .et-developer-credit-name::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 1px;
          background: currentColor;
          transform: scaleX(.35);
          transform-origin: right;
          opacity: .45;
          transition: transform .25s ease, opacity .25s ease;
        }
        .et-developer-credit:hover .et-developer-credit-name { color: #FFFFFF; transform: translateY(-1px); }
        .et-developer-credit:hover .et-developer-credit-name::after { transform: scaleX(1); opacity: .75; }
        footer a:focus-visible { outline: 3px solid rgba(208,222,187,0.7); outline-offset: 3px; border-radius: 6px; }
        @media (max-width: 1080px) { .et-footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
        @media (max-width: 640px) { .et-footer-grid { grid-template-columns: 1fr; gap: 28px; } .et-footer-bottom { flex-direction: column; align-items: center; text-align: center; line-height: 1.6; } .et-footer-meta { align-items: center; } }
      `}</style>
    </footer>
  );
}
