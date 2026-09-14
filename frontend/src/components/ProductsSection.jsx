import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, PackageCheck, X } from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';
import { useQuoteModalStore } from '../store/useQuoteModalStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fallbackSpecs = [
  { label: 'Grade', value: 'Grade information pending verification' },
  { label: 'Format', value: 'Format details to be confirmed' },
  { label: 'Packaging', value: 'Packaging options to be confirmed' },
  { label: 'Typical use', value: 'Buyer use to be confirmed' },
];

function DetailRow({ label, value }) {
  return (
    <div className="prod-detail-row">
      <span>{label}</span>
      <strong>{value || 'To be confirmed'}</strong>
    </div>
  );
}

export default function ProductsSection() {
  const products = useCMSStore((s) => s.products) || {};
  const openQuoteModal = useQuoteModalStore((s) => s.openModal);
  const items = Array.isArray(products.items) ? products.items : [];
  const specs = Array.isArray(products.specs) ? products.specs : [];
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: '.prod-header', start: 'top 80%' },
      });
      hTl
        .fromTo('.prod-title', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
        .fromTo('.prod-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.prod-divider', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

      gsap.utils.toArray('.prod-card, .grade-card, .products-quote-band').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 54, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selected === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 4,
      rotationX: y * -3,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.35,
    });
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
    setActiveCard(idx);
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.45 });
    setActiveCard(null);
  };

  const selectedItem = selected !== null ? items[selected] : null;

  return (
    <section id="products" ref={sectionRef} className="prod-section">
      <div className="prod-bg-grid" />
      <div className="prod-orb prod-orb-1" />
      <div className="prod-orb prod-orb-2" />

      <div className="prod-container">
        <div className="prod-header">
          <h2 className="prod-title">{products.title || 'Egg Products for Commercial Supply'}</h2>
          <p className="prod-sub">{products.subtitle || 'Compare available product options and confirm final details with our team.'}</p>
          <div className="prod-divider" />
        </div>

        <div className="prod-grid">
          {items.map((item, i) => {
            const detailRows = [
              { label: 'Grade', value: item.grade || item.badge },
              { label: 'Format', value: item.format },
              { label: 'Packaging', value: item.packaging },
              { label: 'Typical use', value: item.suitableFor },
            ].filter((row) => row.value);
            const rows = detailRows.length ? detailRows : fallbackSpecs;

            return (
              <article
                key={`${item.name}-${i}`}
                className={`prod-card ${activeCard === i ? 'card-hover' : ''}`}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={handleMouseLeave}
                style={{ visibility: 'hidden' }}
              >
                <div className="prod-card-glow" />

                <div className="prod-card-img">
                  {item.image && !brokenImgs.has(i) ? (
                    <img
                      src={item.image}
                      alt={item.name || 'Egg product'}
                      loading="lazy"
                      onError={() => setBrokenImgs((prev) => new Set(prev).add(i))}
                    />
                  ) : (
                    <div className="prod-fallback-icon">
                      <PackageCheck size={42} />
                    </div>
                  )}
                  <div className="prod-img-overlay" />
                  <span className="prod-badge">{item.badge || 'Product'}</span>
                </div>

                <div className="prod-card-info">
                  <div className="prod-card-head">
                    <h3 className="prod-card-name">{item.name}</h3>
                    <span>{item.grade || item.badge || 'Grade pending'}</span>
                  </div>
                  <p className="prod-card-desc">{item.description}</p>

                  <div className="prod-meta-list">
                    {rows.slice(0, 3).map((row) => (
                      <DetailRow key={row.label} label={row.label} value={row.value} />
                    ))}
                  </div>

                  <div className="prod-tags">
                    {(Array.isArray(item.tags) ? item.tags : []).map((tag, t) => (
                      <span key={tag || t} className={`prod-tag ${t === 0 ? 'tag-gold' : ''}`}>{tag}</span>
                    ))}
                  </div>

                  <button type="button" className="prod-details-btn" onClick={() => setSelected(i)}>
                    View Details
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {specs.length > 0 && (
          <div className="grades-section" aria-labelledby="grades-title">
            <div className="grades-head">
              <h2 id="grades-title">Grades & Specifications</h2>
              <p>Use this as a quick reference. Final availability and order details should be confirmed during quoting.</p>
            </div>

            <div className="grades-grid">
              {specs.map((spec, i) => (
                <article key={`${spec.name}-${i}`} className="grade-card" style={{ visibility: 'hidden' }}>
                  <div className="grade-card-top">
                    <h3>{spec.name}</h3>
                    <span className={`grade-status ${spec.statusClass === 'limited' ? 'is-limited' : ''}`}>
                      {spec.status || 'Status to confirm'}
                    </span>
                  </div>
                  <div className="grade-rows">
                    <DetailRow label="Sizes / format" value={spec.sizes} />
                    <DetailRow label="Minimum order" value={spec.moq} />
                    <DetailRow label="Lead time" value={spec.lead} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="products-quote-band" style={{ visibility: 'hidden' }}>
          <div>
            <h2>Looking for a specific product or grade?</h2>
            <p>Tell us what you need, and our team will help you find the right supply option.</p>
          </div>
          <button type="button" onClick={() => openQuoteModal()} className="products-quote-btn">
            Request a Quote
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {selectedItem && createPortal((
        <div
          className="prod-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="prod-modal" role="dialog" aria-modal="true" aria-labelledby="prod-modal-title">
            <div className="prod-modal-head">
              <div>
                <span>{selectedItem.badge || 'Product'}</span>
                <h2 id="prod-modal-title">{selectedItem.name}</h2>
              </div>
              <button ref={closeRef} type="button" className="prod-modal-close" onClick={() => setSelected(null)} aria-label="Close product details" autoFocus>
                <X size={18} />
              </button>
            </div>

            <p className="prod-modal-desc">{selectedItem.description}</p>
            <div className="prod-modal-grid">
              <DetailRow label="Grade" value={selectedItem.grade || selectedItem.badge} />
              <DetailRow label="Format" value={selectedItem.format} />
              <DetailRow label="Packaging" value={selectedItem.packaging} />
              <DetailRow label="Typical use" value={selectedItem.suitableFor} />
            </div>
            <div className="prod-modal-note">
              Detailed commercial specifications should be confirmed with our team before ordering.
            </div>
            <Link to="/contact" className="products-quote-btn modal-quote" onClick={() => setSelected(null)}>
              Request a Quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ), document.body)}

      <style>{`
        .prod-section {
          background: #FBF7F0;
          color: #111111;
          padding: 96px 24px 112px;
          position: relative;
          overflow: hidden;
        }

        .prod-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .prod-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .prod-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          top: 20%;
          right: -200px;
        }

        .prod-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(63,98,49,0.07), transparent 70%);
          bottom: 10%;
          left: -150px;
        }

        .prod-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .prod-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 58px;
        }

        .prod-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .prod-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.58);
          line-height: 1.7;
          margin: 0 0 28px;
          visibility: hidden;
        }

        .prod-divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        .prod-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-bottom: 84px;
        }

        .prod-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.32);
          transition: border-color 0.35s, box-shadow 0.35s;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .prod-card.card-hover {
          border-color: rgba(222,81,10,0.38);
          box-shadow: 0 24px 56px rgba(63,98,49,0.16);
        }

        .prod-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(222,81,10,0.07), transparent 40%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 0;
        }

        .prod-card.card-hover .prod-card-glow {
          opacity: 1;
        }

        .prod-card-img {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: linear-gradient(135deg, #C8956C, #8B4513);
        }

        .prod-grid .prod-card:nth-child(3n+1) .prod-card-img,
        .prod-grid .prod-card:nth-child(3n+3) .prod-card-img {
          background: linear-gradient(135deg, #C8956C, #8B4513);
        }

        .prod-grid .prod-card:nth-child(3n+2) .prod-card-img {
          background: linear-gradient(135deg, #F5F0E8, #D4C9B0);
        }

        .prod-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .prod-card.card-hover .prod-card-img img {
          transform: scale(1.05);
        }

        .prod-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 38%, rgba(63,98,49,0.68) 100%);
          pointer-events: none;
        }

        .prod-fallback-icon {
          height: 100%;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prod-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 700;
          background: rgba(255,255,255,0.92);
          color: #B9320D;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid rgba(222,81,10,0.2);
          z-index: 2;
        }

        .prod-card-info {
          padding: 24px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .prod-card-head {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .prod-card-head span {
          color: #DE510A;
          font-size: 12px;
          font-weight: 700;
        }

        .prod-card-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          font-weight: 700;
          margin: 0;
          line-height: 1.25;
          color: #111111;
        }

        .prod-card-desc {
          font-size: 13.5px;
          color: rgba(20,20,20,0.62);
          line-height: 1.6;
          margin: 0 0 18px;
        }

        .prod-meta-list,
        .prod-modal-grid,
        .grade-rows {
          display: grid;
          gap: 9px;
        }

        .prod-detail-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(63,98,49,0.12);
          font-size: 12.5px;
        }

        .prod-detail-row span {
          color: rgba(20,20,20,0.5);
        }

        .prod-detail-row strong {
          color: #111111;
          text-align: right;
          font-weight: 700;
        }

        .prod-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .prod-tag {
          font-size: 11px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 7px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.28);
          color: rgba(20,20,20,0.62);
        }

        .prod-tag.tag-gold {
          background: rgba(222,81,10,0.1);
          border-color: rgba(222,81,10,0.2);
          color: #DE510A;
        }

        .prod-details-btn,
        .products-quote-btn,
        .prod-modal-close {
          border: none;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
        }

        .prod-details-btn {
          margin-top: auto;
          padding-top: 22px;
          color: #3F6231;
          background: transparent;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          align-self: flex-start;
        }

        .prod-details-btn:focus-visible,
        .products-quote-btn:focus-visible,
        .prod-modal-close:focus-visible {
          outline: 3px solid rgba(222,81,10,0.45);
          outline-offset: 3px;
        }

        .grades-section {
          margin-bottom: 84px;
        }

        .grades-head {
          max-width: 720px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .grades-head h2,
        .products-quote-band h2 {
          font-family: 'Space Grotesk', sans-serif;
          color: #3F6231;
          font-size: clamp(28px, 3vw, 40px);
          line-height: 1.18;
          margin: 0 0 14px;
        }

        .grades-head p,
        .products-quote-band p {
          margin: 0;
          color: rgba(20,20,20,0.62);
          line-height: 1.65;
        }

        .grades-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }

        .grade-card {
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.28);
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 16px 40px rgba(63,98,49,0.08);
        }

        .grade-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .grade-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          color: #111111;
        }

        .grade-status {
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 700;
          color: #3F6231;
          background: rgba(63,98,49,0.09);
          padding: 5px 8px;
          border-radius: 999px;
        }

        .grade-status.is-limited {
          color: #B9320D;
          background: rgba(222,81,10,0.11);
        }

        .products-quote-band {
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.32);
          border-top: 4px solid #3F6231;
          border-radius: 18px;
          padding: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          box-shadow: 0 20px 54px rgba(63,98,49,0.12);
        }

        .products-quote-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #ffffff;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          text-decoration: none;
          font-weight: 700;
          padding: 14px 22px;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(185,50,13,0.22);
        }

        .prod-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(17,17,17,0.58);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .prod-modal {
          width: min(620px, calc(100vw - 48px));
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.28);
          border-radius: 18px;
          padding: 26px;
          box-shadow: 0 34px 90px rgba(0,0,0,0.3);
        }

        .prod-modal-head {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }

        .prod-modal-head span {
          display: block;
          color: #DE510A;
          font-weight: 700;
          font-size: 12px;
          margin-bottom: 8px;
        }

        .prod-modal-head h2 {
          font-family: 'Space Grotesk', sans-serif;
          margin: 0;
          color: #111111;
          font-size: 28px;
          line-height: 1.15;
        }

        .prod-modal-close {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          color: #111111;
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.28);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .prod-modal-desc {
          color: rgba(20,20,20,0.68);
          line-height: 1.65;
          margin: 0 0 20px;
        }

        .prod-modal-note {
          margin-top: 22px;
          color: rgba(20,20,20,0.58);
          background: rgba(63,98,49,0.08);
          border-radius: 10px;
          padding: 13px 14px;
          font-size: 13px;
          line-height: 1.5;
        }

        .modal-quote {
          margin-top: 22px;
          width: 100%;
        }

        @media (max-width: 1180px) {
          .prod-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .grades-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .prod-section {
            padding: 78px 16px 92px;
          }
          .prod-header {
            margin-bottom: 42px;
          }
          .prod-grid,
          .grades-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .prod-card-img {
            height: 180px;
          }
          .prod-card-info,
          .grade-card {
            padding: 20px;
          }
          .prod-detail-row {
            flex-direction: column;
            gap: 4px;
          }
          .prod-detail-row strong {
            text-align: left;
          }
          .products-quote-band {
            padding: 30px 22px;
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .products-quote-btn {
            width: 100%;
          }
          .prod-modal-backdrop {
            padding: 12px;
            align-items: flex-start;
            overflow-y: auto;
          }
          .prod-modal {
            width: 100%;
            max-height: none;
            padding: 22px;
          }
          .prod-modal-head h2 {
            font-size: 23px;
          }
        }
      `}</style>
    </section>
  );
}
