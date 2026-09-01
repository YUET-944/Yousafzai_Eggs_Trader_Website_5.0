import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../store/useCMSStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const process = useCMSStore((s) => s.process);
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header animation
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: '.proc-header', start: 'top 80%' }
      });
      hTl
        .fromTo('.proc-heading', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
        .fromTo('.proc-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.proc-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

      // Cards staggered reveal
      gsap.utils.toArray('.proc-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, autoAlpha: 0, rotationX: 6 },
          {
            y: 0, autoAlpha: 1, rotationX: 0,
            duration: 0.9,
            delay: (i % 3) * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: y * -5,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
    setActiveStep(idx);
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.6 });
    setActiveStep(null);
  };

  const stepIcons = {
    Feather: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
      </svg>
    ),
    FlaskConical: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3h6M10 3v5l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
      </svg>
    ),
    ScanLine: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5l-1.4 1.4M7 17.5l-1.4 1.4m11.9 0L16 17.5M7 6.5L5.6 5.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    Printer: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 14h2" />
      </svg>
    ),
    Package: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="8" width="16" height="11" rx="1.5" />
        <path d="M8 8V6a4 4 0 018 0v2" />
      </svg>
    ),
    Truck: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 16V8a1 1 0 011-1h9v9M3 16h11M16 16h2l2-3v-3h-4M6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  };

  const bodyCopy = {
    'Eggs collected from certified farms within 6 hours of laying. Each collection logged with farm ID, flock ID and timestamp.':
      'Eggs are collected from certified farms within 6 hours of laying. Each collection is logged with farm ID, flock ID, and timestamp.',
    'Packed under hygienic conditions in client-specified or standard packaging, with batch certs included in every box.':
      'Packed under hygienic conditions in client-specified or standard packaging, with batch certificates included in every box.',
    'Refrigerated delivery with IoT temperature logging. Delivery receipts include full chain-of-custody sign-off.':
      'Refrigerated delivery with IoT temperature logging. Delivery receipts include delivery documentation.',
  };

  const totalStages = process.length || 7;

  return (
    <section id="process" ref={sectionRef} className="proc-section">
      {/* Background Orbs & Grid */}
      <div className="proc-bg-grid" />
      <div className="proc-orb proc-orb-1" />
      <div className="proc-orb proc-orb-2" />

      <div className="proc-container">
        {/* Header */}
        <div className="proc-header">
          <h2 className="proc-heading">A Clear Process at Every Stage</h2>
          <p className="proc-sub">
            From farm collection to refrigerated delivery, each step supports quality and traceability.
          </p>
          <div className="proc-divider-line" />
        </div>

        {/* Process Cards Grid */}
        <div className="proc-grid">
          {process.map((item, i) => (
            <div
              key={i}
              className={`proc-card ${activeStep === i ? 'card-hover' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              style={{ visibility: 'hidden' }}
            >
              {/* Radial glow */}
              <div className="proc-card-glow" />

              {/* Card Header Row */}
              <div className="proc-card-top">
                <div className="proc-icon-box">
                  {stepIcons[item.icon] || stepIcons.Feather}
                </div>
                <div className="proc-num">{item.num}</div>
              </div>

              {/* Title & Body */}
              <h3 className="proc-card-title">{item.title}</h3>
              <p className="proc-card-body">{bodyCopy[item.body] || item.body}</p>

              {/* Bottom Step Indicator */}
              <div className="proc-card-footer">
                <span className="footer-label">Stage {i + 1} of {totalStages}</span>
                <div className="footer-line">
                  <div className="footer-line-fill" style={{ width: `${((i + 1) / totalStages) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           SECTION BASE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .proc-section {
          background: #FBF7F0;
          color: #111111;
          padding: 120px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .proc-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .proc-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .proc-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          top: 15%; left: -150px;
        }

        .proc-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.06), transparent 70%);
          bottom: 10%; right: -150px;
        }

        .proc-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           HEADER
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .proc-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 80px;
        }

        .proc-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .proc-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
          visibility: hidden;
        }

        .proc-divider-line {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           GRID & CARDS
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .proc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .proc-card {
          position: relative;
          border-radius: 20px;
          padding: 36px 30px 28px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.5s, box-shadow 0.5s;
          transform-style: preserve-3d;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .proc-card.card-hover {
          border-color: rgba(63,98,49,0.6);
          box-shadow:
            0 30px 70px rgba(0,0,0,0.12),
            0 0 40px rgba(222,81,10,0.08);
        }

        /* Hover Glow */
        .proc-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(222,81,10,0.08), transparent 40%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
          border-radius: 20px;
        }

        .proc-card.card-hover .proc-card-glow {
          opacity: 1;
        }

        /* Top Row: Icon + Metallic Number */
        .proc-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .proc-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(222,81,10,0.1);
          border: 1px solid rgba(222,81,10,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          transition: all 0.4s ease;
        }

        .proc-icon-box svg {
          width: 24px;
          height: 24px;
        }

        .proc-card.card-hover .proc-icon-box {
          background: #DE510A;
          color: #ffffff;
          box-shadow: 0 0 20px rgba(222,81,10,0.4);
        }

        .proc-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 38px;
          font-weight: 800;
          background: linear-gradient(135deg, rgba(20,20,20,0.2) 0%, rgba(222,81,10,0.5) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        /* Title & Body */
        .proc-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #111111;
          position: relative;
          z-index: 1;
        }

        .proc-card-body {
          font-size: 14.5px;
          color: rgba(20,20,20,0.55);
          line-height: 1.65;
          margin: 0 0 24px;
          flex-grow: 1;
          position: relative;
          z-index: 1;
        }

        /* Footer Line & Stage Indicator */
        .proc-card-footer {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
          position: relative;
          z-index: 1;
        }

        .footer-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(20,20,20,0.45);
          letter-spacing: 0;
        }

        .footer-line {
          width: 100%;
          height: 3px;
          background: #DE510A;
          border-radius: 2px;
          overflow: hidden;
        }

        .footer-line-fill {
          height: 100%;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          border-radius: 2px;
          transition: transform 0.4s ease;
        }

        .proc-card.card-hover .footer-line-fill {
          box-shadow: 0 0 10px rgba(222,81,10,0.5);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           RESPONSIVE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 1080px) {
          .proc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .proc-section {
            padding: 80px 16px;
          }
          .proc-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .proc-card {
            padding: 28px 22px 22px;
          }
          .proc-card-title {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
