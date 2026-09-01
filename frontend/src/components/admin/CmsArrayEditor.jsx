import { useState } from 'react';
import ImageUpload from './ImageUpload';

const input = {
  width: '100%', padding: '10px 14px', border: '1.4px solid #DBDFE6',
  borderRadius: 8, fontSize: 13, fontFamily: "'Inter',sans-serif",
  color: '#111111', background: '#FFFFFF',
};

export default function CmsArrayEditor({ items, onUpdate, fields, itemLabel, defaults }) {
  const [data, setData] = useState(items || []);

  const handleUpdate = (next) => {
    setData(next);
    onUpdate(next);
  };

  const update = (index, field, value) => {
    handleUpdate(data.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const add = () => {
    handleUpdate([...data, defaults || {}]);
  };

  const remove = (index) => {
    handleUpdate(data.filter((_, i) => i !== index));
  };

  const isImage = (key) => key.toLowerCase().includes('image') || key.toLowerCase().includes('icon') || key.toLowerCase().includes('logo');

  return (
    <div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: 20, padding: 20, background: '#F5F7FA', borderRadius: 12, border: '1px solid #EEF1F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#B8860B', fontFamily: "'Space Grotesk',sans-serif" }}>
              {itemLabel ? `${itemLabel} ${i + 1}` : `Item ${i + 1}`}
            </span>
            <button onClick={() => remove(i)} style={{ background: '#FEF2F2', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#B91C1C', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Remove</button>
          </div>
          {fields.map((field) => {
            const val = item[field.key];
            return (
              <div key={field.key} style={{ marginBottom: 10 }}>
                {isImage(field.key) ? (
                  <ImageUpload
                    value={val || ''}
                    onChange={(v) => update(i, field.key, v)}
                    label={field.label}
                  />
                ) : field.type === 'textarea' ? (
                  <>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>{field.label}</label>
                    <textarea value={val || ''} onChange={(e) => update(i, field.key, e.target.value)} rows={field.rows || 2} style={{ ...input, resize: 'vertical' }} />
                  </>
                ) : field.type === 'select' ? (
                  <>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>{field.label}</label>
                    <select value={String(val)} onChange={(e) => update(i, field.key, e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value)} style={input}>
                      {field.options.map((o) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
                    </select>
                  </>
                ) : (
                  <>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>{field.label}</label>
                    <input value={val || ''} onChange={(e) => update(i, field.key, e.target.value)} style={input} placeholder={field.placeholder || ''} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={add} style={{ width: '100%', padding: '12px 0', background: '#FFFFFF', border: '1.5px dashed #DBDFE6', borderRadius: 10, color: '#B8860B', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        + Add {itemLabel || 'Item'}
      </button>
    </div>
  );
}
