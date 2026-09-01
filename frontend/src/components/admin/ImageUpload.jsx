import { useRef, useState } from 'react';
import AdminConfirmDialog from './AdminConfirmDialog';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/useAuthStore';

export default function ImageUpload({ value, onChange, label }) {
  const inputRef = useRef(null);
  const logout = useAuthStore((s) => s.logout);
  const setSessionMessage = useAuthStore((s) => s.setSessionMessage);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Please choose an image under 5 MB.');
      return;
    }

    setError('');
    setUploading(true);
    try {
      const uploaded = await api.uploadImage(file);
      const url = uploaded?.url || uploaded?.data?.url;
      if (!url) throw new Error("The image was uploaded, but we couldn't retrieve its link.");
      onChange(url);
    } catch (err) {
      const sessionExpired = err?.status === 401 || err?.status === 403;
      const message = sessionExpired
        ? 'Your session has expired. Please sign in again.'
        : err?.message === "The image was uploaded, but we couldn't retrieve its link."
          ? err.message
        : 'Image upload failed. Please try again.';
      setError(message);
      if (sessionExpired) {
        setSessionMessage(message);
        window.setTimeout(() => logout(), 1400);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const isUrl = typeof value === 'string' && (
    value.startsWith('http') || value.startsWith('/') || value.startsWith('data:')
  );

  return (
    <div className="cm-image-upload">
      {label && <span className="cm-field-label">{label}</span>}
      <div className="cm-image-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <input
          value={isUrl ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image link"
          className="cm-image-url"
          aria-label={label ? `${label} link` : 'Image link'}
          disabled={uploading}
        />
        <button
          type="button"
          className="cm-btn cm-upload-btn"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {value && (
          <button
            type="button"
            className="cm-btn cm-clear-btn"
            onClick={() => setConfirmClearOpen(true)}
            title="Remove image"
            aria-label="Remove image"
            disabled={uploading}
          >
            x
          </button>
        )}
      </div>
      <AdminConfirmDialog
        open={confirmClearOpen}
        title="Remove Image?"
        message={(<>Are you sure you want to remove this image from the CMS field?<br />This action cannot be undone.</>)}
        confirmLabel="Remove Image"
        onCancel={() => setConfirmClearOpen(false)}
        onConfirm={() => { onChange(''); setConfirmClearOpen(false); }}
      />
      {error && <div className="cm-image-error">{error}</div>}
      {value && (
        <div className="cm-image-preview">
          <img
            src={value}
            alt=""
            className="cm-image-preview-img"
            onError={(e) => { e.target.style.opacity = '0.25'; }}
            onLoad={(e) => { e.target.style.opacity = '1'; }}
          />
        </div>
      )}
      <style>{`
        .cm-image-upload { margin-bottom: 6px; }
        .cm-image-row { display: flex; gap: 8px; align-items: center; }
        .cm-image-url {
          flex: 1;
          padding: 9px 12px;
          border: 1.4px solid #DBDFE6;
          border-radius: 8px;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          color: #111111;
          background: #FFFFFF;
          outline: none;
        }
        .cm-image-url:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .cm-upload-btn {
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #FFFFFF;
          padding: 9px 16px;
          font-size: 12.5px;
          white-space: nowrap;
          box-shadow: 0 3px 10px rgba(37,99,235,0.25);
        }
        .cm-upload-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .cm-upload-btn:disabled,
        .cm-clear-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
        .cm-clear-btn {
          background: #FEF2F2; color: #DC2626;
          border: 1px solid #FECACA;
          width: 38px; height: 38px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }
        .cm-image-error { color: #DC2626; font-size: 12px; margin-top: 6px; }
        .cm-image-preview {
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
          width: 180px;
          height: 116px;
          border: 1px solid #E5E9F2;
          background: #F8FAFC;
          display: flex; align-items: center; justify-content: center;
        }
        .cm-image-preview-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: opacity .3s;
        }
      `}</style>
    </div>
  );
}
