import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, Thermometer, Feather, TrendingUp, Package, Home } from 'lucide-react';
import SupplyChainControlCenter from '../components/SupplyChainControlCenter';

const heroEggBg = '/images/yousafzai-packaging.webp';

const featIcons = {
  Feather,
  TrendingUp,
  Package,
};

const trustIcons = {
  ShieldCheck,
  CheckCircle2,
  Truck,
  Thermometer,
  Home,
};

function CalMaineHero({ data }) {
  const hero = data || {};
  const heroImage = hero.backgroundImage && !/^https?:\/\//i.test(hero.backgroundImage)
    ? hero.backgroundImage
    : heroEggBg;
  const primaryCta = hero.primaryCta || {};
  const secondaryCta = hero.secondaryCta || {};
  const trustItems = Array.isArray(hero.trustItems) ? hero.trustItems : [];
  const stats = Array.isArray(hero.stats) ? hero.stats : [];

  return (
    <header className="cm-hero">
      <div className="cm-hero-bg">
        <img src={heroImage} alt="Fresh eggs prepared for commercial supply" />
        <div className="cm-hero-overlay" />
      </div>

      <div className="cm-hero-inner">
        <div className="cm-hero-copy">
          <h1 className="cm-title">
            {hero.h1Line1 || 'Your trusted'}{' '}
            <em>{hero.h1Highlight || 'egg marketplace'}</em>
            {hero.h1Line2 ? ` ${hero.h1Line2}` : ''}
          </h1>
          <p className="cm-body">{hero.body}</p>

          <div className="cm-cta-row">
            <Link to={primaryCta.action || '/egg-traders/contact'} className="cm-btn cm-btn-blue">
              {primaryCta.label || 'Request a Quote'} <ArrowRight size={16} />
            </Link>
            <Link to={secondaryCta.action || '/egg-traders/about'} className="cm-btn cm-btn-outline">
              {secondaryCta.label || 'How it works'}
            </Link>
          </div>

          <div className="cm-trust-row">
            {trustItems.map((t, i) => {
              const Icon = trustIcons[t.icon] || ShieldCheck;
              return (
                <span key={i}>{Icon ? <Icon size={15} /> : null}{t.text}</span>
              );
            })}
          </div>
        </div>

        <div className="cm-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="cm-stat">
              <strong>{s.value}{s.suffix}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cm-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 0;
          padding: 102px 24px 64px;
          background: #001B4D;
          overflow: hidden;
          box-sizing: border-box;
          text-align: center;
        }
        .cm-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .cm-hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 58%; display: block; filter: saturate(94%) contrast(106%); }
        .cm-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(0,27,77,0.58) 0%, rgba(0,27,77,0.34) 45%, rgba(0,27,77,0.62) 100%),
            radial-gradient(80% 70% at 50% 36%, rgba(0,71,187,0.22) 0%, rgba(0,27,77,0.16) 54%, rgba(0,27,77,0.5) 100%);
        }
        .cm-hero::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 78px;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(185,217,235,0), rgba(185,217,235,0.74));
        }
        .cm-hero-inner {
          position: relative;
          z-index: 2;
          width: min(100%, 1040px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 34px;
        }
        .cm-hero-copy { min-width: 0; display: flex; flex-direction: column; align-items: center; }
        .cm-stats-grid {
          display: grid; grid-template-columns: repeat(4, minmax(130px, 1fr)); gap: 14px;
          width: min(100%, 820px);
        }
        .cm-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(42px, 6vw, 76px); font-weight: 700; line-height: 1.02;
          letter-spacing: 0; color: #ffffff; margin: 0 0 22px;
          max-width: 820px;
          text-shadow: 0 16px 42px rgba(0,0,0,0.38);
        }
        .cm-title em { display: block; font-style: normal; color: #D0DEBB; }
        .cm-body {
          font-size: clamp(16px, 1.8vw, 19px);
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
          margin: 0 0 30px;
          max-width: 690px;
          text-shadow: 0 10px 28px rgba(0,0,0,0.38);
        }
        .cm-cta-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; justify-content: center; }
        .cm-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
          padding: 15px 30px; border-radius: 12px; text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cm-btn:hover { transform: translateY(-3px); }
        .cm-btn-blue { background: #0047BB; color: #ffffff; box-shadow: 0 10px 28px rgba(0,71,187,0.35); }
        .cm-btn-blue:hover { box-shadow: 0 16px 38px rgba(0,71,187,0.45); }
        .cm-btn-outline {
          color: #ffffff;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.34);
          backdrop-filter: blur(6px);
        }
        .cm-btn-outline:hover { background: rgba(255,255,255,0.2); box-shadow: 0 12px 28px rgba(0,27,77,0.12); }
        .cm-btn:focus-visible { outline: 3px solid rgba(0,71,187,0.32); outline-offset: 3px; }
        .cm-trust-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .cm-trust-row span {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; font-weight: 600; color: #ffffff;
          background: rgba(255,255,255,0.14); padding: 6px 12px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.24);
        }
        .cm-trust-row svg { color: #D0DEBB; }
        .cm-stat {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.24);
          border-radius: 12px;
          padding: 16px 18px; display: flex; flex-direction: column; gap: 4px;
          transition: transform 0.3s, box-shadow 0.3s;
          backdrop-filter: blur(8px);
        }
        .cm-stat:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,71,187,0.15); }
        .cm-stat strong { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; }
        .cm-stat span { font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.4; }
        @media (max-width: 900px) {
          .cm-hero { padding: 88px 18px 50px; }
          .cm-hero-inner { gap: 30px; }
          .cm-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cm-title { font-size: clamp(38px, 10vw, 54px); }
        }
        @media (max-width: 560px) {
          .cm-hero { padding: 78px 16px 42px; align-items: center; }
          .cm-stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .cm-title { font-size: clamp(30px, 8.8vw, 38px); }
          .cm-body { font-size: 14.5px; max-width: 34ch; }
          .cm-cta-row .cm-btn { width: 100%; justify-content: center; }
          .cm-stat { padding: 12px 10px; }
          .cm-stat strong { font-size: 22px; }
          .cm-stat span { font-size: 11px; }
        }
      `}</style>
    </header>
  );
}

function CalMaineAbout({ data }) {
  const about = data || {};
  const features = Array.isArray(about.features) ? about.features : [];

  return (
    <section className="cm-about">
      <div className="cm-about-inner">
        <div className="cm-about-copy">
          <h2 className="cm-about-title">{about.title || 'A clearer way to trade eggs'}</h2>
          <p className="cm-about-sub">{about.subtitle}</p>

          <blockquote className="cm-quote">
            &ldquo;{about.quote}&rdquo;
            <footer>{about.quoteFooter || 'Our Mission'}</footer>
          </blockquote>
        </div>

        <div className="cm-feats-col">
          {features.map((feat, i) => {
            const Icon = featIcons[feat.icon] || ShieldCheck;
            return (
              <div key={i} className="cm-feat-card">
                <div className="cm-feat-icon-box">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="cm-feat-title">{feat.title}</h3>
                  <p className="cm-feat-body">{feat.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cm-about {
          background: linear-gradient(180deg, #B9D9EB 0%, #F5F7FB 100%);
          padding: 88px 0 96px;
        }
        .cm-about-inner {
          width: min(100% - 64px, 1240px); margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }
        .cm-about-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 3.4vw, 40px); font-weight: 700; color: #001b4d; margin: 0 0 16px;
        }
        .cm-about-sub { font-size: 16px; color: #3a4650; line-height: 1.7; margin: 0 0 30px; }
        .cm-quote {
          margin: 0; padding: 28px 32px;
          background: #ffffff; border-left: 5px solid #0047BB;
          border-radius: 14px; box-shadow: 0 18px 40px rgba(0,20,60,0.12);
          font-size: 16px; color: #2c333a; line-height: 1.7; font-style: italic;
        }
        .cm-quote footer {
          font-size: 12.5px; font-weight: 700;
          color: #0047BB; letter-spacing: 0;
        }
        .cm-feats-col { display: flex; flex-direction: column; gap: 20px; }
        .cm-feat-card {
          display: flex; gap: 18px; padding: 22px 24px;
          background: #ffffff; border-radius: 14px;
          border: 1px solid rgba(0,71,187,0.15); box-shadow: 0 10px 26px rgba(0,20,60,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cm-feat-card:hover { transform: translateX(6px); box-shadow: 0 18px 38px rgba(0,20,60,0.14); }
        .cm-feat-icon-box {
          width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
          background: #0047BB; color: #ffffff;
          display: flex; align-items: center; justify-content: center;
        }
        .cm-feat-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px; font-weight: 700; color: #001b4d; margin: 0 0 6px;
        }
        .cm-feat-body { font-size: 14px; color: #4a525b; line-height: 1.6; margin: 0; }
        @media (max-width: 900px) {
          .cm-about-inner { grid-template-columns: 1fr; }
          .cm-about { padding: 76px 0 90px; }
        }
        @media (max-width: 480px) {
          .cm-about-inner { width: min(100% - 28px, 1240px); }
          .cm-about { padding: 56px 0 70px; }
          .cm-quote { padding: 22px 20px; }
          .cm-feat-card { padding: 20px 18px; }
        }
      `}</style>
    </section>
  );
}

export default function EggTradersHomePage() {
  const eggTraders = useCMSStore((s) => s.eggTraders);

  return (
    <>
      <CalMaineHero data={eggTraders.hero} />
      <CalMaineAbout data={eggTraders.about} />
      <SupplyChainControlCenter />
    </>
  );
}
