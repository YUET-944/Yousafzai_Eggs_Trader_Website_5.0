import { useEffect, useRef } from 'react';

const DEFAULT_HERO_IMAGE = '/images/white-eggs-product.webp';

export default function EggTradersPageBanner({
  title,
  subtitle,
  image = DEFAULT_HERO_IMAGE,
  imagePosition = 'center 58%',
}) {
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
    el.querySelectorAll('.et-banner-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <header className="et-page-hero">
        <div className="et-page-hero-media" aria-hidden="true">
          <img src={(image || DEFAULT_HERO_IMAGE) + ((image || DEFAULT_HERO_IMAGE).includes('?') ? '' : '?v=20260917')} alt="" style={{ objectPosition: imagePosition }} />
        </div>
        <div className="et-page-hero-bg" />
        <div className="et-page-hero-inner">
          <div className="et-page-hero-content et-banner-reveal">
            <h1 className="et-page-hero-title">{title}</h1>
            {subtitle && <p className="et-page-hero-sub">{subtitle}</p>}
          </div>
        </div>
      </header>
      <style>{`
        .et-page-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 102px 24px 64px;
          overflow: hidden;
          background-color: #001B4D;
          box-sizing: border-box;
          text-align: center;
        }
        .et-page-hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          transform: scale(1.015);
        }
        .et-page-hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(94%) contrast(106%);
        }
        .et-page-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg, rgba(0,27,77,0.58) 0%, rgba(0,27,77,0.36) 45%, rgba(0,27,77,0.62) 100%),
            radial-gradient(80% 70% at 50% 36%, rgba(0,71,187,0.22) 0%, rgba(0,27,77,0.16) 54%, rgba(0,27,77,0.5) 100%);
        }
        .et-page-hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.13) 1px, transparent 0);
          background-size: 34px 34px;
          opacity: .18;
        }
        .et-page-hero::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 78px;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(245,247,251,0), rgba(245,247,251,0.74));
        }
        .et-page-hero-inner {
          position: relative;
          z-index: 2;
          width: min(100%, 860px);
          margin: 0 auto;
        }
        .et-page-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .et-page-hero-title {
          font-family: 'Space Grotesk',sans-serif;
          font-weight: 700;
          font-size: clamp(42px, 6vw, 76px);
          color: #FFFFFF;
          line-height: 1.02;
          letter-spacing: 0;
          margin: 0 0 20px;
          text-shadow: 0 16px 42px rgba(0,0,0,0.38);
        }
        .et-page-hero-sub {
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255,255,255,0.9);
          max-width: 690px;
          line-height: 1.7;
          margin: 0;
          text-shadow: 0 10px 28px rgba(0,0,0,0.38);
        }
        .et-banner-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .et-banner-reveal.in { opacity: 1; transform: translateY(0); }
        @media (max-width: 860px) {
          .et-page-hero {
            padding: 88px 18px 50px;
          }
          .et-page-hero-title {
            font-size: clamp(38px, 10vw, 54px);
          }
          .et-page-hero-sub {
            font-size: 16px;
            max-width: 34ch;
          }
        }
        @media (max-width: 420px) {
          .et-page-hero {
            padding: 78px 16px 42px;
          }
          .et-page-hero-title {
            font-size: clamp(34px, 10vw, 42px);
          }
          .et-page-hero-sub {
            font-size: 14.5px;
          }
        }
      `}</style>
    </div>
  );
}
