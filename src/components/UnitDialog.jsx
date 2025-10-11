import React, { useState } from "react";

export default function UnitDialog({ onSave, onClose }) {
  const [form, setForm] = useState({
    manufacturerPN: "",
    manufacturer: "",
    braedenPN: "",
    price: "",
    rating: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "15px" }}>
      <h3>Add Equipment Unit</h3>

      <div style={{ display: "grid", gap: "10px" }}>
        <label>
          Manufacturer PN:
          <input
            type="text"
            name="manufacturerPN"
            value={form.manufacturerPN}
            onChange={handleChange}
          />
        </label>

        <label>
          Manufacturer:
          <input
            type="text"
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
          />
        </label>

        <label>
          Braeden PN:
          <input
            type="text"
            name="braedenPN"
            value={form.braedenPN}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </label>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button onClick={() => onSave(form)}>💾 Save</button>
        <button
          onClick={() => {
            onSave(form);
            setForm({
              manufacturerPN: "",
              manufacturer: "",
              braedenPN: "",
              price: "",
              rating: "",
              notes: "",
            });
          }}
        >
          💾 Save & Repeat
        </button>
        <button onClick={onClose}>❌ Cancel</button>
      </div>
    </div>
  );
}
