import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loginLoading = useAuthStore((s) => s.loginLoading);
  const loginError = useAuthStore((s) => s.loginError);
  const sessionMessage = useAuthStore((s) => s.sessionMessage);
  const clearLoginError = useAuthStore((s) => s.clearLoginError);
  const clearSessionMessage = useAuthStore((s) => s.clearSessionMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    clearLoginError();
    clearSessionMessage();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error || 'Email or password is incorrect.');
    }
  };

  const displayError = error || loginError || sessionMessage;

  return (
    <div className="login-page">
      <div className="login-bg-grid" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-badge"><ShieldCheck size={22} /></div>
          <div>
            <span className="login-brand-title">YOUSAFZAI</span>
            <span className="login-brand-sub">Content Management</span>
          </div>
        </div>

        <div className="login-left-copy">
          <span className="login-eyebrow">Content Management</span>
          <h1 className="login-h1">Manage both websites from one dashboard.</h1>
          <p className="login-p">
            Edit every section, image, product, and setting on the <strong>Main Website</strong> and the{' '}
            <strong>Egg Traders Website</strong>. Changes auto-save and go live instantly.
          </p>
        </div>

        <div className="login-features">
          <div className="login-feature">
            <div className="login-feature-dot" style={{ background: '#10B981' }} />
            <div>
              <span className="login-feature-title">Auto-save &amp; live updates</span>
              <span className="login-feature-desc">Every change publishes immediately to the websites.</span>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-dot" style={{ background: '#3B82F6' }} />
            <div>
              <span className="login-feature-title">Image &amp; media management</span>
              <span className="login-feature-desc">Upload or link images for any section directly.</span>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-dot" style={{ background: '#64748B' }} />
            <div>
              <span className="login-feature-title">Two websites, one control center</span>
              <span className="login-feature-desc">Switch between the Main Website and Egg Traders Website instantly.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <span className="login-card-eyebrow">Admin Access</span>
          <h2 className="login-card-title">Sign in to dashboard</h2>
          <p className="login-card-sub">Authorized personnel only.</p>

          {displayError && (
            <div className="login-alert" role="alert" aria-live="assertive">
              <span>{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label"><Mail size={13} /> Corporate Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yousafzaigroup.com"
                disabled={loginLoading}
                className="login-input"
                autoComplete="email"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label"><Lock size={13} /> Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loginLoading}
                  className="login-input"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className={`login-btn ${loginLoading ? 'loading' : ''}`}
            >
              <span>{loginLoading ? 'Signing in...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="login-card-footer">
            <button className="back-link" onClick={() => navigate('/')}>
              <ArrowLeft size={13} /> Back to website
            </button>
            <span className="login-copy">Yousafzai Eggs Traders &amp; Poultry Farms</span>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          background: #0B1120;
          color: #F1F5F9;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .login-orb { position: absolute; border-radius: 50%; filter: blur(130px); pointer-events: none; }
        .login-orb-1 {
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.28), transparent 70%);
          top: -140px; left: -160px;
        }
        .login-orb-2 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 70%);
          bottom: -160px; right: -140px;
        }

        .login-left {
          position: relative;
          z-index: 2;
          flex: 1.1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          max-width: 620px;
        }

        .login-brand { display: flex; align-items: center; gap: 12px; }
        .login-brand-badge {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          display: flex; align-items: center; justify-content: center;
          color: #FFFFFF; box-shadow: 0 8px 24px rgba(37, 99, 235, 0.45);
        }
        .login-brand-title {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.04em;
        }
        .login-brand-sub { font-size: 10.5px; color: #9AA9C7; letter-spacing: 0; }

        .login-left-copy { margin: auto 0; padding: 60px 0; }
        .login-eyebrow {
          font-size: 12px; letter-spacing: 0; color: #60A5FA;
          font-weight: 700; display: block; margin-bottom: 14px;
        }
        .login-h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 38px; font-weight: 700; line-height: 1.15;
          margin: 0 0 18px; color: #FFFFFF;
        }
        .login-p { font-size: 15px; line-height: 1.7; color: #94A3B8; margin: 0; max-width: 460px; }
        .login-p strong { color: #E2E8F0; }

        .login-features { display: flex; flex-direction: column; gap: 18px; }
        .login-feature { display: flex; gap: 14px; align-items: flex-start; }
        .login-feature-dot {
          width: 10px; height: 10px; border-radius: 50%;
          margin-top: 5px; flex-shrink: 0;
          box-shadow: 0 0 12px currentColor;
        }
        .login-feature-title {
          display: block; font-size: 14px; font-weight: 600; color: #E2E8F0;
        }
        .login-feature-desc { font-size: 12.5px; color: #64748B; margin-top: 2px; display: block; }

        .login-right {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          background: #111C33;
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 22px;
          padding: 40px 36px;
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.5);
        }

        .login-card-eyebrow {
          font-size: 12px; letter-spacing: 0; color: #60A5FA; font-weight: 700;
          display: block; margin-bottom: 8px;
        }
        .login-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px;
        }
        .login-card-sub { font-size: 13px; color: #7C8DB5; margin: 0 0 28px; }

        .login-alert {
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #FCA5A5;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 22px;
          text-align: center;
        }

        .login-form { display: flex; flex-direction: column; gap: 18px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: #94A3B8;
        }
        .login-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 11px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #F1F5F9;
          background: #0B1325;
          border: 1px solid rgba(148, 163, 184, 0.22);
          transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: #4B5A78; }
        .login-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        .login-input:disabled { opacity: 0.6; }

        .password-wrap { position: relative; }
        .password-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #64748B; cursor: pointer;
          display: flex; align-items: center; padding: 4px;
        }
        .password-toggle:hover { color: #CBD5E1; }

        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          padding: 14px 0;
          border-radius: 11px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #FFFFFF;
          margin-top: 8px;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35);
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.5);
        }
        .login-btn.loading { opacity: 0.7; cursor: not-allowed; }

        .login-card-footer {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          margin-top: 30px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding-top: 22px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; color: #7C8DB5;
          font-size: 12.5px; font-weight: 500; cursor: pointer;
          transition: color 0.2s;
        }
        .back-link:hover { color: #93C5FD; }
        .login-copy {
          font-size: 10.5px; color: #64748B; letter-spacing: 0;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 960px) {
          .login-left { display: none; }
          .login-right { padding: 32px 20px; }
          .login-page { background: #0B1120; }
        }
      `}</style>
    </div>
  );
}
