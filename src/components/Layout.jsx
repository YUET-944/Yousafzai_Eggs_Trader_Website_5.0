import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

export default function Layout() {
  const [showBackTop, setShowBackTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('[data-ripple]');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Navbar />
      <main className="page-enter">
        <Outlet />
      </main>
      <FooterSection />

      <div className={`back-top ${showBackTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>

      <style>{`
        section { padding: 120px 0; position: relative; scroll-margin-top: 100px; }
        .page-enter { animation: pageFadeIn .6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes pageFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .ripple { position: absolute; border-radius: 50%; background: rgba(20,20,20,0.35); transform: scale(0); animation: rippleAnim .6s ease-out; pointer-events: none; }
        @keyframes rippleAnim { to { transform: scale(3.2); opacity: 0; } }
        .back-top { position: fixed; bottom: 28px; right: 28px; width: 48px; height: 48px; border-radius: 50%; background: #DE510A; border: 1px solid rgba(185,50,13,0.5); backdrop-filter: blur(12px); color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 14px 36px rgba(63,98,49,0.25); opacity: 0; transform: translateY(10px); transition: opacity .3s, transform .3s, background .3s; z-index: 300; }
        .back-top.show { opacity: 1; transform: translateY(0); }
        .back-top:hover { background: #B9320D; color: #ffffff; }
        .tag-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 11.5px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #B9320D; margin-bottom: 16px; }
        .tag-eyebrow::before { content: ''; width: 22px; height: 1.6px; background: #B9320D; }
        .sec-head { text-align: center; margin-left: auto; margin-right: auto; margin-bottom: 56px; background: #ffffff; border: 1px solid rgba(63,98,49,0.45); border-top: 4px solid #3F6231; border-radius: 24px; padding: 36px 40px; box-shadow: 0 20px 50px rgba(63,98,49,0.12); }
        .sec-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        .sec-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(1.9rem,3vw,2.7rem); color: #3F6231; line-height: 1.18; letter-spacing: -0.01em; }
        .sec-sub { font-size: 15.5px; color: rgba(20,20,20,0.68); margin-top: 16px; line-height: 1.75; max-width: 720px; margin-left: auto; margin-right: auto; }
        @media (max-width: 640px) {
          .sec-head { padding: 28px 20px; margin-bottom: 40px; border-radius: 16px; }
          .sec-sub { font-size: 14.5px; }
          section { padding: 84px 0 !important; scroll-margin-top: 80px; }
        }
        @media (max-width: 420px) {
          .sec-head { padding: 24px 16px; border-radius: 14px; }
          .sec-sub { font-size: 13.5px; }
          section { padding: 64px 0 !important; }
        }
      `}</style>
    </>
  );
}
