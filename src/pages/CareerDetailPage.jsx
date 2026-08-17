import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJob, submitApplication } from '../lib/careersApi';

export default function CareerDetailPage() {
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    education: '',
    experience: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    resume: '',
  });

  const job = useMemo(() => {
    const fallback = {
      id: slug,
      slug,
      title: 'Opportunity',
      department: 'Operations',
      location: 'Pakistan',
      employmentType: 'Full time',
      description: 'A role will be displayed here once the backend provides the live data.',
      responsibilities: [
        'Support delivery of the role scope and core responsibilities.',
        'Collaborate with the internal team to keep execution aligned.',
      ],
      requirements: [
        'Strong communication and professionalism.',
        'Relevant experience or educational background.',
      ],
      deadline: 'To be announced',
      status: 'Open',
    };

    return fallback;
  }, [slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    if (!form.fullName || !form.email || !form.phone) {
      setSubmitError('Please complete your full name, email, and phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitApplication(job.id, form);
      setSubmitMessage('Application submission is ready for backend integration. The form is intentionally not connected to a live endpoint yet.');
    } catch (err) {
      setSubmitError(err?.message || 'Submission failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="career-detail-page">
      <section className="career-detail-hero">
        <div className="container">
          <span className="career-detail-kicker">Current Opportunity</span>
          <h1>{job.title}</h1>
          <div className="job-pill-row">
            <span>{job.department}</span>
            <span>{job.location}</span>
            <span>{job.employmentType}</span>
          </div>
        </div>
      </section>

      <section className="career-detail-body">
        <div className="container detail-layout">
          <div className="job-summary">
            <h2>Role Overview</h2>
            <p>{job.description}</p>

            <div className="detail-block">
              <h3>Responsibilities</h3>
              <ul>
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h3>Requirements</h3>
              <ul>
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            <h2>Apply Now</h2>
            <div className="field-grid">
              <label>
                Full Name
                <input name="fullName" value={form.fullName} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
              </label>
              <label>
                City
                <input name="city" value={form.city} onChange={handleChange} />
              </label>
              <label>
                Education
                <input name="education" value={form.education} onChange={handleChange} />
              </label>
              <label>
                Experience
                <input name="experience" value={form.experience} onChange={handleChange} />
              </label>
              <label>
                LinkedIn URL
                <input name="linkedIn" value={form.linkedIn} onChange={handleChange} />
              </label>
              <label>
                Portfolio URL
                <input name="portfolio" value={form.portfolio} onChange={handleChange} />
              </label>
            </div>

            <label>
              Cover Letter
              <textarea name="coverLetter" rows="5" value={form.coverLetter} onChange={handleChange} />
            </label>

            <label>
              CV / Resume
              <input name="resume" value={form.resume} onChange={handleChange} placeholder="Paste file reference or upload path placeholder" />
            </label>

            {submitError && <div className="form-message error">{submitError}</div>}
            {submitMessage && <div className="form-message success">{submitMessage}</div>}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>

      <style>{`
        .career-detail-page {
          background: #fbf7f0;
          color: #111111;
        }

        .career-detail-hero {
          padding: 150px 0 28px;
          background: linear-gradient(135deg, rgba(63,98,49,0.98), rgba(17,17,17,0.92));
          color: #fff;
        }

        .career-detail-kicker {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
        }

        .career-detail-hero h1 {
          margin: 18px 0 18px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 1.1;
        }

        .job-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .job-pill-row span {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          font-size: 0.8rem;
        }

        .career-detail-body {
          padding: 70px 0 120px;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 28px;
          align-items: start;
        }

        .job-summary,
        .application-form {
          background: #fff;
          border: 1px solid rgba(63,98,49,0.15);
          border-radius: 18px;
          padding: 28px 24px;
          box-shadow: 0 14px 30px rgba(17,17,17,0.04);
        }

        .job-summary h2,
        .application-form h2 {
          margin-top: 0;
          margin-bottom: 18px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.7rem;
        }

        .job-summary p,
        .job-summary li {
          line-height: 1.7;
          color: rgba(17,17,17,0.76);
        }

        .detail-block {
          margin-top: 24px;
        }

        .detail-block h3 {
          margin-bottom: 12px;
        }

        .detail-block ul {
          margin: 0;
          padding-left: 20px;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .application-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.9rem;
          color: rgba(17,17,17,0.8);
        }

        .application-form input,
        .application-form textarea {
          width: 100%;
          border: 1px solid rgba(17,17,17,0.14);
          border-radius: 12px;
          padding: 12px 14px;
          font: inherit;
          background: #fcfcfb;
          box-sizing: border-box;
        }

        .application-form textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          border: 0;
          border-radius: 12px;
          padding: 14px 18px;
          background: linear-gradient(135deg, #de510a, #b9320d);
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .form-message {
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.92rem;
        }

        .form-message.error {
          background: rgba(138, 43, 43, 0.08);
          color: #8a2b2b;
        }

        .form-message.success {
          background: rgba(63,98,49,0.08);
          color: #2b5d2a;
        }

        @media (max-width: 840px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }

          .field-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
