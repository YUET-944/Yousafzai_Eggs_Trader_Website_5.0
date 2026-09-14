import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

function getIcon(iconName, props = {}) {
  const IconComponent = LucideIcons[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
}

function StatCounter({ end, suffix }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let obj = { val: 0 };
    const target = parseInt(end.replace(/[^0-9]/g, ''), 10);
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => setDisplayValue(Math.floor(obj.val).toString())
          });
        }
      });
    });
    return () => ctx.revert();
  }, [end]);
  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function SupplyChainControlCenter() {
  const whyUs = useCMSStore((s) => s.whyUs);
  const statsBand = useCMSStore((s) => s.statsBand);
  const industries = useCMSStore((s) => s.industries);
  const containerRef = useRef(null);
  const [pathData, setPathData] = useState("");
  const pathRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  const calculatePath = () => {
    const cards = document.querySelectorAll('.sccc-card-icon');
    if (cards.length < 2) return;
    const container = document.querySelector('.sccc-track');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    
    let d = "";
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      
      if (i === 0) {
        d += `M ${x} ${y} `;
      } else {
        const prevRect = cards[i-1].getBoundingClientRect();
        const prevY = prevRect.top - containerRect.top + prevRect.height / 2;
        const prevX = prevRect.left - containerRect.left + prevRect.width / 2;
        
        if (Math.abs(y - prevY) > 50) {
           const midY = prevY + (y - prevY) / 2;
           d += `L ${prevX} ${midY} L ${x} ${midY} L ${x} ${y} `;
        } else {
          d += `L ${x} ${y} `;
        }
      }
    });
    
    setPathData(d);
  };

  useEffect(() => {
    const timer = setTimeout(calculatePath, 120);
    window.addEventListener('resize', calculatePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePath);
    };
  }, [whyUs.reasons]);

  // Note: all scroll-driven animations removed for a quiet, static experience.
  // The control-center path and cards render statically via CSS/attributes below.

  const handleCardMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 6,
      rotationX: y * -4,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
    setActiveCard(idx);
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.6 });
    setActiveCard(null);
  };

  return (
    <div ref={containerRef} className="sccc-wrapper">
      {/* SECTION 1: CONTROL CENTER */}
      <section className="sccc-section" id="why-us">
        <div className="sccc-bg-grid" />
        <div className="sccc-orb sccc-orb-1" />
        <div className="sccc-orb sccc-orb-2" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head center sccc-head-animate" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <h2 className="sccc-sec-title">{whyUs.title}</h2>
            
            <div className="sccc-indicator-map">
              {whyUs.reasons.map((r, i) => (
                <div key={i} className="sccc-ind-item">
                  <div id={`scc-ind-${i}`} className="sccc-ind-icon">
                    {getIcon(r.icon, { size: 16 })}
                  </div>
                  {i < whyUs.reasons.length - 1 && <div className="sccc-ind-line" />}
                </div>
              ))}
            </div>
          </div>

          <div className="sccc-track">
            <svg className="sccc-path-svg">
              <path 
                ref={pathRef} 
                d={pathData} 
                stroke="rgba(20,20,20,0.06)" 
                strokeWidth="3" 
                fill="none" 
                strokeDashoffset={0}
                className="sccc-path-main"
              />
              <path 
                d={pathData} 
                stroke="#DE510A" 
                strokeWidth="4" 
                fill="none" 
                strokeDasharray="4 24" 
                className="logistics-packets"
              />
            </svg>
            
            <div className="sccc-truck-overlay">
              {getIcon('Truck', { size: 24, color: '#DE510A' })}
            </div>

            <div className="sccc-grid">
              {whyUs.reasons.map((r, i) => (
                <div 
                  key={i} 
                  className={`sccc-card ${activeCard === i ? 'card-hover' : ''}`}
                  id={`sccc-card-${i}`}
                  onMouseMove={(e) => handleCardMouseMove(e, i)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="sccc-card-glow" />

                  <div className="sccc-status-badge">
                    <span className="status-dot" /> {r.status}
                  </div>
                  <div className="sccc-card-icon" id={`sccc-icon-${i}`}>
                    {getIcon(r.icon, { size: 26 })}
                  </div>
                  <div className="sccc-kpi">{r.kpi}</div>
                  <h3 className="sccc-title">{r.title}</h3>
                  <p className="sccc-body">{r.body}</p>
                </div>
              ))}
            </div>
            
            <div className="sccc-celebration">
              <h3 className="celeb-title">Verified Supply Chain</h3>
              <div className="celeb-badges">
                <span>✓ Certified Supply Network</span>
                <span>✓ End-to-End Traceability</span>
                <span>✓ Cold-Chain Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPANY STATISTICS */}
      <section className="stats-band" id="stats">
        <div className="stats-bg-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head center stat-head-animate" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="sccc-sec-title">Performance That Speaks for Itself</h2>
          </div>

          <div className="stats-band-grid">
            {statsBand.stats.map((stat, i) => (
              <div key={i} className="sb-card">
                <div className="sb-num">
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="sb-divider" />
                <div className="sb-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRIES SERVED */}
      <section className="ind-section" id="industries">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head center ind-head-animate" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="sccc-sec-title">Built for Every Commercial Food Buyer</h2>
          </div>

          <div className="industry-grid">
            {industries.map((ind, i) => (
              <div 
                key={i} 
                className="industry-card ind-card-animate"
                onMouseMove={(e) => handleCardMouseMove(e, `ind-${i}`)}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="sccc-card-glow" />
                <div className="ind-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                    {ind.icon === 'Building2' ? <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /> :
                     ind.icon === 'ChefHat' ? <path d="M4 14h16l-1.5 6h-13L4 14zM6 14V8a6 6 0 0112 0v6" /> :
                     ind.icon === 'Store' ? <path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 21v-5h6v5" /> :
                     ind.icon === 'Factory' ? <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></> :
                     <path d="M12 2v20M5 7h14M5 12h14M5 17h14" />}
                  </svg>
                </div>
                <div className="ind-name">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           WRAPPER & SECTIONS
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .sccc-wrapper {
          background: #FBF7F0;
          color: #111111;
          position: relative;
          overflow: hidden;
        }

        .sccc-section {
          position: relative;
          padding: 120px 0 100px;
          overflow: hidden;
        }

        .sccc-bg-grid, .stats-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .sccc-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .sccc-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          top: 10%; left: -150px;
        }

        .sccc-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.06), transparent 70%);
          bottom: 10%; right: -150px;
        }

        .sccc-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #DE510A;
          display: block;
          margin-bottom: 14px;
        }

        .sccc-sec-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Top Indicator Map */
        .sccc-indicator-map {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 28px;
        }

        .sccc-ind-item {
          display: flex;
          align-items: center;
        }

        .sccc-ind-icon {
          color: #DE510A;
        }

        .sccc-ind-line {
          width: 40px;
          height: 1px;
          background: #DE510A;
          margin: 0 10px;
        }

        /* Track & Path */
        .sccc-track {
          position: relative;
          margin-top: 60px;
        }

        .sccc-path-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: visible;
        }

        .logistics-packets {
          stroke-dashoffset: 0;
          opacity: 0.5;
        }

        .sccc-truck-overlay {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 5;
          margin-top: -12px;
          margin-left: -12px;
          filter: drop-shadow(0 0 12px rgba(222,81,10,0.8));
          visibility: hidden;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           CARDS GRID
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .sccc-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .sccc-card {
          flex: 0 1 calc((100% - 80px) / 5);
          min-width: 180px;
          position: relative;
          background: #FFFFFF;
          border: 1px solid #3F6231;
          border-radius: 20px;
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.4s, box-shadow 0.4s;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .sccc-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            400px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(222,81,10,0.08), transparent 40%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
          border-radius: 20px;
        }

        .sccc-card:hover .sccc-card-glow, .industry-card:hover .sccc-card-glow {
          opacity: 1;
        }

        .sccc-status-badge {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: #3F6231;
          letter-spacing: 0.12em;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.35);
          padding: 4px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
        }

        .sccc-card-icon {
          width: 56px;
          height: 56px;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.3);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3F6231;
          margin-bottom: 20px;
          z-index: 2;
          transition: all 0.4s;
        }

        .sccc-card:hover .sccc-card-icon {
          background: #3F6231;
          color: #FBF7F0;
          box-shadow: 0 0 20px rgba(63,98,49,0.35);
        }

        .sccc-kpi {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #3F6231;
          margin-bottom: 12px;
          min-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .sccc-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #111111;
          margin: 0 0 8px;
          position: relative;
          z-index: 1;
        }

        .sccc-body {
          font-size: 12.5px;
          color: rgba(20,20,20,0.68);
          line-height: 1.6;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        .sccc-celebration {
          text-align: center;
          margin-top: 60px;
          position: relative;
          z-index: 2;
        }

        .celeb-title {
          font-family: 'Space Grotesk', sans-serif;
          color: #DE510A;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 14px;
        }

        .celeb-badges {
          display: flex;
          gap: 16px;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px;
          color: rgba(20,20,20,0.8);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           STATS BAND
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .stats-band {
          background: rgba(20,20,20,0.015);
          border-top: 1px solid rgba(20,20,20,0.06);
          border-bottom: 1px solid rgba(20,20,20,0.06);
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .stats-band-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .sb-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 20px;
          background: rgba(20,20,20,0.02);
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(12px);
          transition: transform 0.4s, border-color 0.4s;
        }

        .sb-card:hover {
          transform: translateY(-6px);
          border-color: #3F6231;
        }

        .sb-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .sb-lbl {
          font-size: 14px;
          color: rgba(20,20,20,0.55);
          margin-top: 12px;
        }

        .sb-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 16px auto 0;
          border-radius: 2px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           INDUSTRIES SERVED
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .ind-section {
          padding: 120px 0 140px;
          position: relative;
        }

        .industry-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }

        .industry-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid #3F6231;
          border-radius: 20px;
          padding: 36px 20px;
          text-align: center;
          backdrop-filter: blur(12px);
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          cursor: pointer;
        }

        .industry-card:hover {
          border-color: #3F6231;
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(63,98,49,0.18);
        }

        .ind-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 20px;
          border-radius: 14px;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3F6231;
          transition: all 0.4s;
        }

        .industry-card:hover .ind-icon {
          background: #3F6231;
          color: #FBF7F0;
          box-shadow: 0 0 20px rgba(63,98,49,0.35);
          transform: translateY(-4px);
        }

        .ind-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: #111111;
          transition: color 0.3s;
        }

        .industry-card:hover .ind-name {
          color: #3F6231;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           RESPONSIVE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 1200px) {
          .sccc-card { flex-basis: calc((100% - 56px) / 3); }
        }
        @media (max-width: 900px) {
          .sccc-card { flex-basis: calc((100% - 20px) / 2); }
          .sccc-indicator-map { display: none; }
          .industry-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-band-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 600px) {
          .sccc-card { flex-basis: 100%; }
          .industry-grid { grid-template-columns: 1fr; }
          .stats-band-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
