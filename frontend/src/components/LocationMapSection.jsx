import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PakistanMapVisual from './PakistanMapVisual';

gsap.registerPlugin(ScrollTrigger);

const LAT = 34.1907961;
const LNG = 72.0485732;
const GMAPS_URL = `https://www.google.com/maps?q=${LAT},${LNG}`;

export default function LocationMapSection() {
  const sectionRef = useRef(null);
  const copyRef   = useRef(null);
  const mapRef    = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
        .fromTo(
          copyRef.current,
          { x: -28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' }
        )
        .fromTo(
          mapRef.current,
          { x: 28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.5'
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="our-location" ref={sectionRef} className="lm-section" aria-label="Our location">
      <div className="lm-separator" />
      <div className="lm-orb lm-orb-1" />
      <div className="lm-orb lm-orb-2" />
      <div className="lm-bg-grid" />

      <div className="lm-container">
        <div className="lm-grid">

          {/* ── LEFT: copy ── */}
          <div ref={copyRef} className="lm-copy" style={{ visibility: 'hidden' }}>
            <h2 className="lm-heading">Our Location</h2>
            
            <p className="lm-subheading">Mardan, Khyber Pakhtunkhwa</p>
            <p className="lm-lead">
              Our operations are centralized in Mardan, serving our commercial network and logistics across the region from our primary operating hub.
            </p>

            <a
              id="location-view-on-gmaps"
              href={GMAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lm-gmaps-btn"
              aria-label="View our location on Google Maps"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Google Maps
              <svg className="lm-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* ── RIGHT: Pakistan map ── */}
          <div ref={mapRef} className="lm-map-panel" style={{ visibility: 'hidden' }}>
            <PakistanMapVisual />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section shell ── */
        .lm-section {
          background: #FBF7F0;
          padding: 0 24px 100px;
          position: relative;
          overflow: hidden;
        }

        .lm-separator {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(63,98,49,0.18),
            rgba(222,81,10,0.15), rgba(63,98,49,0.18), transparent);
          margin-bottom: 72px;
        }

        .lm-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .lm-orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .lm-orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(63,98,49,0.07), transparent 70%);
          bottom: 0; left: -160px;
        }
        .lm-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(222,81,10,0.06), transparent 70%);
          top: 8%; right: -120px;
        }

        /* ── Layout ── */
        .lm-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .lm-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }

        /* ── Copy column ── */
        .lm-copy { position: relative; }

        .lm-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 3.6vw, 44px);
          font-weight: 700;
          margin: 0 0 12px;
          color: #111111;
          line-height: 1.08;
          letter-spacing: -0.02em;
        }

        .lm-subheading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 600;
          color: #B9320D;
          margin: 0 0 16px;
        }

        .lm-lead {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 15.5px;
          color: rgba(17,17,17,0.68);
          line-height: 1.72;
          margin: 0 0 28px;
          max-width: 48ch;
        }

        .lm-gmaps-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #3F6231;
          text-decoration: none;
          padding: 11px 22px;
          border-radius: 9px;
          border: 1.5px solid rgba(63,98,49,0.32);
          background: rgba(255,255,255,0.72);
          transition: color 0.22s, border-color 0.22s, background 0.22s,
                      transform 0.22s, box-shadow 0.22s;
        }
        .lm-gmaps-btn:hover {
          color: #ffffff;
          background: linear-gradient(135deg, #3F6231, #2e4b24);
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(63,98,49,0.24);
        }
        .lm-arrow { transition: transform 0.22s; }
        .lm-gmaps-btn:hover .lm-arrow { transform: translate(2px, -2px); }

        /* ── Map panel ── */
        .lm-map-panel {
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.14);
          border-radius: 20px;
          padding: clamp(14px, 2.5vw, 24px);
          box-shadow:
            0 2px 8px rgba(17,17,17,0.04),
            0 16px 48px rgba(17,17,17,0.06);
        }

        .pk-map-visual {
          width: 100%;
          max-width: 100%;
        }

        .pk-map-svg {
          width: 100%;
          height: auto;
          display: block;
        }


        /* ── Responsive ── */
        @media (max-width: 920px) {
          .lm-grid {
            grid-template-columns: 1fr;
          }
          .lm-map-panel {
            max-width: 480px;
            margin: 0 auto;
          }
          .lm-copy {
            text-align: center;
          }
          .lm-lead {
            margin: 0 auto 28px;
          }
        }

        @media (max-width: 480px) {
          .lm-section { padding: 0 14px 72px; }
          .lm-separator { margin-bottom: 48px; }
        }
      `}</style>
    </section>
  );
}
