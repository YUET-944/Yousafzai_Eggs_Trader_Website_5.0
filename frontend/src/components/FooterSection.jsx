import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../store/useCMSStore';
import logo from '../assets/logo.svg';

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
    <footer ref={containerRef} className="footer-wrap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-grid">
          <div className="footer-brand footer-animate">
            <Link to="/" onClick={scrollToTop} className="brand">
              <div className="footer-logo-box">
                <img src={logo} alt="Yousafzai Logo" className="footer-logo" />
              </div>
            </Link>
            <p className="footer-desc">
              {footer.description}
            </p>
            <div className="social-row">
              <a href={footer.socials?.facebook || "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={footer.socials?.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-col footer-animate">
            <div className="footer-col-title">Quick Links</div>
            <Link to="/#about" onClick={scrollToTop}>About Us</Link>
            <Link to="/#products" onClick={scrollToTop}>Products</Link>
            <Link to="/#applications" onClick={scrollToTop}>Applications</Link>
            <Link to="/contact" onClick={scrollToTop}>Request a Quote</Link>
          </div>
          
          <div className="footer-col footer-animate">
            <div className="footer-col-title">Contact Us</div>
            <p className="text-sm text-gray-500 mb-2">Email: {footer.email}</p>
            <p className="text-sm text-gray-500 mb-2">Phone: {footer.phone}</p>
            <p className="text-sm text-gray-500">{footer.address}</p>
          </div>
        </div>
        
        <div className="footer-bottom footer-animate">
          <span>{footer.copyright}</span>
          <div className="footer-bottom-right">
            <div className="footer-meta">
              <span className="developer-credit">
                <span className="developer-credit-muted">Designed and developed by</span>
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
        footer { background: #EEF2E6; color: rgba(20,20,20,0.72); padding: 80px 0 0; position: relative; }
        .footer-grid { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 50px; padding-bottom: 60px; border-bottom: 1px solid rgba(63,98,49,0.15); }
        .footer-brand { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .footer-brand .brand-name { color: #111111; }
        .brand { display: flex; align-items: center; justify-content: center; }
        
        .footer-logo-box {
          background: rgba(63, 98, 49, 0.92);
          border-radius: 12px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(63, 98, 49, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .brand:hover .footer-logo-box {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(63, 98, 49, 0.3);
        }

        .footer-logo {
          height: 50px;
          width: auto;
          max-width: none;
          display: block;
          object-fit: contain;
        }
        .footer-desc { font-size: 13.5px; color: rgba(20,20,20,0.65); margin-top: 24px; line-height: 1.7; max-width: 320px; text-align: center; }
        
        .footer-col { display: flex; flex-direction: column; align-items: center; }
        .footer-col-title { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #111111; margin-bottom: 24px; text-align: center; }
        .footer-col a { display: block; font-size: 13.5px; color: rgba(20,20,20,0.62); margin-bottom: 14px; transition: color .25s, transform .25s; text-align: center; }
        .footer-col a:hover { color: #B9320D; transform: translateX(4px); }
        
        .social-row { display: flex; justify-content: center; gap: 12px; margin-top: 28px; }
        .social-row a { width: 36px; height: 36px; border-radius: 50%; background: #E8CBAE; color: #8C4724; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .social-row a:hover { background: #DE510A; color: #ffffff; transform: translateY(-3px); box-shadow: 0 4px 12px rgba(222,81,10,0.3); }
        
        .footer-bottom { padding: 30px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12.5px; color: rgba(20,20,20,0.5); }
        .footer-bottom-right { display: flex; align-items: center; gap: 20px; }
        .footer-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; line-height: 1.45; }
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
