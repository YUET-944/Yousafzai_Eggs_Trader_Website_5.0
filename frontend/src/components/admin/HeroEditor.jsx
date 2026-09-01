import { useState, useEffect } from 'react';
import { useCMSStore } from '../../store/useCMSStore';

export default function HeroEditor() {
  const hero = useCMSStore((s) => s.hero);
  const updateHero = useCMSStore((s) => s.updateHero);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(hero);

  useEffect(() => { setForm(hero); }, [hero]);

  useEffect(() => {
    if (JSON.stringify(form) === JSON.stringify(hero)) return;
    const timer = setTimeout(() => {
      updateHero(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, [form, hero, updateHero]);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: -16, right: 0, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: saved ? '#1F7A3D' : '#707888' }}>
        {saved && <>✓ Saved</>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>Eyebrow Label</label>
          <input value={form.eyebrow} onChange={(e) => update('eyebrow', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>H1 Highlight Word</label>
          <input value={form.h1Highlight} onChange={(e) => update('h1Highlight', e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>H1 Line 1</label>
          <input value={form.h1Line1} onChange={(e) => update('h1Line1', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>Primary CTA Label</label>
          <input value={form.primaryCta.label} onChange={(e) => update('primaryCta', { ...form.primaryCta, label: e.target.value })} style={inputStyle} />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 4 }}>Body Paragraph</label>
        <textarea value={form.body} onChange={(e) => update('body', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 8 }}>Stats</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {form.stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input value={stat.value} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], value: e.target.value }; update('stats', s); }} style={{ ...inputStyle, width: 80 }} placeholder="Value" />
              <input value={stat.suffix} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], suffix: e.target.value }; update('stats', s); }} style={{ ...inputStyle, width: 60 }} placeholder="Suffix" />
              <input value={stat.label} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], label: e.target.value }; update('stats', s); }} style={{ ...inputStyle, flex: 1 }} placeholder="Label" />
            </div>
          ))}
        </div>
      </div>
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
