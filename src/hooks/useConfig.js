import { useState } from "react";

// Helper to check if a string is similar to an existing one
function isSimilarName(newName, existingName) {
  return newName.toLowerCase().replace(/\s+/g, "") ===
         existingName.toLowerCase().replace(/\s+/g, "");
}

export default function useConfig() {
  const [config, setConfig] = useState({
    categories: {
      Generators: {
        "Diesel Generators": [
          {
            manufacturerPN: "DG-100",
            manufacturer: "Caterpillar",
            braedenPN: "BR-001",
            price: 50000,
            rating: "100kVA",
            notes: "Standard backup generator",
          },
        ],
      },
    },
  });

  // ✅ Add Category
  const addCategory = (name) => {
    if (!name) return;
    for (let existing of Object.keys(config.categories)) {
      if (isSimilarName(name, existing)) {
        alert(`"${name}" is very similar to existing: "${existing}"`);
        return;
      }
    }

    setConfig((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [name]: {},
      },
    }));
  };

  // ✅ Add Subcategory
  const addSubcategory = (category, name) => {
    if (!category || !name) return;
    const existingSubs = config.categories[category] || {};
    for (let existing of Object.keys(existingSubs)) {
      if (isSimilarName(name, existing)) {
        alert(`"${name}" is very similar to existing subcategory: "${existing}"`);
        return;
      }
    }

    setConfig((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [name]: [],
        },
      },
    }));
  };

  // ✅ Add Unit
  const addUnit = (category, subcategory, unit) => {
    if (!category || !subcategory || !unit) return;

    setConfig((prev) => {
      const updated = { ...prev };

      if (!updated.categories[category]) updated.categories[category] = {};
      if (!updated.categories[category][subcategory]) updated.categories[category][subcategory] = [];

      updated.categories[category][subcategory] = [
        ...updated.categories[category][subcategory],
        unit,
      ];

      return updated;
    });
  };

  return { config, addCategory, addSubcategory, addUnit };
}
