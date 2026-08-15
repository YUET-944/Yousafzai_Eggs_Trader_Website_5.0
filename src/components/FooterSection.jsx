import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const company = useCMSStore((s) => s.company);
  const footer = useCMSStore((s) => s.footer);
  const containerRef = useRef(null);
  const footerLocations = (footer.locations || '').replace(/\bMalakand\b/g, 'Peshawar');

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.footer-animate', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: 'footer', start: 'top 95%', once: true }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand footer-animate">
            <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
              <div className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.6" width="22" height="22">
                  <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-name">{company.name}</span>
                <span className="brand-sub">{company.sub}</span>
              </div>
            </Link>
            <p className="footer-desc">{company.tagline}</p>
            <div className="social-row">
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.5.3v2.7h-1.7c-1.3 0-1.6.6-1.6 1.5V12h2.9l-.5 2.9h-2.4v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.3 18V9.7H5.7V18h2.6zM7 8.6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.3 18v-4.6c0-2.5-1.3-3.6-3-3.6-1.4 0-2 .8-2.4 1.3V9.7H10.3c0 .3 0 8.3 0 8.3h2.6v-4.6c0-.3 0-.5.1-.7.2-.6.8-1.2 1.7-1.2 1.2 0 1.7.9 1.7 2.2V18h2.6z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5.7 6.4l-1.6 7.5c-.1.6-.4.7-.9.5l-2.5-1.8-1.2 1.2c-.1.1-.3.2-.4.2l.2-2.5 4.6-4.1c.2-.2 0-.3-.2-.1l-5.6 3.6-2.4-.8c-.5-.2-.5-.5.1-.7l9.4-3.6c.4-.2.8.1.5.6z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col footer-animate">
            <div className="footer-col-title">Company</div>
            {footer.quickLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-col footer-animate">
            <div className="footer-col-title">Solutions</div>
            {footer.solutionsLinks && footer.solutionsLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-col footer-animate">
            <div className="footer-col-title">Resources</div>
            {footer.resourcesLinks.map((link, i) => (
              <Link key={i} to={link.href}>{link.label}</Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom footer-animate">
          <span>{footer.copyright}</span>
          <div className="footer-bottom-right">
            <div className="footer-meta">
              <span>{footerLocations}</span>
              <span className="developer-credit">
                <span className="developer-credit-muted">Developed by</span>
                <span className="developer-credit-name">Algohub</span>
              </span>
            </div>
            <button onClick={scrollToTop} className="back-to-top" aria-label="Scroll to top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        footer { background: linear-gradient(180deg, #FBF7F0 0%, #E3EAD8 100%); color: rgba(20,20,20,0.72); padding: 80px 0 0; position: relative; border-top: 1px solid rgba(63,98,49,0.18); }
        .footer-grid { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 50px; padding-bottom: 60px; border-bottom: 1px solid rgba(63,98,49,0.2); }
        .footer-brand { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .footer-brand .brand-name { color: #111111; }
        .brand { display: flex; align-items: center; justify-content: center; gap: 12px; }
        
        .brand-mark { 
          width: 42px; height: 42px; border-radius: 12px; 
          background: linear-gradient(145deg,#DE510A,#B9320D); 
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; 
          box-shadow: 0 6px 16px rgba(185,50,13,0.35); 
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .brand:hover .brand-mark {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(185,50,13,0.45);
        }
        
        .brand-text { display: flex; flex-direction: column; line-height: 1.1; text-align: left; transition: transform 0.3s ease; }
        .brand:hover .brand-text { transform: translateX(2px); }
        .brand-name { font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .02em; color: #111111; }
        .brand-sub { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: #B9320D; font-weight: 600; }
        .footer-desc { font-size: 13.5px; color: rgba(20,20,20,0.55); margin-top: 18px; line-height: 1.7; max-width: 300px; text-align: center; }
        
        .footer-col { display: flex; flex-direction: column; align-items: center; }
        .footer-col-title { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #111111; margin-bottom: 20px; text-align: center; }
        .footer-col a { display: block; font-size: 13.5px; color: rgba(20,20,20,0.62); margin-bottom: 12px; transition: color .25s, transform .25s; text-align: center; }
        .footer-col a:hover { color: #B9320D; transform: translateX(4px); }
        
        .social-row { display: flex; justify-content: center; gap: 10px; margin-top: 22px; }
        .social-row a { width: 36px; height: 36px; border-radius: 50%; background: rgba(222,81,10,0.4); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .social-row a:hover { background: #B9320D; color: #ffffff; transform: translateY(-3px); box-shadow: 0 4px 12px rgba(185,50,13,0.35); }
        
        .footer-bottom { padding: 26px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12.5px; color: rgba(20,20,20,0.5); }
        .footer-bottom-right { display: flex; align-items: center; gap: 20px; }
        .footer-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; line-height: 1.45; }
        .developer-credit { display: inline-flex; align-items: baseline; gap: 5px; color: rgba(20,20,20,0.48); }
        .developer-credit-muted { font-size: 11.5px; }
        .developer-credit-name {
          position: relative;
          color: #B9320D;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 650;
          transition: color .25s ease, transform .25s ease;
        }
        .developer-credit-name::after {
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
        .developer-credit:hover .developer-credit-name { color: #DE510A; transform: translateY(-1px); }
        .developer-credit:hover .developer-credit-name::after { transform: scaleX(1); opacity: .7; }
        
        .back-to-top {
          background: rgba(222,81,10,0.5);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-to-top:hover {
          background: #B9320D;
          color: #ffffff;
          transform: translateY(-2px);
        }
        .back-to-top:active {
          transform: translateY(0);
        }
        
        @media (min-width: 860px) {
          .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; align-items: start; text-align: left; }
          .footer-brand { align-items: flex-start; text-align: left; }
          .brand { justify-content: flex-start; }
          .footer-desc { text-align: left; }
          .footer-col { align-items: flex-start; }
          .footer-col-title { text-align: left; }
          .footer-col a { text-align: left; }
          .social-row { justify-content: flex-start; }
        }
        @media (max-width: 1080px) and (min-width: 860px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) {
          .footer-bottom { justify-content: center; text-align: center; }
          .footer-bottom-right { justify-content: center; }
          .footer-meta { align-items: center; }
        }
      `}</style>
    </footer>
  );
}
