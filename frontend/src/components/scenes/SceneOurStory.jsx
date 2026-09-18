import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

const fallbackMilestones = [
  {
    id: '1960',
    year: '1960',
    title: 'Foundation',
    desc: 'Established a retail shop in Mardan for egg trading.',
    img: '/images/white-eggs-product.webp',
    stats: 'FOUNDATION',
    metric: '60+',
    metricLabel: 'Years of Trust'
  },
  {
    id: '2000',
    year: '2000',
    title: 'Supply Network',
    desc: 'Built a strong supply network connecting farms to markets across KPK.',
    img: '/images/placeholders/truck_delievry.webp',
    stats: 'FARM TO MARKET',
    metric: 'KPK',
    metricLabel: 'Market Network'
  },
  {
    id: '2020',
    year: '2020',
    title: 'Sales Expansion',
    desc: 'Opened a second sales point in Peshawar.',
    img: '/images/client-final/Sale_Expansion.webp',
    stats: 'PESHAWAR SALES',
    metric: '2',
    metricLabel: 'Sales Points'
  },
  {
    id: 'end-2026',
    year: 'End 2026',
    title: 'Rashakai Processing',
    desc: 'Commercial production is planned for the Egg Liquid Processing Plant at Rashakai Economic Zone.',
    img: '/images/client-final/Process_line.webp',
    stats: 'AGRI FOODS',
    metric: '150 Kg',
    metricLabel: 'Production / hour'
  }
];

function isMilestoneObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function isRemovedLegacyMilestone(milestone) {
  if (!isMilestoneObject(milestone)) return false;
  return (
    milestone.id === '2022'
    || milestone.year === '2022'
    || milestone.title === 'Poultry Farm'
    || milestone.id === '2025'
    || milestone.year === '2025'
    || milestone.title === 'Phalai Farm'
  );
}

function normalizeLegacyMilestones(sourceMilestones) {
  const source = (Array.isArray(sourceMilestones) && sourceMilestones.length
    ? sourceMilestones
    : fallbackMilestones
  ).filter((milestone) => !isRemovedLegacyMilestone(milestone));

  const hasMilestone = (items, fallback) => items.some((item) => {
    if (!isMilestoneObject(item)) return false;
    return item.id === fallback.id || item.year === fallback.year || item.title === fallback.title;
  });

  const normalized = source.map((milestone) => {
    if (!isMilestoneObject(milestone)) return milestone;
    const fallback = fallbackMilestones.find((item) => (
      item.id === milestone.id
      || item.year === milestone.year
      || item.title === milestone.title
      || (milestone.title === 'Retail Origins' && item.id === '1960')
    ));
    return fallback ? { ...milestone, ...fallback } : milestone;
  });

  fallbackMilestones.forEach((fallback) => {
    if (!hasMilestone(normalized, fallback)) {
      normalized.push(fallback);
    }
  });

  return normalized;
}

