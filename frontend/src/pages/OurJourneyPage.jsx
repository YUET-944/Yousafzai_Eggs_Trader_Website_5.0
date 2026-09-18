import React from 'react';
import StoryEngine from '../story/StoryEngine';
import SceneOurStory from '../components/scenes/SceneOurStory';

const JOURNEY_HERO_IMAGE = '/images/client-final/processing-line-product.webp';

export default function OurJourneyPage() {
  return (
    <StoryEngine>
      <section className="journey-hero">
        <div className="journey-hero-media" aria-hidden="true">
          <img src={JOURNEY_HERO_IMAGE} alt="" />
        </div>
        <div className="journey-hero-overlay" />
        <div className="journey-hero-inner">
          <div className="journey-hero-copy">
            <h1>Our Journey</h1>
            <p>
              From early trading roots to a growing poultry enterprise, our story
              reflects steady progress, stronger systems, and a clear direction
              for the years ahead.
            </p>
          </div>

          <div className="journey-path" aria-label="Past to growth to future">
            {[
              ['Past', 'Roots'],
              ['Growth', 'Progress'],
              ['Future', 'Direction'],
            ].map(([label, sublabel]) => (
              <div className="journey-point" key={label}>
                <span className="journey-dot" aria-hidden="true" />
                <strong>{label}</strong>
                <small>{sublabel}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SceneOurStory />

      <style>{`
        .journey-hero {
          --journey-nav-offset: 76px;
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: var(--journey-nav-offset) 24px 0;
          background: #2C4724;
          color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }

        .journey-hero::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 88px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(251,247,240,0), rgba(251,247,240,0.72));
        }

        @supports (height: 100dvh) {
          .journey-hero {
            min-height: 100dvh;
          }
        }

        .journey-hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          transform: scale(1.02);
        }

        .journey-hero-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center 64%;
          filter: saturate(94%) contrast(106%);
        }

        .journey-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(17,17,17,0.48), rgba(17,17,17,0.52) 50%, rgba(17,17,17,0.48)),
            linear-gradient(180deg, rgba(17,17,17,0.34), rgba(17,17,17,0.58)),
            radial-gradient(circle at 50% 30%, rgba(242,231,201,0.17), transparent 46%);
        }

        .journey-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0);
          background-size: 34px 34px;
          opacity: 0.18;
        }

        .journey-hero-inner {
          position: relative;
          z-index: 2;
          width: min(1040px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: clamp(34px, 5vw, 54px);
          padding: clamp(24px, 4vw, 46px) 0;
        }

        .journey-hero-copy {
          width: min(860px, 100%);
          margin: 0 auto;
        }

        .journey-hero h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(48px, 7vw, 86px);
          line-height: 0.98;
          font-weight: 700;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0 0 24px;
          text-shadow: 0 18px 46px rgba(0,0,0,0.42);
          animation: journeyFadeUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }

        .journey-hero p {
          max-width: 720px;
          margin: 0 auto;
          font-size: clamp(17px, 1.7vw, 20px);
          line-height: 1.72;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 10px 30px rgba(0,0,0,0.44);
          animation: journeyFadeUp 0.65s 0.12s cubic-bezier(.22,1,.36,1) both;
        }

        .journey-path {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(130px, 1fr));
          align-items: start;
          gap: clamp(18px, 4vw, 42px);
          width: min(760px, 100%);
          margin: 0 auto;
          padding: 30px clamp(18px, 4vw, 44px) 4px;
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          animation: journeyFadeUp 0.7s 0.22s cubic-bezier(.22,1,.36,1) both;
        }

        .journey-path::before {
          content: '';
          position: absolute;
          left: calc(clamp(18px, 4vw, 44px) + 9%);
          right: calc(clamp(18px, 4vw, 44px) + 9%);
          top: 38px;
          height: 1px;
          background: linear-gradient(90deg, rgba(242,231,201,0), rgba(242,231,201,0.7), rgba(242,231,201,0));
          box-shadow: 0 1px 16px rgba(0,0,0,0.22);
        }

        .journey-point {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 0;
          padding: 0 4px;
          animation: journeyPointIn 0.55s cubic-bezier(.22,1,.36,1) both;
        }

        .journey-point:nth-child(1) { animation-delay: 0.55s; }
        .journey-point:nth-child(2) { animation-delay: 0.68s; }
        .journey-point:nth-child(3) { animation-delay: 0.81s; }

        .journey-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid rgba(242, 231, 201, 0.9);
          box-shadow: 0 0 0 7px rgba(63,98,49,0.26), 0 12px 28px rgba(0,0,0,0.3);
          margin-bottom: 16px;
        }

        .journey-point strong {
          color: #ffffff;
          font-size: 19px;
          line-height: 1.15;
          letter-spacing: 0;
          text-shadow: 0 8px 24px rgba(0,0,0,0.42);
        }

        .journey-point small {
          margin-top: 7px;
          color: rgba(255,255,255,0.78);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          line-height: 1.3;
        }

        @keyframes journeyFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes journeyPointIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-hero h1,
          .journey-hero p,
          .journey-path,
          .journey-point {
            animation: none;
          }
        }

        @media (max-width: 960px) {
          .journey-path {
            grid-template-columns: repeat(3, minmax(104px, 1fr));
            width: min(680px, 100%);
            gap: 18px;
          }
        }

        @media (max-width: 860px) {
          .journey-hero {
            --journey-nav-offset: 72px;
            padding-left: 18px;
            padding-right: 18px;
          }

          .journey-hero-inner {
            gap: 34px;
          }

          .journey-hero-media img {
            object-position: center 58%;
          }

          .journey-path {
            width: min(520px, 100%);
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 4px 0 4px 32px;
          }

          .journey-path::before {
            left: 7px;
            right: auto;
            top: 10px;
            bottom: 12px;
            width: 1px;
            height: auto;
            background: linear-gradient(180deg, rgba(242,231,201,0), rgba(242,231,201,0.7), rgba(242,231,201,0));
          }

          .journey-point {
            align-items: flex-start;
            text-align: left;
            padding-left: 20px;
          }

          .journey-dot {
            position: absolute;
            left: -32px;
            top: 1px;
            width: 16px;
            height: 16px;
            margin-bottom: 0;
          }
        }

        @media (max-width: 430px) {
          .journey-hero {
            --journey-nav-offset: 58px;
            padding-left: 16px;
            padding-right: 16px;
          }

          .journey-hero h1 {
            font-size: 46px;
          }

          .journey-hero p {
            font-size: 16px;
          }

          .journey-path {
            gap: 24px;
            padding-left: 28px;
          }

          .journey-point {
            padding-left: 18px;
          }

          .journey-point strong {
            font-size: 16px;
          }

          .journey-point small {
            font-size: 12px;
          }

          .journey-dot {
            left: -28px;
            width: 14px;
            height: 14px;
            border-width: 2.5px;
          }
        }
      `}</style>
    </StoryEngine>
  );
}
