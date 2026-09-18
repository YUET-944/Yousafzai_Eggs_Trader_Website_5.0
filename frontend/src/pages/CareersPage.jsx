import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../lib/careersApi';
import PageBanner from '../components/PageBanner';

const CAREERS_HERO_IMAGE = '/images/client-final/processing-line-product.webp';

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
          subtitle="Explore opportunities to grow your career with Yousafzai."
          slideshowImages={[CAREERS_HERO_IMAGE]}
          hideBreadcrumb
          fullScreen
        />
      </div>

      <section className="careers-content">
        <div className="container">
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
                    <span className="job-department">{job.department || 'Department'}</span>
                    <span className="job-status">{job.status || 'Active'}</span>
                  </div>
                  <h2>{job.title}</h2>
                  <div className="job-meta">
                    <span>{job.location || 'Location TBD'}</span>
                    <span>{job.type || 'Full-Time'}</span>
                  </div>
                  <p>{job.description || 'Learn more about this opportunity.'}</p>
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
          padding: 72px 0 120px;
        }

        .careers-state {
          max-width: 760px;
          margin: 0 auto;
          padding: 28px 24px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid rgba(63,98,49,0.18);
          box-shadow: 0 12px 28px rgba(17,17,17,0.04);
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
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 22px;
        }

        .job-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-decoration: none;
          color: inherit;
          background: #fff;
          border: 1px solid rgba(63,98,49,0.18);
          border-radius: 18px;
          padding: 24px 20px;
          box-shadow: 0 12px 28px rgba(17,17,17,0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 38px rgba(17,17,17,0.08);
        }

        .job-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .job-department {
          background: rgba(222,81,10,0.12);
          color: #b9320d;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .job-status {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3f6231;
        }

        .job-card h2 {
          margin: 0;
          font-size: 1.3rem;
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 0.85rem;
          color: rgba(17,17,17,0.72);
        }

        .job-card p {
          margin: 0;
          line-height: 1.7;
          color: rgba(17,17,17,0.72);
        }
      `}</style>
    </div>
  );
}
