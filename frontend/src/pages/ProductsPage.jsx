import { Droplet, FlaskConical, PackageCheck, Blend, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';
import { useQuoteModalStore } from '../store/useQuoteModalStore';

const heroPoster = '/images/client-final/processing-line-product.png';
const packingImage = '/images/client-final/whole-egg-liquid-product.png';
const oldProductsSubtitle = 'Explore egg products, formats, and grade references for commercial supply.';
const newProductsSubtitle = 'Explore our liquid egg product categories for commercial food production.';

const mainProducts = [
  {
    name: 'Whole Egg Liquid',
    description: 'For cereal-based product industries such as biscuit, cake, and cookie manufacturers; hotels, restaurants, catering companies; and other food-product manufacturing industries.',
    icon: Droplet,
    image: '/images/client-final/whole-egg-liquid-product.png',
  },
  {
    name: 'Liquid Egg Yolk',
    description: 'For bakery-product manufacturers and condiment manufacturers such as mayonnaise and sauce producers.',
    icon: FlaskConical,
    image: '/images/client-final/liquid-egg-yolk-product.png',
  },
  {
    name: 'Liquid Egg White or Albumen',
    description: 'For the confectionery and bakery industries, especially for products such as angel cake and meringue.',
    icon: PackageCheck,
    image: '/images/client-final/liquid-egg-white-product.png',
  },
  {
    name: 'Mixed Liquid Blend',
    description: 'Customized formulations for specific industries, food products, or functional requirements.',
    icon: Blend,
    image: '/images/client-final/processing-line-product.png',
  },
];

const packingProducts = [
  {
    title: 'Liquid Egg White',
    image: '/images/client-final/White.png',
    sizes: ['10 kg', '20 kg', '50 kg', '100 kg', '250 kg', '500 kg', '750 kg', '1000 kg'],
  },
  {
    title: 'Liquid Egg Yolk',
    image: '/images/client-final/yellow.png',
    sizes: ['10 kg', '20 kg', '50 kg', '100 kg', '250 kg', '500 kg', '750 kg', '1000 kg'],
  },
  {
    title: 'Mixed Liquid Blend',
    image: '/images/client-final/mixed.png',
    sizes: ['10 kg', '20 kg', '50 kg', '100 kg', '250 kg', '500 kg', '750 kg', '1000 kg'],
  },
];

function OurProductsSection() {
  const openQuoteModal = useQuoteModalStore((s) => s.openModal);

  return (
    <section id="products" className="main-products-section">
      <div className="main-products-bg-grid" />
      <div className="main-products-container">
        <div className="main-products-header">
          <h2>Our Products</h2>
          <p>Liquid egg product categories for commercial food production.</p>
          <div className="main-products-divider" />
        </div>

        <div className="main-products-grid">
          {mainProducts.map((product) => {
            const Icon = product.icon;
            return (
              <article key={product.name} className="main-product-card">
                <div className="main-product-image" aria-hidden="true">
                  <img src={product.image} alt="" loading="lazy" />
                </div>
                <div className="main-product-icon">
                  <Icon size={24} />
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </article>
            );
          })}
        </div>

        <div className="packing-section" aria-labelledby="packing-title">
          <div className="packing-section-header">
            <h2 id="packing-title">Packing Sizes</h2>
            <p>Available pack sizes for commercial liquid egg supply.</p>
          </div>
          <div className="packing-products-grid">
            {packingProducts.map((prod) => (
              <article key={prod.title} className="packing-product-card">
                <h3 className="packing-card-title">{prod.title}</h3>
                
                <div className="packing-img-container">
                  <img src={prod.image} alt={prod.title} loading="lazy" />
                </div>

                <div className="packing-card-body">
                  <span className="packing-available-label">Available in:</span>
                  <div className="packing-size-chips">
                    {prod.sizes.map((size) => (
                      <span key={size} className="packing-size-chip">{size}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="main-products-quote">
          <div>
            <h2>Need product details?</h2>
            <p>Share your requirements and our team will help you with the right liquid egg product category.</p>
          </div>
          <button type="button" onClick={() => openQuoteModal()} className="main-products-quote-btn">
            Request a Quote
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <style>{`
        .main-products-section {
          background: #FBF7F0;
          color: #111111;
          padding: 96px 24px 112px;
          position: relative;
          overflow: hidden;
        }

        .main-products-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .main-products-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .main-products-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 58px;
        }

        .main-products-header h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main-products-header p {
          font-size: 16px;
          color: rgba(20,20,20,0.58);
          line-height: 1.7;
          margin: 0 0 28px;
        }

        .main-products-divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          border-radius: 2px;
        }

        .main-products-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          margin-bottom: 34px;
        }

        .main-product-card,
        .packing-panel,
        .main-products-quote {
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.32);
          box-shadow: 0 18px 44px rgba(63,98,49,0.1);
        }

        .main-product-card {
          border-radius: 16px;
          padding: 28px 24px;
          min-height: 430px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }

        .main-product-card:hover {
          transform: translateY(-5px);
          border-color: rgba(222,81,10,0.36);
          box-shadow: 0 24px 56px rgba(63,98,49,0.16);
        }

        .main-product-image {
          width: 100%;
          height: 150px;
          border-radius: 12px;
          border: 1px solid rgba(63,98,49,0.16);
          background: #FFFFFF;
          overflow: hidden;
          margin-bottom: 20px;
          flex: 0 0 auto;
        }

        .main-product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
          box-sizing: border-box;
          display: block;
        }

        .main-product-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          background: rgba(222,81,10,0.1);
          border: 1px solid rgba(222,81,10,0.25);
          margin-bottom: 22px;
          flex: 0 0 auto;
        }

        .main-product-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px;
          line-height: 1.25;
          margin: 0 0 14px;
          color: #111111;
        }

        .main-product-card p {
          font-size: 13.5px;
          color: rgba(20,20,20,0.66);
          line-height: 1.65;
          margin: 0;
        }

        .packing-section {
          margin-bottom: 48px;
        }

        .packing-section-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .packing-section-header h2,
        .main-products-quote h2 {
          font-family: 'Space Grotesk', sans-serif;
          color: #3F6231;
          font-size: clamp(24px, 2.6vw, 34px);
          line-height: 1.18;
          margin: 0 0 10px;
        }

        .packing-section-header p,
        .main-products-quote p {
          margin: 0;
          color: rgba(20,20,20,0.62);
          line-height: 1.65;
        }

        .packing-products-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .packing-product-card {
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.32);
          border-top: 4px solid #3F6231;
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 18px 44px rgba(63,98,49,0.1);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          height: 100%;
          box-sizing: border-box;
        }

        .packing-product-card:hover {
          transform: translateY(-4px);
          border-color: rgba(222,81,10,0.36);
          box-shadow: 0 24px 56px rgba(63,98,49,0.16);
        }

        .packing-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
          color: #111111;
          margin: 0 0 16px;
        }

        .packing-img-container {
          width: 100%;
          height: 160px;
          border-radius: 12px;
          border: 1px solid rgba(63,98,49,0.2);
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-sizing: border-box;
          flex-shrink: 0;
          overflow: hidden;
          padding: 8px;
        }

        .packing-img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .packing-card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .packing-available-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #3F6231;
          margin-bottom: 12px;
          display: block;
        }

        .packing-size-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .packing-size-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(63,98,49,0.08);
          border: 1px solid rgba(63,98,49,0.22);
          color: #3F6231;
          font-weight: 700;
          font-size: 13px;
          line-height: 1;
          white-space: nowrap;
        }

        .main-products-quote {
          border-radius: 16px;
          padding: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .main-products-quote-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #ffffff;
          background: linear-gradient(135deg, #DE510A 0%, #B9320D 100%);
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          padding: 14px 22px;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(185,50,13,0.22);
        }

        .main-products-quote-btn:focus-visible {
          outline: 3px solid rgba(222,81,10,0.45);
          outline-offset: 3px;
        }

        @media (max-width: 1180px) {
          .main-products-grid,
          .packing-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .main-products-section {
            padding: 78px 16px 92px;
          }
          .main-products-header {
            margin-bottom: 42px;
          }
          .main-products-grid,
          .packing-products-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .main-product-card,
          .packing-product-card {
            min-height: 0;
            padding: 24px 20px;
          }
          .main-product-image {
            height: 180px;
          }
          .packing-img-placeholder {
            height: 150px;
          }
          .main-products-quote {
            padding: 28px 22px;
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .main-products-quote-btn {
            width: 100%;
            justify-content: center;
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}

export default function ProductsPage() {
  const banner = useCMSStore((s) => s.banners?.main?.products);
  const heroTitle = banner?.title === 'Products & Grades' ? 'Our Products' : banner?.title || 'Our Products';
  const heroSubtitle = banner?.subtitle === oldProductsSubtitle ? newProductsSubtitle : banner?.subtitle || newProductsSubtitle;
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
      <OurProductsSection />

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
