import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';
import { Store, Factory, ChefHat, Truck } from 'lucide-react';

function Counter({ end, suffix }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove '+' or ',' to parse correctly, we will just parse float and put suffix back.
            // But the current store might have '1000' and suffix '+'
            const target = parseInt(end, 10);
            const dur = 1500; // 1.5s
            const startTime = performance.now();
            function step(now) {
              const progress = Math.min((now - startTime) / dur, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(step);
              else setCount(target);
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {count >= 1000 ? (count / 1000).toFixed(count % 1000 !== 0 ? 1 : 0) + 'K' : count}{suffix}
    </span>
  );
}

const slideImages = [
  'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=1920&q=80', // Farm
  'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=1920&q=80', // Processing
  'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=1920&q=80', // Eggs
];

function HeroSlideshow({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 6000); // change every 6 seconds
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="hero-slideshow">
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`slide-img ${idx === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="slide-overlay" />
    </div>
  );
}

export default function HeroSection() {
  const hero = useCMSStore((s) => s.hero);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const visual = el.querySelector('.hero-visual');
    if (!visual) return;
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      visual.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <header className="hero hero-enter" id="home" ref={heroRef}>
        <HeroSlideshow images={hero.backgroundImage ? [hero.backgroundImage] : slideImages} />
        <div className="hero-glow" />
        <div className="hero-glow b" />
        
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {hero.eyebrow}
            </div>
            <h1>
              {hero.h1Line1}<br />Built for <em>{hero.h1Highlight}</em>
            </h1>
            <p className="lead">{hero.body}</p>
            <div className="hero-actions">
              <Link to={hero.primaryCta.action} className="btn btn-gold btn-shine" data-ripple>
                <span>
                  {hero.primaryCta.label}
                  <svg className="btn-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <div className="shine-element"></div>
              </Link>
              <Link to={hero.secondaryCta.action} className="btn btn-outline" data-ripple>
                <span>{hero.secondaryCta.label}</span>
              </Link>
            </div>
            <div className="trust-row">
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" />
                </svg>
                ISO 22000 Certified
              </div>
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />
                </svg>
                PSQCA & Halal Compliant
              </div>
              <div className="t-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M3 11l9-8 9 8M5 10v10h14V10" />
                </svg>
                25+ Cities Served
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hv-core">
              <div className="hv-icon-grid">
                <span className="hv-icon-box"><Truck size={30} /></span>
                <span className="hv-icon-box"><Store size={30} /></span>
                <span className="hv-icon-box"><ChefHat size={30} /></span>
                <span className="hv-icon-box"><Factory size={30} /></span>
              </div>
            </div>
            {hero.cards.map((card, i) => {
              // Extract numeric part for counter
              const numericValue = parseInt(card.value.replace(/[^0-9]/g, ''), 10);
              const suffix = card.value.replace(/[0-9kK,]/g, '');
              
              return (
                <div key={i} className={`hv-card c${i + 1}`}>
                  <div className="hv-num">
                    <Counter end={numericValue || 520000} suffix={suffix || '+'} />
                  </div>
                  <div className="hv-lbl">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <div className="stat-strip stat-strip-enter">
        <div className="container">
          {hero.stats.map((stat, i) => (
            <div key={i} className="stat">
              <div className="stat-num">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-cap">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 140px 0 90px;
          background-color: #FBF7F0;
        }

        /* Background Slideshow */
        .hero-slideshow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .slide-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 2s ease-in-out, transform 8s ease-in-out;
          transform: scale(1.05);
          filter: grayscale(10%);
        }
        .slide-img.active {
          opacity: 0.35;
          transform: scale(1);
        }
        .slide-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(120% 100% at 80% 0%, rgba(222,81,10,0.3) 0%, rgba(251,247,240,0.55) 45%, rgba(251,247,240,0.9) 100%),
            linear-gradient(180deg, rgba(222,81,10,0.12) 0%, rgba(222,81,10,0) 25%);
        }
        .slide-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, #FBF7F0 100%);
        }

        /* Floating Glows (static) */
        .hero-glow {
          position: absolute; width: 680px; height: 680px; border-radius: 50%;
          background: radial-gradient(circle, rgba(185,50,13,0.18), transparent 70%);
          top: -220px; right: -180px; filter: blur(10px); z-index: 1;
        }
        .hero-glow.b {
          width: 420px; height: 420px; background: radial-gradient(circle, rgba(185,50,13,0.12), transparent 70%);
          bottom: -160px; left: -120px; top: auto; right: auto;
        }

        .hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.05fr .95fr; gap: 60px; align-items: center; }
        
        .eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
          color: #111111; background: rgba(222,81,10,0.35);
          border: 1px solid rgba(185,50,13,0.35); padding: 8px 16px; border-radius: 30px;
          margin-bottom: 28px;
        }
        .eyebrow .dot {
          width: 6px; height: 6px; border-radius: 50%; background: #B9320D;
          box-shadow: 0 0 0 0 rgba(185,50,13,0.6);
        }

        .hero h1 {
          font-family: 'Space Grotesk',sans-serif; font-weight: 700;
          font-size: clamp(2.6rem, 4.6vw, 4.3rem); line-height: 1.06;
          color: #111111; letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }
        .hero p.lead { font-size: 17px; color: rgba(20,20,20,0.72); max-width: 520px; margin-bottom: 38px; }
        
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 54px; }
        
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px;
          padding: 13px 26px; border-radius: 12px; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1), background .25s;
          white-space: nowrap; text-decoration: none;
        }
        .btn span { position: relative; z-index: 2; display: flex; align-items: center; gap: 8px; }
        .btn-arrow { transition: transform 0.3s ease; }
        .btn:hover .btn-arrow { transform: translateX(5px); }

        .btn-gold {
          background: linear-gradient(120deg,#DE510A,#DE510A 55%,#B9320D);
          color: #ffffff; box-shadow: 0 10px 24px rgba(185,50,13,0.35);
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(185,50,13,0.45), 0 0 20px rgba(185,50,13,0.35); }
        
        /* Shine Animation */
        .shine-element {
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg); z-index: 1;
        }

        .btn-outline { background: transparent; border: 1.4px solid rgba(20,20,20,0.45); color: #111111; }
        .btn-outline:hover { border-color: #B9320D; background: rgba(222,81,10,0.25); }

        .trust-row { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .trust-row .t-item { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: rgba(20,20,20,0.66); font-weight: 500; }
        .trust-row svg { width: 16px; height: 16px; color: #B9320D; flex-shrink: 0; }

        .hero-visual { position: relative; height: 520px; }
        
        /* Central Egg Breathing & Glow */
        .hv-core {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(185,50,13,0.18), transparent 60%);
          display: flex; align-items: center; justify-content: center; color: #B9320D;
        }
        .hv-icon-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
        }
        .hv-icon-box {
          width: 64px; height: 64px; border-radius: 18px;
          background: rgba(255,255,255,0.7); border: 1px solid rgba(63,98,49,0.25);
          color: #B9320D; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 14px 30px rgba(63,98,49,0.18);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hv-icon-box:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(222,81,10,0.28); color: #DE510A; }

        /* Floating Cards */
        .hv-card {
          position: absolute; background: #FFFFFF;
          border: 1px solid #3F6231; backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 18px; padding: 18px 20px; box-shadow: 0 20px 50px rgba(63,98,49,0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hv-card:hover { transform: translateY(-8px) scale(1.02) !important; box-shadow: 0 24px 60px rgba(63,98,49,0.25); border-color: #3F6231; }
        .hv-card:hover .hv-num { text-shadow: 0 0 10px rgba(63,98,49,0.25); }
        .hv-card .hv-num { font-family: 'Space Grotesk',sans-serif; font-size: 26px; font-weight: 700; color: #3F6231; line-height: 1; transition: text-shadow 0.3s ease; }
        .hv-card .hv-lbl { font-size: 11px; color: rgba(20,20,20,0.7); margin-top: 4px; letter-spacing: .02em; }
        
        .hv-card.c1 { top: 6%; left: 2%; }
        .hv-card.c2 { top: 40%; right: 0%; }
        .hv-card.c3 { bottom: 6%; left: 10%; }

        .stat-strip { background: #FFFFFF; border-top: 1px solid #3F6231; border-bottom: 1px solid #3F6231; position: relative; z-index: 3; margin-top: -1px; }
        .stat-strip .container { display: grid; grid-template-columns: repeat(4,1fr); padding: 46px 32px; }
        .stat-strip .stat { text-align: center; border-right: 1px solid rgba(63,98,49,0.25); padding: 0 18px; }
        .stat-strip .stat:last-child { border-right: none; }
        .stat-num { font-family: 'Space Grotesk',sans-serif; font-size: clamp(1.8rem,2.6vw,2.6rem); font-weight: 700; color: #3F6231; display: flex; justify-content: center; align-items: baseline; gap: 3px; }
        .stat-cap { font-size: 12.5px; color: rgba(20,20,20,0.7); margin-top: 6px; }

        .hero-enter { animation: heroIn 1s cubic-bezier(.22,1,.36,1) both; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-enter .hero-grid > * { animation: heroSlide .8s cubic-bezier(.22,1,.36,1) both; }
        .hero-enter .hero-grid > *:nth-child(1) { animation-delay: .2s; }
        .hero-enter .hero-grid > *:nth-child(2) { animation-delay: .35s; }
        
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          .stat-strip .container { grid-template-columns: repeat(2,1fr); gap: 24px; }
          .stat-strip .stat { border-right: none; border-bottom: 1px solid rgba(63,98,49,0.25); padding-bottom: 20px; }
        }
        @media (max-width: 480px) {
          .hero { padding: 120px 0 60px; }
          .hero p.lead { font-size: 16px; }
          .btn { padding: 12px 22px; font-size: 13px; }
          .trust-row { gap: 18px; }
          .stat-strip .container { padding: 32px 20px; }
        }
      `}</style>
    </>
  );
}
