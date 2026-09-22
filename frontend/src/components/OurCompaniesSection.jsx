import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../store/useCMSStore';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OurCompaniesSection() {
  const data = useCMSStore((s) => s.ourCompanies);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.oc-header',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.oc-header', start: 'top 85%' }
        }
      );

      // Company Cards Stagger Reveal
      gsap.utils.toArray('.oc-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, autoAlpha: 0, rotationY: i % 2 === 0 ? -4 : 4 },
          {
            y: 0, autoAlpha: 1, rotationY: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="our-companies" className="oc-section">
      {/* Ambient background */}
      <div className="oc-bg-grid" />
      <div className="oc-orb oc-orb-1" />
      <div className="oc-orb oc-orb-2" />

      <div className="oc-container">
        {/* Header */}
        <div className="oc-header">
          <h2 className="oc-heading">{data.title || 'Our Companies'}</h2>
          <p className="oc-sub">{data.subtitle}</p>
        </div>

        {/* Company Cards Grid */}
        <div className="oc-grid">
          {data.companies
            .filter((company) => company.id === 'egg-traders')
            .map((company) => {
              const isEggTraders = company.id === 'egg-traders';

            return (
              <div
                key={company.id}
                className={`oc-card ${isEggTraders ? 'card-egg-traders' : 'card-parent'}`}
                style={{ visibility: 'hidden' }}
              >
                <div className="oc-card-glow" />

                {/* Top Row Icon & Badge */}
                <div className="oc-top-row">
                  <div className="oc-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
                      <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                    </svg>
                  </div>
                  <span className="oc-badge">
                    {isEggTraders ? 'MARKETPLACE' : 'ROOT ENTERPRISE'}
                  </span>
                </div>

                {/* Company Name & Tagline */}
                <h3 className="oc-name">{company.name}</h3>
                <span className="oc-tagline">{company.tagline}</span>

                {/* Description */}
                <p className="oc-desc">{company.description}</p>

                {/* Visit Website Button */}
                <Link to={company.url} className="oc-visit-btn">
                  <span>VISIT WEBSITE</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           SECTION BASE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .oc-section {
          background: #FBF7F0;
          color: #111111;
          padding: 120px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .oc-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .oc-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .oc-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(13,107,61,0.12), transparent 70%);
          top: 15%; right: -150px;
        }

        .oc-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          bottom: 10%; left: -150px;
        }

        .oc-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           HEADER
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .oc-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 70px;
        }

        .oc-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .oc-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           CARDS GRID
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .oc-grid {
          display: grid;
          grid-template-columns: minmax(0, 620px);
          justify-content: center;
          gap: 36px;
        }

        .oc-card {
          position: relative;
          border-radius: 24px;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
          transform-style: preserve-3d;
        }

        /* Egg Traders Card styling combining Dark Mauve Pink & Emerald Green */
        .oc-card.card-egg-traders {
          background: #FFFFFF;
          border: 1px solid #3F6231;
          position: relative;
          overflow: hidden;
        }

        .oc-card.card-egg-traders::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/images/Brown_Eggs.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          z-index: 0;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .oc-card.card-egg-traders > * {
          position: relative;
          z-index: 1;
        }

        .oc-card.card-egg-traders:hover {
          border-color: #3F6231;
          box-shadow: 0 30px 80px rgba(63,98,49,0.18);
          transform: translateY(-6px);
        }

        .oc-card.card-egg-traders:hover::before {
          opacity: 0.22;
          transform: scale(1.03);
        }

        /* Parent Green / Gold Card */
        .oc-card.card-parent {
          background: #FFFFFF;
          border: 1px solid #3F6231;
        }

        .oc-card.card-parent:hover {
          border-color: #3F6231;
          box-shadow: 0 30px 80px rgba(63,98,49,0.18);
          transform: translateY(-6px);
        }

        .oc-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 28px;
        }

        .oc-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-egg-traders .oc-icon-box {
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.3);
          color: #3F6231;
        }

        .card-parent .oc-icon-box {
          background: rgba(222,81,10,0.1);
          border: 1px solid rgba(222,81,10,0.35);
          color: #DE510A;
        }

        .oc-badge {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 5px 12px;
          border-radius: 6px;
        }

        .card-egg-traders .oc-badge {
          background: rgba(63,98,49,0.08);
          color: #3F6231;
          border: 1px solid rgba(63,98,49,0.35);
        }

        .card-parent .oc-badge {
          background: rgba(222, 81, 10, 0.08);
          color: #DE510A;
          border: 1px solid rgba(222, 81, 10, 0.35);
        }

        .oc-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #111111;
        }

        .oc-tagline {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(20,20,20,0.55);
          text-transform: uppercase;
          margin-bottom: 18px;
          display: block;
        }

        .oc-desc {
          font-size: 15px;
          color: rgba(20,20,20,0.72);
          line-height: 1.65;
          margin: 0 0 32px;
          flex-grow: 1;
        }

        /* Visit Website Button */
        .oc-visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-egg-traders .oc-visit-btn {
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.45);
          color: #3F6231;
        }

        .card-egg-traders .oc-visit-btn:hover {
          background: #3F6231;
          color: #FFFFFF;
          box-shadow: 0 10px 25px rgba(63,98,49,0.35);
        }

        .card-parent .oc-visit-btn {
          background: rgba(222, 81, 10, 0.08);
          border: 1px solid rgba(222, 81, 10, 0.45);
          color: #DE510A;
        }

        .card-parent .oc-visit-btn:hover {
          background: #DE510A;
          color: #ffffff;
          box-shadow: 0 10px 25px rgba(222, 81, 10, 0.4);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .oc-visit-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 860px) {
          .oc-section { padding: 80px 16px; }
          .oc-grid { grid-template-columns: 1fr; gap: 24px; }
          .oc-card { padding: 32px 24px; }
          .oc-name { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
