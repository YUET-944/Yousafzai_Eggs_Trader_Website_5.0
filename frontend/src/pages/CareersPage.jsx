import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getJobs } from '../lib/careersApi';
import PageBanner from '../components/PageBanner';

const CAREERS_HERO_IMAGE = '/images/client-final/Process_line.webp';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadJobs = async () => {
      try {
        const data = await getJobs();
        if (!active) return;
        setJobs(data);
      } catch (err) {
        if (!active) return;
        setError('We could not load current opportunities right now. Please try again shortly.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadJobs();
    return () => { active = false; };
  }, []);

  return (
    <div className="careers-page">
      <div className="careers-hero-wrap">
        <PageBanner
          title="Careers"
          subtitle="Explore opportunities to grow your career with Yousafzai Agri Foods."
          slideshowImages={[CAREERS_HERO_IMAGE]}
          hideBreadcrumb
          fullScreen
        />
      </div>

      <section className="careers-content">
        <div className="container">
          <div className="careers-section-header">
            <span className="careers-kicker">Open Positions</span>
            <h2>Current Opportunities</h2>
            <p>Select a position below to view full role details, responsibilities, and how to apply.</p>
          </div>

          {loading ? (
            <div className="careers-state loading">Loading opportunities…</div>
          ) : error ? (
            <div className="careers-state error">{error}</div>
          ) : jobs.length === 0 ? (
            <div className="careers-state empty">
              There are no open positions at the moment. Please check back for future opportunities.
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <Link key={job.id} to={`/careers/${job.id}`} className="job-card">
                  <div className="job-card-top">
                    <span className="job-availability">
                      <span className="availability-dot" aria-hidden="true" />
                      {job.status === 'active' || !job.status ? 'Currently Hiring' : job.status}
                    </span>
                  </div>
                  <div className="job-card-body">
                    <h3>{job.title}</h3>
                  </div>
                  <div className="job-card-footer">
                    <span>View Role &amp; Apply</span>
                    <ArrowRight size={16} className="job-card-arrow" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .careers-page {
          background: #fbf7f0;
          color: #111111;
          min-height: 100vh;
        }

        /* ─── HERO OVERRIDES — match Main Website hero visual language ─── */
        .careers-hero-wrap .page-hero {
          box-sizing: border-box;
          min-height: 100svh;
          padding: clamp(96px, 13svh, 132px) 0 clamp(42px, 8svh, 72px);
          background-color: #1c2b20;
        }

        @supports (height: 100dvh) {
          .careers-hero-wrap .page-hero {
            min-height: 100dvh;
          }
        }

        .careers-hero-wrap .page-hero > .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .careers-hero-wrap .banner-slideshow .slide-img {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 45%;
          filter: saturate(88%) contrast(108%);
        }

        .careers-hero-wrap .banner-slideshow .slide-img.active {
          opacity: 0.50;
        }

        .careers-hero-wrap .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.28) 44%, rgba(17,17,17,0.62) 100%),
            radial-gradient(90% 80% at 50% 35%, rgba(63,98,49,0.22) 0%, rgba(17,17,17,0.12) 52%, rgba(17,17,17,0.50) 100%);
        }

        .careers-hero-wrap .page-hero-bg::before {
          opacity: 0.09;
        }

        .careers-hero-wrap .banner-bottom-fade {
          height: 72px;
          background: linear-gradient(to bottom, rgba(251,247,240,0), rgba(251,247,240,0.80));
        }

        .careers-hero-wrap .page-hero-title {
          font-family: 'Space Grotesk', sans-serif;
          color: #ffffff;
          background: none;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 16px 40px rgba(0,0,0,0.44);
          filter: none;
          font-size: clamp(3rem, 6vw, 5rem);
        }

        .careers-hero-wrap .page-hero-sub {
          color: rgba(255,255,255,0.88);
          text-shadow: 0 8px 24px rgba(0,0,0,0.40);
        }

        @media (max-width: 860px) {
          .careers-hero-wrap .page-hero {
            min-height: 100svh;
            padding: clamp(86px, 12svh, 112px) 0 clamp(34px, 7svh, 54px);
          }

          @supports (height: 100dvh) {
            .careers-hero-wrap .page-hero {
              min-height: 100dvh;
            }
          }

          .careers-hero-wrap .page-hero-title {
            font-size: clamp(2.4rem, 10vw, 3.2rem);
            margin-bottom: 16px;
          }

          .careers-hero-wrap .banner-slideshow .slide-img {
            background-position: center 42%;
          }
        }

        /* ─── CONTENT SECTION ─── */
        .careers-content {
          padding: 84px 0 128px;
        }

        .careers-section-header {
          max-width: 640px;
          margin-bottom: 44px;
        }

        .careers-kicker {
          display: inline-block;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3f6231;
          margin-bottom: 10px;
        }

        .careers-section-header h2 {
          margin: 0 0 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.9rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.02em;
        }

        .careers-section-header p {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.6;
          color: rgba(17,17,17,0.68);
        }

        .careers-state {
          max-width: 760px;
          margin: 0 auto;
          padding: 36px 28px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid rgba(17,17,17,0.08);
          box-shadow: 0 10px 30px rgba(17,17,17,0.04);
          text-align: center;
          font-size: 1.02rem;
          line-height: 1.7;
        }

        .careers-state.empty {
          color: #111111;
        }

        .careers-state.error {
          color: #8a2b2b;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 24px;
        }

        .job-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 196px;
          text-decoration: none;
          color: inherit;
          background: #ffffff;
          border: 1px solid rgba(17,17,17,0.1);
          border-radius: 16px;
          padding: 28px 26px 24px;
          box-shadow: 0 6px 24px rgba(17,17,17,0.03);
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.22s ease;
        }

        .job-card:hover {
          transform: translateY(-4px);
          border-color: rgba(63,98,49,0.5);
          box-shadow: 0 18px 40px rgba(63,98,49,0.09);
        }

        .job-card:focus-visible {
          outline: 2px solid #3f6231;
          outline-offset: 3px;
        }

        .job-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .job-availability {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 999px;
          background: rgba(63,98,49,0.09);
          color: #2f5222;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .availability-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3f6231;
          box-shadow: 0 0 0 3px rgba(63,98,49,0.2);
        }

        .job-card-body {
          flex: 1;
          display: flex;
          align-items: flex-start;
        }

        .job-card h3 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.3;
          color: #111111;
          letter-spacing: -0.015em;
        }

        .job-card:hover h3 {
          color: #2f5222;
        }

        .job-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 26px;
          padding-top: 16px;
          border-top: 1px solid rgba(17,17,17,0.07);
          font-size: 0.88rem;
          font-weight: 600;
          color: #3f6231;
        }

        .job-card-arrow {
          transition: transform 0.2s ease;
        }

        .job-card:hover .job-card-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .careers-content {
            padding: 56px 0 88px;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }

          .job-card {
            min-height: 172px;
            padding: 24px 20px 20px;
          }
        }
      `}</style>
    </div>
  );
}
