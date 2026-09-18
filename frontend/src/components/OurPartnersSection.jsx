import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PARTNERS = [
  {
    id: 'peek-freans',
    name: 'Peek Freans',
    logo: '/images/partners/peek-freans.webp',
    maxHeight: 90,
  },
  {
    id: 'silver-lake-foods',
    name: 'Silver Lake Foods',
    logo: '/images/partners/silver-lake-foods.webp',
    maxHeight: 68,
  },
  {
    id: 'barkat-frisian',
    name: 'Barkat Frisian (Value Added Egg Products)',
    logo: '/images/partners/barkat-frisian.webp',
    maxHeight: 84,
  },
  {
    id: 'master-baker',
    name: 'Master Baker',
    logo: '/images/partners/master-baker.webp',
    maxHeight: 84,
  },
  {
    id: 'tehzeeb-bakers',
    name: 'Tehzeeb Bakers',
    logo: '/images/partners/tehzeeb-bakers.webp',
    maxHeight: 80,
  },
  {
    id: 'salman-sweets',
    name: 'Salman Sweets & Bakers',
    logo: '/images/partners/salman-sweets.webp',
    maxHeight: 80,
  },
  {
    id: 'dawn-foods',
    name: 'Dawn Foods',
    logo: '/images/partners/dawn-foods.webp',
    maxHeight: 74,
  },
];

