import PageBanner from '../components/PageBanner';
import ProcessSection from '../components/ProcessSection';
import { useCMSStore } from '../store/useCMSStore';

export default function ProcessPage() {
  const banner = useCMSStore((s) => s.banners?.main?.process);
  const process = useCMSStore((s) => s.process) || [];
  const heroTitle = !banner?.title || banner.title === 'Process' ? 'Our Process' : banner.title;
  const heroSubtitle = !banner?.subtitle || banner.subtitle === 'A documented, auditable process at every stage — from sourcing and grading to cold-chain delivery.'
    ? 'A clear process from sourcing and grading to cold-chain delivery.'
    : banner.subtitle;
  const stagePreview = process.slice(0, 7);
  const heroImages = ['/images/client-final/Process_line.webp'];

  return (
    <div className="process-page">
      <PageBanner
        title={heroTitle}
        subtitle={heroSubtitle}
        slideshowImages={heroImages}
        fullScreen
        hideBreadcrumb
      >
        <div className="process-journey-preview" aria-label="Seven process stages">
          <div className="process-journey-line" aria-hidden="true" />
          <div className="process-journey-steps">
            {stagePreview.map((stage, index) => (
              <div className="process-journey-step" key={`${stage.num || index}-${stage.title}`}>
                <span className="process-journey-node">{index + 1}</span>
                <span className="process-journey-title">{stage.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="process-scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="process-scroll-chevron" />
        </div>
      </PageBanner>
      <ProcessSection />

      <style>{`
        .process-page .page-hero {
          background: #2C4724;
        }

        .process-page .banner-slideshow .slide-img {
          background-position: center 56%;
          filter: grayscale(8%) saturate(0.9) contrast(1.02);
        }

        .process-page .banner-slideshow .slide-img.active {
          opacity: 0.38;
        }

        .process-page .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(20,20,20,0.46) 0%, rgba(44,71,36,0.42) 46%, rgba(251,247,240,0.9) 100%),
            radial-gradient(90% 70% at 50% 42%, rgba(251,247,240,0.72), rgba(251,247,240,0.18) 48%, rgba(251,247,240,0.86) 100%);
        }

        .process-page .page-hero-title {
          background: linear-gradient(135deg, #ffffff 0%, #F2E7C9 52%, #DE510A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 18px 38px rgba(0,0,0,0.28));
        }

        .process-page .page-hero-sub {
          color: rgba(255,255,255,0.9);
          text-shadow: 0 10px 26px rgba(0,0,0,0.22);
        }

        .process-page .page-hero-extra {
          width: min(1060px, calc(100vw - 48px));
          margin-top: clamp(48px, 8vh, 82px);
          flex-direction: column;
          gap: 22px;
        }

        .process-journey-preview {
          position: relative;
          width: 100%;
          padding: 0 8px;
        }

        .process-journey-line {
          position: absolute;
          top: 17px;
          left: 9%;
          right: 9%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(242,231,201,0.72), rgba(222,81,10,0.72), rgba(242,231,201,0.72), transparent);
        }

        .process-journey-steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 12px;
        }

        .process-journey-step {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          animation: processStageIn 0.7s cubic-bezier(.22,1,.36,1) both;
        }

        .process-journey-step:nth-child(2) { animation-delay: 0.06s; }
        .process-journey-step:nth-child(3) { animation-delay: 0.12s; }
        .process-journey-step:nth-child(4) { animation-delay: 0.18s; }
        .process-journey-step:nth-child(5) { animation-delay: 0.24s; }
        .process-journey-step:nth-child(6) { animation-delay: 0.3s; }
        .process-journey-step:nth-child(7) { animation-delay: 0.36s; }

        .process-journey-node {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(251,247,240,0.92);
          border: 1px solid rgba(222,81,10,0.55);
          color: #B9320D;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 14px 28px rgba(0,0,0,0.16);
        }

        .process-journey-title {
          max-width: 14ch;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.25;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 8px 18px rgba(0,0,0,0.32);
        }

        .process-scroll-cue {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.72);
          animation: processCueIn 0.9s cubic-bezier(.22,1,.36,1) 0.35s both;
        }

        .process-scroll-chevron {
          width: 8px;
          height: 8px;
          border-right: 1.5px solid currentColor;
          border-bottom: 1.5px solid currentColor;
          transform: rotate(45deg) translateY(-2px);
        }

        @keyframes processStageIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes processCueIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .process-page .page-hero-extra {
            width: min(760px, calc(100vw - 40px));
            margin-top: clamp(38px, 6vh, 64px);
          }

          .process-journey-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            row-gap: 18px;
          }

          .process-journey-line {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .process-page .page-hero {
            padding-top: 118px;
            padding-bottom: 44px;
          }

          .process-page .page-hero-extra {
            width: calc(100vw - 32px);
            margin-top: 34px;
            gap: 18px;
          }

          .process-journey-preview {
            overflow-x: auto;
            padding: 0 0 8px;
            scrollbar-width: none;
          }

          .process-journey-preview::-webkit-scrollbar {
            display: none;
          }

          .process-journey-steps {
            display: flex;
            gap: 12px;
            min-width: max-content;
            padding: 0 2px;
          }

          .process-journey-step {
            width: 112px;
            flex: 0 0 112px;
          }

          .process-journey-node {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }

          .process-journey-title {
            font-size: 12px;
            max-width: 12ch;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-journey-step,
          .process-scroll-cue {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
