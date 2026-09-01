import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stages } from './StageData';

gsap.registerPlugin(ScrollTrigger);

export default function SupplyChainSection() {
  const containerRef = useRef(null);
  const selectorRef = useRef(null);
  
  // Track active stage by index (0 to 4)
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Check for mobile fallback
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (isMobile) return;
    
    // Create ScrollTriggers for each stage block
    const stageBlocks = gsap.utils.toArray('.stage-block');
    
    let ctx = gsap.context(() => {
      stageBlocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center+=100', // When the top of the block hits slightly below center
          end: 'bottom center-=100',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStageIndex(index);
            }
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const activeButton = selectorRef.current?.querySelector(`[data-stage-index="${activeStageIndex}"]`);
    activeButton?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeStageIndex, isMobile]);

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <div ref={containerRef} className="sc-journey-wrapper" style={{ position: 'relative' }}>
      
      <div className={`journey-layout ${isMobile ? 'mobile' : 'desktop'}`}>

        {isMobile ? (
          <div className="mobile-journey-panel">
            <div className="story-intro mobile-story-intro">
              <h2 className="sec-title">The Live Journey of an Egg</h2>
              <p className="sec-sub">Follow our guide through precision, reliability, and trust at every stage.</p>
            </div>

            <div className="mobile-stage-image">
              <img
                src={activeStage.image}
                alt={activeStage.title}
                className={activeStage.id === 'delivery' ? 'delivery-image' : ''}
              />
              <div className="visual-overlay" />
            </div>

            <div className="mobile-stage-content" aria-live="polite">
              <div className="stage-num">0{activeStageIndex + 1}</div>
              <h3 className="stage-title">{activeStage.title}</h3>
              <p className="stage-desc">{activeStage.description}</p>
              <div className="stage-stat">{activeStage.stats}</div>
            </div>

            <div className="mobile-stage-selector" ref={selectorRef} aria-label="Supply chain stages">
              {stages.map((stage, i) => (
                <button
                  key={stage.id}
                  type="button"
                  data-stage-index={i}
                  className={`mobile-stage-tab ${i === activeStageIndex ? 'active' : ''}`}
                  onClick={() => setActiveStageIndex(i)}
                  aria-pressed={i === activeStageIndex}
                >
                  <span>0{i + 1}</span>
                  {stage.title.replace('Farm ', '').replace('Quality ', '')}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* STICKY VISUAL SCENE */}
            <div className="journey-visual">
              <div className="sticky-container">
                {stages.map((stage, idx) => {
                  const isActive = idx === activeStageIndex;
                  return (
                    <div 
                      key={stage.id} 
                      className={`visual-slide ${stage.id === 'delivery' ? 'delivery-slide' : ''} ${isActive ? 'active' : ''}`}
                    >
                      <img src={stage.image} alt={stage.title} />
                      <div className="visual-overlay" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SCROLLABLE STORY CONTENT */}
            <div className="journey-content">
              <div className="story-intro">
                <h2 className="sec-title">The Live Journey of an Egg</h2>
                <p className="sec-sub">Follow our guide through precision, reliability, and trust at every stage.</p>
              </div>

              <div className="stages-list">
                {stages.map((stage, i) => {
                  const isActive = i === activeStageIndex;
                  return (
                    <div key={stage.id} className={`stage-block ${isActive ? 'active' : ''}`}>
                      <div className="stage-num">0{i + 1}</div>
                      <h3 className="stage-title">{stage.title}</h3>
                      <p className="stage-desc">{stage.description}</p>
                      <div className="stage-stat">{stage.stats}</div>
                    </div>
                  );
                })}
              </div>
              
              <div style={{ height: '40vh' }} />
            </div>
          </>
        )}
      </div>

      <style>{`
        .sc-journey-wrapper {
          background: #FBF7F0;
          color: #111111;
        }

        .journey-layout.desktop {
          display: flex;
          align-items: flex-start;
          position: relative;
        }

        .journey-visual {
          width: 50%;
        }
        
        .journey-layout.desktop .journey-visual {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: #FBF7F0;
        }

        .sticky-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Image Crossfade Transitions */
        .visual-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease-in-out, transform 8s ease-out;
          pointer-events: none;
        }
        
        .visual-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .visual-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .visual-slide.delivery-slide img {
          object-position: 44% center;
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(63,98,49,0.1) 0%, rgba(185,50,13,0.35) 100%);
          mix-blend-mode: multiply;
        }
        
        /* Gradient fade between left and right sides */
        .journey-visual::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to right, transparent, transparent);
          z-index: 3;
        }

        .journey-content {
          width: 50%;
          padding: 140px 80px 140px 80px;
        }

        .story-intro {
          margin-bottom: 150px;
        }
        .story-intro .sec-title {
          font-size: 48px;
          line-height: 1.1;
          margin: 16px 0;
          color: #111111;
        }
        .story-intro .sec-sub {
          color: rgba(20,20,20,0.72);
        }

        .stages-list {
          display: flex;
          flex-direction: column;
          gap: 150px;
        }

        .stage-block {
          opacity: 0.3;
          transform: translateX(20px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          border-left: 4px solid transparent;
          padding-left: 32px;
        }
        .stage-block.active {
          opacity: 1;
          transform: translateX(0);
          border-left-color: #DE510A;
        }

        .stage-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #DE510A;
          margin-bottom: 12px;
        }
        .stage-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #111111;
        }
        .stage-desc {
          font-size: 18px;
          color: rgba(20,20,20,0.72);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .stage-stat {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #111111;
          background: #FFFFFF;
          border: 1px solid #3F6231;
          padding: 6px 16px;
          border-radius: 20px;
        }

        /* Mobile Layout */
        .journey-layout.mobile {
          display: block;
          padding: 84px 0 72px;
        }

        .mobile-journey-panel {
          width: min(100%, 560px);
          margin: 0 auto;
          padding: 0 20px;
        }

        .mobile-story-intro {
          margin-bottom: 28px;
          text-align: left;
        }

        .mobile-story-intro .sec-title {
          font-size: clamp(30px, 8vw, 42px);
          line-height: 1.08;
          margin: 0 0 14px;
          color: #111111;
        }

        .mobile-story-intro .sec-sub {
          font-size: 15px;
          line-height: 1.65;
          margin: 0;
          color: rgba(20,20,20,0.72);
        }

        .mobile-stage-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          min-height: 260px;
          max-height: 390px;
          overflow: hidden;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 18px 42px rgba(63,98,49,0.16);
        }

        .mobile-stage-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .mobile-stage-image img.delivery-image {
          object-position: 43% center;
        }

        .mobile-stage-image .visual-overlay {
          opacity: 0.72;
          pointer-events: none;
        }

        .mobile-stage-content {
          position: relative;
          margin-top: 24px;
          padding-left: 22px;
          border-left: 4px solid #B9320D;
        }

        .mobile-stage-content .stage-title {
          font-size: clamp(26px, 7vw, 34px);
          line-height: 1.12;
          margin-bottom: 12px;
        }

        .mobile-stage-content .stage-desc {
          font-size: 15.5px;
          line-height: 1.65;
          margin-bottom: 18px;
        }

        .mobile-stage-content .stage-stat {
          max-width: 100%;
          white-space: normal;
          line-height: 1.35;
          border-radius: 999px;
          padding: 7px 14px;
        }

        .mobile-stage-selector {
          display: flex;
          gap: 10px;
          margin-top: 28px;
          padding: 4px 0 8px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .mobile-stage-selector::-webkit-scrollbar {
          display: none;
        }

        .mobile-stage-tab {
          flex: 0 0 auto;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 14px;
          border: 1px solid rgba(63,98,49,0.38);
          border-radius: 999px;
          background: #FFFFFF;
          color: rgba(20,20,20,0.72);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          scroll-snap-align: center;
          box-shadow: 0 8px 18px rgba(63,98,49,0.08);
          transition: background .2s, color .2s, border-color .2s, box-shadow .2s;
        }

        .mobile-stage-tab span {
          color: #DE510A;
          font-size: 12px;
        }

        .mobile-stage-tab.active {
          background: #3F6231;
          border-color: #3F6231;
          color: #FFFFFF;
          box-shadow: 0 12px 24px rgba(63,98,49,0.22);
        }

        .mobile-stage-tab.active span {
          color: #FCF3D9;
        }

        @media (max-width: 420px) {
          .mobile-journey-panel { padding: 0 16px; }
          .mobile-stage-image {
            min-height: 238px;
            border-radius: 16px;
          }
          .mobile-stage-tab {
            padding: 9px 12px;
            font-size: 12.5px;
          }
        }
      `}</style>
    </div>
  );
}
