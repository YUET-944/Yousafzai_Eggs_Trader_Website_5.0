import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../lib/careersApi';

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
      <section className="careers-hero">
        <div className="container careers-hero-inner">
          <span className="careers-kicker">Join Us</span>
          <h1>Careers</h1>
          <p>
            We are building thoughtful teams around quality, operations, and long-term value.
            We welcome future opportunities as they arise.
          </p>
        </div>
      </section>

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
                <Link key={job.id || job.slug} to={`/careers/${job.slug}`} className="job-card">
                  <div className="job-card-top">
                    <span className="job-department">{job.department || 'Department'}</span>
                    <span className="job-status">{job.status || 'Open'}</span>
                  </div>
                  <h2>{job.title}</h2>
                  <div className="job-meta">
                    <span>{job.location || 'Location TBD'}</span>
                    <span>{job.employmentType || 'Full time'}</span>
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

        .careers-hero {
          padding: 150px 0 50px;
          background: linear-gradient(135deg, rgba(63,98,49,0.98), rgba(17,17,17,0.92));
          color: #fff;
        }

        .careers-hero-inner {
          text-align: center;
        }

        .careers-kicker {
          display: inline-block;
          margin-bottom: 16px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
        }

        .careers-hero h1 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.6rem, 6vw, 5rem);
          line-height: 1;
        }

        .careers-hero p {
          max-width: 720px;
          margin: 18px auto 0;
          font-size: 1.06rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
        }

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
