import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EggTradersNavbar from './EggTradersNavbar';
import EggTradersFooter from './EggTradersFooter';
import FloatingSocials from '../FloatingSocials';

export default function EggTradersLayout({ noFooter }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/egg-traders';

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setScrolled(!isHome);
    const onScroll = () => {
      setScrolled(window.scrollY > 40 || !isHome);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#FFFFFF', color: '#111111', lineHeight: 1.65, overflowX: 'hidden' }}>
      <EggTradersNavbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="et-page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      {!noFooter && <EggTradersFooter />}
      <FloatingSocials />

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: 28, right: 28, width: 48, height: 48, borderRadius: '50%',
          background: '#0047BB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 14px 36px rgba(0,71,187,0.3)', border: '1px solid rgba(0,71,187,0.35)',
          opacity: showTop ? 1 : 0, transform: showTop ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity .3s, transform .3s', zIndex: 300,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <style>{`
        .et-page-enter { animation: etFadeIn .6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes etFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        ::selection { background: #DE510A; color: #ffffff; }
        section { padding: 96px 0; position: relative; scroll-margin-top: 82px; }
        .section-alt { background: linear-gradient(180deg, #FFFFFF 0%, #F5F7FB 100%); }
        .container { width: min(100% - 64px, 1240px); margin: 0 auto; padding-left: 0 !important; padding-right: 0; box-sizing: border-box; }
        .sec-head { text-align: center; margin-left: auto; margin-right: auto; max-width: 720px; margin-bottom: 48px; background: #FFFFFF; border: 1px solid rgba(0,71,187,0.14); border-top: 3px solid #0047BB; border-radius: 20px; padding: 30px 34px; box-shadow: 0 18px 44px rgba(0,71,187,0.1); }
        .sec-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        .sec-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(1.9rem,3vw,2.7rem); color: #001B4D; line-height: 1.18; letter-spacing: -0.01em; }
        .sec-sub { font-size: 15.5px; color: rgba(20,20,20,0.72); margin-top: 16px; line-height: 1.75; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .reveal-stagger > * { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
        .reveal-stagger.in > *:nth-child(1) { transition-delay: .05s; }
        .reveal-stagger.in > *:nth-child(2) { transition-delay: .12s; }
        .reveal-stagger.in > *:nth-child(3) { transition-delay: .19s; }
        .reveal-stagger.in > *:nth-child(4) { transition-delay: .26s; }
        .reveal-stagger.in > *:nth-child(5) { transition-delay: .33s; }
        .reveal-stagger.in > *:nth-child(6) { transition-delay: .40s; }
        .btn-navy { background: linear-gradient(135deg,#0047BB,#003399); color: #ffffff; padding: 13px 26px; border-radius: 9px; border: 1px solid rgba(0,71,187,0.4); cursor: pointer; font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1); }
        .btn-navy:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(0,71,187,0.35); }
        .btn-outline { border: 1.5px solid rgba(20,20,20,0.35); color: #001B4D; background: rgba(0,71,187,0.06); backdrop-filter: blur(4px); padding: 13px 26px; border-radius: 9px; cursor: pointer; font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
        .btn-outline:hover { background: rgba(0,71,187,0.14); border-color: #0047BB; }
        @media (max-width: 860px) { section { padding: 76px 0 !important; } .sec-head { margin-bottom: 38px; } }
        @media (max-width: 640px) { .container { width: min(100% - 40px, 1240px); } section { padding: 60px 0 !important; } }
        @media (max-width: 420px) { .container { width: min(100% - 28px, 1240px); } section { padding: 48px 0 !important; } .sec-head { padding: 20px 16px !important; margin-bottom: 28px !important; border-radius: 16px; } .sec-title { font-size: clamp(1.4rem,4.5vw,1.7rem) !important; } .sec-sub { font-size: 13px !important; } }
      `}</style>
    </div>
  );
}
