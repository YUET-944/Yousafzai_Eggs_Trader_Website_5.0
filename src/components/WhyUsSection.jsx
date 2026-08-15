import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

// Refactored GSAP Stat Counter
function StatCounter({ end, suffix }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    let obj = { val: 0 };
    const target = parseInt(end.replace(/[^0-9]/g, ''), 10);
    
    // Create scroll trigger for counter
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              setDisplayValue(Math.floor(obj.val).toString());
            }
          });
        }
      });
    });
    
    return () => ctx.revert();
  }, [end]);
  
  return <span ref={ref}>{displayValue}{suffix}</span>;
}

// Map icon string to component
function getIcon(iconName) {
  const IconComponent = LucideIcons[iconName];
  return IconComponent ? <IconComponent size={24} /> : null;
}

export default function WhyUsSection() {
  const whyUs = useCMSStore((s) => s.whyUs);
  const statsBand = useCMSStore((s) => s.statsBand);
  const industries = useCMSStore((s) => s.industries);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Why Us Section Entrance
      gsap.fromTo('.why-head-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: '#why-us', start: 'top 80%', once: true }
        }
      );

      // 2. Why Cards Stagger
      gsap.fromTo('.why-card-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: '.why-grid', start: 'top 85%', once: true }
        }
      );

      // 3. Stats Band Entrance & Dividers
      gsap.fromTo('.stat-head-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: '#stats', start: 'top 80%', once: true }
        }
      );
      
      gsap.fromTo('.sb-divider', 
        { width: "0%" },
        { 
          width: "34px", duration: 0.5, ease: "power2.out", stagger: 0.15,
          scrollTrigger: { trigger: '.stats-band-grid', start: 'top 85%', once: true }
        }
      );

      // 4. Industries Section
      gsap.fromTo('.ind-head-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: '#industries', start: 'top 80%', once: true }
        }
      );

      gsap.fromTo('.ind-card-animate', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: '.industry-grid', start: 'top 85%', once: true }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section id="why-us">
        <div className="container">
          <div className="sec-head why-head-animate">
            <div className="tag-eyebrow">{whyUs.eyebrow}</div>
            <h2 className="sec-title">{whyUs.title}</h2>
          </div>
          <div className="why-grid">
            {whyUs.reasons.map((r, i) => (
              <div key={i} className="why-card why-card-animate">
                <div className="why-card-top">
                  <div className="why-num">{r.num}</div>
                  <div className="why-icon-wrap">{getIcon(r.icon)}</div>
                </div>
                <div>
                  <div className="why-title">{r.title}</div>
                  <div className="why-body">{r.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band" id="stats">
        <div className="container">
          <div className="sec-head center stat-head-animate" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="tag-eyebrow" style={{ justifyContent: 'center', color: '#B9320D' }}>Company Statistics</div>
            <h2 className="sec-title" style={{ color: '#111111' }}>Performance That Speaks for Itself</h2>
          </div>
          <div className="stats-band-grid">
            {statsBand.stats.map((stat, i) => (
              <div key={i} className="sb-card">
                <div className="sb-num"><StatCounter end={stat.value} suffix={stat.suffix} /></div>
                <div className="sb-divider" />
                <div className="sb-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt" id="industries">
        <div className="container">
          <div className="sec-head center ind-head-animate" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>Industries Served</div>
            <h2 className="sec-title">Built for Every Commercial Food Buyer</h2>
          </div>
          <div className="industry-grid">
            {industries.map((ind, i) => (
              <div key={i} className="industry-card ind-card-animate">
                <div className="ind-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                    {ind.icon === 'Building2' ? <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /> :
                     ind.icon === 'ChefHat' ? <path d="M4 14h16l-1.5 6h-13L4 14zM6 14V8a6 6 0 0112 0v6" /> :
                     ind.icon === 'Store' ? <path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 21v-5h6v5" /> :
                     ind.icon === 'Factory' ? <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></> :
                     <path d="M12 2v20M5 7h14M5 12h14M5 17h14" />}
                  </svg>
                </div>
                <div className="ind-name">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* Why Us Grid & Cards */
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .why-card { 
          background: linear-gradient(135deg, #FBF7F0, #FBF7F0); 
          border: 1px solid rgba(63,98,49,0.45); 
          border-radius: 24px; 
          padding: 30px; 
          display: flex; 
          flex-direction: column; 
          gap: 16px; 
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform, box-shadow;
        }
        .why-card-top { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 8px; }
        .why-icon-wrap { color: rgba(20,20,20,0.2); transition: all 0.3s ease; }
        
        .why-card:hover { 
          transform: translateY(-8px) scale(1.02); 
          box-shadow: 0 14px 36px rgba(63,98,49,0.3); 
          border-color: rgba(222,81,10,0.4);
          background: linear-gradient(135deg, #09203c, #0d2c52);
        }
        .why-card:hover .why-icon-wrap {
          color: #DE510A;
          transform: scale(1.1) rotate(5deg);
        }
        
        .why-num { font-family: 'Space Grotesk',sans-serif; font-size: 38px; font-weight: 700; color: #DE510A; line-height: 1; text-shadow: 0 2px 10px rgba(222,81,10,0.3); }
        .why-title { font-weight: 700; font-size: 15px; color: #111111; margin-bottom: 8px; }
        .why-body { font-size: 13.5px; color: rgba(20,20,20,0.7); line-height: 1.7; }
        
        /* Stats Band */
        .stats-band { background: linear-gradient(155deg,#FBF7F0,#FBF7F0 60%,#FBF7F0); position: relative; overflow: hidden; }
        .stats-band::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(20,20,20,0.05) 1px, transparent 0); background-size: 30px 30px; }
        .stats-band-grid { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4,1fr); gap: 30px; }
        
        .sb-card { 
          text-align: center; 
          padding: 14px; 
          transition: transform 0.3s ease; 
          will-change: transform;
        }
        .sb-card:hover { transform: scale(1.03); }
        .sb-card:hover .sb-num { text-shadow: 0 0 15px rgba(20,20,20,0.3); }
        .sb-card:hover .sb-divider { background: #FFD700; box-shadow: 0 0 8px rgba(222,81,10,0.6); }
        
        .sb-num { font-family: 'Space Grotesk',sans-serif; font-size: clamp(2.2rem,3.4vw,3.2rem); font-weight: 700; color: #111111; transition: text-shadow 0.3s ease; }
        .sb-lbl { font-size: 13px; color: rgba(20,20,20,0.6); margin-top: 10px; }
        .sb-divider { width: 0; height: 2px; background: #DE510A; margin: 14px auto 0; transition: background 0.3s, box-shadow 0.3s; }
        
        /* Industries */
        .industry-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 18px; }
        .industry-card { 
          background: #FFFFFF; 
          border-radius: 16px; 
          padding: 28px 18px; 
          text-align: center; 
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1); 
          box-shadow: 0 4px 20px rgba(63,98,49,0.05);
          will-change: transform, box-shadow;
        }
        .industry-card:hover { 
          background: #FBF7F0; 
          transform: translateY(-8px); 
          box-shadow: 0 12px 30px rgba(63,98,49,0.18); 
        }
        
        .ind-icon { 
          width: 50px; 
          height: 50px; 
          margin: 0 auto 16px; 
          border-radius: 13px; 
          background: #FFFFFF; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #B9320D; 
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1); 
        }
        .industry-card:hover .ind-icon { 
          background: #DE510A; 
          color: #ffffff; 
          transform: translateY(-4px);
        }
        
        .ind-name { font-size: 13px; font-weight: 600; color: #111111; transition: color 0.35s ease; }
        .industry-card:hover .ind-name { color: #DE510A; }
        
        @media (max-width: 1080px) { .industry-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 860px) { .why-grid { grid-template-columns: 1fr; } .stats-band-grid { grid-template-columns: repeat(2,1fr); gap: 34px; } .industry-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
    </div>
  );
}
