import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SceneLegacy() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal hub nodes with stagger
      gsap.fromTo('.map-hub',
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.25,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Draw routes
      gsap.fromTo('.map-route',
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        position: 'relative',
        padding: '100px 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#DE510A', fontFamily: 'monospace' }}>
          GEOGRAPHICAL_FOOTPRINT // PHYSICAL_SCALE
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '10px 0 0 0' }}>
          Building a Legacy
        </h2>
      </div>

      {/* Map Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '550px',
          aspectRatio: '1',
          borderRadius: '50%',
          border: '1px solid rgba(222, 81, 10, 0.1)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(20, 20, 20, 0.01)',
        }}
      >
        <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Pakistan Map Outline */}
          <path d="M150 50 L250 100 L300 200 L250 300 L150 350 L100 250 Z" fill="none" stroke="rgba(20,20,20,0.03)" strokeWidth="1" />

          {/* Routes */}
          <path className="map-route" d="M180 120 L220 180" stroke="#DE510A" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" fill="none" />
          <path className="map-route" d="M220 180 L200 280" stroke="#DE510A" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" fill="none" />

          {/* Peshawar HQ */}
          <g className="map-hub">
            <circle cx="180" cy="120" r="8" fill="#DE510A" />
            <circle cx="180" cy="120" r="16" fill="none" stroke="#DE510A" strokeWidth="0.5" />
            <text x="195" y="125" fill="#111111" fontSize="10" fontFamily="monospace">Peshawar HQ (1960)</text>
          </g>

          {/* Attock Hub */}
          <g className="map-hub">
            <circle cx="220" cy="180" r="6" fill="#64d2ff" />
            <text x="230" y="185" fill="rgba(20,20,20,0.7)" fontSize="9" fontFamily="monospace">Attock Hub (2020)</text>
          </g>

          {/* Lahore Hub */}
          <g className="map-hub">
            <circle cx="200" cy="280" r="6" fill="#64d2ff" />
            <text x="140" y="285" fill="rgba(20,20,20,0.7)" fontSize="9" fontFamily="monospace">Lahore Log (2022)</text>
          </g>
        </svg>
      </div>

      <p style={{ marginTop: '40px', maxWidth: '520px', textAlign: 'center', fontSize: '15px', color: 'rgba(20,20,20,0.6)', lineHeight: '1.7' }}>
        From our initial retail shop in Peshawar, we expanded vertically with production facilities in Attock and Malakand, creating a supply footprint spanning KPK, Punjab, and Sindh.
      </p>
    </section>
  );
}