export default function OurPartnersSection() {
  const [previewIdx, setPreviewIdx] = useState(null);
  const [previewRect, setPreviewRect] = useState(null);
  const previewTimerRef = useRef(null);
  const canHoverRef = useRef(false);

  const clearPreviewTimer = () => {
    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
  };

  const showPreview = (idx, target) => {
    if (!canHoverRef.current || !target) return;
    clearPreviewTimer();
    const rect = target.getBoundingClientRect();
    const tooltipWidth = 236;
    const gutter = 12;
    const safeLeft = Math.max(
      tooltipWidth / 2 + gutter,
      Math.min(window.innerWidth - tooltipWidth / 2 - gutter, rect.left + rect.width / 2)
    );

    setPreviewRect({
      left: safeLeft,
      top: rect.top,
    });
    setPreviewIdx(idx);
  };

  const schedulePreviewClose = () => {
    clearPreviewTimer();
    previewTimerRef.current = window.setTimeout(() => {
      setPreviewIdx(null);
      setPreviewRect(null);
    }, 180);
  };

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncHover = () => {
      canHoverRef.current = mq.matches;
      if (!mq.matches) {
        setPreviewIdx(null);
        setPreviewRect(null);
      }
    };

    syncHover();
    mq.addEventListener?.('change', syncHover);

    return () => {
      mq.removeEventListener?.('change', syncHover);
      clearPreviewTimer();
    };
  }, []);

  return (
    <section id="our-partners" className="partners-section" aria-label="Our B2B Partners">
      <div className="partners-container">
        <div className="partners-header">
          <h2 className="partners-title">
            Our <span className="partners-title-accent">B2B Partners</span>
          </h2>
        </div>

        <div className="partners-grid">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner.id}
              className="partner-item"
              onMouseEnter={(e) => showPreview(i, e.currentTarget)}
              onMouseLeave={schedulePreviewClose}
              onFocus={(e) => showPreview(i, e.currentTarget)}
              onBlur={schedulePreviewClose}
              tabIndex={0}
              aria-labelledby={`partner-name-${partner.id}`}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="partner-logo"
                style={{ maxHeight: `${partner.maxHeight}px` }}
                loading="lazy"
              />
              <span id={`partner-name-${partner.id}`} className="partner-name">{partner.name}</span>
            </div>
          ))}
        </div>

        {previewIdx !== null && previewRect && createPortal((
          <div
            className="partner-preview-floating"
            style={{ left: previewRect.left, top: previewRect.top }}
            onMouseEnter={clearPreviewTimer}
            onMouseLeave={schedulePreviewClose}
            aria-hidden="true"
          >
            <strong>{PARTNERS[previewIdx].name}</strong>
            {PARTNERS[previewIdx].description && <span>{PARTNERS[previewIdx].description}</span>}
          </div>
        ), document.body)}
      </div>

      <style>{`
        .partners-section {
          background-color: #ffffff;
          padding: clamp(64px, 8vw, 104px) 24px;
          position: relative;
          border-top: 1px solid rgba(17, 17, 17, 0.06);
        }

        .partners-container {
          max-width: 1140px;
          margin: 0 auto;
        }

        .partners-header {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 72px);
        }

        .partners-title {
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
          font-size: clamp(2rem, 3.8vw, 2.75rem);
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0;
        }

        .partners-title-accent {
          color: #e02424;
        }

        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: clamp(32px, 5vw, 64px) clamp(24px, 4.5vw, 56px);
        }

        .partner-item {
          flex: 0 1 calc(25% - 44px);
          min-width: 170px;
          max-width: 240px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          box-sizing: border-box;
          position: relative;
          outline: none;
          transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.26s ease;
        }

        .partner-item:hover,
        .partner-item:focus-visible {
          transform: scale(1.04);
        }

        .partner-item:focus-visible {
          outline: 3px solid rgba(222, 81, 10, 0.35);
          outline-offset: 4px;
        }

        .partner-logo {
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.04));
          transition: filter 0.26s ease, transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .partner-name {
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 4px;
          display: block;
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1.25;
          color: #111111;
          text-align: center;
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          transition: opacity 0.18s ease, transform 0.18s ease;
          pointer-events: none;
          overflow-wrap: anywhere;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }

        .partner-preview-floating {
          position: fixed;
          z-index: 1300;
          width: 236px;
          transform: translate(-50%, calc(-100% - 16px));
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.24);
          box-shadow: 0 18px 42px rgba(63,98,49,0.2);
          color: #111111;
          text-align: left;
          cursor: pointer;
          pointer-events: auto;
          animation: certPreviewIn 0.18s ease both;
        }

        .partner-preview-floating::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 14px;
          height: 14px;
          transform: translateX(-50%) rotate(45deg);
          background: #ffffff;
          border-right: 1px solid rgba(63,98,49,0.24);
          border-bottom: 1px solid rgba(63,98,49,0.24);
        }

        .partner-preview-floating strong {
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.25;
          color: #111111;
        }

        .partner-preview-floating span {
          font-size: 12px;
          line-height: 1.45;
          color: rgba(20,20,20,0.62);
        }

        .partner-item:hover .partner-logo,
        .partner-item:focus-visible .partner-logo {
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
          transform: translateY(-10px);
        }

        .partner-item:hover .partner-name,
        .partner-item:focus-visible .partner-name {
          opacity: 0;
        }

        @media (max-width: 960px) {
          .partner-item {
            flex: 0 1 calc(33.333% - 32px);
            min-width: 140px;
            height: 96px;
          }
        }

        @media (max-width: 600px) {
          .partners-grid {
            gap: 28px 16px;
          }

          .partner-item {
            flex: 0 1 calc(50% - 16px);
            min-width: 120px;
            height: 84px;
            padding: 4px 8px;
          }

          .partner-logo {
            max-height: 58px !important;
          }

          .partner-logo {
            transform: translateY(-9px);
          }

          .partner-name {
            clip: auto;
            clip-path: none;
            height: auto;
            left: 4px;
            right: 4px;
            bottom: 0;
            font-size: 9.5px;
            line-height: 1.15;
            overflow: visible;
            white-space: normal;
            width: auto;
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 360px) {
          .partner-item {
            flex: 0 1 100%;
            height: 78px;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .partner-logo {
            transform: translateY(-9px);
          }

          .partner-name {
            clip: auto;
            clip-path: none;
            height: auto;
            left: 4px;
            right: 4px;
            bottom: 0;
            font-size: 10.5px;
            line-height: 1.2;
            overflow: visible;
            white-space: normal;
            width: auto;
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes certPreviewIn {
          from { opacity: 0; transform: translate(-50%, calc(-100% - 6px)) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, calc(-100% - 16px)) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-item,
          .partner-logo,
          .partner-name {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
