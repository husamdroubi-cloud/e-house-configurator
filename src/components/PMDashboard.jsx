import React, { useState } from "react";
import useConfig from "../hooks/useConfig";
import UnitDialog from "./UnitDialog";
import EquipmentTree from "./EquipmentTree";

export default function PMDashboard() {
  const { config, addCategory, addSubcategory, addUnit } = useConfig();

  const [showUnitDialog, setShowUnitDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleAddCategory = () => {
    const name = prompt("Enter new category name:");
    if (name) addCategory(name);
  };

  const handleAddSubcategory = () => {
    if (!selectedCategory) {
      alert("Select a category first.");
      return;
    }
    const name = prompt(`Enter new subcategory name for "${selectedCategory}":`);
    if (name) addSubcategory(selectedCategory, name);
  };

  const handleAddUnit = () => {
    if (!selectedCategory || !selectedSubcategory) {
      alert("Select both a category and subcategory first.");
      return;
    }
    setShowUnitDialog(true);
  };

  const handleSaveUnit = (unit) => {
    addUnit(selectedCategory, selectedSubcategory, unit);
    setShowUnitDialog(false);
  };

  return (
    <div>
      <h2>PM Dashboard</h2>

      {/* Category Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory("");
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">-- Choose --</option>
            {Object.keys(config.categories || {}).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Subcategory Dropdown */}
      {selectedCategory && (
        <div style={{ marginBottom: "10px" }}>
          <label>
            Subcategory:
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">-- Choose --</option>
              {Object.keys(config.categories[selectedCategory] || {}).map(
                (sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                )
              )}
            </select>
          </label>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleAddCategory}>➕ Add Category</button>
        <button onClick={handleAddSubcategory}>➕ Add Subcategory</button>
        <button onClick={handleAddUnit}>➕ Add Unit</button>
      </div>

      {/* Equipment Catalog Tree */}
      <EquipmentTree categories={config.categories || {}} />

      {/* Unit Dialog */}
      {showUnitDialog && (
        <UnitDialog
          onSave={handleSaveUnit}
          onCancel={() => setShowUnitDialog(false)}
        />
      )}
    </div>
  );
}

