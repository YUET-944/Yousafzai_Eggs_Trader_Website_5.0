import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Award } from 'lucide-react';

const CERTS = [
  {
    file: 'ACI HACCP Certificate -YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'HACCP Certification',
    sub: 'ACI HACCP – Food Safety Management · 2026–2029',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ORvFmz7k0L6aQQ0ceOQdyQJztMiQ0bwPfnTGTI-VYQ&s=10',
    seal: '#3F6231',
  },
  {
    file: 'ISO 22000.pdf',
    title: 'ISO 22000',
    sub: 'Food Safety Quality System · 2026',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzJYRe34-UIfwM4zgLNwlXIowN0tX5HOgGVZHsORWJxg&s=10',
    seal: '#DE510A',
  },
  {
    file: 'IHC Halal Certificate-YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'Halal Certification',
    sub: 'IHC Halal Certified · 2026–2029',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1HmfWXydiFFV9BUFNofK2pLM7Akai7Rs6QTI02JkDA&s=10',
    seal: '#3F6231',
  },
  {
    file: 'SECP.pdf',
    title: 'SECP',
    sub: 'Securities and Exchange Commission of Pakistan',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4DjmOCekJ7fiWnQ1sSqkUovdadFW9mxSln0lBqyk8w&s=10',
    seal: '#3F6231',
  },
  {
    file: 'Mardan Chamber of Commerce.pdf',
    title: 'Chamber of Commerce',
    sub: 'Mardan Chamber of Commerce & Industry',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79sSV66WSBVKNS21gaRbmC7dy01N55o3HCVOFMyB-8w&s=10',
    seal: '#3F6231',
  },
  {
    file: 'Islamabad Chamber of Commerce.pdf',
    title: 'Islamabad Chamber of Commerce',
    sub: 'Islamabad Chamber of Commerce',
    icon: '/images/certificates/islamabad-chamber-commerce.webp',
    seal: '#3F6231',
  },
];

function CertSeal({ icon, seal }) {
  const isComponent = typeof icon === 'function' || typeof icon === 'object';
  const Ic = isComponent ? icon : null;
  return (
    <div className="cert-seal-wrap">
      <svg className="cert-seal" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="seal-ring" cx="60" cy="60" r="55" fill="#ffffff" />
        <circle className="seal-dash" cx="60" cy="60" r="49" fill="none" />
        <circle className="seal-core" cx="60" cy="60" r="33" fill={seal} />
        <circle className="seal-spark" cx="60" cy="60" r="33" fill="none" />
        <path className="seal-notch" d="M 60 0.5 L 60 7" />
      </svg>
      {isComponent ? (
        <Ic size={28} strokeWidth={2.4} className="cert-seal-ic" />
      ) : (
        <img src={icon} alt="" className="cert-seal-img" />
      )}
    </div>
  );
}

