import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Building2, ExternalLink, MapPin } from 'lucide-react';
import { getJob, submitApplication } from '../lib/careersApi';
import {
    extractGoogleFormUrl,
    parseJobSections,
    parseListItems,
    renderInlineText,
} from '../lib/formatJobContent';

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
            event.target.reset();
        } catch (err) {
            setSubmitError(err?.message || 'Submission failed. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="career-detail-page">
                <section className="career-detail-hero">
                    <div className="container">
                        <span className="career-detail-kicker">Careers at Yousafzai Agri Foods</span>
                        <h1>Loading Position…</h1>
                    </div>
                </section>
                <section className="career-detail-body">
                    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div className="loading-spinner" />
                        <p style={{ marginTop: '20px', color: 'rgba(17,17,17,0.65)' }}>
                            Loading role details…
                        </p>
                    </div>
                </section>
                <style>{`
                    .career-detail-page {
                        background: #fbf7f0;
                        color: #111111;
                        min-height: 85vh;
                    }
                    .career-detail-hero {
                        padding: 140px 0 42px;
                        background: linear-gradient(135deg, rgba(63,98,49,0.98), rgba(17,17,17,0.94));
                        color: #ffffff;
                    }
                    .career-detail-kicker {
                        font-size: 0.74rem;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                        color: rgba(255,255,255,0.8);
                    }
                    .career-detail-hero h1 {
                        margin: 14px 0 0;
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: clamp(2rem, 4.5vw, 3.4rem);
                    }
                    .loading-spinner {
                        border: 3px solid rgba(63,98,49,0.12);
                        border-top: 3px solid #3f6231;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 0.9s linear infinite;
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
                        <span className="career-detail-kicker">Careers at Yousafzai Agri Foods</span>
                        <h1>Opportunity Not Found</h1>
                    </div>
                </section>
                <section className="career-detail-body">
                    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ color: '#8a2b2b', marginBottom: '28px', fontSize: '1.08rem' }}>
                            {error || "We couldn't find the job listing you are looking for."}
                        </p>
                        <Link to="/careers" className="back-btn-solid">
                            <ArrowLeft size={16} />
                            <span>Back to All Positions</span>
                        </Link>
                    </div>
                </section>
                <style>{`
                    .career-detail-page {
                        background: #fbf7f0;
                        color: #111111;
                        min-height: 85vh;
                    }
                    .career-detail-hero {
                        padding: 140px 0 42px;
                        background: linear-gradient(135deg, rgba(63,98,49,0.98), rgba(17,17,17,0.94));
                        color: #ffffff;
                    }
                    .career-detail-kicker {
                        font-size: 0.74rem;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                        color: rgba(255,255,255,0.8);
                    }
                    .career-detail-hero h1 {
                        margin: 14px 0 0;
                        font-family: 'Space Grotesk', sans-serif;
                        font-size: clamp(2rem, 4.5vw, 3.4rem);
                    }
                    .back-btn-solid {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 13px 24px;
                        border-radius: 12px;
                        background: #3f6231;
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: 600;
                    }
                `}</style>
            </div>
        );
    }

    const googleFormUrl = job.applicationFormUrl || extractGoogleFormUrl(job.description);
    const descriptionSections = parseJobSections(job.description);
    const standaloneResponsibilities = parseListItems(job.responsibilities);
    const standaloneRequirements = parseListItems(job.requirements);

    const hasResponsibilitiesInDesc = descriptionSections.some((sec) =>
        /responsibilit/i.test(sec.heading || '')
    );
    const hasRequirementsInDesc = descriptionSections.some((sec) =>
        /(qualification|requirement)/i.test(sec.heading || '')
    );
    const hasHowToApplyInDesc = descriptionSections.some((sec) =>
        /how to apply|application process/i.test(sec.heading || '')
    );

    return (
        <div className="career-detail-page">
            <section className="career-detail-hero">
                <div className="container">
                    <Link to="/careers" className="back-link">
                        <ArrowLeft size={16} />
                        <span>All Open Positions</span>
                    </Link>

                    <div className="hero-title-group">
                        <span className="hero-status-pill">
                            <span className="hero-status-dot" aria-hidden="true" />
                            {job.status === 'active' || !job.status ? 'Currently Hiring' : job.status}
                        </span>
                        <h1>{job.title}</h1>
                    </div>

                    <div className="hero-meta-row">
                        {job.department && (
                            <div className="hero-meta-item">
                                <Building2 size={16} />
                                <span>{job.department}</span>
                            </div>
                        )}
                        {job.location && (
                            <div className="hero-meta-item">
                                <MapPin size={16} />
                                <span>{job.location}</span>
                            </div>
                        )}
                        {job.type && (
                            <div className="hero-meta-item">
                                <Briefcase size={16} />
                                <span>{job.type}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="career-detail-body">
                <div className="container detail-layout">
                    <div className="job-details-main">
                        <div className="job-meta-card">
                            <div className="meta-cell">
                                <span className="meta-label">Department</span>
                                <strong className="meta-value">{job.department || 'General'}</strong>
                            </div>
                            <div className="meta-cell">
                                <span className="meta-label">Location</span>
                                <strong className="meta-value">{job.location || 'On-Site'}</strong>
                            </div>
                            <div className="meta-cell">
                                <span className="meta-label">Employment Type</span>
                                <strong className="meta-value">{job.type || 'Full-Time'}</strong>
                            </div>
                        </div>

                        <div className="job-content-card">
                            {descriptionSections.map((section, idx) => (
                                <div key={idx} className="job-section">
                                    {section.heading && <h2>{section.heading}</h2>}
                                    {section.blocks.map((block, bIdx) => {
                                        if (block.type === 'list') {
                                            return (
                                                <ul key={bIdx} className="job-bullet-list">
                                                    {block.items.map((item, iIdx) => (
                                                        <li key={iIdx}>{renderInlineText(item)}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return (
                                            <p key={bIdx} className="job-paragraph">
                                                {renderInlineText(block.content)}
                                            </p>
                                        );
                                    })}
                                </div>
                            ))}

                            {!hasResponsibilitiesInDesc && standaloneResponsibilities.length > 0 && (
                                <div className="job-section">
                                    <h2>Key Responsibilities</h2>
                                    <ul className="job-bullet-list">
                                        {standaloneResponsibilities.map((item, idx) => (
                                            <li key={idx}>{renderInlineText(item)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {!hasRequirementsInDesc && standaloneRequirements.length > 0 && (
                                <div className="job-section">
                                    <h2>Required Qualifications and Experience</h2>
                                    <ul className="job-bullet-list">
                                        {standaloneRequirements.map((item, idx) => (
                                            <li key={idx}>{renderInlineText(item)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {!hasHowToApplyInDesc && (
                                <div className="job-section">
                                    <h2>How to Apply</h2>
                                    <p className="job-paragraph">
                                        {googleFormUrl
                                            ? 'Interested candidates are encouraged to submit their application using the official Google Form or by uploading their CV directly via the application form on this page.'
                                            : 'Interested candidates can submit their application and upload their updated CV directly using the application form on this page.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="application-column">
                        {googleFormUrl && (
                            <div className="google-form-card">
                                <span className="google-form-badge">Recommended • Fast Track</span>
                                <h3>Apply via Google Form</h3>
                                <p>
                                    Submit your application directly through our official recruitment Google Form.
                                </p>
                                <a
                                    href={googleFormUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="google-form-btn"
                                >
                                    <span>Apply via Google Form</span>
                                    <ExternalLink size={16} />
                                </a>
                                <div className="google-form-divider">
                                    <span>OR APPLY WITH YOUR CV BELOW</span>
                                </div>
                            </div>
                        )}

                        <form className="application-form" onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h2>{googleFormUrl ? 'Direct Application' : 'Apply Now'}</h2>
                                <p>Complete the fields below and attach your CV (PDF, DOC, or DOCX).</p>
                            </div>

                            <div className="field-grid">
                                <label>
                                    <strong>Full Name *</strong>
                                    <input
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                    />
                                </label>
                                <label>
                                    <strong>Email *</strong>
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
                                    <strong>Phone *</strong>
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
                                    <strong>City</strong>
                                    <input
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Your current city"
                                    />
                                </label>
                                <label>
                                    <strong>Education</strong>
                                    <input
                                        name="education"
                                        value={form.education}
                                        onChange={handleChange}
                                        placeholder="Highest degree obtained"
                                    />
                                </label>
                                <label>
                                    <strong>Experience</strong>
                                    <input
                                        name="experience"
                                        value={form.experience}
                                        onChange={handleChange}
                                        placeholder="Years of experience"
                                    />
                                </label>
                            </div>

                            <label>
                                <strong>Cover Letter</strong>
                                <textarea
                                    name="coverLetter"
                                    rows="4"
                                    value={form.coverLetter}
                                    onChange={handleChange}
                                    placeholder="Briefly describe your relevant background..."
                                />
                            </label>

                            <label>
                                <strong>CV / Resume *</strong>
                                <input
                                    name="resume"
                                    type="file"
                                    onChange={handleFileChange}
                                    required
                                    accept=".pdf,.doc,.docx"
                                />
                                <span className="file-hint">Accepted formats: PDF, DOC, DOCX (Max 10MB)</span>
                            </label>

                            {submitError && <div className="form-message error">{submitError}</div>}
                            {submitMessage && <div className="form-message success">{submitMessage}</div>}

                            <button type="submit" className="submit-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
                            </button>
                        </form>
                    </aside>
                </div>
            </section>

            <style>{`
                .career-detail-page {
                    background: #fbf7f0;
                    color: #111111;
                    min-height: 100vh;
                }

                /* ─── HERO ─── */
                .career-detail-hero {
                    padding: 132px 0 48px;
                    background: linear-gradient(135deg, #2b4520 0%, #192616 55%, #111111 100%);
                    color: #ffffff;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255,255,255,0.82);
                    text-decoration: none;
                    font-size: 0.88rem;
                    font-weight: 600;
                    margin-bottom: 28px;
                    transition: color 0.15s ease, transform 0.15s ease;
                }

                .back-link:hover {
                    color: #ffffff;
                    transform: translateX(-3px);
                }

                .hero-title-group {
                    margin-bottom: 22px;
                }

                .hero-status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 5px 12px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.2);
                    font-size: 0.74rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #e6f4ea;
                    margin-bottom: 14px;
                }

                .hero-status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #6ee787;
                }

                .career-detail-hero h1 {
                    margin: 0;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: clamp(2.1rem, 4.5vw, 3.5rem);
                    font-weight: 700;
                    line-height: 1.12;
                    letter-spacing: -0.02em;
                }

                .hero-meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-top: 8px;
                }

                .hero-meta-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.92rem;
                    color: rgba(255,255,255,0.86);
                }

                /* ─── BODY LAYOUT ─── */
                .career-detail-body {
                    padding: 56px 0 112px;
                }

                .detail-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
                    gap: 32px;
                    align-items: start;
                }

                .job-details-main {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                /* Metadata Strip */
                .job-meta-card {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 16px;
                    background: #ffffff;
                    border: 1px solid rgba(17,17,17,0.08);
                    border-radius: 16px;
                    padding: 22px 24px;
                    box-shadow: 0 6px 24px rgba(17,17,17,0.03);
                }

                .meta-cell {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .meta-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(17,17,17,0.52);
                }

                .meta-value {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #111111;
                    line-height: 1.4;
                }

                /* Structured Content Card */
                .job-content-card {
                    background: #ffffff;
                    border: 1px solid rgba(17,17,17,0.08);
                    border-radius: 16px;
                    padding: 36px 34px;
                    box-shadow: 0 6px 24px rgba(17,17,17,0.03);
                }

                .job-section + .job-section {
                    margin-top: 32px;
                    padding-top: 28px;
                    border-top: 1px solid rgba(17,17,17,0.08);
                }

                .job-section h2 {
                    margin: 0 0 16px;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #1c2b20;
                    letter-spacing: -0.01em;
                }

                .job-paragraph {
                    margin: 0 0 14px;
                    font-size: 0.98rem;
                    line-height: 1.75;
                    color: rgba(17,17,17,0.82);
                }

                .job-paragraph:last-child {
                    margin-bottom: 0;
                }

                .job-bullet-list {
                    margin: 0;
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .job-bullet-list li {
                    font-size: 0.98rem;
                    line-height: 1.68;
                    color: rgba(17,17,17,0.82);
                    padding-left: 4px;
                }

                .job-bullet-list li::marker {
                    color: #3f6231;
                }

                .inline-job-link {
                    color: #3f6231;
                    font-weight: 600;
                    text-decoration: underline;
                    word-break: break-word;
                }

                /* ─── APPLICATION SIDEBAR ─── */
                .application-column {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    position: sticky;
                    top: 104px;
                }

                .google-form-card {
                    background: #ffffff;
                    border: 2px solid rgba(63,98,49,0.32);
                    border-radius: 16px;
                    padding: 28px 26px;
                    box-shadow: 0 12px 32px rgba(63,98,49,0.08);
                }

                .google-form-badge {
                    display: inline-block;
                    background: #3f6231;
                    color: #ffffff;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 5px 11px;
                    border-radius: 999px;
                    margin-bottom: 14px;
                }

                .google-form-card h3 {
                    margin: 0 0 8px;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #111111;
                }

                .google-form-card p {
                    margin: 0 0 20px;
                    font-size: 0.93rem;
                    color: rgba(17,17,17,0.72);
                    line-height: 1.55;
                }

                .google-form-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    background: #3f6231;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 0.98rem;
                    padding: 15px 22px;
                    border-radius: 12px;
                    text-decoration: none;
                    transition: background 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
                    box-shadow: 0 6px 18px rgba(63,98,49,0.22);
                }

                .google-form-btn:hover {
                    background: #2f4d24;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 24px rgba(63,98,49,0.28);
                }

                .google-form-divider {
                    position: relative;
                    text-align: center;
                    margin-top: 24px;
                }

                .google-form-divider::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 100%;
                    height: 1px;
                    background: rgba(17,17,17,0.12);
                }

                .google-form-divider span {
                    position: relative;
                    background: #ffffff;
                    padding: 0 12px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: rgba(17,17,17,0.5);
                }

                .application-form {
                    background: #ffffff;
                    border: 1px solid rgba(17,17,17,0.08);
                    border-radius: 16px;
                    padding: 28px 26px;
                    box-shadow: 0 6px 24px rgba(17,17,17,0.03);
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .form-header h2 {
                    margin: 0 0 6px;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #111111;
                }

                .form-header p {
                    margin: 0;
                    font-size: 0.88rem;
                    color: rgba(17,17,17,0.65);
                    line-height: 1.5;
                }

                .field-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 14px;
                }

                .application-form label {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    font-size: 0.86rem;
                    color: rgba(17,17,17,0.85);
                }

                .application-form input,
                .application-form textarea {
                    width: 100%;
                    border: 1px solid rgba(17,17,17,0.16);
                    border-radius: 10px;
                    padding: 11px 13px;
                    font: inherit;
                    font-size: 0.92rem;
                    background: #fcfcfb;
                    box-sizing: border-box;
                    transition: border-color 0.15s ease, background 0.15s ease;
                }

                .application-form input:focus,
                .application-form textarea:focus {
                    outline: none;
                    border-color: #3f6231;
                    background: #ffffff;
                }

                .application-form textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .file-hint {
                    font-size: 0.78rem;
                    color: rgba(17,17,17,0.55);
                }

                .submit-button {
                    border: 0;
                    border-radius: 12px;
                    padding: 14px 18px;
                    background: #1c2b20;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: background 0.15s ease, transform 0.15s ease;
                }

                .submit-button:hover:not(:disabled) {
                    background: #2b4520;
                    transform: translateY(-1px);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: wait;
                }

                .form-message {
                    border-radius: 10px;
                    padding: 12px 14px;
                    font-size: 0.9rem;
                    line-height: 1.45;
                }

                .form-message.error {
                    background: rgba(138, 43, 43, 0.08);
                    color: #8a2b2b;
                    border: 1px solid rgba(138, 43, 43, 0.18);
                }

                .form-message.success {
                    background: rgba(63,98,49,0.09);
                    color: #2b5d2a;
                    border: 1px solid rgba(63,98,49,0.22);
                }

                @media (max-width: 960px) {
                    .detail-layout {
                        grid-template-columns: 1fr;
                    }

                    .application-column {
                        position: static;
                    }
                }

                @media (max-width: 640px) {
                    .career-detail-hero {
                        padding: 112px 0 36px;
                    }

                    .career-detail-body {
                        padding: 36px 0 80px;
                    }

                    .job-meta-card {
                        grid-template-columns: 1fr;
                        padding: 18px 20px;
                    }

                    .job-content-card {
                        padding: 24px 20px;
                    }

                    .field-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
