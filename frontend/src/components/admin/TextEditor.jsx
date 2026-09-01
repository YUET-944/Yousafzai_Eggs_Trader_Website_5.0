import { useState, useEffect } from 'react';

export default function TextEditor({ data, onUpdate, fields }) {
  const [form, setForm] = useState(data || {});
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm(data || {}); }, [data]);

  useEffect(() => {
    if (JSON.stringify(form) === JSON.stringify(data)) return;
    const timer = setTimeout(() => {
      onUpdate(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, [form, data, onUpdate]);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, textAlign: 'right', fontSize: 12, color: saved ? '#1F7A3D' : 'transparent', marginBottom: 4 }}>
        {saved && '✓ Saved'}
      </div>
      {fields.map((field) => (
        <div key={field.key} style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea value={form[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} rows={field.rows || 3} style={{ ...inputStyle, resize: 'vertical' }} />
          ) : (
            <input value={form[field.key] || ''} onChange={(e) => update(field.key, e.target.value)} style={inputStyle} />
          )}
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1.4px solid #DBDFE6',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "'Inter',sans-serif",
  color: '#111111',
  background: '#FFFFFF',
};
