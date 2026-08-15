import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/yousafzai-packaging.png';

export default function EggTradersProducts() {
  const products = useCMSStore((s) => s.eggTraders.products);
  const banner = useCMSStore((s) => s.banners?.eggTraders?.products);
  const [brokenImgs, setBrokenImgs] = useState(new Set());
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
        title={banner?.title || 'Our Products'}
        subtitle={banner?.subtitle || ''}
        image={HERO_IMAGE}
        imagePosition="center 64%"
      />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <h2 className="sec-title">{products.title}</h2>
              <p className="sec-sub">{products.subtitle}</p>
            </div>
            <div className="et-product-grid reveal-stagger">
              {products.items.map((item, i) => (
                <div key={i} className="et-product-card">
                  <div className="et-product-top" style={{ background: i === 0 ? 'linear-gradient(145deg,#0047BB,#003399)' : i === 1 ? 'linear-gradient(145deg,#3F6231,#2C4724)' : i === 2 ? 'linear-gradient(145deg,#349F93,#1F6F66)' : 'linear-gradient(145deg,#0047BB,#0A2E6E)' }}>
                    <span className="et-p-badge">{item.badge}</span>
                    {item.image && !brokenImgs.has(i) ? (
                      <img src={item.image} alt={item.name} className="et-p-image" onError={() => setBrokenImgs((prev) => new Set(prev).add(i))} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="46" height="46" style={{ color: '#111111' }}>
                        <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                      </svg>
                    )}
                  </div>
                  <div className="et-product-body">
                    <div className="et-p-name">{item.name}</div>
                    <div className="et-p-desc">{item.description}</div>
                    <div className="et-p-tags">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="et-p-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          .et-product-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
          .et-product-card { background: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,71,187,0.12); backdrop-filter: blur(12px); transition: transform .4s, box-shadow .4s, border-color .4s; }
          .et-product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.18); border-color: rgba(0,71,187,0.3); }
          .et-product-top { height: 128px; display: flex; align-items: center; justify-content: center; position: relative; }
          .et-product-top .et-p-image { width: 100%; height: 100%; object-fit: cover; }
          .et-p-badge { position: absolute; top: 12px; right: 12px; font-size: 10.5px; font-weight: 700; letter-spacing: 0; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.5); color: #FFFFFF; padding: 4px 10px; border-radius: 20px; z-index: 1; }
          .et-product-body { padding: 22px 20px; }
          .et-p-name { font-weight: 700; font-size: 14.5px; color: #001B4D; margin-bottom: 8px; }
          .et-p-desc { font-size: 12.5px; color: rgba(0,27,77,0.68); line-height: 1.6; margin-bottom: 14px; min-height: 62px; }
          .et-p-tags { display: flex; gap: 6px; flex-wrap: wrap; }
          .et-p-tag { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; background: rgba(0,71,187,0.08); border: 1px solid rgba(0,71,187,0.18); color: #0047BB; }
          @media (max-width: 1080px) { .et-product-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 640px) {
            .et-product-grid { grid-template-columns: 1fr; }
            .et-product-body { padding: 18px 16px; }
            .et-p-name { font-size: 13.5px; }
            .et-p-desc { font-size: 12px; min-height: auto; }
          }
          @media (max-width: 420px) { .et-product-top { height: 100px; } }
        `}</style>
      </div>
    </>
  );
}
