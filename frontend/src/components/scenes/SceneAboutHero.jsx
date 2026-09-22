import React, { useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';

export default function SceneAboutHero() {
  const hero = useCMSStore((s) => s.aboutScenes?.hero) || {};
  const h1Line1 = hero.h1Line1 === 'Engineered for' ? 'Built on' : hero.h1Line1 || 'Built on';
  const ctaLabel = /^EXPLORE OUR HERITAGE/i.test(hero.ctaLabel || '') ? 'Explore Our Heritage' : hero.ctaLabel || 'Explore Our Heritage';
  const heroSlides = [
    '/images/client-final/Process_line.webp',
    '/images/client-final/cold-storage-products.webp',
    '/images/client-final/whole-egg-liquid-product.webp',
  ];
  const stats = Array.isArray(hero.stats) && hero.stats.length ? hero.stats : [
    { value: '60+', label: 'Years of Experience' },
    { value: '500K+', label: 'Eggs Traded Weekly' },
    { value: '3', label: 'Provinces Covered' },
    { value: '100%', label: 'Halal Certified' },
  ];
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '150px 0 82px',
      }}
    >
      {/* Static background image */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${heroSlides[0]}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, zIndex: 0,
        }}
      />

      {/* Light Dutch White overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(to bottom, rgba(251,247,240,0.86) 0%, rgba(251,247,240,0.6) 50%, rgba(251,247,240,0.9) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle brand grid overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(185, 50, 13, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(185, 50, 13, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none', zIndex: 1, opacity: 0.4,
        }}
      />

      {/* === MAIN CONTENT === */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', maxWidth: '800px' }}>
        <div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            fontWeight: 700, letterSpacing: '-0.02em',
            margin: '0 0 16px 0', textTransform: 'uppercase', color: '#111111', lineHeight: 1.1,
          }}>
            {h1Line1}<br />
            <span style={{
              background: 'linear-gradient(135deg, #111111 0%, #B9320D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{hero.h1Highlight || 'Quality & Trust'}</span>
          </h1>

          {/* Gold Drafting Line */}
          <div style={{
            height: '2px', background: 'linear-gradient(to right, transparent, #DE510A, transparent)',
            width: '320px', margin: '0 auto', transformOrigin: 'center',
          }} />

          <p style={{
            marginTop: '24px', fontSize: '17px', color: 'rgba(20,20,20,0.8)',
            maxWidth: '620px', lineHeight: 1.75, margin: '24px auto 0',
          }}>
            {hero.paragraph}
          </p>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '40px', flexWrap: 'wrap',
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px', fontWeight: 700, color: '#DE510A',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px', color: 'rgba(20,20,20,0.55)',
                fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em', marginTop: '4px',
                textTransform: 'uppercase', fontWeight: 700,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: '36px' }}>
          <button
            className="primary-btn"
            onClick={() => {
              const el = document.getElementById('scene-chairman');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '14px 36px', fontSize: '15px', backgroundColor: 'transparent',
              color: '#DE510A', border: '1px solid #DE510A', fontWeight: 600, cursor: 'pointer',
              letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s ease',
              textTransform: 'none',
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#DE510A'; e.target.style.color = '#111111'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#DE510A'; }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>

    </section>
  );
}
