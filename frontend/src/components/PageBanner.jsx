import { useEffect, useRef, useState } from 'react';

function BannerSlideshow({ images }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="banner-slideshow">
      {images.map((src, idx) => (
        <div 
          key={idx} 
          className={`slide-img ${idx === current ? 'active' : ''}`} 
          style={{ backgroundImage: `url(${src})` }} 
        />
      ))}
    </div>
  );
}

export default function PageBanner({ title, subtitle, fullScreen = false, slideshowImages, hideBreadcrumb = false, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal-up').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <header className={`page-hero ${fullScreen ? 'fullscreen' : ''}`}>
        
        <BannerSlideshow images={
          slideshowImages && slideshowImages.length > 0 
            ? (slideshowImages.includes('/images/client-final/processing-line-product.png') ? slideshowImages : ['/images/client-final/processing-line-product.png', ...slideshowImages])
            : ['/images/client-final/processing-line-product.png']
        } />
        <div className="page-hero-bg" />
        
        <div className="banner-glow" />
        <div className="banner-glow b" />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero-content reveal-up">
            {!hideBreadcrumb && (
              <div className="breadcrumb">
                <span>Home</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="current">{title}</span>
              </div>
            )}
            <h1 className="page-hero-title">{title}</h1>
            {subtitle && <p className="page-hero-sub">{subtitle}</p>}
            {children && <div className="page-hero-extra">{children}</div>}
          </div>
        </div>
        
        {/* Bottom fade into the next section */}
        <div className="banner-bottom-fade"></div>
      </header>
      <style>{`
        .page-hero {
          position: relative;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 160px 0 100px;
          overflow: hidden;
          background-color: #FBF7F0;
        }
        .page-hero.fullscreen {
          min-height: 100vh;
        }
        
        /* Slideshow */
        .banner-slideshow { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .banner-slideshow .slide-img { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 2s, transform 8s; transform: scale(1.05); filter: grayscale(15%); }
        .banner-slideshow .slide-img.active { opacity: 0.4; transform: scale(1); }

        .page-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 100% at 50% 0%, rgba(222,81,10,0.35) 0%, rgba(251,247,240,0.8) 55%, rgba(251,247,240,1) 100%);
          z-index: 1;
        }
        .page-hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(63,98,49,0.12) 1px, transparent 0);
          background-size: 34px 34px;
        }
        
        .banner-bottom-fade { position: absolute; bottom: 0; left: 0; width: 100%; height: 120px; background: linear-gradient(to bottom, transparent, #FBF7F0); z-index: 1; }

        /* Glows (static) */
        .banner-glow {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(185,50,13,0.16), transparent 70%);
          top: -150px; left: -100px; filter: blur(10px); z-index: 1;
        }
        .banner-glow.b {
          width: 400px; height: 400px; background: radial-gradient(circle, rgba(185,50,13,0.12), transparent 70%);
          bottom: -100px; right: -100px; top: auto; left: auto;
        }

        .page-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-hero-title {
          font-family: 'Space Grotesk',sans-serif;
          font-weight: 700;
          font-size: clamp(3rem, 5vw, 4.5rem);
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          filter: drop-shadow(0 10px 30px rgba(63,98,49,0.25));
        }
        .page-hero-sub {
          font-size: 18px;
          color: rgba(20,20,20,0.78);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .page-hero-extra {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        
        .breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(20,20,20,0.55);
          margin-bottom: 32px;
          background: rgba(222,81,10,0.35);
          border: 1px solid rgba(185,50,13,0.35);
          padding: 8px 24px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
        }
        .breadcrumb span.current { color: #B9320D; }
        .breadcrumb svg { opacity: 0.4; }

        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
        }
        .reveal-up.in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 860px) {
          .page-hero { min-height: 280px; padding: 120px 0 60px; }
          .page-hero-title { font-size: 3rem; }
          .page-hero-sub { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
