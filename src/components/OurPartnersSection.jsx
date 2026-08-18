import React from 'react';

const PARTNERS = [
  {
    id: 'peek-freans',
    name: 'Peek Freans',
    logo: '/images/partners/peek-freans.png',
    maxHeight: 90,
  },
  {
    id: 'silver-lake-foods',
    name: 'Silver Lake Foods',
    logo: '/images/partners/silver-lake-foods.png',
    maxHeight: 68,
  },
  {
    id: 'barkat-frisian',
    name: 'Barkat Frisian (Value Added Egg Products)',
    logo: '/images/partners/barkat-frisian.png',
    maxHeight: 84,
  },
  {
    id: 'master-baker',
    name: 'Master Baker',
    logo: '/images/partners/master-baker.png',
    maxHeight: 84,
  },
  {
    id: 'tehzeeb-bakers',
    name: 'Tehzeeb Bakers',
    logo: '/images/partners/tehzeeb-bakers.png',
    maxHeight: 80,
  },
  {
    id: 'salman-sweets',
    name: 'Salman Sweets & Bakers',
    logo: '/images/partners/salman-sweets.png',
    maxHeight: 80,
  },
  {
    id: 'dawn-foods',
    name: 'Dawn Foods',
    logo: '/images/partners/dawn-foods.png',
    maxHeight: 74,
  },
];

export default function OurPartnersSection() {
  return (
    <section id="our-partners" className="partners-section" aria-label="Our Partners">
      <div className="partners-container">
        <div className="partners-header">
          <h2 className="partners-title">
            Our <span className="partners-title-accent">Partners</span>
          </h2>
        </div>

        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="partner-item">
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
                style={{ maxHeight: `${partner.maxHeight}px` }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .partners-section {
          background-color: #ffffff;
          padding: clamp(64px, 8vw, 104px) 24px;
          position: relative;
          border-top: 1px solid rgba(17, 17, 17, 0.06);
        }

        .partners-container {
          max-width: 1140px;
          margin: 0 auto;
        }

        .partners-header {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 72px);
        }

        .partners-title {
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
          font-size: clamp(2rem, 3.8vw, 2.75rem);
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0;
        }

        .partners-title-accent {
          color: #e02424;
        }

        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: clamp(32px, 5vw, 64px) clamp(24px, 4.5vw, 56px);
        }

        .partner-item {
          flex: 0 1 calc(25% - 44px);
          min-width: 170px;
          max-width: 240px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          box-sizing: border-box;
          transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.26s ease;
        }

        .partner-item:hover {
          transform: scale(1.04);
        }

        .partner-logo {
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.04));
          transition: filter 0.26s ease;
        }

        .partner-item:hover .partner-logo {
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
        }

        @media (max-width: 960px) {
          .partner-item {
            flex: 0 1 calc(33.333% - 32px);
            min-width: 140px;
            height: 96px;
          }
        }

        @media (max-width: 600px) {
          .partners-grid {
            gap: 28px 16px;
          }

          .partner-item {
            flex: 0 1 calc(50% - 16px);
            min-width: 120px;
            height: 84px;
            padding: 4px 8px;
          }

          .partner-logo {
            max-height: 58px !important;
          }
        }

        @media (max-width: 360px) {
          .partner-item {
            flex: 0 1 100%;
            height: 78px;
          }
        }
      `}</style>
    </section>
  );
}
