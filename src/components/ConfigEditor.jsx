import React from "react";

export default function ConfigEditor({ config, onChange }) {
  const item = safeFirstItem(config);
  if (!item) return <div style={{ padding: 12, color: "#666" }}>No editable items found.</div>;

  const update = (field, value) => {
    const next = { ...config };
    const ref = safeFirstItem(next);
    if (!ref) return;
    ref[field] = value;
    onChange(next);
  };

  return (
    <div style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>Edit Selection</h3>

      <label style={rowStyle}>
        <span style={labelStyle}>Manufacturer PN</span>
        <input style={inputStyle} value={item.manufacturerPN ?? ""} onChange={(e) => update("manufacturerPN", e.target.value)} />
      </label>

      <label style={rowStyle}>
        <span style={labelStyle}>Rating</span>
        <input style={inputStyle} value={item.rating ?? ""} onChange={(e) => update("rating", e.target.value)} />
      </label>

      <label style={rowStyle}>
        <span style={labelStyle}>Price (USD)</span>
        <input type="number" step="0.01" style={inputStyle} value={Number(item.price ?? 0)}
               onChange={(e) => update("price", Number(e.target.value || 0))} />
      </label>

      <label style={rowStyle}>
        <span style={labelStyle}>Notes</span>
        <textarea style={{ ...inputStyle, minHeight: 80 }} value={item.notes ?? ""} onChange={(e) => update("notes", e.target.value)} />
      </label>
    </div>
  );
}

function safeFirstItem(cfg) {
  const cats = cfg?.categories;
  if (!cats) return null;
  const firstCat = cats.Generators || Object.values(cats)[0];
  if (!firstCat) return null;
  const firstList = firstCat["Diesel Generators"] || Object.values(firstCat)[0];
  if (!Array.isArray(firstList) || !firstList.length) return null;
  return firstList[0];
}

const rowStyle = { display: "grid", gridTemplateColumns: "160px 1fr", alignItems: "center", gap: 8 };
const labelStyle = { color: "#444" };
const inputStyle = { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14 };
