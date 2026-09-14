import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';
import { CheckCircle2, Star, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EMPTY_TESTIMONIALS = [];

function RatingStars({ rating }) {
  if (!Number.isFinite(rating)) return null;
  const clamped = Math.max(0, Math.min(5, rating));

  return (
    <div className="test-rating-row" aria-label={`Rated ${clamped.toFixed(1)} out of 5`}>
      <div className="test-stars-row" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((idx) => {
          const fill = Math.max(0, Math.min(1, clamped - idx));
          return (
            <span key={idx} className="test-star-wrap">
              <Star size={15} className="star-empty" />
              <span className="star-fill-layer" style={{ width: `${fill * 100}%` }}>
                <Star size={15} className="star-filled" />
              </span>
            </span>
          );
        })}
      </div>
      <span className="test-rating-number">{clamped.toFixed(1)}</span>
    </div>
  );
}

export default function QualitySection() {
  const quality = useCMSStore((s) => s.quality);
  const testimonials = useCMSStore((s) => s.testimonials) || EMPTY_TESTIMONIALS;
  const sectionRef = useRef(null);
  const railDuration = `${Math.max(48, testimonials.length * 12)}s`;

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header reveals
      gsap.fromTo('.q-head',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.q-head', start: 'top 85%' }
        }
      );

      // Traceability progress line animation
      gsap.fromTo('.trace-fill-line',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.trace-console', start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderReviewCard = (t, i, isClone = false) => {
    const rating = t.rating === null || t.rating === undefined || t.rating === '' ? NaN : Number(t.rating);
    const hasRating = Number.isFinite(rating);
    return (
      <article
        key={`${isClone ? 'clone' : 'review'}-${t.name || 'review'}-${i}`}
        className="q-test-card"
        aria-label={isClone ? undefined : `Review ${i + 1} of ${testimonials.length}`}
      >
        <span className="test-quote-mark" aria-hidden="true">"</span>
        <p className="test-quote-text">"{t.text}"</p>
        {hasRating && <RatingStars rating={rating} />}
        <div className="test-user-row">
          <div className="test-avatar">{t.initials}</div>
          <div className="test-user-info">
            <span className="test-name">{t.name}</span>
            <span className="test-role">{t.company || t.role}</span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div ref={sectionRef} className="q-page-wrapper">
      {/* Background Orbs */}
      <div className="q-bg-grid" />
      <div className="q-orb q-orb-1" />
      <div className="q-orb q-orb-2" />

      {/* Main Section */}
      <section id="quality" className="q-section">
        <div className="container">
          {/* Header */}
          <div className="q-head">
            <div className="tag-eyebrow" style={{ justifyContent: 'center', marginBottom: '12px' }}>Our Quality</div>
            <h2 className="q-heading">{quality.title || 'Uncompromised Quality & Compliance'}</h2>
            <p className="q-sub">{quality.subtitle}</p>
          </div>

          {/* Batch Traceability Console */}
          <div className="trace-console">
            <div className="trace-header">
              <div className="trace-title-group">
                <Activity size={18} className="text-gold" />
                <div>
                  <h3 className="trace-main-title">{quality.batch.title}</h3>
                  <span className="trace-main-sub">{quality.batch.subtitle}</span>
                  <span className="trace-batch-inline">
                    Batch ID <strong>{quality.batch.id}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Traceability Flow Steps */}
            <div className="trace-steps-container">
              <div className="trace-bg-line" />
              <div className="trace-fill-line" />

              <div className="trace-steps-grid">
                {quality.batch.steps.map((step, i) => (
                  <div key={i} className="trace-step-item">
                    <div className="step-dot-wrap">
                      <CheckCircle2 size={20} className="step-check-icon" />
                    </div>
                    <span className="step-title">{step.title}</span>
                    <span className="step-time">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="q-test-section">
        <div className="container">
          <div className="q-head center-head">
            <h2 className="q-heading">Trusted by Commercial Buyers</h2>
            <p className="q-sub">Hear from distributors, retailers, and commercial buyers who work with us.</p>
          </div>

          <div
            className="q-test-carousel"
            style={{ '--rail-duration': railDuration }}
          >
            <div
              className="q-test-viewport"
              role="region"
              aria-label="Commercial buyer reviews. The rail pauses on hover and can be scrolled horizontally."
              tabIndex={0}
            >
              <div className="q-test-track">
                <div className="q-test-set">
                  {testimonials.map((t, i) => renderReviewCard(t, i))}
                </div>
                <div className="q-test-set" aria-hidden="true">
                  {testimonials.map((t, i) => renderReviewCard(t, i, true))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           QUALITY PAGE ROOT
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-page-wrapper {
          background: #FBF7F0;
          color: #111111;
          position: relative;
          overflow: hidden;
        }

        .q-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .q-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .q-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(222,81,10,0.12), transparent 70%);
          top: 10%; right: -150px;
        }

        .q-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(255,230,160,0.08), transparent 70%);
          bottom: 20%; left: -150px;
        }

        .q-section {
          padding: 100px 24px 56px;
          position: relative;
          z-index: 2;
        }

        .q-head {
          text-align: left;
          max-width: 750px;
          margin-bottom: 50px;
        }

        .q-head.center-head {
          text-align: center;
          margin: 0 auto 50px;
        }

        .q-eyebrow {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #DE510A;
          display: block;
          margin-bottom: 12px;
        }

        .q-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.2vw, 48px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .q-subheading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #111111;
          margin: 0;
        }

        .q-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           TRACEABILITY CONSOLE (GOLDEN THEME)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .trace-console {
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 24px;
          padding: 36px;
          backdrop-filter: blur(20px);
          margin-bottom: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .trace-header {
          display: block;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(20,20,20,0.08);
          margin-bottom: 34px;
        }

        .trace-title-group {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .text-gold { color: #DE510A; }

        .trace-main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #111111;
        }

        .trace-main-sub {
          display: block;
          font-size: 13px;
          color: rgba(20,20,20,0.5);
        }

        .trace-batch-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          font-family: monospace;
          font-size: 12px;
          color: #B9320D;
        }

        .trace-batch-inline strong {
          color: #111111;
        }

        .trace-steps-container {
          position: relative;
          padding: 16px 0 20px;
        }

        .trace-bg-line {
          position: absolute;
          top: 42px;
          left: 8%; right: 8%;
          height: 3px;
          background: #DE510A;
          z-index: 1;
        }

        .trace-fill-line {
          position: absolute;
          top: 42px;
          left: 8%; right: 8%;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          z-index: 1;
          transform-origin: left;
          box-shadow: 0 0 12px rgba(222,81,10,0.6);
        }

        .trace-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .trace-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .step-dot-wrap {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #111111;
          border: 2px solid #DE510A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          box-shadow: 0 0 16px rgba(222,81,10,0.4);
        }

        .step-check-icon {
          color: #DE510A;
        }

        .step-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 4px;
        }

        .step-time {
          font-family: monospace;
          font-size: 11px;
          color: rgba(20,20,20,0.5);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           CERTIFICATIONS GRID
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .q-cert-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          backdrop-filter: blur(16px);
          transition: border-color 0.4s, transform 0.4s;
          color: inherit;
          font: inherit;
          text-align: left;
          width: 100%;
        }

        .q-cert-card:hover {
          border-color: rgba(222,81,10,0.5);
          transform: translateY(-4px);
        }

        .q-cert-card-action {
          cursor: pointer;
        }

        .q-cert-card-info {
          cursor: default;
        }

        .q-cert-card-action:focus-visible {
          outline: 3px solid rgba(222,81,10,0.35);
          outline-offset: 4px;
          border-color: rgba(222,81,10,0.7);
        }

        .cert-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(222,81,10,0.12);
          border: 1px solid rgba(222,81,10,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          flex-shrink: 0;
        }

        .cert-details {
          display: flex;
          flex-direction: column;
        }

        .cert-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #111111;
        }

        .cert-desc {
          font-size: 13px;
          color: rgba(20,20,20,0.6);
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .cert-status-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: #B9320D;
          background: rgba(222,81,10,0.15);
          border: 1px solid rgba(222,81,10,0.3);
          padding: 3px 10px;
          border-radius: 6px;
          align-self: flex-start;
        }

        .cert-doc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #B9320D;
          font-size: 12px;
          font-weight: 700;
          align-self: flex-start;
        }

        @media (hover: hover) and (pointer: fine) {
          .q-doc-preview {
            display: flex;
          }
        }

        .q-doc-preview {
          position: fixed;
          z-index: 1300;
          width: 228px;
          transform: translate(-50%, calc(-100% - 14px));
          flex-direction: column;
          gap: 8px;
          padding: 15px 16px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.24);
          box-shadow: 0 18px 42px rgba(63,98,49,0.2);
          color: #111111;
          text-align: left;
          cursor: pointer;
          animation: qDocPreviewIn 0.18s ease both;
        }

        .q-doc-preview::after {
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

        .q-doc-preview strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          line-height: 1.25;
          color: #111111;
        }

        .q-doc-preview span {
          font-size: 12px;
          line-height: 1.45;
          color: rgba(20,20,20,0.62);
        }

        .q-doc-preview em {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          color: #DE510A;
        }

        .q-doc-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(17,17,17,0.58);
          animation: qDocFade 0.2s ease both;
        }

        .q-doc-viewer {
          width: min(980px, calc(100vw - 48px));
          max-height: calc(100vh - 48px);
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.3);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 34px 90px rgba(0,0,0,0.32);
          animation: qDocPop 0.22s cubic-bezier(.22,1,.36,1) both;
        }

        .q-doc-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(63,98,49,0.2);
          background: #ffffff;
        }

        .q-doc-modal-head strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          color: #111111;
        }

        .q-doc-modal-head span {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: rgba(20,20,20,0.58);
          line-height: 1.4;
        }

        .q-doc-close {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(63,98,49,0.3);
          background: #ffffff;
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
          flex-shrink: 0;
        }

        .q-doc-close:hover {
          background: #3F6231;
          color: #ffffff;
        }

        .q-doc-close:focus-visible,
        .q-doc-frame-note a:focus-visible {
          outline: 3px solid rgba(222,81,10,0.45);
          outline-offset: 3px;
        }

        .q-doc-frame-wrap {
          height: min(68vh, 760px);
          min-height: 360px;
          position: relative;
          background: #4a4e53;
          overflow: hidden;
        }

        .q-doc-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          background: #4a4e53;
        }

        .q-doc-loading {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #e8ecf2;
          background: #4a4e53;
          text-align: center;
        }

        .q-doc-loading p {
          font-size: 14px;
          color: #c7ced9;
          margin: 0;
        }

        .q-doc-loader {
          width: 34px;
          height: 34px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: #F76B0D;
          border-radius: 50%;
          animation: qDocSpin 0.8s linear infinite;
        }

        .q-doc-frame-note {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 20px;
          background: #ffffff;
          border-top: 1px solid rgba(63,98,49,0.18);
          font-size: 12px;
          color: #6b7280;
        }

        .q-doc-frame-note span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .q-doc-frame-note a {
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #3F6231;
          padding: 9px 14px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .q-doc-frame-note a:hover {
          background: #2C4724;
        }

        @keyframes qDocFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes qDocPop {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }

        @keyframes qDocPreviewIn {
          from { opacity: 0; transform: translate(-50%, calc(-100% - 6px)) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, calc(-100% - 14px)) scale(1); }
        }

        @keyframes qDocSpin {
          to { transform: rotate(360deg); }
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           TESTIMONIALS SECTION
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-test-section {
          padding: 100px 24px 140px;
          background: #FBF7F0;
          border-top: 1px solid rgba(20,20,20,0.06);
          position: relative;
          z-index: 2;
        }

        .q-test-carousel {
          --review-gap: 24px;
          --review-width: clamp(310px, 30vw, 368px);
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
        }

        .q-test-viewport:focus-visible {
          outline: 3px solid rgba(222,81,10,0.4);
          outline-offset: 4px;
        }

        .q-test-viewport {
          overflow-x: auto;
          overflow-y: visible;
          padding: 14px 4px 18px;
          margin: -14px -4px -18px;
          scrollbar-width: none;
          touch-action: pan-y pan-x;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          mask-image: linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
        }

        .q-test-viewport::-webkit-scrollbar {
          display: none;
        }

        .q-test-viewport:active {
          cursor: grabbing;
        }

        .q-test-track {
          display: flex;
          width: max-content;
          gap: var(--review-gap);
          animation: qTestRail var(--rail-duration) linear infinite;
          will-change: transform;
        }

        .q-test-carousel:hover .q-test-track,
        .q-test-carousel:focus-within .q-test-track,
        .q-test-viewport:active .q-test-track {
          animation-play-state: paused;
        }

        .q-test-set {
          display: flex;
          gap: var(--review-gap);
        }

        .q-test-card {
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          border-radius: 20px;
          padding: 34px 28px 28px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(16px);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
          min-height: 300px;
          position: relative;
          overflow: hidden;
          flex: 0 0 var(--review-width);
          width: var(--review-width);
          box-shadow: 0 14px 38px rgba(63,98,49,0.08);
        }

        .q-test-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #3F6231, #DE510A);
        }

        .q-test-card:hover {
          border-color: rgba(222,81,10,0.48);
          box-shadow: 0 24px 56px rgba(63,98,49,0.14);
          transform: translateY(-4px) scale(1.01);
        }

        .test-quote-mark {
          position: absolute;
          top: 20px;
          right: 24px;
          font-family: Georgia, serif;
          font-size: 58px;
          line-height: 1;
          color: rgba(63,98,49,0.08);
          pointer-events: none;
        }

        .test-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 24px;
        }

        .test-stars-row {
          display: flex;
          gap: 5px;
        }

        .test-star-wrap {
          position: relative;
          width: 15px;
          height: 15px;
          display: inline-block;
          color: rgba(20,20,20,0.2);
        }

        .star-empty {
          color: rgba(20,20,20,0.2);
        }

        .star-fill-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          display: block;
          white-space: nowrap;
        }

        .star-filled {
          color: #f59e0b;
          fill: #f59e0b;
        }

        .test-rating-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #3F6231;
        }

        .test-quote-text {
          font-size: 15.5px;
          color: rgba(20,20,20,0.75);
          line-height: 1.7;
          margin: 0 0 24px;
          flex-grow: 1;
          font-style: italic;
          position: relative;
          z-index: 1;
        }

        .test-user-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(20,20,20,0.08);
        }

        .test-avatar {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(63,98,49,0.1);
          border: 1px solid rgba(63,98,49,0.24);
          color: #B9320D;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .test-user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .test-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: #111111;
        }

        .test-role {
          font-size: 12px;
          color: rgba(20,20,20,0.5);
          line-height: 1.4;
        }

        @keyframes qTestRail {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - (var(--review-gap) / 2))); }
        }

        @media (prefers-reduced-motion: reduce) {
          .q-test-track {
            animation: none;
            transform: none;
          }

          .q-test-card {
            transition: none;
          }
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           RESPONSIVE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 1080px) {
          .q-cert-grid { grid-template-columns: repeat(2, 1fr); }
          .trace-steps-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .trace-bg-line, .trace-fill-line { display: none; }
        }

        @media (max-width: 700px) {
          .q-cert-grid { grid-template-columns: 1fr; }
          .q-test-section {
            padding: 78px 18px 104px;
          }
          .q-test-carousel {
            --review-gap: 16px;
            --review-width: min(82vw, 330px);
            --rail-duration: 72s;
          }
          .q-test-viewport {
            mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%);
          }
          .q-test-card {
            min-height: 310px;
            padding: 32px 24px 26px;
          }
          .test-quote-text {
            font-size: 15px;
          }
          .trace-steps-grid { grid-template-columns: 1fr; gap: 20px; }
          .trace-header { flex-direction: column; align-items: flex-start; gap: 14px; }
          .q-doc-backdrop {
            align-items: flex-start;
            padding: 12px;
            overflow-y: auto;
          }
          .q-doc-viewer {
            width: 100%;
            max-height: calc(100vh - 24px);
            border-radius: 14px;
          }
          .q-doc-frame-wrap {
            height: calc(100vh - 188px);
            min-height: 300px;
          }
          .q-doc-modal-head {
            padding: 14px 14px 14px 16px;
            align-items: flex-start;
          }
          .q-doc-modal-head strong {
            font-size: 16px;
          }
          .q-doc-frame-note {
            flex-direction: column;
            align-items: stretch;
            padding: 12px 14px;
          }
          .q-doc-frame-note a {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
