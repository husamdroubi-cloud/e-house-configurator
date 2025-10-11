// src/PMDashboard.jsx
import React, { useState } from "react";
import useConfig from "./hooks/useConfig";

// Simple Levenshtein distance check
function stringDistance(a, b) {
  if (!a || !b) return 99;
  a = a.toLowerCase();
  b = b.toLowerCase();
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1, // substitute
              matrix[i][j - 1] + 1,     // insert
              matrix[i - 1][j] + 1      // delete
            );
    }
  }
  return matrix[a.length][b.length];
}

export default function PMDashboard() {
  const { catalog, addCategory, addSubcategory, addUnit } = useConfig();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Helper: Warn if similar names exist
  const checkSimilar = (name, list) => {
    for (let existing of list) {
      if (existing.toLowerCase() === name.toLowerCase()) {
        alert(`❌ "${name}" already exists (exact match).`);
        return true;
      }
      if (stringDistance(existing, name) <= 2) {
        alert(`⚠️ "${name}" is very similar to existing: "${existing}"`);
        // Don’t block, just warn
      }
    }
    return false;
  };

  // Add new category
  const handleAddCategory = () => {
    const category = prompt("Enter new category name:");
    if (!category) return;
    if (checkSimilar(category, Object.keys(catalog))) return;
    addCategory(category);
    setSelectedCategory(category);
  };

  // Add new subcategory
  const handleAddSubcategory = () => {
    if (!selectedCategory) {
      alert("Select a category first!");
      return;
    }
    const subcategory = prompt(`Enter new subcategory under "${selectedCategory}":`);
    if (!subcategory) return;
    if (checkSimilar(subcategory, Object.keys(catalog[selectedCategory] || {}))) return;
    addSubcategory(selectedCategory, subcategory);
    setSelectedSubcategory(subcategory);
  };

  // Add unit under the selected subcategory
  const handleAddUnit = () => {
    if (!selectedCategory || !selectedSubcategory) {
      alert("Select a category and subcategory first!");
      return;
    }
    const unit = {
      manufacturerPN: prompt("Manufacturer P/N"),
      manufacturer: prompt("Manufacturer"),
      braedenPN: prompt("Braeden P/N"),
      price: prompt("Budgeted Price"),
      rating: prompt("Rating"),
      notes: prompt("Notes"),
    };
    addUnit(selectedCategory, selectedSubcategory, unit);
  };

  return (
    <div>
      <h2>PM Dashboard</h2>

      {/* Dropdowns for navigation */}
      <div>
        <label>Category: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">--Choose--</option>
          {Object.keys(catalog).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <label>Subcategory: </label>
          <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
            <option value="">--Choose--</option>
            {Object.keys(catalog[selectedCategory] || {}).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      <br />
      <button onClick={handleAddCategory}>➕ Add Category</button>
      <button onClick={handleAddSubcategory}>➕ Add Subcategory</button>
      <button onClick={handleAddUnit}>➕ Add Unit</button>

      {/* Catalog Viewer */}
      <h3>📦 Equipment Catalog</h3>
      <div style={{ textAlign: "left", marginTop: "10px" }}>
        {Object.keys(catalog).map((cat) => (
          <div key={cat} style={{ marginBottom: "10px" }}>
            <h4>📁 {cat}</h4>
            {Object.keys(catalog[cat] || {}).map((sub) => (
              <div key={sub} style={{ marginLeft: "20px" }}>
                <h5>📂 {sub}</h5>
                <ul>
                  {(catalog[cat][sub] || []).map((unit, i) => (
                    <li key={i}>
                      {unit.manufacturerPN} - {unit.manufacturer} ({unit.rating}) 💲{unit.price}
                      <br />
                      <small>{unit.notes}</small>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
