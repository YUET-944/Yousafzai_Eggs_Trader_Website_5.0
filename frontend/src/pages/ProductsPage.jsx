import ProductsSection from '../components/ProductsSection';
import { useCMSStore } from '../store/useCMSStore';

export default function ProductsPage() {
  const banner = useCMSStore((s) => s.banners?.main?.products);
  const heroTitle = banner?.title || 'Products & Grades';
  const heroSubtitle = banner?.subtitle || 'Explore our egg product range, available grades, and practical supply options for commercial buyers.';
  const heroPoster = '/images/yousafzai-packaging.png';
  const heroVideoSrc = banner?.video || '';

  return (
    <>
      <header className="products-hero">
        <div className="products-hero-media">
          <img className="products-hero-image" src={heroPoster} alt="" aria-hidden="true" />
          {heroVideoSrc && (
            <video
              className="products-hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster}
              aria-hidden="true"
            >
              <source src={heroVideoSrc} />
            </video>
          )}
        </div>
        <div className="products-hero-overlay" />
        <div className="products-hero-inner">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
        </div>
      </header>
      <ProductsSection />

      <style>{`
        .products-hero {
          --products-nav-offset: 76px;
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: var(--products-nav-offset) 24px 0;
          overflow: hidden;
          background: #3F6231;
          color: #ffffff;
          text-align: center;
        }

        .products-hero-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          transform: scale(1.02);
        }

        .products-hero-media::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(17,17,17,0.42), rgba(17,17,17,0.58)),
            radial-gradient(circle at 50% 18%, rgba(222,81,10,0.28), transparent 44%);
        }

        .products-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 56%;
          display: block;
          z-index: 1;
        }

        .products-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 56%;
          display: block;
          z-index: 0;
        }

        .products-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0);
          background-size: 34px 34px;
          opacity: 0.42;
          pointer-events: none;
        }

        .products-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
        }

        .products-hero h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(48px, 6vw, 78px);
          line-height: 1.02;
          font-weight: 700;
          letter-spacing: 0;
          margin: 0 0 22px;
          color: #ffffff;
          text-shadow: 0 18px 42px rgba(0,0,0,0.28);
          max-width: 100%;
        }

        .products-hero p {
          max-width: 680px;
          margin: 0 auto;
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.72;
          color: rgba(255,255,255,0.88);
        }

        @media (prefers-reduced-motion: reduce), (max-width: 700px) {
          .products-hero-video {
            display: none;
          }

          .products-hero h1 {
            font-size: clamp(30px, 7.4vw, 33px);
          }

          .products-hero p {
            max-width: 32ch;
          }
        }

        @media (max-width: 860px) {
          .products-hero {
            --products-nav-offset: 72px;
            padding-right: 18px;
            padding-left: 18px;
          }
        }

        @media (max-width: 430px) {
          .products-hero {
            --products-nav-offset: 58px;
            padding-right: 16px;
            padding-left: 16px;
          }

          .products-hero h1 {
            font-size: clamp(27px, 7vw, 30px);
          }
        }
      `}</style>
    </>
  );
}
