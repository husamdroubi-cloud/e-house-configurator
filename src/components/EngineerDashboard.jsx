import React, { useState } from "react";
import useConfig from "../hooks/useConfig";
import UnitDialog from "./UnitDialog";

export default function EngineerDashboard() {
  const { config, addUnit } = useConfig();
  const [showUnitDialog, setShowUnitDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  return (
    <div>
      <h2>Engineer Dashboard</h2>

      <div>
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {Object.keys(config.categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <label>Subcategory: </label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {Object.keys(config.categories[selectedCategory] || {}).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedSubcategory && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setShowUnitDialog(true)}>➕ Add Unit</button>
        </div>
      )}

      {showUnitDialog && (
        <UnitDialog
          onClose={() => setShowUnitDialog(false)}
          onSave={(unit) => {
            addUnit(selectedCategory, selectedSubcategory, unit);
            setShowUnitDialog(false);
          }}
        />
      )}

      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
}
