import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ecosystemData = {
  id: 'root',
  name: 'Yousafzai Eggs Traders Group',
  role: 'Holding / Corporate Governance',
  capacity: '500,000+ Eggs Weekly',
  markets: 'National (Pakistan)',
  ops: 'Vertical Integration Sourcing',
  icon: '🏢',
  children: [
    { name: 'Egg Production', role: 'Poultry Farming Operations', capacity: 'China Chowk & Phalai Farms', markets: 'KPK, Punjab', ops: 'ISO Sourced / Traceable', icon: '🥚' },
    { name: 'Processing', role: 'Agri Foods Liquid Plant', capacity: '45,000 Eggs / Hour', markets: 'Industrial B2B', ops: 'Value-Added Liquid Egg', icon: '⚙️' },
    { name: 'Packaging', role: 'Hygienic Sizing & Sorting', capacity: '6 to 360 Pack Cartons', markets: 'Retailers & Wholesalers', ops: 'Custom Branded Trays', icon: '📦' },
    { name: 'Distribution', role: 'Cold Chain Logistics', capacity: '35 Refrigerated Vehicles', markets: 'Pan-Pakistan Delivery', ops: 'Continuous 2–5°C Tracking', icon: '🚚' },
  ],
};

export default function SceneEcosystem() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(ecosystemData);
  const [activeIdx, setActiveIdx] = useState(-1); // -1 = root

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {

      // Header
      const hTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
      hTl
        .fromTo('.eco-eyebrow', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo('.eco-heading', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.2')
        .fromTo('.eco-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3');

      // Core hub
      gsap.fromTo('.eco-hub',
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
        }
      );

      // Branches
      gsap.fromTo('.eco-branch',
        { autoAlpha: 0, scaleX: 0 },
        {
          autoAlpha: 1, scaleX: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 55%' },
        }
      );

      // Child nodes
      gsap.fromTo('.eco-child-node',
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 50%' },
        }
      );

      // Info panel
      gsap.fromTo('.eco-panel',
        { x: 60, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 55%' },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const selectNode = (node, idx) => {
    setActiveNode(node);
    setActiveIdx(idx);
    // Animate the panel content swap
    gsap.fromTo('.eco-panel-inner',
      { y: 15, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  // Positions for the 4 child nodes (top, right, bottom, left)
  const nodePositions = [
    { top: '-90px', left: '50%', tx: '-50%', ty: '0' },     // Top
    { top: '50%', right: '-110px', tx: '0', ty: '-50%' },    // Right
    { bottom: '-90px', left: '50%', tx: '-50%', ty: '0' },   // Bottom
    { top: '50%', left: '-110px', tx: '0', ty: '-50%' },     // Left
  ];

  // Branch line positions (from center to each node)
  const branchAngles = [270, 0, 90, 180]; // degrees: top, right, bottom, left

  return (
    <section ref={containerRef} className="eco-section">

      {/* Ambient bg */}
      <div className="eco-bg-grid" />
      <div className="eco-bg-glow" />

      {/* Header */}
      <div className="eco-header">
        <span className="eco-eyebrow">CORPORATE_STRUCTURE // ECOSYSTEM</span>
        <h2 className="eco-heading">Company Ecosystem</h2>
        <p className="eco-sub">Hover over each node to explore our vertically integrated operations.</p>
      </div>

      <div className="eco-layout">

        {/* LEFT: Visual Network */}
        <div className="eco-network">

          {/* Branch lines */}
          {branchAngles.map((angle, i) => (
            <div
              key={`branch-${i}`}
              className="eco-branch"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100px',
                height: '2px',
                transformOrigin: '0 50%',
                transform: `rotate(${angle}deg)`,
                background: activeIdx === i
                  ? 'linear-gradient(90deg, #DE510A, rgba(222,81,10,0.1))'
                  : 'linear-gradient(90deg, rgba(20,20,20,0.1), transparent)',
                transition: 'background 0.4s',
              }}
            />
          ))}

          {/* Core Hub */}
          <div
            className={`eco-hub ${activeIdx === -1 ? 'hub-active' : ''}`}
            onClick={() => selectNode(ecosystemData, -1)}
            onMouseEnter={() => selectNode(ecosystemData, -1)}
          >
            <div className="hub-glow" />
            <span className="hub-label">PARENT_COMPANY</span>
            <h3 className="hub-name">Yousafzai Eggs Traders</h3>
          </div>

          {/* Child Nodes */}
          {ecosystemData.children.map((child, idx) => {
            const pos = nodePositions[idx];
            const isActive = activeIdx === idx;

            return (
              <div
                key={idx}
                className={`eco-child-node ${isActive ? 'child-active' : ''}`}
                style={{
                  position: 'absolute',
                  top: pos.top || 'auto',
                  bottom: pos.bottom || 'auto',
                  left: pos.left || 'auto',
                  right: pos.right || 'auto',
                  transform: `translate(${pos.tx}, ${pos.ty})`,
                }}
                onClick={() => selectNode(child, idx)}
                onMouseEnter={() => selectNode(child, idx)}
              >
                <span className="child-icon">{child.icon}</span>
                <span className="child-name">{child.name}</span>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Info Panel */}
        <div className="eco-panel">
          <div className="eco-panel-inner">
            <div className="panel-top-bar">
              <span className="panel-tag">NODE_TELEMETRY</span>
              <span className="panel-status-dot" />
              <span className="panel-status-text">ONLINE</span>
            </div>

            <h2 className="panel-title">{activeNode.name}</h2>
            <div className="panel-divider" />

            <div className="panel-grid">
              <div className="panel-cell">
                <div className="cell-label">ROLE</div>
                <div className="cell-value">{activeNode.role}</div>
              </div>
              <div className="panel-cell">
                <div className="cell-label">CAPACITY</div>
                <div className="cell-value">{activeNode.capacity}</div>
              </div>
              <div className="panel-cell">
                <div className="cell-label">MARKETS</div>
                <div className="cell-value">{activeNode.markets}</div>
              </div>
              <div className="panel-cell">
                <div className="cell-label">STATUS</div>
                <div className="cell-value cell-status">
                  <span className="status-indicator" />
                  {activeNode.ops}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           SECTION
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .eco-section {
          background: #0a1222;
          color: #111111;
          padding: 140px 40px 120px;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        /* Grid pattern bg */
        .eco-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .eco-bg-glow {
          position: absolute;
          top: 50%;
          left: 30%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(222,81,10,0.06) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           HEADER
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .eco-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 80px;
          position: relative;
          z-index: 2;
        }

        .eco-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #DE510A;
          display: block;
          margin-bottom: 16px;
          visibility: hidden;
        }

        .eco-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .eco-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.45);
          line-height: 1.6;
          margin: 0;
          visibility: hidden;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           LAYOUT
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .eco-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           NETWORK (LEFT)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .eco-network {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* â”€â”€ Hub (Center) â”€â”€ */
        .eco-hub {
          position: relative;
          z-index: 10;
          padding: 24px 36px;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 16px;
          background: #FFFFFF;
          backdrop-filter: blur(12px);
          cursor: pointer;
          text-align: center;
          transition: all 0.4s;
          visibility: hidden;
        }

        .eco-hub:hover,
        .eco-hub.hub-active {
          border-color: #3F6231;
          box-shadow: 0 0 40px rgba(63,98,49,0.25), 0 0 80px rgba(63,98,49,0.1);
        }

        .hub-glow {
          position: absolute;
          inset: -20px;
          border-radius: 30px;
          background: radial-gradient(circle, rgba(222,81,10,0.08) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .eco-hub:hover .hub-glow,
        .eco-hub.hub-active .hub-glow {
          opacity: 1;
        }

        .hub-label {
          font-family: monospace;
          font-size: 10px;
          color: #DE510A;
          letter-spacing: 0.15em;
        }

        .hub-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin: 8px 0 0;
          color: #111111;
        }

        /* â”€â”€ Child Nodes â”€â”€ */
        .eco-child-node {
          z-index: 10;
          padding: 14px 22px;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 12px;
          background: #FFFFFF;
          backdrop-filter: blur(8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.4s;
          visibility: hidden;
          white-space: nowrap;
        }

        .eco-child-node:hover,
        .eco-child-node.child-active {
          border-color: #3F6231;
          background: #FFFFFF;
          box-shadow: 0 0 30px rgba(63,98,49,0.18);
          transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.08) !important;
        }

        .child-icon {
          font-size: 20px;
        }

        .child-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(20,20,20,0.8);
        }

        .child-active .child-name {
          color: #111111;
        }

        /* â”€â”€ Branches â”€â”€ */
        .eco-branch {
          visibility: hidden;
          z-index: 1;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           INFO PANEL (RIGHT)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .eco-panel {
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 20px;
          padding: 44px;
          background: #FFFFFF;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          visibility: hidden;
        }

        .eco-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9, #DE510A);
          opacity: 0.6;
        }

        .panel-top-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .panel-tag {
          font-family: monospace;
          font-size: 11px;
          color: #DE510A;
          letter-spacing: 0.12em;
        }

        .panel-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.5);
          margin-left: auto;
        }

        .panel-status-text {
          font-family: monospace;
          font-size: 10px;
          color: #4ade80;
          letter-spacing: 0.1em;
        }

        .panel-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 700;
          margin: 0 0 20px;
          color: #111111;
        }

        .panel-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(222,81,10,0.3), transparent);
          margin-bottom: 28px;
        }

        .panel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .panel-cell {}

        .cell-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(20,20,20,0.3);
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .cell-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          color: rgba(20,20,20,0.85);
          line-height: 1.5;
        }

        .cell-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4ade80;
        }

        .status-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 900px) {
          .eco-section {
            padding: 100px 20px 80px;
          }

          .eco-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .eco-network {
            height: 320px;
          }

          .eco-hub {
            padding: 18px 24px;
          }

          .hub-name {
            font-size: 15px;
          }

          .eco-child-node {
            padding: 10px 16px;
          }

          .child-name {
            font-size: 12px;
          }

          .eco-panel {
            padding: 30px;
          }

          .panel-title {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
}
