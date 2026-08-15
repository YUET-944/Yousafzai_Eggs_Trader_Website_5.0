import { useState } from 'react';

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

export default function ProductItemsEditor({ items, onUpdate }) {
  const [data, setData] = useState(items || []);

  const update = (index, field, value) => {
    const next = data.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setData(next);
    onUpdate(next);
  };

  const addItem = () => {
    const next = [...data, { badge: 'New', icon: 'Feather', gradient: 'from-navy to-navy-2', name: 'New Product', description: 'Product description', tags: ['Tag1', 'Tag2'], image: '' }];
    setData(next);
    onUpdate(next);
  };

  const removeItem = (index) => {
    const next = data.filter((_, i) => i !== index);
    setData(next);
    onUpdate(next);
  };

  return (
    <div>
      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: 24, padding: 20, background: '#F5F7FA', borderRadius: 12, border: '1px solid #EEF1F5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#B8860B', fontFamily: "'Space Grotesk',sans-serif" }}>Product {i + 1}</span>
            <button onClick={() => removeItem(i)} style={{ background: '#FEF2F2', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#B91C1C', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>Remove</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Name</label>
              <input value={item.name} onChange={(e) => update(i, 'name', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Badge</label>
              <input value={item.badge} onChange={(e) => update(i, 'badge', e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Description</label>
            <textarea value={item.description} onChange={(e) => update(i, 'description', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Tag 1</label>
              <input value={item.tags[0] || ''} onChange={(e) => update(i, 'tags', [e.target.value, item.tags[1] || ''])} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Tag 2</label>
              <input value={item.tags[1] || ''} onChange={(e) => update(i, 'tags', [item.tags[0] || '', e.target.value])} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Image URL</label>
            <input value={item.image || ''} onChange={(e) => update(i, 'image', e.target.value)} style={inputStyle} placeholder="https://images.unsplash.com/..." />
          </div>

          {item.image && (
            <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', width: 120, height: 80 }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}
        </div>
      ))}

      <button onClick={addItem} style={{ width: '100%', padding: '12px 0', background: '#FFFFFF', border: '1.5px dashed #DBDFE6', borderRadius: 10, color: '#B8860B', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        + Add Product
      </button>
    </div>
  );
}