export default function SceneCertificates() {
  const [previewIdx, setPreviewIdx] = useState(null);
  const [previewRect, setPreviewRect] = useState(null);
  const certSectionRef = useRef(null);
  const previewTimerRef = useRef(null);
  const canHoverRef = useRef(false);

  const clearPreviewTimer = () => {
    if (previewTimerRef.current) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
  };

  const showPreview = (idx, target) => {
    if (!canHoverRef.current || !target) return;
    clearPreviewTimer();
    const rect = target.getBoundingClientRect();
    setPreviewRect({
      left: rect.left + rect.width / 2,
      top: rect.top,
    });
    setPreviewIdx(idx);
  };

  const schedulePreviewClose = () => {
    clearPreviewTimer();
    previewTimerRef.current = window.setTimeout(() => {
      setPreviewIdx(null);
      setPreviewRect(null);
    }, 180);
  };

  useEffect(() => {
    const section = certSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) section.classList.add('certs-in'); }),
      { threshold: 0.2 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncHover = () => { canHoverRef.current = mq.matches; };
    syncHover();
    mq.addEventListener?.('change', syncHover);
    return () => {
      mq.removeEventListener?.('change', syncHover);
      clearPreviewTimer();
    };
  }, []);

  useEffect(() => {
    setPreviewIdx(null);
    setPreviewRect(null);
    clearPreviewTimer();
  }, []);

  return (
    <section className="cert-section" id="certificates" ref={certSectionRef}>
      <div className="container">
        <div className="sec-head center">
          <h2 className="sec-title">Our Certificates / Legal Attachments</h2>
          <p className="sec-sub">
            Verified documents supporting our quality promise. Select a certificate to view it.
          </p>
        </div>

        <div className="cert-stage" >
          <div className="cert-hub">
            <span className="cert-hub-icon"><Award size={30} /></span>
            <strong>Certified</strong>
            <small>click a badge</small>
          </div>

          <div className="cert-orbit">
            {CERTS.map((c, i) => (
              <div
                key={c.file}
                className={`cert-token tok-${i}`}
                onMouseEnter={(e) => showPreview(i, e.currentTarget)}
                onMouseLeave={schedulePreviewClose}
                onFocus={(e) => showPreview(i, e.currentTarget)}
                onBlur={schedulePreviewClose}
                tabIndex={0}
                aria-label={c.title}
              >
                <div className="tok-inner">
                  <CertSeal icon={c.icon} seal={c.seal} />
                  <span className="tok-name">{c.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {previewIdx !== null && previewRect && createPortal((
          <div
            className="cert-preview-floating"
            style={{ left: previewRect.left, top: previewRect.top }}
            onMouseEnter={clearPreviewTimer}
            onMouseLeave={schedulePreviewClose}
            aria-hidden="true"
          >
            <strong>{CERTS[previewIdx].title}</strong>
            <span>{CERTS[previewIdx].sub}</span>
          </div>
        ), document.body)}
      </div>

      <style>{`
        .cert-section {
          padding: 120px 0 140px;
          position: relative;
          overflow: hidden;
          background: #FBF7F0;
        }

        .cert-stage {
          --cert-size: 148px;
          --ring: 176px;
          width: 560px;
          height: 560px;
          margin: 0 auto;
          position: relative;
        }

        .cert-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 168px;
          height: 168px;
          transform: translate(-50%, -50%);
          z-index: 3;
          background: #ffffff;
          color: #111111;
          border: 3px solid #3F6231;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 24px 60px rgba(63,98,49,0.22);
          text-align: center;
          padding: 20px;
        }

        .cert-hub-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #3F6231;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          box-shadow: 0 8px 20px rgba(63,98,49,0.35);
        }

        .cert-hub strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: #111111;
        }

        .cert-hub small {
          font-size: 10px;
          color: #6b7280;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* orbit */
        .cert-orbit {
          position: absolute;
          inset: 0;
          animation: certSpin 26s linear infinite;
        }

        .cert-orbit::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--ring);
          height: var(--ring);
          transform: translate(-50%, -50%);
          border: 2px dashed rgba(63,98,49,0.4);
          border-radius: 50%;
          box-sizing: border-box;
        }

        .cert-token {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--cert-size);
          height: var(--cert-size);
          margin: calc(var(--cert-size) / -2) 0 0 calc(var(--cert-size) / -2);
          cursor: pointer;
          background: transparent;
          border: none;
          z-index: 2;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .cert-token:focus-visible .cert-seal-wrap {
          outline: 3px solid rgba(222,81,10,0.45);
          outline-offset: 5px;
        }

        .cert-token.tok-0 { transform: rotate(0deg) translateX(var(--ring)); }
        .cert-token.tok-1 { transform: rotate(60deg) translateX(var(--ring)); }
        .cert-token.tok-2 { transform: rotate(120deg) translateX(var(--ring)); }
        .cert-token.tok-3 { transform: rotate(180deg) translateX(var(--ring)); }
        .cert-token.tok-4 { transform: rotate(240deg) translateX(var(--ring)); }
        .cert-token.tok-5 { transform: rotate(300deg) translateX(var(--ring)); }

        .tok-inner {
          width: 100%;
          height: 100%;
          animation: certSpinRev 26s linear infinite;
        }

        .cert-token.tok-0 .tok-inner { animation-delay: 0s; }
        .cert-token.tok-1 .tok-inner { animation-delay: -4.33s; }
        .cert-token.tok-2 .tok-inner { animation-delay: -8.66s; }
        .cert-token.tok-3 .tok-inner { animation-delay: -13s; }
        .cert-token.tok-4 .tok-inner { animation-delay: -17.33s; }
        .cert-token.tok-5 .tok-inner { animation-delay: -21.66s; }

        .cert-seal-wrap {
          width: var(--cert-size);
          height: var(--cert-size);
          position: relative;
          border-radius: 50%;
          box-shadow: 0 12px 30px rgba(63,98,49,0.25);
          transition: transform 0.3s, box-shadow 0.3s;
          background: #ffffff;
        }

        .cert-seal {
          width: 100%;
          height: 100%;
          display: block;
        }

        .seal-ring {
          stroke: #3F6231;
          stroke-width: 2.5;
        }

        .seal-dash {
          stroke: rgba(63,98,49,0.4);
          stroke-width: 1.2;
          stroke-dasharray: 4 7;
        }

        .seal-spark {
          stroke: #F8B44A;
          stroke-width: 2;
          stroke-dasharray: 12 7;
        }

        .seal-notch {
          stroke: rgba(63,98,49,0.6);
          stroke-width: 2;
        }

        .cert-seal-ic {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #ffffff;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.28));
        }

        .cert-seal-img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 66px;
          height: 66px;
          object-fit: cover;
          border-radius: 50%;
        }

        .cert-token:hover .cert-seal-wrap {
          transform: scale(1.07) rotate(-4deg);
          box-shadow: 0 20px 48px rgba(222,81,10,0.35);
        }

        .tok-loader {
          width: 22px;
          height: 22px;
          border: 2.5px solid rgba(63,98,49,0.2);
          border-top-color: #3F6231;
          border-radius: 50%;
          animation: tokSpin 0.8s linear infinite;
        }

        .tok-name {
          display: block;
          text-align: center;
          margin-top: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: #111111;
          letter-spacing: 0.01em;
          line-height: 1.25;
          text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }

        @media (hover: hover) and (pointer: fine) {
          .cert-token:hover,
          .cert-token:focus-visible {
            z-index: 30;
          }
        }

        .cert-stage:hover .cert-orbit,
        .cert-stage:hover .tok-inner {
          animation-play-state: paused;
        }

        .cert-section.certs-in .cert-stage {
          animation: certIn 0.9s cubic-bezier(.22,1,.36,1) both;
        }

        .cert-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 24px;
          background: rgba(17,17,17,0.32);
          animation: certFade 0.2s ease both;
        }

        .cert-preview-floating {
          position: fixed;
          z-index: 1300;
          width: 236px;
          transform: translate(-50%, calc(-100% - 16px));
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-radius: 14px;
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.24);
          box-shadow: 0 18px 42px rgba(63,98,49,0.2);
          color: #111111;
          text-align: left;
          cursor: pointer;
          animation: certPreviewIn 0.18s ease both;
        }

        .cert-preview-floating::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 14px;
          height: 14px;
          transform: translateX(-50%) rotate(45deg);
          background: #ffffff;
          border-right: 1px solid rgba(63,98,49,0.24);
          border-bottom: 1px solid rgba(63,98,49,0.24);
        }

        .cert-preview-floating strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          line-height: 1.25;
          color: #111111;
        }

        .cert-preview-floating span {
          font-size: 12px;
          line-height: 1.45;
          color: rgba(20,20,20,0.62);
        }

        .cert-preview-floating em {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          color: #DE510A;
        }

        .cert-viewer {
          width: min(460px, calc(100vw - 48px));
          height: min(760px, calc(100vh - 48px));
          background: #ffffff;
          border: 1px solid rgba(63,98,49,0.3);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 34px 90px rgba(0,0,0,0.32);
          animation: certDrawerIn 0.22s cubic-bezier(.22,1,.36,1) both;
        }

        .cert-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(63,98,49,0.2);
          background: #ffffff;
        }

        .cert-modal-head span {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: rgba(20,20,20,0.58);
          line-height: 1.4;
        }

        .cert-modal-head strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          color: #111111;
        }

        .cert-close {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(63,98,49,0.3);
          background: #fff;
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
          flex-shrink: 0;
        }

        .cert-close:hover { background: #3F6231; color: #ffffff; }

        .cert-close:focus-visible,
        .cert-frame-note a:focus-visible {
          outline: 3px solid rgba(222,81,10,0.45);
          outline-offset: 3px;
        }

        .cert-frame-wrap {
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          background: #4a4e53;
          overflow: hidden;
        }

        .cert-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          background: #4a4e53;
        }

        .cert-frame-note {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 20px;
          background: #ffffff;
          border-top: 1px solid rgba(63,98,49,0.18);
          font-size: 12px;
          color: #6b7280;
        }

        .cert-frame-note span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .cert-frame-note a {
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #3F6231;
          padding: 9px 14px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .cert-frame-note a:hover { background: #2C4724; }

        .cert-loading {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #e8ecf2;
          background: #4a4e53;
          text-align: center;
        }

        .cert-loading p { font-size: 14px; color: #c7ced9; margin: 0; }

        .tok-loader.big {
          width: 34px;
          height: 34px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: #F76B0D;
        }

        @keyframes certSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes certSpinRev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes tokSpin { to { transform: rotate(360deg); } }

        @keyframes certFade { from { opacity: 0; } to { opacity: 1; } }

        @keyframes certPop { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: none; } }

        @keyframes certDrawerIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }

        @keyframes certPreviewIn {
          from { opacity: 0; transform: translate(-50%, calc(-100% - 6px)) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, calc(-100% - 16px)) scale(1); }
        }

        @keyframes certIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

        @media (max-width: 700px) {
          .cert-section { padding: 90px 12px 110px; }
          .cert-stage {
            --cert-size: 104px;
            --ring: 132px;
            width: 360px;
            height: 360px;
            margin-top: 30px;
          }
          .cert-hub {
            width: 118px;
            height: 118px;
            padding: 12px;
          }
          .cert-hub-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 2px;
          }
          .cert-hub strong { font-size: 12px; }
          .cert-hub small { font-size: 8.5px; }
          .tok-name { font-size: 10px; margin-top: 7px; }
          .cert-backdrop {
            align-items: flex-end;
            justify-content: center;
            padding: 12px;
            overflow: hidden;
          }
          .cert-viewer {
            width: 100%;
            height: min(82vh, 680px);
            max-height: calc(100vh - 24px);
            margin: 0;
            border-radius: 16px 16px 14px 14px;
            animation: certSheetIn 0.22s cubic-bezier(.22,1,.36,1) both;
          }
          .cert-frame-wrap {
            min-height: 0;
          }
          .cert-modal-head {
            padding: 14px 14px 14px 16px;
            align-items: flex-start;
          }
          .cert-modal-head strong { font-size: 16px; }
          .cert-frame-note {
            flex-direction: column;
            align-items: stretch;
            padding: 12px 14px;
          }
          .cert-frame-note a {
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .cert-stage {
            --cert-size: 88px;
            --ring: 108px;
            width: 300px;
            height: 300px;
          }
        }

        @keyframes certSheetIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
