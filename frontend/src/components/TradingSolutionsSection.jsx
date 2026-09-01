import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';

export default function TradingSolutionsSection() {
  const solutions = useCMSStore((s) => s.solutions);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-alt" id="solutions" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="tag-eyebrow">{solutions.eyebrow}</div>
          <h2 className="sec-title">{solutions.title}</h2>
          <p className="sec-sub">{solutions.subtitle}</p>
        </div>
        <div className="tier-grid reveal-stagger">
          {solutions.tiers.map((tier, i) => (
            <div key={i} className={`tier-card ${tier.featured ? 'featured' : ''}`}>
              <div className="tier-head">
                <span className="tier-badge">{tier.badge}</span>
                <div className="tier-name">{tier.name}</div>
                <div className="tier-desc">{tier.desc}</div>
              </div>
              <div className="tier-feats">
                {tier.features.map((feat, j) => (
                  <div key={j} className="tf-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }} className="reveal">
          <Link to="/contact" className="btn btn-navy" data-ripple>
            <span>Apply for Partner Program →</span>
          </Link>
        </div>
      </div>

      <style>{`
        .tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .tier-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 24px; overflow: hidden; transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1); display: flex; flex-direction: column; }
        .tier-card:hover { transform: translateY(-8px); box-shadow: 0 28px 70px rgba(63,98,49,0.18); }
        .tier-card.featured { border: 2px solid #DE510A; position: relative; }
        .tier-card.featured::before { content: 'Most Selected'; position: absolute; top: 18px; right: -34px; background: #DE510A; color: #ffffff; font-size: 10.5px; font-weight: 700; padding: 5px 38px; transform: rotate(40deg); letter-spacing: .04em; z-index: 2; }
        .tier-head { padding: 30px 28px; background: #F5F7FA; }
        .tier-card.featured .tier-head { background: linear-gradient(155deg,#DE510A,#B9320D); color: #ffffff; }
        .tier-badge { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #B9320D; margin-bottom: 10px; display: block; }
        .tier-card.featured .tier-badge { color: #FCF3D9; }
        .tier-name { font-family: 'Space Grotesk',sans-serif; font-size: 22px; font-weight: 600; color: #111111; }
        .tier-card.featured .tier-name { color: #FFFFFF; }
        .tier-desc { font-size: 13px; color: #707888; margin-top: 6px; }
        .tier-card.featured .tier-desc { color: rgba(255,255,255,0.85); }
        .tier-feats { padding: 26px 28px 30px; flex: 1; display: flex; flex-direction: column; gap: 14px; }
        .tf-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: #444C5C; }
        .tf-item svg { width: 16px; height: 16px; color: #B9320D; flex-shrink: 0; margin-top: 2px; }
        .btn-navy { background: #FBF7F0; color: #111111; padding: 13px 26px; border-radius: 9px; border: none; cursor: pointer; font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1); }
        .btn-navy:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(63,98,49,0.35); }
        @media (max-width: 1080px) { .tier-grid { grid-template-columns: repeat(2,1fr); } .tier-card:nth-child(3) { grid-column: 1 / -1; justify-self: center; width: 50%; } }
        @media (max-width: 640px) { .tier-card:nth-child(3) { width: 100%; } }
      `}</style>
    </section>
  );
}
