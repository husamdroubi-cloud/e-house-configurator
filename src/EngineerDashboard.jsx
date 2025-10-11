import React, { useState } from "react";
import useConfig from "./hooks/useConfig";
import UnitDialog from "./components/UnitDialog";

export default function EngineerDashboard() {
  const { config, addUnit } = useConfig();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleAddUnit = (unitData, repeat) => {
    if (!selectedCategory || !selectedSubcategory) {
      alert("⚠️ Please select a category and subcategory first.");
      return;
    }

    addUnit(selectedCategory, selectedSubcategory, unitData);

    if (!repeat) {
      setShowDialog(false); // close if not repeating
    }
  };

  return (
    <div>
      <h2>Engineer Dashboard</h2>

      {/* Category Selector */}
      <label>
        Category:{" "}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory(""); // reset subcategory
          }}
        >
          <option value="">-- Choose --</option>
          {Object.keys(config.categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      {/* Subcategory Selector */}
      {selectedCategory && (
        <label style={{ marginLeft: "10px" }}>
          Subcategory:{" "}
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {Object.keys(config.categories[selectedCategory]).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>
      )}

      <br />
      <br />

      {/* Add Unit Button */}
      <button
        onClick={() => {
          if (!selectedCategory || !selectedSubcategory) {
            alert("⚠️ Please select a category and subcategory first.");
            return;
          }
          setShowDialog(true);
        }}
      >
        + Add Unit
      </button>

      {/* Unit Dialog (form) */}
      {showDialog && (
        <UnitDialog
          onSave={(data, repeat) => handleAddUnit(data, repeat)}
          onCancel={() => setShowDialog(false)}
        />
      )}

      {/* Preview */}
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
}
