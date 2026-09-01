const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1.4px solid #DBDFE6',
  borderRadius: 6,
  fontSize: 12,
  fontFamily: "'Inter',sans-serif",
  color: '#111111',
  background: '#FFFFFF',
};

export default function SpecsEditor({ specs, onUpdate }) {
  const update = (index, field, value) => {
    const next = specs.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    onUpdate(next);
  };

  const add = () => {
    onUpdate([...specs, { name: '', grade: '', sizes: '', moq: '', lead: '', status: 'In Stock', statusClass: 'stock' }]);
  };

  const remove = (index) => {
    onUpdate(specs.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#B8860B', margin: '0 0 12px' }}>Specifications Table</h4>
      {specs.map((spec, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, padding: 8, background: '#F5F7FA', borderRadius: 8 }}>
          <input value={spec.name} onChange={(e) => update(i, 'name', e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="Product" />
          <input value={spec.grade} onChange={(e) => update(i, 'grade', e.target.value)} style={{ ...inputStyle, flex: 0.7 }} placeholder="Grade" />
          <input value={spec.sizes} onChange={(e) => update(i, 'sizes', e.target.value)} style={{ ...inputStyle, flex: 0.7 }} placeholder="Sizes" />
          <input value={spec.moq} onChange={(e) => update(i, 'moq', e.target.value)} style={{ ...inputStyle, flex: 0.7 }} placeholder="Min Order" />
          <input value={spec.lead} onChange={(e) => update(i, 'lead', e.target.value)} style={{ ...inputStyle, flex: 0.6 }} placeholder="Lead Time" />
          <select value={spec.statusClass} onChange={(e) => { update(i, 'statusClass', e.target.value); update(i, 'status', e.target.value === 'stock' ? 'In Stock' : 'Limited'); }} style={{ ...inputStyle, flex: 0.6 }}>
            <option value="stock">In Stock</option>
            <option value="limited">Limited</option>
          </select>
          <button onClick={() => remove(i)} style={{ background: '#FEF2F2', border: 'none', borderRadius: 4, padding: '4px 8px', color: '#B91C1C', fontSize: 11, cursor: 'pointer' }}>×</button>
        </div>
      ))}
      <button onClick={add} style={{ padding: '6px 14px', background: '#FFFFFF', border: '1.5px dashed #DBDFE6', borderRadius: 6, color: '#B8860B', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>+ Add Row</button>
    </div>
  );
}
