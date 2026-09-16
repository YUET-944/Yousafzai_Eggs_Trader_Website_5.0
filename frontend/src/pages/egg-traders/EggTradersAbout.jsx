import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/client-final/farm source.png';

export default function EggTradersAbout() {
  const data = useCMSStore((s) => s.eggTraders.about);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.about);
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
        title={banner?.title || 'About Us'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 56%"
      />
      <div ref={ref}>
        <section className="section-alt" id="et-about">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-about-grid">
              <div className="reveal">
                <div className="et-quote-block">
                  <p className="et-quote-text">{data.quote}</p>
                  <div className="et-quote-foot">{data.quoteFooter}</div>
                </div>
                <div style={{ marginTop: 24, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,27,77,0.12)', boxShadow: '0 10px 28px rgba(0,27,77,0.08)' }}>
                  <img src="/images/client-final/mixed.png" alt="Fresh shell eggs trading supply" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                </div>
                <div className="et-value-list">
                  {data.features.map((f, i) => (
                    <div key={i} className="et-value-item">
                      <div className="et-value-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                          {f.icon === 'Feather' ? <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" /> :
                           f.icon === 'TrendingUp' ? <><path d="M22 7l-7 7-4-4-4 4" /><path d="M22 2h-6v6" /></> :
                           <><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></>}
                        </svg>
                      </div>
                      <div>
                        <div className="et-value-title">{f.title}</div>
                        <div className="et-value-body">{f.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="et-about-text reveal">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .et-about-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 72px; align-items: start; }
          .et-quote-block { background: linear-gradient(155deg, #0047BB, #003399); border: 1px solid rgba(0,71,187,0.3); border-radius: 24px; padding: 44px 40px; color: #ffffff; position: relative; overflow: hidden; }
          .et-quote-block::before { content: ''; position: absolute; inset: 0; background: radial-gradient(500px 300px at 80% 0%, rgba(208,222,187,0.16), transparent 60%), radial-gradient(400px 300px at 0% 100%, rgba(185,217,235,0.15), transparent 60%); pointer-events: none; }
          .et-quote-block::after { content: '"'; position: absolute; top: -30px; right: 18px; font-family: 'Space Grotesk',sans-serif; font-size: 180px; color: rgba(20,20,20,0.06); }
          .et-quote-text { font-family: 'Space Grotesk',sans-serif; font-size: 23px; font-weight: 500; line-height: 1.5; position: relative; z-index: 2; }
          .et-quote-foot { margin-top: 24px; font-size: 13px; color: #D0DEBB; position: relative; z-index: 2; }
          .et-value-list { display: flex; flex-direction: column; gap: 0; margin-top: 30px; }
          .et-value-item { display: flex; gap: 18px; padding: 22px 0; border-bottom: 1px solid rgba(0,27,77,0.1); }
          .et-value-item:first-child { padding-top: 0; }
          .et-value-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(0,71,187,0.08); border: 1px solid rgba(0,71,187,0.18); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0047BB; }
          .et-value-title { font-weight: 700; font-size: 15px; color: #001B4D; margin-bottom: 5px; }
          .et-value-body { font-size: 13.5px; color: rgba(0,27,77,0.7); line-height: 1.65; }
          .et-about-text p { font-size: 15.5px; color: rgba(0,27,77,0.72); margin-bottom: 18px; }
          @media (max-width: 860px) { .et-about-grid { grid-template-columns: 1fr; gap: 40px; } .et-quote-block { padding: 36px 28px; } .et-quote-text { font-size: 19px; } }
          @media (max-width: 420px) { .et-quote-block { padding: 28px 20px; border-radius: 20px; } .et-quote-text { font-size: 17px; } .et-about-text p { font-size: 14px; } }
        `}</style>
      </div>
    </>
  );
}
