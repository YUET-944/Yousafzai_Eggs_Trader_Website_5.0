import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

export default function SceneVisionMission() {
  const vm = useCMSStore((s) => s.aboutScenes?.visionMission) || {};
  const vision = vm.vision || {};
  const mission = vm.mission || {};
  const missionItems = Array.isArray(mission.items) && mission.items.length ? mission.items : [];
  const containerRef = useRef(null);
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Background subtle scale effect
      gsap.fromTo(bgRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Vision Card Animation (Slide in from Left)
      gsap.fromTo(visionCardRef.current,
        { x: -100, autoAlpha: 0, rotationY: -10 },
        {
          x: 0,
          autoAlpha: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // Mission Card Animation (Slide in from Right)
      gsap.fromTo(missionCardRef.current,
        { x: 100, autoAlpha: 0, rotationY: 10 },
        {
          x: 0,
          autoAlpha: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2, // slightly delayed behind Vision
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // Stagger list items inside Mission
      gsap.fromTo('.mission-list li',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover Glow Effect
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Slight 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg tilt
    const rotateY = ((x - centerX) / centerX) * 3;
    
    gsap.to(ref.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <section
      ref={containerRef}
      className="sc-vision-wrapper"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 20px',
        color: '#111111',
        overflow: 'hidden'
      }}
    >
      {/* Background Image & Overlay */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: -50, // Slightly larger to allow scale effect
          backgroundImage: `url("${vm.bgImage || '/images/client-final/Process_line.webp'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(251,247,240,0.85) 0%, rgba(251,247,240,0.96) 100%)',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: 0, color: '#111111' }}>
          {vm.title || 'Vision & Mission'}
        </h2>
      </div>

      <div className="vm-layout">
        
        {/* Vision Card */}
        <div 
          ref={visionCardRef}
          className="vm-card vision-card"
          onMouseMove={(e) => handleMouseMove(e, visionCardRef)}
          onMouseLeave={() => handleMouseLeave(visionCardRef)}
        >
          <div className="card-glow" />
          <div className="card-content">
            <h3 className="card-title">{vision.title || 'Transforming the Value Chain'}</h3>
            <p className="card-desc">
              {vision.desc}
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div 
          ref={missionCardRef}
          className="vm-card mission-card"
          onMouseMove={(e) => handleMouseMove(e, missionCardRef)}
          onMouseLeave={() => handleMouseLeave(missionCardRef)}
        >
          <div className="card-glow" />
          <div className="card-content">
            <h3 className="card-title">{mission.title || 'Quality & Value Creation'}</h3>
            
            <ul className="mission-list">
              {missionItems.map((item, i) => (
                <li key={i}>
                  <div className="list-icon">
                    <div className="dot" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <style>{`
        .sc-vision-wrapper {
          --card-bg: #FFFFFF;
          --card-border: rgba(63, 98, 49, 0.45);
          --glow-color: rgba(63, 98, 49, 0.14);
        }

        .sc-vision-wrapper .vm-layout {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .sc-vision-wrapper .vm-card {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 50px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(63, 98, 49, 0.2);
          transform-style: preserve-3d;
        }

        /* Hover Glow Effect */
        .sc-vision-wrapper .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            var(--glow-color), 
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 0;
        }

        .sc-vision-wrapper .vm-card:hover .card-glow {
          opacity: 1;
        }
        
        .sc-vision-wrapper .vm-card:hover {
          border-color: rgba(63, 98, 49, 0.7);
        }

        .sc-vision-wrapper .card-content {
          position: relative;
          z-index: 1;
          transform: translateZ(30px); /* Pushes content out slightly for 3D effect */
        }

        .sc-vision-wrapper .vision-card {
          flex: 1.1;
          margin-bottom: 80px;
        }

        .sc-vision-wrapper .mission-card {
          flex: 1;
          margin-top: 80px;
          margin-left: -60px; /* Slight overlap */
          background: #DCE7D5; /* Slightly darker */
        }

        .sc-vision-wrapper .card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 20px 0;
          line-height: 1.2;
          color: #111111;
        }

        .sc-vision-wrapper .card-desc {
          font-size: 18px;
          color: rgba(20,20,20,0.85);
          line-height: 1.7;
          margin: 0;
        }

        .sc-vision-wrapper .mission-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sc-vision-wrapper .mission-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 16px;
          color: rgba(20,20,20,0.88);
          line-height: 1.6;
        }

        .sc-vision-wrapper .list-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(222, 81, 10, 0.1);
          border: 1px solid rgba(222, 81, 10, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .sc-vision-wrapper .list-icon .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DE510A;
          box-shadow: 0 0 10px #DE510A;
        }

        /* Mobile Layout */
        @media (max-width: 900px) {
          .sc-vision-wrapper .vm-layout {
            flex-direction: column;
            gap: 30px;
          }
          
          .sc-vision-wrapper .vision-card,
          .sc-vision-wrapper .mission-card {
            flex: none;
            margin: 0;
            width: 100%;
          }

          .sc-vision-wrapper .vm-card {
            padding: 30px;
          }

          .sc-vision-wrapper .card-title {
            font-size: 26px;
          }
          
          .sc-vision-wrapper .card-desc {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
