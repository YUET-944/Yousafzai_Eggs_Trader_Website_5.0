import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../store/useCMSStore';
import { Plus, Minus, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function FAQItem({ item, isOpen, onClick }) {
  const answerRef = useRef(null);

  return (
    <div className={`faq-card ${isOpen ? 'is-open' : ''}`}>
      <div className="faq-question" onClick={onClick}>
        <div className="faq-q-left">
          <HelpCircle className="faq-q-icon" size={18} />
          <span className="faq-q-text">{item.q}</span>
        </div>
        <div className="faq-toggle-btn">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </div>
      <div
        className="faq-answer"
        ref={answerRef}
        style={{ maxHeight: isOpen ? `${answerRef.current?.scrollHeight || 200}px` : '0px' }}
      >
        <div className="faq-answer-content">
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const faq = useCMSStore((s) => s.faq);
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.faq-eyebrow',
        { y: 20, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.5,
          scrollTrigger: { trigger: '#faq', start: 'top 80%' }
        }
      );
      gsap.fromTo('.faq-heading',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.7, delay: 0.1,
          scrollTrigger: { trigger: '#faq', start: 'top 80%' }
        }
      );
      gsap.fromTo('.faq-divider-line',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1, ease: 'power2.inOut', delay: 0.3,
          scrollTrigger: { trigger: '#faq', start: 'top 80%' }
        }
      );

      // Stagger FAQ Cards
      gsap.utils.toArray('.faq-card-wrap').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" ref={containerRef} className="faq-section">
      {/* Background Grid & Orbs */}
      <div className="faq-bg-grid" />
      <div className="faq-orb faq-orb-1" />
      <div className="faq-orb faq-orb-2" />

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <span className="faq-eyebrow">COMMON_QUESTIONS // SUPPORT</span>
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <div className="faq-divider-line" />
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {faq.map((item, i) => (
            <div key={i} className="faq-card-wrap" style={{ visibility: 'hidden' }}>
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onClick={() => handleToggle(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           SECTION BASE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .faq-section {
          background: #FBF7F0;
          color: #111111;
          padding: 120px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .faq-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .faq-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .faq-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(222,81,10,0.07), transparent 70%);
          top: 20%; left: -150px;
        }

        .faq-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(74,140,220,0.05), transparent 70%);
          bottom: 10%; right: -150px;
        }

        .faq-container {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           HEADER
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .faq-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 70px;
        }

        .faq-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #DE510A;
          display: block;
          margin-bottom: 14px;
          visibility: hidden;
        }

        .faq-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .faq-divider-line {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           FAQ CARDS
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-card {
          border-radius: 18px;
          background: #FFFFFF;
          border: 1px solid #3F6231;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
          overflow: hidden;
        }

        .faq-card:hover {
          border-color: #3F6231;
          background: #FFFFFF;
        }

        .faq-card.is-open {
          border-color: #3F6231;
          background: #FFFFFF;
          box-shadow: 0 20px 50px rgba(63,98,49,0.15);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          cursor: pointer;
          user-select: none;
          gap: 20px;
        }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .faq-q-icon {
          color: #3F6231;
          flex-shrink: 0;
          transition: color 0.3s;
        }

        .faq-card.is-open .faq-q-icon,
        .faq-card:hover .faq-q-icon {
          color: #3F6231;
        }

        .faq-q-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16.5px;
          font-weight: 600;
          color: #111111;
          line-height: 1.4;
          transition: color 0.3s;
        }

        .faq-card.is-open .faq-q-text,
        .faq-card:hover .faq-q-text {
          color: #111111;
        }

        .faq-toggle-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3F6231;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .faq-card.is-open .faq-toggle-btn {
          background: #3F6231;
          color: #ffffff;
          box-shadow: 0 0 16px rgba(63,98,49,0.35);
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .faq-answer-content {
          padding: 0 28px 24px 60px;
          font-size: 14.5px;
          color: rgba(20,20,20,0.7);
          line-height: 1.7;
          border-top: 1px solid rgba(63,98,49,0.2);
          margin-top: 4px;
          padding-top: 18px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 700px) {
          .faq-section { padding: 80px 16px; }
          .faq-question { padding: 20px 20px; }
          .faq-answer-content { padding: 14px 20px 20px 20px; }
          .faq-q-text { font-size: 15px; }
        }
      `}</style>
    </section>
  );
}