export default function SceneOurStory() {
  const story = useCMSStore((s) => s.aboutScenes?.ourStory) || {};
  const milestones = normalizeLegacyMilestones(story.milestones);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {

      // Header reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      });
      headerTl
        .fromTo('.leg-heading', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo('.leg-subtext', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.leg-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3');

      // Vertical line draw
      gsap.fromTo('.leg-vline-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.leg-timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.8,
          }
        }
      );

      // Each card
      gsap.utils.toArray('.leg-milestone').forEach((card, i) => {
        const isLeft = i % 2 === 0;

        // Card body slide in
        gsap.fromTo(card.querySelector('.leg-card-body'),
          { x: isLeft ? -80 : 80, autoAlpha: 0, rotationY: isLeft ? -6 : 6 },
          {
            x: 0,
            autoAlpha: 1,
            rotationY: 0,
            duration: 1,
            immediateRender: false,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Image parallax inside the card
        gsap.fromTo(card.querySelector('.leg-card-img img'),
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );

        // Node glow pulse
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIdx(i),
          onEnterBack: () => setActiveIdx(i),
        });

        // Metric counter animation
        const metricEl = card.querySelector('.leg-metric-value');
        if (metricEl) {
          gsap.fromTo(metricEl,
            { autoAlpha: 0, y: 20, scale: 0.8 },
            {
              autoAlpha: 1, y: 0, scale: 1,
              duration: 0.8,
              immediateRender: false,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 65%',
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector('.leg-card-body');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 6,
      rotationX: y * -4,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.4,
    });
    // Glow follow
    card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget.querySelector('.leg-card-body');
    if (!card) return;
    gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.6 });
  };

  return (
    <section id="legacy" ref={sectionRef} className="leg-section">

      {/* Ambient background particles */}
      <div className="leg-ambient">
        <div className="leg-orb leg-orb-1" />
        <div className="leg-orb leg-orb-2" />
      </div>

      {/* Header */}
      <div ref={headerRef} className="leg-header">
        <h2 className="leg-heading">{story.title || 'Our Legacy'}</h2>
        <p className="leg-subtext">{story.subtext || 'Six decades of growth — from a single retail shop to a vertically integrated enterprise.'}</p>
        <div className="leg-divider-line" />
      </div>

      {/* Timeline */}
      <div className="leg-timeline">

        {/* Vertical Line */}
        <div className="leg-vline">
          <div className="leg-vline-fill" />
        </div>

        {milestones.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeIdx === index;

          return (
            <div
              key={item.id}
              className={`leg-milestone ${isLeft ? 'ms-left' : 'ms-right'}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Node on line */}
              <div className={`leg-node ${isActive ? 'node-active' : ''}`}>
                <div className="leg-node-ring" />
                <div className="leg-node-dot" />
                {isActive && <div className="leg-node-pulse" />}
              </div>

              {/* Year Label */}
              <div className={`leg-year-label ${isActive ? 'year-active' : ''}`}>
                {item.year}
              </div>

              {/* Card */}
              <div className="leg-card-body">
                {/* Hover Glow */}
                <div className="leg-card-glow" />

                {/* Image */}
                <div className="leg-card-img">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="leg-card-img-overlay" />
                  <div className="leg-card-year-bg">{item.year}</div>
                </div>

                {/* Info */}
                <div className="leg-card-info">
                  <div className="leg-card-top-row">
                    <span className="leg-card-tag">{item.stats}</span>
                    <div className="leg-metric">
                      <span className="leg-metric-value">{item.metric}</span>
                      <span className="leg-metric-label">{item.metricLabel}</span>
                    </div>
                  </div>
                  <h3 className="leg-card-title">{item.title}</h3>
                  <p className="leg-card-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        /* SECTION BASE */
        .leg-section {
          background: #FBF7F0;
          color: #111111;
          padding: 140px 24px 120px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient orbs */
        .leg-ambient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .leg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
        }

        .leg-orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #DE510A 0%, transparent 70%);
          top: 10%;
          left: -200px;
        }

        .leg-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #DE510A 0%, transparent 70%);
          bottom: 5%;
          right: -150px;
        }

        /* HEADER */
        .leg-header {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 100px;
        }

        .leg-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .leg-subtext {
          font-size: 17px;
          color: rgba(20,20,20,0.5);
          line-height: 1.7;
          margin: 0 0 30px;
          visibility: hidden;
        }

        .leg-divider-line {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* TIMELINE */
        .leg-timeline {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          z-index: 2;
        }

        /* Vertical line */
        .leg-vline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #DE510A;
          transform: translateX(-50%);
          z-index: 1;
        }

        .leg-vline-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #DE510A 0%, #F2E7C9 50%, #DE510A 100%);
          transform-origin: top center;
          transform: scaleY(0);
          box-shadow: 0 0 16px rgba(222,81,10,0.25);
        }

        /* MILESTONE CARD */
        .leg-milestone {
          position: relative;
          width: 50%;
          padding: 0 50px 100px;
        }

        .leg-milestone.ms-left {
          margin-left: 0;
          padding-right: 60px;
        }

        .leg-milestone.ms-right {
          margin-left: 50%;
          padding-left: 60px;
        }

        /* Node */
        .leg-node {
          position: absolute;
          top: 40px;
          z-index: 10;
          width: 20px;
          height: 20px;
        }

        .ms-left .leg-node {
          right: -10px;
        }

        .ms-right .leg-node {
          left: -10px;
        }

        .leg-node-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(222,81,10,0.15);
          transition: border-color 0.5s;
        }

        .node-active .leg-node-ring {
          border-color: rgba(222,81,10,0.5);
        }

        .leg-node-dot {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: #111111;
          border: 2px solid rgba(222,81,10,0.3);
          transition: all 0.5s;
        }

        .node-active .leg-node-dot {
          background: #DE510A;
          border-color: #DE510A;
          box-shadow: 0 0 20px rgba(222,81,10,0.6);
        }

        .leg-node-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(222,81,10,0.3);
        }

        /* Year Label */
        .leg-year-label {
          position: absolute;
          top: 30px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: rgba(20,20,20,0.15);
          transition: all 0.5s;
          z-index: 10;
        }

        .ms-left .leg-year-label {
          right: 24px;
        }

        .ms-right .leg-year-label {
          left: 24px;
        }

        .year-active {
          color: #DE510A;
          text-shadow: 0 0 20px rgba(222,81,10,0.3);
        }

        /* Card Body */
        .leg-card-body {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.5s, box-shadow 0.5s;
          transform-style: preserve-3d;
        }

        .leg-milestone:hover .leg-card-body {
          border-color: rgba(222,81,10,0.3);
          box-shadow:
            0 30px 80px rgba(63,98,49,0.12),
            0 0 40px rgba(222,81,10,0.08),
            inset 0 1px 0 rgba(20,20,20,0.05);
        }

        /* Hover glow */
        .leg-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(222,81,10,0.08),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 0;
        }

        .leg-milestone:hover .leg-card-glow {
          opacity: 1;
        }

        /* Image */
        .leg-card-img {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .leg-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .leg-milestone:hover .leg-card-img img {
          transform: scale(1.08);
        }

        .leg-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(222, 81, 10, 0.85) 100%
          );
          pointer-events: none;
        }

        .leg-card-year-bg {
          position: absolute;
          bottom: -12px;
          right: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 90px;
          font-weight: 800;
          color: rgba(20,20,20,0.04);
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
        }

        /* Info */
        .leg-card-info {
          padding: 30px;
          position: relative;
          z-index: 1;
        }

        .leg-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .leg-card-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #DE510A;
          background: rgba(222,81,10,0.08);
          border: 1px solid rgba(222,81,10,0.18);
          padding: 6px 14px;
          border-radius: 6px;
        }

        .leg-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .leg-metric-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #DE510A;
          line-height: 1;
        }

        .leg-metric-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(20,20,20,0.35);
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        .leg-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #111111;
        }

        .leg-card-desc {
          font-size: 15px;
          color: rgba(20,20,20,0.55);
          line-height: 1.7;
          margin: 0;
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .leg-section {
            padding: 100px 16px 80px;
          }

          .leg-header {
            margin-bottom: 60px;
          }

          .leg-vline {
            left: 24px;
          }

          .leg-milestone,
          .leg-milestone.ms-left,
          .leg-milestone.ms-right {
            width: 100%;
            margin-left: 0;
            padding: 0 0 60px 56px;
          }

          .ms-left .leg-node,
          .ms-right .leg-node {
            left: 14px;
            right: auto;
          }

          .ms-left .leg-year-label,
          .ms-right .leg-year-label {
            left: 48px;
            right: auto;
          }

          .leg-card-img {
            height: 200px;
          }

          .leg-card-info {
            padding: 24px;
          }

          .leg-card-top-row {
            flex-direction: column;
            gap: 12px;
          }

          .leg-metric {
            align-items: flex-start;
          }

          .leg-card-title {
            font-size: 22px;
          }

          .leg-card-year-bg {
            font-size: 60px;
          }

          .leg-orb-1 {
            width: 300px;
            height: 300px;
          }

          .leg-orb-2 {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}
