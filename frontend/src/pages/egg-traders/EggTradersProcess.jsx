import { useEffect, useRef } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/client-final/processing-line-product.png';

const icons = {
  Farm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
    </svg>
  ),
  Search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121m12.728 0l-2.121-2.121M7.757 7.757L5.636 5.636" />
    </svg>
  ),
  Package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Warehouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 013.26 6.6l8-3.2a2 2 0 011.48 0l8 3.2A2 2 0 0122 8.35z" />
      <path d="M6 18h12M6 14h12" />
    </svg>
  ),
  Network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M12 8v4M5 12h14v4" />
    </svg>
  ),
  Truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
};

const SHELL_EGG_PROCESS_STEPS = [
  { num: '01', icon: 'Farm', title: 'Egg Sourcing', body: 'Fresh shell eggs are sourced from approved farms and suppliers.' },
  { num: '02', icon: 'Search', title: 'Receiving & Quality Inspection', body: 'Incoming eggs are inspected for condition, cleanliness and overall quality.' },
  { num: '03', icon: 'Sparkles', title: 'Sorting & Grading', body: 'Eggs are sorted and graded according to size, quality and customer requirements.' },
  { num: '04', icon: 'Package', title: 'Packing', body: 'Graded eggs are carefully packed into suitable trays, cartons or commercial packaging.' },
  { num: '05', icon: 'Warehouse', title: 'Storage', body: 'Packed eggs are stored under appropriate conditions before dispatch.' },
  { num: '06', icon: 'Network', title: 'Supply Chain', body: 'Orders move through the Yousafzai Egg Traders supply and distribution network.' },
  { num: '07', icon: 'Truck', title: 'Delivery', body: 'Eggs are dispatched and delivered to retailers, hotels, restaurants, bakeries, distributors and other B2B customers.' },
];

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

  const stepsToRender = (data.steps && data.steps.length === 7) ? data.steps : SHELL_EGG_PROCESS_STEPS;
  const totalSteps = stepsToRender.length;

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
              {stepsToRender.map((item, i) => (
                <div key={i} className="et-proc-card">
                  <div className="et-proc-num">{item.num}</div>
                  <div className="et-proc-icon">
                    {icons[item.icon] || icons.Farm}
                  </div>
                  <div className="et-proc-title">{item.title}</div>
                  <div className="et-proc-body">{item.body}</div>
                  <div className="et-proc-footer">
                    <span className="et-proc-stage">Stage {i + 1} of {totalSteps}</span>
                    <div className="et-proc-bar-bg">
                      <div className="et-proc-bar-fill" style={{ width: `${((i + 1) / totalSteps) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          .et-proc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .et-proc-card { background: #FFFFFF; border: 1px solid rgba(0,27,77,0.14); border-radius: 20px; padding: 28px 28px 22px; position: relative; backdrop-filter: blur(12px); display: flex; flex-direction: column; transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1), border-color .4s; }
          .et-proc-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,27,77,0.13); border-color: rgba(0,71,187,0.42); }
          .et-proc-num { position: absolute; top: 22px; right: 24px; font-family: 'Space Grotesk',sans-serif; font-size: 32px; font-weight: 700; color: rgba(222,81,10,0.32); }
          .et-proc-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(222,81,10,0.1); border: 1px solid rgba(222,81,10,0.22); display: flex; align-items: center; justify-content: center; color: #DE510A; margin-bottom: 20px; }
          .et-proc-title { font-weight: 700; font-size: 16px; color: #001B4D; margin-bottom: 10px; }
          .et-proc-body { font-size: 13.5px; color: rgba(0,27,77,0.72); line-height: 1.65; flex-grow: 1; margin-bottom: 20px; }
          .et-proc-footer { margin-top: auto; }
          .et-proc-stage { font-size: 11.5px; font-weight: 600; color: rgba(20,20,20,0.48); display: block; margin-bottom: 8px; }
          .et-proc-bar-bg { width: 100%; height: 3.5px; background: rgba(0,27,77,0.08); border-radius: 2px; overflow: hidden; }
          .et-proc-bar-fill { height: 100%; background: linear-gradient(90deg, #DE510A, #0047BB); border-radius: 2px; }
          @media (max-width: 1080px) { .et-proc-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 640px) { .et-proc-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
