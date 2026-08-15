import { useState } from 'react';
import ImageUpload from './ImageUpload';

const INPUT = {
  width: '100%',
  padding: '10px 14px',
  border: '1.4px solid #DBDFE6',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "'Inter',sans-serif",
  color: '#111111',
  background: '#FFFFFF',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
};

function Field({ field, value, onChange }) {
  if (field.hidden) return null;

  const label = (
    <label className="cm-field-label">
      {field.icon}
      {field.label}
      {field.hint && <em className="cm-field-hint">{field.hint}</em>}
    </label>
  );

  switch (field.type) {
    case 'textarea':
      return (
        <div className="cm-field">
          {label}
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            style={{ ...INPUT, resize: 'vertical' }}
          />
        </div>
      );
    case 'image':
      return (
        <div className="cm-field">
          {label}
          <ImageUpload value={value} onChange={onChange} />
        </div>
      );
    case 'color':
      return (
        <div className="cm-field">
          {label}
          <div className="cm-color-row">
            <input
              type="color"
              value={/^#[0-9A-Fa-f]{6}$/.test(value || '') ? value : '#B8860B'}
              onChange={(e) => onChange(e.target.value)}
              className="cm-color-swatch"
            />
            <input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#RRGGBB"
              style={INPUT}
            />
          </div>
        </div>
      );
    case 'select':
      return (
        <div className="cm-field">
          {label}
          <select
            value={String(value ?? '')}
            onChange={(e) => {
              const raw = e.target.value;
              const opt = (field.options || []).find((o) => String(o.value) === raw);
              onChange(opt ? opt.value : raw);
            }}
            style={INPUT}
          >
            <option value="" disabled>{field.placeholder || 'Select...'}</option>
            {(field.options || []).map((o) => (
              <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
            ))}
          </select>
        </div>
      );
    case 'number':
      return (
        <div className="cm-field">
          {label}
          <input
            type="number"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            style={INPUT}
          />
        </div>
      );
    default:
      return (
        <div className="cm-field">
          {label}
          <input
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            style={INPUT}
          />
        </div>
      );
  }
}

function ArrayField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [collapsed, setCollapsed] = useState({});
  const visibleFields = (field.fields || []).filter((sub) => !sub.hidden);

  const isObjectItem = (v) => v && typeof v === 'object' && !Array.isArray(v);

  const update = (index, patch) => {
    const next = items.map((item, i) =>
      i === index ? (typeof patch === 'function' ? patch(item) : { ...item, ...patch }) : item
    );
    onChange(next);
  };

  const updateScalar = (index, val) => {
    const next = items.map((item, i) => (i === index ? val : item));
    onChange(next);
  };

  const add = () => {
    const blank = field.itemDefaults || {};
    const next = [...items, blank];
    onChange(next);
    setCollapsed((c) => ({ ...c, [next.length - 1]: true }));
  };

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index, dir) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="cm-array">
      <div className="cm-array-head">
        <span className="cm-array-title">{field.label}</span>
        {field.hint && <em className="cm-field-hint">{field.hint}</em>}
        <button type="button" className="cm-btn cm-btn-add" onClick={add}>
          + Add {field.itemLabel || 'Item'}
        </button>
      </div>

      {items.length === 0 && (
        <div className="cm-array-empty">No {field.itemLabel || 'items'} yet. Click "Add {field.itemLabel || 'Item'}" to create one.</div>
      )}

      {items.map((item, index) => (
        <div key={index} className={`cm-array-item ${collapsed[index] ? 'is-collapsed' : ''}`}>
          <div className="cm-array-item-bar">
            <button
              type="button"
              className="cm-item-toggle"
              onClick={() => setCollapsed((c) => ({ ...c, [index]: !c[index] }))}
              aria-label={collapsed[index] ? 'Expand' : 'Collapse'}
            >
              {collapsed[index] ? '>' : 'v'}
            </button>
            <span className="cm-item-label">
              {field.itemLabel || 'Item'} {index + 1}
            </span>
            <div className="cm-item-actions">
              <button type="button" className="cm-icon-btn" onClick={() => move(index, -1)} title="Move up" disabled={index === 0}>Up</button>
              <button type="button" className="cm-icon-btn" onClick={() => move(index, 1)} title="Move down" disabled={index === items.length - 1}>Down</button>
              <button type="button" className="cm-icon-btn cm-icon-btn-danger" onClick={() => remove(index)} title="Delete">Delete</button>
            </div>
          </div>

          {!collapsed[index] && (
            <div className="cm-array-item-body">
              {isObjectItem(item) ? (
                <div className="cm-array-fields">
                  {visibleFields.map((sub) => (
                    <Field
                      key={sub.key}
                      field={sub}
                      value={item[sub.key]}
                      onChange={(v) => update(index, { [sub.key]: v })}
                    />
                  ))}
                  {visibleFields.length === 0 && (
                    <div className="cm-structure-note">This item has no editable fields configured.</div>
                  )}
                </div>
              ) : (
                <input
                  value={item ?? ''}
                  onChange={(e) => updateScalar(index, e.target.value)}
                  style={INPUT}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ObjectField({ field, value, onChange, depth }) {
  const obj = value && typeof value === 'object' ? value : {};
  const visibleFields = (field.fields || []).filter((sub) => !sub.hidden);

  return (
    <div className="cm-object">
      {visibleFields.map((sub) => (
        <SchemaEditorField key={sub.key} field={sub} value={obj[sub.key]} onChange={(v) => onChange({ ...obj, [sub.key]: v })} depth={depth + 1} />
      ))}
    </div>
  );
}

function SchemaEditorField({ field, value, onChange, depth }) {
  if (field.hidden) return null;

  if (field.type === 'array') {
    return <ArrayField field={field} value={value} onChange={onChange} />;
  }
  if (field.type === 'object') {
    return (
      <div className="cm-object-block">
        <div className="cm-object-title">{field.label}</div>
        <ObjectField field={field} value={value} onChange={onChange} depth={depth} />
      </div>
    );
  }
  return <Field field={field} value={value} onChange={onChange} />;
}

export default function SchemaEditor({ value, onChange, schema, autoSave = true }) {
  const [dirty, setDirty] = useState(false);

  const save = (next) => {
    onChange(next);
    if (autoSave) setDirty(false);
  };

  // Top-level array sections (e.g. industries, process, testimonials, faq)
  if (Array.isArray(value)) {
    const listField = schema.find((f) => f.key === '__items');
    if (listField) {
      return (
        <div className="cm-schema-editor">
          <ArrayField
            field={listField}
            value={value}
            onChange={(v) => {
              setDirty(true);
              save(v);
            }}
          />
        </div>
      );
    }
  }

  const handleFieldChange = (key, v) => {
    setDirty(true);
    save({ ...(value || {}), [key]: v });
  };

  return (
    <div className="cm-schema-editor">
      {schema.map((field) => (
        <SchemaEditorField
          key={field.key}
          field={field}
          value={(value || {})[field.key]}
          onChange={(v) => handleFieldChange(field.key, v)}
          depth={0}
        />
      ))}
      {dirty && autoSave && (
        <div className="cm-dirty-hint">Editing... changes are saved as you type</div>
      )}
    </div>
  );
}
