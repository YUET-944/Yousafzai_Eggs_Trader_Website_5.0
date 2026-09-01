import { AlertCircle, Inbox, Loader2 } from 'lucide-react';

export default function AdminState({ type = 'empty', title, message, action }) {
  const Icon = type === 'error' ? AlertCircle : type === 'loading' ? Loader2 : Inbox;
  return (
    <div className={`admin-state admin-state-${type}`}>
      <Icon size={22} className={type === 'loading' ? 'spin' : ''} />
      <div>
        <strong>{title}</strong>
        {message && <span>{message}</span>}
      </div>
      {action}
    </div>
  );
}
