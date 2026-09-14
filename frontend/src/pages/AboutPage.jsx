import React from 'react';
import StoryEngine from '../story/StoryEngine';
import PageBanner from '../components/PageBanner';
import SceneChairman from '../components/scenes/SceneChairman';
import SceneVisionMission from '../components/scenes/SceneVisionMission';
import SceneCertificates from '../components/scenes/SceneCertificates';
import OurCompaniesSection from '../components/OurCompaniesSection';
import OurPartnersSection from '../components/OurPartnersSection';
import { useCMSStore } from '../store/useCMSStore';

const ABOUT_HERO_IMAGE = '/images/client-final/processing-line-product.png';

export default function AboutPage() {
  const about = useCMSStore((s) => s.about);
  const heroSubtitle = about?.subtitle || '';

  return (
    <StoryEngine>
      <div className="about-hero-wrap">
        <PageBanner
          title="About Us"
          subtitle={heroSubtitle}
          slideshowImages={[ABOUT_HERO_IMAGE]}
          fullScreen
          hideBreadcrumb
        />
      </div>

      {/* SCENE 2: Chairman's Message */}
      <SceneChairman />

      {/* SCENE 3: Vision & Mission */}
      <SceneVisionMission />

      {/* SCENE 4: Second Website Link (Egg Traders Marketplace) */}
      <OurCompaniesSection />

      {/* SCENE 5: Our Partners */}
      <OurPartnersSection />

      {/* SCENE 6: Certificates */}
      <SceneCertificates />

      <style>{`
        .about-hero-wrap .page-hero {
          box-sizing: border-box;
          min-height: 100svh;
          padding: clamp(96px, 13svh, 132px) 0 clamp(42px, 8svh, 72px);
          background-color: #2C4724;
        }

        @supports (height: 100dvh) {
          .about-hero-wrap .page-hero {
            min-height: 100dvh;
          }
        }

        .about-hero-wrap .page-hero > .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-hero-wrap .banner-slideshow .slide-img {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 58%;
          filter: saturate(94%) contrast(106%);
        }

        .about-hero-wrap .banner-slideshow .slide-img.active {
          opacity: 1;
        }

        .about-hero-wrap .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.34) 46%, rgba(17,17,17,0.58) 100%),
            radial-gradient(90% 80% at 50% 35%, rgba(222,81,10,0.18) 0%, rgba(17,17,17,0.14) 52%, rgba(17,17,17,0.5) 100%);
        }

        .about-hero-wrap .page-hero-bg::before {
          opacity: 0.12;
        }

        .about-hero-wrap .banner-bottom-fade {
          height: 64px;
          background: linear-gradient(to bottom, rgba(251,247,240,0), rgba(251,247,240,0.72));
        }

        .about-hero-wrap .page-hero-title {
          color: #ffffff;
          background: none;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 16px 38px rgba(0,0,0,0.42);
          filter: none;
        }

        .about-hero-wrap .page-hero-sub {
          color: rgba(255,255,255,0.9);
          text-shadow: 0 10px 28px rgba(0,0,0,0.4);
        }

        @media (max-width: 860px) {
          .about-hero-wrap .page-hero {
            min-height: 100svh;
            padding: clamp(86px, 12svh, 112px) 0 clamp(34px, 7svh, 54px);
          }

          @supports (height: 100dvh) {
            .about-hero-wrap .page-hero {
              min-height: 100dvh;
            }
          }

          .about-hero-wrap .banner-slideshow .slide-img {
            background-position: center 62%;
          }

          .about-hero-wrap .page-hero-title {
            font-size: clamp(2.5rem, 12vw, 3rem);
            margin-bottom: 18px;
          }
        }
      `}</style>
    </StoryEngine>
  );
}
