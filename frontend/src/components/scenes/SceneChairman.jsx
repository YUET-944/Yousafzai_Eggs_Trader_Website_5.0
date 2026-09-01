import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../../store/useCMSStore';
import brandLogo from '../../assets/logo.svg';

gsap.registerPlugin(ScrollTrigger);

export default function SceneChairman() {
  const chairman = useCMSStore((s) => s.aboutScenes?.chairman) || {};
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  const role = chairman.role === 'CHAIRMAN & FOUNDER' ? 'Chairman & Founder' : chairman.role || 'Chairman & Founder';

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.98, autoAlpha: 0 },
        {
          duration: 1,
          scale: 1,
          autoAlpha: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.quote-line',
        { autoAlpha: 0, y: 15 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="scene-chairman" ref={containerRef} className="chairman-section">
      <div className="chairman-layout">
        <div className="quote-line chairman-intro">
          <span className="chairman-logo-holder" ref={logoRef}>
            <img
              src={brandLogo}
              alt="Yousafzai Eggs Traders logo"
              className="chairman-brand-mark"
            />
          </span>
          <h2 className="chairman-heading">Message from the Chairman</h2>
          <span className="chairman-divider" aria-hidden="true" />
        </div>

        <div className="quote-line chairman-quote">
          {chairman.quote}
        </div>

        <div className="quote-line chairman-signature">
          <h3 className="chairman-name">{'Sana-Ullah'}</h3>
          <p className="chairman-role">{role}</p>
        </div>
      </div>

      <style>{`
        .chairman-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 88px 20px 94px;
          color: #111111;
          background: #FBF7F0;
        }

        .chairman-layout {
          position: relative;
          width: min(900px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 56px 58px 58px;
          background:
            radial-gradient(460px 240px at 50% 8%, rgba(255, 255, 255, 0.62), transparent 70%),
            radial-gradient(560px 320px at 18% 100%, rgba(63, 98, 49, 0.13), transparent 72%),
            linear-gradient(180deg, rgba(247, 243, 226, 0.94), rgba(210, 225, 201, 0.82));
          border: 1px solid rgba(63, 98, 49, 0.28);
          border-radius: 26px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.88) inset,
            0 22px 54px rgba(63, 98, 49, 0.13);
          overflow: hidden;
        }

        .chairman-layout::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle at 1px 1px, rgba(63, 98, 49, 0.11) 1px, transparent 0);
          background-size: 34px 34px;
          opacity: 0.28;
        }

        .chairman-layout::after {
          content: '';
          position: absolute;
          width: 260px;
          height: 260px;
          top: -116px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(222, 81, 10, 0.1), transparent 68%);
          pointer-events: none;
        }

        .chairman-layout > * {
          position: relative;
          z-index: 1;
        }

        .chairman-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .chairman-logo-holder {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 108px;
          min-height: 66px;
          padding: 8px 16px;
          margin-bottom: 18px;
          background: rgba(63, 98, 49, 0.94);
          border: 1px solid rgba(222, 81, 10, 0.22);
          border-radius: 8px;
          box-shadow: 0 10px 24px rgba(63, 98, 49, 0.12);
        }

        .chairman-brand-mark {
          width: auto;
          height: clamp(50px, 4vw, 64px);
          max-width: min(160px, 52vw);
          display: block;
          object-fit: contain;
        }

        .chairman-heading {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 3.4vw, 43px);
          line-height: 1.18;
          font-weight: 600;
          color: #3F6231;
        }

        .chairman-divider {
          width: 96px;
          height: 2px;
          display: block;
          margin: 18px auto 30px;
          background: linear-gradient(90deg, transparent, rgba(63, 98, 49, 0.36), transparent);
        }

        .chairman-quote {
          margin: 0;
          width: min(760px, 100%);
          font-family: 'Inter', sans-serif;
          font-size: clamp(17px, 1.45vw, 19px);
          font-weight: 400;
          line-height: 1.78;
          font-style: normal;
          text-align: left;
          color: rgba(17, 17, 17, 0.76);
        }

        .chairman-signature {
          margin-top: 30px;
          text-align: center;
        }

        .chairman-name {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(20px, 1.8vw, 24px);
          line-height: 1.15;
          font-weight: 600;
          color: #111111;
        }

        .chairman-role {
          margin: 8px 0 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(17, 17, 17, 0.56);
        }

        @media (max-width: 860px) {
          .chairman-section {
            padding: 76px 18px 82px;
          }

          .chairman-layout {
            padding: 46px 36px 48px;
            border-radius: 22px;
          }
        }

        @media (max-width: 430px) {
          .chairman-section {
            padding: 66px 16px 72px;
          }

          .chairman-layout {
            padding: 34px 22px 38px;
            border-radius: 18px;
          }

          .chairman-logo-holder {
            min-width: 96px;
            min-height: 56px;
            padding: 7px 13px;
            margin-bottom: 16px;
          }

          .chairman-brand-mark {
            height: 44px;
            max-width: 128px;
          }

          .chairman-divider {
            width: 118px;
            margin: 16px auto 24px;
          }

          .chairman-name {
            font-size: 22px;
          }

          .chairman-quote {
            font-size: 16px;
            line-height: 1.74;
          }
        }
      `}</style>
    </section>
  );
}
