import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/yousafzai-packaging.png';

export default function EggTradersQuality() {
  const data = useCMSStore((s) => s.eggTraders.quality);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.quality);
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wrap = el.querySelector('#etTraceWrap');
    const fill = el.querySelector('#etTraceFill');
    if (!wrap || !fill) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { fill.style.width = '100%'; obs.unobserve(entry.target); }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <EggTradersPageBanner
        title={banner?.title || 'Quality'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 62%"
      />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>

            <div className="et-trace-panel reveal">
              <div className="et-trace-top">
                <div>
                  <div className="et-trace-top-title">{data.batch.title}</div>
                  <div className="et-trace-top-sub">{data.batch.subtitle}</div>
                </div>
                <div className="et-trace-id">{data.batch.id}</div>
              </div>
              <div className="et-trace-steps" id="etTraceWrap">
                <div className="et-flow-line"><div className="et-flow-fill" id="etTraceFill" /></div>
                {data.batch.steps.map((step, i) => (
                  <div key={i} className="et-flow-step">
                    <div className="et-flow-dot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="et-flow-title">{step.title}</div>
                    <div className="et-flow-time">{step.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sec-head reveal" style={{ marginBottom: 30 }}>
              <h2 className="sec-title">Quality documentation</h2>
            </div>
            <div className="et-cert-grid reveal-stagger">
              {data.certs.map((cert, i) => (
                <div key={i} className="et-cert-card">
                  <div className="et-cert-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="19" height="19">
                      {cert.icon === 'ShieldCheck' ? <><path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" /></> :
                       cert.icon === 'CheckCircle2' ? <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></> :
                       cert.icon === 'Users' ? <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></> :
                       <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></>}
                    </svg>
                  </div>
                  <div>
                    <div className="et-cert-name">{cert.name}</div>
                    <div className="et-cert-body">{cert.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFFFF' }}>
          <div className="container">
            <div className="sec-head center reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <h2 className="sec-title">Trusted by Buyers and Sellers</h2>
            </div>
            <div className="et-test-grid reveal-stagger">
              {data.testimonials.map((t, i) => (
                <div key={i} className="et-test-card">
                  <div className="et-test-quote-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30" style={{ color: '#0047BB' }}>
                      <path d="M7 7h4v4l-3 6H5l2-6H4V7zm9 0h4v4l-3 6h-3l2-6h-3V7z" />
                    </svg>
                  </div>
                  <div className="et-test-text">{t.text}</div>
                  <div className="et-test-person">
                    <div className="et-test-avatar">{t.initials}</div>
                    <div>
                      <div className="et-test-name">{t.name}</div>
                      <div className="et-test-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          .et-trace-panel { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.18); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,27,77,0.08); backdrop-filter: blur(12px); margin-bottom: 60px; }
          .et-trace-top { padding: 24px 34px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,27,77,0.1); }
          .et-trace-top-title { font-weight: 700; font-size: 15px; color: #001B4D; }
          .et-trace-top-sub { font-size: 12px; color: rgba(0,27,77,0.6); margin-top: 3px; }
          .et-trace-id { font-family: monospace; font-size: 12.5px; background: rgba(0,27,77,0.06); border: 1px solid rgba(0,27,77,0.25); padding: 6px 14px; border-radius: 6px; color: #001B4D; }
          .et-trace-steps { display: flex; padding: 40px 34px 34px; position: relative; gap: 0; justify-content: space-between; }
          .et-flow-line { position: absolute; top: 56px; left: 60px; right: 60px; height: 3px; background: rgba(0,27,77,0.12); border-radius: 4px; }
          .et-flow-fill { height: 100%; width: 0; background: linear-gradient(90deg,#0047BB,#349F93); border-radius: 4px; transition: width 1.2s cubic-bezier(.22,1,.36,1); }
          .et-flow-step { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; flex: 1; }
          .et-flow-dot { width: 48px; height: 48px; border-radius: 50%; background: #FFFFFF; border: 2px solid #0047BB; color: #0047BB; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px rgba(0,27,77,0.04); }
          .et-flow-title { font-weight: 700; font-size: 12px; color: #001B4D; margin-top: 18px; text-align: center; }
          .et-flow-time { font-size: 11px; color: rgba(0,27,77,0.55); margin-top: 4px; text-align: center; }
          .et-cert-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
          .et-cert-card { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.18); border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 16px; backdrop-filter: blur(10px); transition: box-shadow .3s, transform .3s, border-color .3s; }
          .et-cert-card:hover { box-shadow: 0 2px 10px rgba(0,27,77,0.1); transform: translateY(-3px); border-color: rgba(0,71,187,0.42); }
          .et-cert-ic { width: 44px; height: 44px; border-radius: 11px; background: rgba(0,27,77,0.06); border: 1px solid rgba(0,27,77,0.22); display: flex; align-items: center; justify-content: center; color: #001B4D; flex-shrink: 0; }
          .et-cert-name { font-weight: 700; font-size: 13.5px; color: #001B4D; }
          .et-cert-body { font-size: 11.5px; color: rgba(0,27,77,0.6); margin-top: 3px; }
          .et-test-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
           .et-test-card { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.18); border-radius: 20px; padding: 32px; backdrop-filter: blur(12px); transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1), border-color .4s; }
           .et-test-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,27,77,0.12); border-color: rgba(0,71,187,0.42); }
          .et-test-quote-icon { margin-bottom: 18px; }
          .et-test-text { font-size: 14.5px; color: rgba(0,27,77,0.74); line-height: 1.75; margin-bottom: 24px; }
          .et-test-person { display: flex; align-items: center; gap: 14px; border-top: 1px solid rgba(0,27,77,0.1); padding-top: 18px; }
          .et-test-avatar { width: 42px; height: 42px; border-radius: 50%; background: #EFF6FF; border: 1px solid rgba(0,71,187,0.24); color: #0047BB; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk',sans-serif; font-weight: 700; font-size: 14px; }
          .et-test-name { font-weight: 700; font-size: 13.5px; color: #001B4D; }
          .et-test-role { font-size: 11.5px; color: rgba(0,27,77,0.55); }
          @media (max-width: 1080px) { .et-cert-grid { grid-template-columns: repeat(2,1fr); } .et-test-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 860px) { .et-trace-steps { flex-direction: column; gap: 24px; align-items: flex-start; padding-left: 40px; } .et-flow-line { display: none; } .et-flow-step { flex-direction: row; gap: 16px; width: 100%; } .et-flow-title { margin-top: 0; } }
          @media (max-width: 640px) { .et-test-grid { grid-template-columns: 1fr; } .et-cert-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
