import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   EXACT COORDINATES
   ───────────────────────────────────────────── */
const LAT = 34.1907961;
const LNG = 72.0485732;
const GMAPS_URL = `https://www.google.com/maps?q=${LAT},${LNG}`;

/* ─────────────────────────────────────────────
   CUSTOM SVG MARKER ICON
   ───────────────────────────────────────────── */
const markerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56">
  <defs>
    <filter id="pin-shadow" x="-30%" y="-10%" width="160%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#DE510A" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Pin body -->
  <path
    d="M22 2C13.16 2 6 9.16 6 18c0 12 16 34 16 34s16-22 16-34C38 9.16 30.84 2 22 2z"
    fill="#DE510A"
    filter="url(#pin-shadow)"
  />
  <!-- Inner circle (white ring) -->
  <circle cx="22" cy="18" r="7" fill="#FFFFFF" opacity="0.95"/>
  <!-- Inner dot -->
  <circle cx="22" cy="18" r="3.5" fill="#B9320D"/>
</svg>`;

const markerIcon = L.divIcon({
  html: markerSVG,
  className: 'lm-custom-marker',
  iconSize: [44, 56],
  iconAnchor: [22, 56],
  popupAnchor: [0, -58],
});

/* ─────────────────────────────────────────────
   FLY-TO on mount (gives nice animated context)
   ───────────────────────────────────────────── */
function FlyToMarker() {
  const map = useMap();
  useEffect(() => {
    // Start zoomed out to show Pakistan, then fly in
    map.setView([30, 69], 5, { animate: false });
    const timeout = setTimeout(() => {
      map.flyTo([LAT, LNG], 12, {
        animate: true,
        duration: 2.2,
        easeLinearity: 0.3,
      });
    }, 600);
    return () => clearTimeout(timeout);
  }, [map]);
  return null;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function LocationMapSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mapWrapRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
      tl.fromTo(
        headerRef.current,
        { y: 36, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' }
      )
        .fromTo(
          mapWrapRef.current,
          { y: 40, autoAlpha: 0, scale: 0.97 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="our-location" ref={sectionRef} className="lm-section" aria-label="Our location">

      {/* Subtle separator above */}
      <div className="lm-separator" />

      {/* ── AMBIENT ORBS (match ContactSection aesthetic) */}
      <div className="lm-orb lm-orb-1" />
      <div className="lm-orb lm-orb-2" />
      <div className="lm-bg-grid" />

      <div className="lm-container">

        {/* ── HEADER */}
        <div ref={headerRef} className="lm-header" style={{ visibility: 'hidden' }}>
          <h2 className="lm-heading">Our Location</h2>
          <p className="lm-sub">
            Find us at the heart of our operations in Khyber Pakhtunkhwa, Pakistan.
          </p>
          <div className="lm-divider" />
        </div>

        {/* ── MAP WRAPPER */}
        <div ref={mapWrapRef} className="lm-map-frame" style={{ visibility: 'hidden' }}>
          {/* Decorative top-bar */}
          <div className="lm-frame-topbar">
            <div className="lm-dot-row">
              <span className="lm-dot lm-dot-red" />
              <span className="lm-dot lm-dot-orange" />
              <span className="lm-dot lm-dot-green" />
            </div>
            <span className="lm-frame-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Mardan, Khyber Pakhtunkhwa
            </span>
            <span className="lm-coords-chip">{LAT.toFixed(4)}° N, {LNG.toFixed(4)}° E</span>
          </div>

          {/* Leaflet Map */}
          <div className="lm-map-inner">
            <MapContainer
              center={[30, 69]}
              zoom={5}
              zoomControl={false}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                maxZoom={19}
              />
              <Marker position={[LAT, LNG]} icon={markerIcon}>
                <Popup
                  className="lm-popup"
                  closeButton={false}
                  offset={[0, -2]}
                >
                  <div className="lm-popup-inner">
                    <div className="lm-popup-pin-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="lm-popup-title">Mardan, Khyber Pakhtunkhwa</div>
                      <div className="lm-popup-coords">{LAT}° N, {LNG}° E</div>
                      <a
                        href={GMAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lm-popup-gmap-link"
                        id="location-popup-gmaps-link"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
              <FlyToMarker />
            </MapContainer>
            {/* Pulse ring rendered outside map canvas to avoid leaflet z-index issues */}
            <div className="lm-pulse-overlay" aria-hidden="true">
              <div className="lm-pulse-ring" />
            </div>
          </div>

          {/* Decorative bottom-bar */}
          <div className="lm-frame-bottombar">
            <span className="lm-live-badge">
              <span className="lm-live-dot" />
              Live Map
            </span>
            <span className="lm-map-credit">Powered by OpenStreetMap · CARTO</span>
          </div>
        </div>

        {/* ── CTA ROW */}
        <div ref={ctaRef} className="lm-cta-row" style={{ visibility: 'hidden' }}>
          <a
            id="location-view-on-gmaps"
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lm-gmaps-btn"
            aria-label="View our location on Google Maps"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Google Maps
            <svg className="lm-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

      </div>

      {/* ───── STYLES ───── */}
      <style>{`
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           SECTION BASE
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-section {
          background: #FBF7F0;
          padding: 0 24px 120px;
          position: relative;
          overflow: hidden;
        }

        .lm-separator {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(63,98,49,0.18), rgba(222,81,10,0.15), rgba(63,98,49,0.18), transparent);
          margin-bottom: 100px;
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

        .lm-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .lm-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(63,98,49,0.07), transparent 70%);
          bottom: 0; left: -200px;
        }
        .lm-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(222,81,10,0.07), transparent 70%);
          top: 10%; right: -150px;
        }

        .lm-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           HEADER
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 52px;
        }

        .lm-eyebrow {
          display: inline-block;
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #DE510A;
          margin-bottom: 14px;
        }

        .lm-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lm-sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: rgba(20,20,20,0.52);
          line-height: 1.7;
          margin: 0 0 26px;
        }

        .lm-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           MAP FRAME
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-map-frame {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(63,98,49,0.38);
          box-shadow:
            0 4px 6px rgba(0,0,0,0.02),
            0 20px 48px rgba(63,98,49,0.10),
            0 40px 80px rgba(0,0,0,0.06);
          background: #FFFFFF;
        }

        /* Top chrome bar */
        .lm-frame-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 20px;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(20,20,20,0.07);
          gap: 12px;
          flex-wrap: wrap;
        }

        .lm-dot-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .lm-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .lm-dot-red    { background: #FF5F57; }
        .lm-dot-orange { background: #FFBD2E; }
        .lm-dot-green  { background: #28C840; }

        .lm-frame-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #111111;
        }

        .lm-coords-chip {
          font-family: monospace;
          font-size: 10.5px;
          color: #3F6231;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.2);
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        /* Map inner container */
        .lm-map-inner {
          position: relative;
          height: 520px;
        }

        /* Bottom chrome bar */
        .lm-frame-bottombar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 20px;
          background: #FFFFFF;
          border-top: 1px solid rgba(20,20,20,0.07);
          flex-wrap: wrap;
          gap: 8px;
        }

        .lm-live-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #3F6231;
        }

        .lm-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3F6231;
          animation: lm-blink 2.4s ease-in-out infinite;
          box-shadow: 0 0 0 0 rgba(63,98,49,0.55);
        }

        @keyframes lm-blink {
          0%, 100% { box-shadow: 0 0 0 0 rgba(63,98,49,0.55); }
          50%       { box-shadow: 0 0 0 5px rgba(63,98,49,0); }
        }

        .lm-map-credit {
          font-family: monospace;
          font-size: 10px;
          color: rgba(20,20,20,0.35);
          letter-spacing: 0.04em;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           PULSE OVERLAY
           (pointer-events none so map stays interactive)
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-pulse-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lm-pulse-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2.5px solid rgba(222,81,10,0.6);
          animation: lm-pulse 2.4s ease-out 1.4s 3;
          opacity: 0;
        }
        @keyframes lm-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          80%  { transform: scale(3.8); opacity: 0;   }
          100% { transform: scale(3.8); opacity: 0;   }
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           CUSTOM MARKER
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-custom-marker {
          background: transparent !important;
          border: none !important;
          filter: drop-shadow(0 6px 14px rgba(222,81,10,0.4));
          transition: filter 0.2s;
        }
        .lm-custom-marker:hover {
          filter: drop-shadow(0 8px 20px rgba(222,81,10,0.65));
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           LEAFLET POPUP CUSTOM SKIN
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-popup .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          padding: 0 !important;
          border: 1px solid rgba(63,98,49,0.35) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.14), 0 6px 16px rgba(222,81,10,0.12) !important;
          overflow: hidden;
        }
        .lm-popup .leaflet-popup-content {
          margin: 0 !important;
          min-width: 220px;
        }
        .lm-popup .leaflet-popup-tip-container {
          display: none !important;
        }

        .lm-popup-inner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px 18px;
          background: #FFFFFF;
        }

        .lm-popup-pin-icon {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border-radius: 9px;
          background: rgba(222,81,10,0.1);
          border: 1px solid rgba(222,81,10,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          margin-top: 2px;
        }

        .lm-popup-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 4px;
        }

        .lm-popup-coords {
          font-family: monospace;
          font-size: 10px;
          color: rgba(20,20,20,0.45);
          margin-bottom: 10px;
          letter-spacing: 0.04em;
        }

        .lm-popup-gmap-link {
          display: inline-flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #DE510A;
          text-decoration: none;
          border-bottom: 1px solid rgba(222,81,10,0.3);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .lm-popup-gmap-link:hover {
          color: #B9320D;
          border-color: #B9320D;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           CTA ROW
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-cta-row {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .lm-gmaps-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #3F6231;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 10px;
          border: 1.5px solid rgba(63,98,49,0.35);
          background: rgba(63,98,49,0.04);
          transition: color 0.25s, border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
          letter-spacing: 0.01em;
        }

        .lm-gmaps-btn:hover {
          color: #FFFFFF;
          background: linear-gradient(135deg, #3F6231, #2e4b24);
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(63,98,49,0.28);
        }

        .lm-arrow {
          transition: transform 0.25s;
        }
        .lm-gmaps-btn:hover .lm-arrow {
          transform: translate(2px, -2px);
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           LEAFLET GLOBAL OVERRIDES
           (scope to this section only via cascade)
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .lm-map-inner .leaflet-container {
          font-family: 'Inter', sans-serif;
          background: #e8e0d8;
        }
        .lm-map-inner .leaflet-control-attribution {
          font-size: 10px;
          background: rgba(255,255,255,0.82) !important;
          border-radius: 6px 0 0 0;
          padding: 3px 8px;
        }
        .lm-map-inner .leaflet-control-zoom {
          border: 1px solid rgba(63,98,49,0.28) !important;
          border-radius: 10px !important;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          margin: 16px !important;
        }
        .lm-map-inner .leaflet-control-zoom-in,
        .lm-map-inner .leaflet-control-zoom-out {
          font-size: 18px !important;
          line-height: 30px !important;
          width: 30px !important;
          height: 30px !important;
          color: #3F6231 !important;
          border-bottom: 1px solid rgba(63,98,49,0.18) !important;
        }
        .lm-map-inner .leaflet-control-zoom-in:hover,
        .lm-map-inner .leaflet-control-zoom-out:hover {
          background: rgba(222,81,10,0.08) !important;
          color: #DE510A !important;
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           MOBILE
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (max-width: 768px) {
          .lm-section {
            padding: 0 14px 80px;
          }
          .lm-separator {
            margin-bottom: 64px;
          }
          .lm-map-inner {
            height: 360px;
          }
          .lm-frame-topbar {
            flex-wrap: wrap;
            gap: 8px;
          }
          .lm-coords-chip {
            display: none;
          }
          .lm-map-credit {
            display: none;
          }
          .lm-gmaps-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 420px) {
          .lm-map-inner {
            height: 300px;
          }
        }

        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TABLET
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        @media (min-width: 769px) and (max-width: 1024px) {
          .lm-map-inner {
            height: 460px;
          }
        }
      `}</style>
    </section>
  );
}
