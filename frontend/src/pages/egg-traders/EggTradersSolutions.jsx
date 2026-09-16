import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/client-final/yellow.png';

export default function EggTradersSolutions() {
  const data = useCMSStore((s) => s.eggTraders.solutions);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.solutions);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <EggTradersPageBanner
        title={banner?.title || 'Solutions'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 52%"
      />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-tier-grid reveal-stagger">
              {data.tiers.map((tier, i) => (
                <div key={i} className={`et-tier-card ${tier.featured ? 'featured' : ''}`}>
                  <div className="et-tier-head">
                    <span className="et-tier-badge">{tier.badge}</span>
                    <div className="et-tier-name">{tier.name}</div>
                    <div className="et-tier-desc">{tier.desc}</div>
                  </div>
                  <div className="et-tier-feats">
                    {tier.features.map((feat, j) => (
                      <div key={j} className="et-tf-item">
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
              <Link to="/egg-traders/contact" className="btn-navy">
                <span>Get started</span>
              </Link>
            </div>
          </div>
        </section>

        <style>{`
          .et-tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
          .et-tier-card { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.2); border-radius: 24px; overflow: hidden; backdrop-filter: blur(12px); transition: transform .4s, box-shadow .4s, border-color .4s; display: flex; flex-direction: column; }
          .et-tier-card:hover { transform: translateY(-8px); box-shadow: 0 28px 70px rgba(0,27,77,0.12); border-color: rgba(0,71,187,0.35); }
          .et-tier-card.featured { border: 2px solid #0047BB; position: relative; }
          .et-tier-card.featured::before { content: 'Most popular'; position: absolute; top: 18px; right: -34px; background: #DE510A; color: #ffffff; font-size: 10.5px; font-weight: 700; padding: 5px 38px; transform: rotate(40deg); letter-spacing: 0; z-index: 2; }
          .et-tier-head { padding: 30px 28px; background: #F5F7FA; border-bottom: 1px solid rgba(0,27,77,0.08); }
          .et-tier-card.featured .et-tier-head { background: linear-gradient(155deg, #0047BB, #003399); border-bottom: 1px solid rgba(0,71,187,0.3); color: #ffffff; }
          .et-tier-badge { font-size: 11.5px; font-weight: 700; letter-spacing: 0; color: #0047BB; margin-bottom: 10px; display: block; }
          .et-tier-card.featured .et-tier-badge { color: #6EE7B7; }
          .et-tier-name { font-family: 'Space Grotesk',sans-serif; font-size: 22px; font-weight: 600; color: #001B4D; }
          .et-tier-card.featured .et-tier-name { color: #FFFFFF; }
          .et-tier-desc { font-size: 13px; color: rgba(0,27,77,0.66); margin-top: 6px; }
          .et-tier-card.featured .et-tier-desc { color: rgba(255,255,255,0.85); }
          .et-tier-feats { padding: 26px 28px 30px; flex: 1; display: flex; flex-direction: column; gap: 14px; }
          .et-tf-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: rgba(0,27,77,0.74); }
          .et-tf-item svg { color: #349F93; flex-shrink: 0; margin-top: 2px; }
          @media (max-width: 1080px) { .et-tier-grid { grid-template-columns: repeat(2,1fr); } .et-tier-card:nth-child(3) { grid-column: 1 / -1; justify-self: center; width: 50%; } }
          @media (max-width: 640px) { .et-tier-card:nth-child(3) { width: 100%; } .et-tier-grid { grid-template-columns: 1fr; } .et-tier-head { padding: 24px 22px; } .et-tier-feats { padding: 22px 22px 26px; } }
          @media (max-width: 420px) { .et-tier-head { padding: 20px 18px; } .et-tier-feats { padding: 18px 18px 22px; } .et-tier-name { font-size: 18px; } }
        `}</style>
      </div>
    </>
  );
}
