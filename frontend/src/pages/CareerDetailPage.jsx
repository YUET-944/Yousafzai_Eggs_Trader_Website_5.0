import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJob, submitApplication } from '../lib/careersApi';

export default function CareerDetailPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        coverLetter: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        let active = true;
        async function fetchJob() {
            setLoading(true);
            setError(null);
            try {
                const data = await getJob(id);
                if (active) {
                    setJob(data);
                }
            } catch (err) {
                if (active) {
                    setError(err?.message || 'Failed to load job details.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }
        fetchJob();
        return () => {
            active = false;
        };
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setResumeFile(event.target.files[0]);
        } else {
            setResumeFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');
        setSubmitMessage('');

        if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
            setSubmitError('Please complete your full name, email, and phone number.');
            return;
        }
        if (!resumeFile) {
            setSubmitError('Please upload your CV / Resume file (PDF, DOC, or DOCX).');
            return;
        }

        try {
            setIsSubmitting(true);
            const targetJobId = job?.id || id;
            await submitApplication(targetJobId, form, resumeFile);
            setSubmitMessage('Your application has been submitted successfully!');

            // Reset form fields
            setForm({
                fullName: '',
                email: '',
                phone: '',
                city: '',
                education: '',
                experience: '',
                coverLetter: '',
            });
            setResumeFile(null);
            // Reset input element visually
            event.target.reset();
        } catch (err) {
            setSubmitError(err?.message || 'Submission failed. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderList = (items) => {
        if (!items) return null;
        if (Array.isArray(items)) {
            return items.map((item, idx) => <li key={idx}>{item}</li>);
        }
        if (typeof items === 'string') {
            return items
                .split('\n')
                .map((x) => x.trim())
                .filter(Boolean)
                .map((item, idx) => <li key={idx}>{item}</li>);
        }
        return null;
    };

    if (loading) {
        return (
            <div className="career-detail-page">
                <section className="career-detail-hero">
                    <div className="container">
                        <span className="career-detail-kicker">Current Opportunity</span>
                        <h1>Loading...</h1>
                    </div>
                </section>
                <section className="career-detail-body">
                    <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                        <div className="loading-spinner"></div>
                        <p style={{ marginTop: '20px', color: 'rgba(17,17,17,0.6)' }}>Loading opportunity details...</p>
                    </div>
                </section>
                <style>{`
          .career-detail-page {
            background: #fbf7f0;
            color: #111111;
            min-height: 80vh;
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
          .loading-spinner {
            border: 4px solid rgba(63,98,49,0.1);
            border-top: 4px solid #3f6231;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="career-detail-page">
                <section className="career-detail-hero">
                    <div className="container">
                        <span className="career-detail-kicker">Current Opportunity</span>
                        <h1>Opportunity Not Found</h1>
                    </div>
                </section>
                <section className="career-detail-body">
                    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ color: '#8a2b2b', marginBottom: '30px', fontSize: '1.1rem' }}>
                            {error || "We couldn't find the job listing you are looking for."}
                        </p>
                        <Link to="/careers" className="submit-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            Back to Careers
                        </Link>
                    </div>
                </section>
                <style>{`
          .career-detail-page {
            background: #fbf7f0;
            color: #111111;
            min-height: 80vh;
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
          .submit-button {
            border: 0;
            border-radius: 12px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #de510a, #b9320d);
            color: white;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(222,81,10,0.3);
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="career-detail-page">
            <section className="career-detail-hero">
                <div className="container">
                    <span className="career-detail-kicker">Current Opportunity</span>
                    <h1>{job.title}</h1>
                    <div className="job-pill-row">
                        {job.department && <span>{job.department}</span>}
                        {job.location && <span>{job.location}</span>}
                        {job.type && <span>{job.type}</span>}
                    </div>
                </div>
            </section>

            <section className="career-detail-body">
                <div className="container detail-layout">
                    <div className="job-summary">
                        <h2>Role Overview</h2>
                        <p>{job.description}</p>

                        {job.responsibilities && (
                            <div className="detail-block">
                                <h3>Responsibilities</h3>
                                <ul>
                                    {renderList(job.responsibilities)}
                                </ul>
                            </div>
                        )}

                        {job.requirements && (
                            <div className="detail-block">
                                <h3>Requirements</h3>
                                <ul>
                                    {renderList(job.requirements)}
                                </ul>
                            </div>
                        )}
                    </div>

                    <form className="application-form" onSubmit={handleSubmit}>
                        <h2>Apply Now</h2>
                        <div className="field-grid">
                            <label>
                                Full Name *
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your full name"
                                />
                            </label>
                            <label>
                                Email *
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                />
                            </label>
                            <label>
                                Phone *
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. +92 300 1234567"
                                />
                            </label>
                            <label>
                                City
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="Your current city"
                                />
                            </label>
                            <label>
                                Education
                                <input
                                    name="education"
                                    value={form.education}
                                    onChange={handleChange}
                                    placeholder="Highest degree obtained"
                                />
                            </label>
                            <label>
                                Experience
                                <input
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    placeholder="Years of experience"
                                />
                            </label>

                        </div>

                        <label>
                            Cover Letter
                            <textarea
                                name="coverLetter"
                                rows="5"
                                value={form.coverLetter}
                                onChange={handleChange}
                                placeholder="Write a brief cover letter..."
                            />
                        </label>

                        <label>
                            CV / Resume *
                            <input
                                name="resume"
                                type="file"
                                onChange={handleFileChange}
                                required
                                accept=".pdf,.doc,.docx"
                            />
                        </label>

                        {submitError && <div className="form-message error">{submitError}</div>}
                        {submitMessage && <div className="form-message success">{submitMessage}</div>}

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            </section>

            <style>{`
        .career-detail-page {
          background: #fbf7f0;
          color: #111111;
          min-height: 100vh;
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
