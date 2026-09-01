import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useCMSStore } from '../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Register Animation Bible Curves
CustomEase.create("industrial", "M0,0 C0.1,0.8 0.2,1 1,1");
CustomEase.create("gauge", "M0,0 C0.2,0 0.4,1 0.9,1 1,1 1,1 1,1");

const LiveStatistic = ({ labelSteps, finalNumber, suffix }) => {
  const [currentLabel, setCurrentLabel] = useState(labelSteps[0]);
  const [num, setNum] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true
        }
      });

      // Sequence the boot labels
      labelSteps.forEach((step, idx) => {
        tl.call(() => setCurrentLabel(step), null, idx * 0.6);
      });

      // Spin the number at the end
      tl.to({ val: 0 }, {
        val: finalNumber,
        duration: 2.5,
        ease: "gauge",
        onUpdate: function() {
          setNum(Math.floor(this.targets()[0].val));
        }
      }, "+=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, [labelSteps, finalNumber]);

  return (
    <div className="live-stat-box" ref={containerRef}>
      <div className="stat-status-led"></div>
      <div className="stat-label-sequence">{currentLabel}</div>
      <div className="stat-number">{num.toLocaleString()}{suffix}</div>
      <div className="stat-crosshair top-left"></div>
      <div className="stat-crosshair bottom-right"></div>
    </div>
  );
};



