import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SceneCTA() {
  const containerRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Button reveal
      gsap.fromTo(btnRef.current,
        { scale: 0.95, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Static warm edge on the button
      gsap.set(btnRef.current, { boxShadow: '0 0 35px 8px rgba(222, 81, 10, 0.35)' });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        padding: '100px 20px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(20, 20, 20, 0.5)', marginBottom: '10px', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
          THE JOURNEY IS COMPLETE
        </p>

        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: '700', marginBottom: '30px', lineHeight: 1.3 }}>
          Discover how every egg moves through our certified supply chain.
        </h2>

        <button
          ref={btnRef}
          className="primary-btn"
          style={{
            padding: '16px 40px',
            fontSize: '16px',
            backgroundColor: '#DE510A',
            color: '#111111',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
          onClick={() => (window.location.href = '/')}
        >
          Explore Our Supply Chain
        </button>
      </div>
    </section>
  );
}
