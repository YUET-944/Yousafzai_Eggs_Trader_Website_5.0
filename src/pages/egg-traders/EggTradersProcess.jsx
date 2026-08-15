import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/yousafzai-packaging.png';

const icons = {
  Search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  FileText: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M16 2v6h6" /></>,
  Package: <><rect x="4" y="8" width="16" height="11" rx="1.5" /><path d="M8 8V6a4 4 0 018 0v2" /></>,
  Truck: <path d="M3 16V8a1 1 0 011-1h9v9M3 16h11M16 16h2l2-3v-3h-4M6 18a2 2 0 100-4 2 2 0 000 4zM17 18a2 2 0 100-4 2 2 0 000 4z" />,
};

export default function EggTradersProcess() {
  const data = useCMSStore((s) => s.eggTraders.process);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.process);
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
        title={banner?.title || 'Process'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 58%"
      />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{data.title}</h2>
              <p className="sec-sub">{data.subtitle}</p>
            </div>
            <div className="et-proc-grid reveal-stagger">
              {data.steps.map((item, i) => (
                <div key={i} className="et-proc-card">
                  <div className="et-proc-num">{item.num}</div>
                  <div className="et-proc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                      {icons[item.icon]}
                    </svg>
                  </div>
                  <div className="et-proc-title">{item.title}</div>
                  <div className="et-proc-body">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          .et-proc-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
           .et-proc-card { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.18); border-radius: 20px; padding: 28px; position: relative; backdrop-filter: blur(12px); transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1), border-color .4s; }
           .et-proc-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,27,77,0.13); border-color: rgba(0,71,187,0.42); }
          .et-proc-num { position: absolute; top: 22px; right: 24px; font-family: 'Space Grotesk',sans-serif; font-size: 32px; font-weight: 700; color: rgba(0,71,187,0.12); }
          .et-proc-icon { width: 48px; height: 48px; border-radius: 13px; background: rgba(0,27,77,0.06); border: 1px solid rgba(0,27,77,0.2); display: flex; align-items: center; justify-content: center; color: #001B4D; margin-bottom: 20px; }
          .et-proc-title { font-weight: 700; font-size: 15px; color: #001B4D; margin-bottom: 10px; }
          .et-proc-body { font-size: 13px; color: rgba(0,27,77,0.7); line-height: 1.65; }
          @media (max-width: 1080px) { .et-proc-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 640px) { .et-proc-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
