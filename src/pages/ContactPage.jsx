import PageBanner from '../components/PageBanner';
import ContactSection from '../components/ContactSection';
import { useCMSStore } from '../store/useCMSStore';

const CONTACT_HERO_SUBTITLE = 'Tell us what you need, and our commercial team will get back to you with a formal quotation.';
const CONTACT_HERO_IMAGE = '/images/yousafzai-packaging.png';

export default function ContactPage() {
  const banner = useCMSStore((s) => s.banners?.main?.contact);
  const heroImages = banner?.images?.length ? banner.images : [CONTACT_HERO_IMAGE];

  return (
    <div className="contact-page">
      <div className="contact-hero-wrap">
        <PageBanner
          title={banner?.title || 'Contact Us'}
          subtitle={CONTACT_HERO_SUBTITLE}
          slideshowImages={heroImages}
          hideBreadcrumb
        />
      </div>
      <ContactSection />

      <style>{`
        .contact-hero-wrap .page-hero {
          box-sizing: border-box;
          min-height: 100svh;
          padding: clamp(96px, 13svh, 132px) 0 clamp(42px, 8svh, 72px);
          background-color: #111111;
        }

        @supports (height: 100dvh) {
          .contact-hero-wrap .page-hero {
            min-height: 100dvh;
          }
        }

        .contact-hero-wrap .page-hero > .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-hero-wrap .banner-slideshow .slide-img {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 58%;
          filter: saturate(90%) contrast(105%);
        }

        .contact-hero-wrap .banner-slideshow .slide-img.active {
          opacity: 1;
        }

        .contact-hero-wrap .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.52) 0%, rgba(17,17,17,0.42) 46%, rgba(17,17,17,0.58) 100%),
            radial-gradient(90% 80% at 50% 35%, rgba(222,81,10,0.2) 0%, rgba(17,17,17,0.12) 52%, rgba(17,17,17,0.5) 100%);
        }

        .contact-hero-wrap .page-hero-bg::before {
          opacity: 0.12;
        }

        .contact-hero-wrap .banner-bottom-fade {
          height: 64px;
          background: linear-gradient(to bottom, rgba(251,247,240,0), rgba(251,247,240,0.72));
        }

        .contact-hero-wrap .page-hero-title {
          color: #ffffff;
          background: none;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 16px 38px rgba(0,0,0,0.42);
          filter: none;
        }

        .contact-hero-wrap .page-hero-sub {
          color: rgba(255,255,255,0.88);
          text-shadow: 0 10px 28px rgba(0,0,0,0.38);
        }

        @media (max-width: 860px) {
          .contact-hero-wrap .page-hero {
            min-height: 100svh;
            padding: clamp(86px, 12svh, 112px) 0 clamp(34px, 7svh, 54px);
          }

          @supports (height: 100dvh) {
            .contact-hero-wrap .page-hero {
              min-height: 100dvh;
            }
          }

          .contact-hero-wrap .banner-slideshow .slide-img {
            background-position: center 62%;
          }

          .contact-hero-wrap .page-hero-title {
            font-size: clamp(2.5rem, 12vw, 3rem);
            margin-bottom: 18px;
          }

        }
      `}</style>
    </div>
  );
}
