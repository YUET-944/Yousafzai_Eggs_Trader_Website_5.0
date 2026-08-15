import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';

export default function SupplyChainSection() {
  const supplyChain = useCMSStore((s) => s.supplyChain);
  const distribution = useCMSStore((s) => s.distribution);
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wrap = el.querySelector('.flow-wrap');
    const fill = el.querySelector('.flow-fill');
    if (!wrap || !fill) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wrap.classList.add('lit');
            fill.style.width = '100%';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  const icons = {
    Feather: <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />,
    FlaskConical: <path d="M9 3v6l-4 9a2 2 0 002 3h10a2 2 0 002-3l-4-9V3" />,
    Snowflake: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
    Package: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 10v6M15 10v6" /></>,
    Truck: <path d="M3 16V8a1 1 0 011-1h9v9M3 16h11M16 16h2l2-3v-3h-4M6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" />,
    Sun: <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />,
    Home: <path d="M3 11l9-8 9 8M5 10v10h14V10M9 21V14h6v7" />,
    Share2: <><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="12" cy="17" r="3" /><path d="M9.5 8.5L14.5 15.5M14.5 8.5L9.5 15.5" /></>,
  };

  return (
    <div ref={ref}>
      <section id="supply-chain">
        <div className="container">
          <div className="sec-head reveal">
            <div className="tag-eyebrow">{supplyChain.eyebrow}</div>
            <h2 className="sec-title">{supplyChain.title}</h2>
            <p className="sec-sub">{supplyChain.subtitle}</p>
          </div>
          <div className="flow-wrap reveal" id="flowWrap">
            <div className="flow-line"><div className="flow-fill" id="flowFill"></div></div>
            {supplyChain.steps.map((step, i) => (
              <div key={i} className="flow-step">
                <div className="flow-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
                    {icons[step.icon]}
                  </svg>
                </div>
                <div className="flow-title">{step.title}</div>
                <div className="flow-desc">{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="card-grid cols-3 reveal-stagger" style={{ marginTop: 70 }}>
            {supplyChain.features.map((feat, i) => (
              <div key={i} className="feature-card">
                <div className="f-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="23" height="23">
                    {icons[feat.icon]}
                  </svg>
                </div>
                <div className="f-title">{feat.title}</div>
                <div className="f-body">{feat.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt" id="distribution">
        <div className="container">
          <div className="sec-head reveal">
            <div className="tag-eyebrow">{distribution.eyebrow}</div>
            <h2 className="sec-title">{distribution.title}</h2>
            <p className="sec-sub">{distribution.subtitle}</p>
          </div>
          <div className="card-grid cols-3 reveal-stagger">
            {distribution.features.map((feat, i) => (
              <div key={i} className="feature-card">
                <div className="f-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="23" height="23">
                    {feat.icon === 'Truck' ? <path d="M3 16V8a1 1 0 011-1h9v9M3 16h11M16 16h2l2-3v-3h-4M6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" /> :
                     feat.icon === 'Globe2' ? <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></> :
                     <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></>}
                  </svg>
                </div>
                <div className="f-title">{feat.title}</div>
                <div className="f-body">{feat.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .flow-wrap { position: relative; display: flex; justify-content: space-between; margin-top: 50px; }
        .flow-line { position: absolute; top: 34px; left: 5%; right: 5%; height: 2px; background: #DBDFE6; z-index: 0; }
        .flow-line .flow-fill { position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: linear-gradient(90deg,#3F6231,#DE510A); transition: width 1.6s cubic-bezier(.22,1,.36,1); }
        .flow-step { position: relative; z-index: 2; flex: 1; text-align: center; padding: 0 10px; }
        .flow-dot { width: 68px; height: 68px; border-radius: 50%; background: #FFFFFF; border: 2px solid #DBDFE6; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; color: #B9320D; transition: border-color .4s, color .4s, transform .4s; position: relative; }
        .flow-wrap.lit .flow-dot { border-color: #DE510A; color: #DE510A; }
        .flow-title { font-weight: 700; font-size: 13.5px; color: #111111; margin-bottom: 6px; }
        .flow-desc { font-size: 11.5px; color: #707888; line-height: 1.5; max-width: 160px; margin: 0 auto; }
        .card-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; width: 100%; }
        .card-grid.cols-3 { grid-template-columns: repeat(3,1fr); }
        .feature-card { background: #F5F7FA; border-radius: 24px; padding: 32px 28px; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1); }
        .feature-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(63,98,49,0.15); background: #FFFFFF; }
        .f-icon { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(145deg,#DE510A,#B9320D); display: flex; align-items: center; justify-content: center; color: #ffffff; margin-bottom: 18px; }
        .f-title { font-weight: 700; font-size: 15px; color: #111111; }
        .f-body { font-size: 13px; color: #707888; line-height: 1.6; margin-top: 12px; }
        @media (max-width: 1080px) {
          .card-grid,
          .card-grid.cols-3 { grid-template-columns: repeat(2,1fr); }
          .feature-card:nth-child(3) { grid-column: 1 / -1; }
          .feature-card:nth-child(4) { grid-column: 1 / -1; }
        }
        @media (max-width: 860px) {
          .flow-wrap { flex-direction: column; gap: 30px; } .flow-line { display: none; }
          .card-grid,
          .card-grid.cols-3 { grid-template-columns: 1fr; gap: 16px; }
          .feature-card { padding: 24px 20px; }
        }
      `}</style>
    </div>
  );
}