export default function AboutSection() {
  const about = useCMSStore((s) => s.about);
  const sectionRef = useRef(null);
  const infraRef = useRef(null);
  const [activeInfra, setActiveInfra] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // P0 Brand Motion: Central Blueprint Axis
        gsap.fromTo('.blueprint-axis', 
          { scaleY: 0 },
          { 
            scaleY: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );

        // Assembly Timeline for Hero Text
        const textBlocks = gsap.utils.toArray('.assemble-block');
        textBlocks.forEach(block => {
          gsap.fromTo(block,
            { clipPath: 'inset(0 100% 0 0)', x: -20 },
            {
              clipPath: 'inset(0 0% 0 0)', x: 0,
              duration: 0.8,
              ease: "industrial",
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                scrub: 0.5
              }
            }
          );
        });

        // Sticky Scroll for Infrastructure Layers
        const paras = gsap.utils.toArray('.infra-paragraph');
        paras.forEach((para, index) => {
          ScrollTrigger.create({
            trigger: para,
            start: 'top center+=100',
            end: 'bottom center-=100',
            onToggle: (self) => {
              if (self.isActive) setActiveInfra(index);
            }
          });
        });

        // Expansion Map
        const mapNodes = gsap.utils.toArray('.map-node');
        gsap.fromTo(mapNodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.6,
            stagger: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: '.expansion-map',
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
              pin: true
            }
          }
        );
      });
      
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(['.blueprint-axis', '.assemble-block', '.map-node'], { clearProps: "all" });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="about-engineering-container">
      {/* Central Blueprint Axis Line */}
      <div className="blueprint-axis"></div>

      <section className="about-foundation" id="about">
        
        {/* Mission Statement Glass Panel */}
        <div className="container hero-content-wrapper" style={{ marginTop: '60px', marginBottom: '80px' }}>
            <div className="hero-content">
               <div className="hero-mission-box assemble-block" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                 <div className="mission-glass-panel">
                   <p className="mission-statement">{about.quote}</p>
                   <div className="mission-footer">{about.quoteFooter}</div>
                 </div>
               </div>
            </div>
        </div>
        
        {/* Infrastructure Sticky Layout */}
        <div className="infrastructure-sticky-layout" ref={infraRef}>
          <div className="infra-visual-sticky">
            <div className="sticky-container">
              <div className={`visual-slide ${activeInfra === 0 ? 'active' : ''}`}>
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="Corporate Foundation" />
                 <div className="visual-overlay"></div>
                 <div className="eng-scan-line"></div>
              </div>
              <div className={`visual-slide ${activeInfra === 1 ? 'active' : ''}`}>
                 <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="Supply Chain Efficiency" />
                 <div className="visual-overlay"></div>
                 <div className="eng-scan-line"></div>
              </div>
              <div className={`visual-slide ${activeInfra === 2 ? 'active' : ''}`}>
                 <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&q=80" alt="Operations Data Center" />
                 <div className="visual-overlay"></div>
                 <div className="eng-scan-line"></div>
              </div>
            </div>
          </div>
          
          <div className="infra-content-scroll">
            <div className="infra-header assemble-block">
              <span className="infra-dot"></span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <div className="infra-paragraphs-list">
              {about.paragraphs.map((p, i) => (
                <div key={i} className={`infra-paragraph ${i === activeInfra ? 'active' : ''}`}>
                  <span className="para-index">0{i+1}</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ height: '30vh' }}></div>
          </div>
        </div>
      </section>

      {/* Activation Phase: Live Operations Statistics */}
      <section className="about-activation" id="overview">
        <div className="container">
          <div className="sec-head center assemble-block">
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>LIVE OPERATIONS</div>
            <h2 className="sec-title">Operational Telemetry</h2>
          </div>
          
          <div className="live-stats-grid">
            <LiveStatistic 
              labelSteps={['Checking Farm Network...', 'Farm Network Verified', 'Loading Weekly Prod...', 'Production Confirmed']}
              finalNumber={1000} 
              suffix="+" 
            />
            <LiveStatistic 
              labelSteps={['Querying Distribution...', 'Routing Synchronized', 'Verifying Capacity...', 'Distribution Active']}
              finalNumber={50000} 
              suffix="+" 
            />
          </div>
          
          {/* Enterprise Expansion Map */}
          <div className="expansion-map">
            <h3 className="section-heading assemble-block" style={{ marginTop: '80px', marginBottom: '40px' }}>Geographical Infrastructure</h3>
            <div className="map-grid">
              <div className="map-route-line"></div>
              <div className="map-node">
                <div className="node-marker"></div>
                <div className="node-data">
                  <div className="node-year">2012</div>
                  <div className="node-desc">Headquarters Founded</div>
                  <div className="hover-metadata">Cap: 10k Units</div>
                </div>
              </div>
              <div className="map-node">
                <div className="node-marker"></div>
                <div className="node-data">
                  <div className="node-year">2016</div>
                  <div className="node-desc">Cold Chain Network</div>
                  <div className="hover-metadata">Role: Temp Control</div>
                </div>
              </div>
              <div className="map-node">
                <div className="node-marker"></div>
                <div className="node-data">
                  <div className="node-year">2020</div>
                  <div className="node-desc">National Hubs</div>
                  <div className="hover-metadata">Coverage: 100% Domestic</div>
                </div>
              </div>
              <div className="map-node">
                <div className="node-marker"></div>
                <div className="node-data">
                  <div className="node-year">2023</div>
                  <div className="node-desc">Quality Labs</div>
                  <div className="hover-metadata">Verification: Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-engineering-container { position: relative; padding: 120px 0; overflow: hidden; }
        
        /* Central Axis */
        .blueprint-axis { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: rgba(222,81,10,0.3); transform-origin: top center; z-index: 0; }
        .blueprint-axis::before { content: ''; position: absolute; left: -3px; top: 0; width: 7px; height: 100%; background: repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(222,81,10,0.1) 10px, rgba(222,81,10,0.1) 20px); }

        .container { position: relative; z-index: 2; }
        
        /* About Hero Slideshow */
        .about-hero-slideshow { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .about-hero-slideshow .slide-img { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 2s, transform 8s; transform: scale(1.05); filter: grayscale(20%); }
        .about-hero-slideshow .slide-img.active { opacity: 0.5; transform: scale(1); }
        .about-hero-slideshow .slide-overlay { position: absolute; inset: 0; background: radial-gradient(120% 100% at 80% 0%, rgba(222,81,10,0.4) 0%, rgba(251,247,240,0.6) 45%, rgba(251,247,240,0.92) 100%); }
        .about-hero-slideshow .slide-overlay::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, #FBF7F0 100%); }
        .hero-content-wrapper { position: relative; z-index: 2; }
        
        /* Cinematic Hero Styles */
        .about-hero-cinematic { position: relative; width: 100%; margin: 0; padding: 160px 0 100px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hero-grid-lines { position: absolute; inset: 0; pointer-events: none; }
        .hero-grid-lines .h-line { position: absolute; left: 0; right: 0; height: 1px; background: #DE510A; }
        .hero-grid-lines .h-line.top { top: 0; }
        .hero-grid-lines .h-line.bottom { bottom: 0; }
        .hero-grid-lines .h-line::before, .hero-grid-lines .h-line::after { content: ''; position: absolute; top: -3px; width: 7px; height: 7px; border: 1px solid rgba(20,20,20,0.2); border-radius: 50%; background: #FBF7F0; }
        .hero-grid-lines .h-line::before { left: -4px; }
        .hero-grid-lines .h-line::after { right: -4px; }

        .hero-meta { display: flex; gap: 32px; justify-content: center; margin-bottom: 24px; font-family: monospace; font-size: 11px; letter-spacing: 0.1em; color: rgba(222,81,10,0.8); border: 1px solid rgba(222,81,10,0.2); padding: 8px 24px; border-radius: 100px; background: rgba(222,81,10,0.05); }
        .meta-item { display: flex; align-items: center; gap: 8px; }
        .meta-dot { width: 6px; height: 6px; background: #DE510A; border-radius: 50%; box-shadow: 0 0 8px #DE510A; }
        
        .hero-massive-title { font-family: 'Space Grotesk',sans-serif; font-size: 72px; font-weight: 700; color: #111111; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 40px; }
        
        .hero-mission-box { max-width: 700px; margin: 0 auto; }
        .mission-glass-panel { background: rgba(222,81,10,0.45); border-top: 1px solid rgba(63,98,49,0.15); border-bottom: 1px solid rgba(63,98,49,0.15); padding: 40px; position: relative; backdrop-filter: blur(12px); box-shadow: 0 10px 40px rgba(63,98,49,0.15); }
        .mission-glass-panel::before, .mission-glass-panel::after { content: ''; position: absolute; width: 1px; height: 30px; background: rgba(20,20,20,0.2); }
        .mission-glass-panel::before { left: 0; top: 50%; transform: translateY(-50%); }
        .mission-glass-panel::after { right: 0; top: 50%; transform: translateY(-50%); }
        .mission-statement { font-family: 'Space Grotesk',sans-serif; font-size: 22px; font-weight: 400; line-height: 1.6; color: rgba(20,20,20,0.9); }
        .mission-footer { margin-top: 24px; font-size: 13px; color: rgba(20,20,20,0.5); font-family: monospace; letter-spacing: 0.05em; text-transform: uppercase; }
        
        @media (max-width: 768px) {
          .hero-massive-title { font-size: 48px; }
          .hero-meta { flex-direction: column; gap: 12px; border-radius: 12px; }
          .mission-statement { font-size: 18px; }
        }
        
        .eng-img { width: 100%; height: 300px; object-fit: cover; filter: grayscale(100%) contrast(1.2) brightness(0.8); opacity: 0.8; }
        .eng-overlay { position: absolute; inset: 16px; background: linear-gradient(rgba(222,81,10,0.25), rgba(185,50,13,0.45)); mix-blend-mode: multiply; }
.eng-scan-line { position: absolute; left: 16px; right: 16px; top: 16px; height: 2px; background: #DE510A; box-shadow: 0 0 10px #DE510A; opacity: 0.5; }

        /* Infrastructure Sticky Layout */
        .infrastructure-sticky-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 40px 32px;
        }
        .infra-visual-sticky {
          position: sticky;
          top: 140px;
          height: 440px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(63,98,49,0.25);
          border: 1px solid rgba(222,81,10,0.3);
        }
        .sticky-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .visual-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
          transform: scale(1.04);
        }
        .visual-slide.active {
          opacity: 1;
          transform: scale(1);
        }
        .visual-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(20,20,20,0.1) 0%, rgba(20,20,20,0.55) 100%);
        }
        .infra-content-scroll {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .infra-header {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: monospace;
          font-size: 11.5px;
          letter-spacing: 0.14em;
          color: #DE510A;
          background: rgba(222,81,10,0.08);
          border: 1px solid rgba(222,81,10,0.25);
          padding: 8px 18px;
          border-radius: 20px;
          align-self: flex-start;
        }
        .infra-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DE510A;
          box-shadow: 0 0 8px #DE510A;
        }
        .infra-paragraphs-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .infra-paragraph {
          position: relative;
          padding: 28px;
          border-radius: 16px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(63,98,49,0.5);
          backdrop-filter: blur(8px);
          transition: all 0.4s ease;
        }
        .infra-paragraph.active {
          background: rgba(255,255,255,0.98);
          border-color: #3F6231;
          box-shadow: 0 12px 36px rgba(63,98,49,0.18);
          transform: translateX(8px);
        }
        .para-index {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #DE510A;
          margin-bottom: 10px;
          display: block;
        }
        .infra-paragraph p {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(20,20,20,0.85);
          margin: 0;
        }

        /* Live Operations Statistics */
        .about-activation { padding-top: 120px; }
        .live-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
        .live-stat-box { position: relative; background: rgba(255,255,255,0.8); border: 1px solid rgba(63,98,49,0.45); padding: 40px; }
.stat-status-led { position: absolute; top: 20px; right: 20px; width: 6px; height: 6px; border-radius: 50%; background: #DE510A; }
        .stat-label-sequence { font-family: monospace; font-size: 13px; color: rgba(20,20,20,0.6); margin-bottom: 16px; min-height: 20px; }
        .stat-number { font-family: 'Space Grotesk',sans-serif; font-size: 64px; font-weight: 700; color: #111111; line-height: 1; }
        .stat-crosshair { position: absolute; width: 10px; height: 10px; border: 1px solid rgba(20,20,20,0.2); }
        .stat-crosshair.top-left { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .stat-crosshair.bottom-right { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        /* Expansion Map */
        .expansion-map { margin-top: 120px; position: relative; }
        .map-grid { display: flex; justify-content: space-between; position: relative; padding: 40px 0; }
        .map-route-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #DE510A; transform: translateY(-50%); z-index: 0; }
        .map-node { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 20px; cursor: pointer; }
        .node-marker { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #DE510A; background: #FBF7F0; transition: background 0.3s, transform 0.3s; }
        .map-node:hover .node-marker { background: #DE510A; transform: scale(1.2); }
        .node-data { text-align: center; position: relative; }
        .node-year { font-family: monospace; font-size: 16px; color: #DE510A; font-weight: 700; margin-bottom: 8px; }
        .node-desc { font-size: 13px; color: rgba(20,20,20,0.8); max-width: 120px; }
        
        .hover-metadata { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 12px; background: rgba(63,98,49,0.92); border: 1px solid rgba(185,50,13,0.5); padding: 8px 12px; font-family: monospace; font-size: 11px; color: #FCF3D9; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s; pointer-events: none; }
        .map-node:hover .hover-metadata { opacity: 1; visibility: visible; }

        @media (max-width: 960px) {
          .infrastructure-sticky-layout, .live-stats-grid { grid-template-columns: 1fr; gap: 30px; }
          .infra-visual-sticky { position: relative; top: 0; height: 280px; }
          .map-grid { flex-direction: column; align-items: flex-start; gap: 40px; }
          .map-route-line { width: 2px; height: 100%; left: 7px; top: 0; right: auto; transform: none; }
          .map-node { flex-direction: row; text-align: left; }
          .node-data { text-align: left; }
          .hover-metadata { top: 50%; left: 100%; transform: translateY(-50%); margin-top: 0; margin-left: 12px; }
        }
      `}</style>
    </div>
  );
}
