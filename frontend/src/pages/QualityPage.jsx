import PageBanner from '../components/PageBanner';
import QualitySection from '../components/QualitySection';
import { useCMSStore } from '../store/useCMSStore';

export default function QualityPage() {
  const banner = useCMSStore((s) => s.banners?.main?.quality);

  return (
    <>
      <PageBanner
        title={banner?.title && banner.title !== 'Quality' ? banner.title : 'Our Quality'}
        subtitle={banner?.subtitle || 'Focused on quality, traceability, and responsible handling at every stage.'}
        slideshowImages={['/images/client-final/Process_line.webp']}
        fullScreen
        hideBreadcrumb
      >
        <div className="quality-hero-proof" aria-label="Quality pillars">
          {['Inspection', 'Traceability', 'HACCP', 'Halal'].map((item) => (
            <span key={item} className="quality-proof-item">
              <span className="quality-proof-dot" />
              <span>{item}</span>
            </span>
          ))}
        </div>
        <div className="quality-scroll-cue">Scroll to explore</div>
      </PageBanner>
      <QualitySection />

      <style>{`
        .page-hero-extra {
          flex-direction: column;
          margin-top: clamp(48px, 8vh, 86px);
        }

        .page-hero .banner-slideshow .slide-img.active {
          opacity: 0.62;
          filter: grayscale(8%) contrast(1.08) brightness(0.86);
        }

        .page-hero .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.24) 42%, rgba(17,17,17,0.56) 100%),
            radial-gradient(120% 100% at 50% 0%, rgba(222,81,10,0.18) 0%, rgba(44,71,36,0.3) 58%, rgba(17,17,17,0.45) 100%);
        }

        .page-hero .page-hero-title {
          background: none;
          -webkit-text-fill-color: #ffffff;
          color: #ffffff;
          text-shadow: 0 8px 28px rgba(0,0,0,0.48);
        }

        .page-hero .page-hero-sub {
          color: rgba(255,255,255,0.9);
          text-shadow: 0 3px 16px rgba(0,0,0,0.42);
        }

        .quality-hero-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          max-width: 760px;
          margin: 0 auto;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 18px;
          background: rgba(17,17,17,0.28);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(6px);
          box-shadow: 0 18px 46px rgba(0,0,0,0.18);
          text-shadow: 0 2px 12px rgba(0,0,0,0.48);
        }

        .quality-proof-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .quality-proof-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -18px;
          width: 36px;
          height: 2px;
          background: rgba(255,255,255,0.72);
        }

        .quality-proof-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #DE510A;
          box-shadow: 0 0 0 5px rgba(222,81,10,0.28), 0 0 18px rgba(222,81,10,0.62);
          flex: 0 0 auto;
        }

        .quality-scroll-cue {
          margin-top: clamp(72px, 12vh, 112px);
          font-size: 12.5px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-shadow: 0 2px 12px rgba(0,0,0,0.56);
        }

        @media (max-width: 700px) {
          .page-hero-extra {
            margin-top: 44px;
          }

          .quality-hero-proof {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 12px;
            width: min(100%, 330px);
            padding: 0;
            background: transparent;
            border: none;
            box-shadow: none;
            backdrop-filter: none;
          }

          .quality-proof-item {
            justify-content: center;
            padding: 10px 10px;
            font-size: 13.5px;
            background: rgba(17,17,17,0.34);
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 12px;
            backdrop-filter: blur(5px);
          }

          .quality-proof-item:not(:last-child)::after {
            display: none;
          }

          .quality-scroll-cue {
            margin-top: 54px;
            font-size: 11.5px;
          }
        }
      `}</style>
    </>
  );
}
