import { useEffect, useRef } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';

export default function AdminConfirmDialog({
  open,
  title,
  message,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  error = '',
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    window.setTimeout(() => confirmRef.current?.focus(), 0);

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) onCancel?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [loading, onCancel, open]);

  if (!open) return null;

  const confirmClass = variant === 'danger' ? 'admin-danger-btn' : 'admin-primary-btn';

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={loading ? undefined : onCancel}>
      <div
        className="admin-modal admin-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-head">
          <div className="admin-confirm-title-row">
            {variant === 'danger' && <span className="admin-confirm-icon"><AlertTriangle size={18} /></span>}
            <div>
              <span className="admin-kicker">Confirm Action</span>
              <h2 id="admin-confirm-title">{title}</h2>
            </div>
          </div>
          <button className="admin-icon-action" onClick={onCancel} aria-label="Close confirmation" disabled={loading}>
            <X size={18} />
          </button>
        </div>

        {message && <p className="admin-confirm-message">{message}</p>}
        {children && <div className="admin-confirm-context">{children}</div>}
        {error && <div className="admin-confirm-error" role="alert">{error}</div>}

        <div className="admin-modal-actions">
          <button type="button" className="admin-secondary-btn" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button type="button" className={confirmClass} onClick={onConfirm} disabled={loading} ref={confirmRef}>
            {loading && <Loader2 size={15} className="spin" />}
            {loading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
