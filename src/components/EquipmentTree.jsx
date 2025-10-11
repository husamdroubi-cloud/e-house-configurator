import React, { useState } from "react";

export default function EquipmentTree({ categories }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📂 Equipment Catalog</h3>
      <div style={{ marginLeft: "15px" }}>
        {Object.keys(categories).map((category) => (
          <CategoryNode
            key={category}
            name={category}
            data={categories[category]}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryNode({ name, data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginTop: "5px" }}>
      <span
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "📂" : "📁"} {name}
      </span>
      {expanded && (
        <div style={{ marginLeft: "20px" }}>
          {typeof data === "object" &&
            Object.keys(data).map((sub) =>
              Array.isArray(data[sub]) ? (
                <SubcategoryNode key={sub} name={sub} units={data[sub]} />
              ) : (
                <CategoryNode key={sub} name={sub} data={data[sub]} />
              )
            )}
        </div>
      )}
    </div>
  );
}

function SubcategoryNode({ name, units }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginTop: "5px" }}>
      <span
        style={{ cursor: "pointer", color: "darkgreen" }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "📂" : "📁"} {name}
      </span>
      {expanded && (
        <ul style={{ marginLeft: "20px" }}>
          {units.map((unit, idx) => (
            <li key={idx}>
              <strong>{unit.manufacturerPN}</strong> – {unit.manufacturer} (
              {unit.rating}) 💲{unit.price}
              <br />
              <small>{unit.notes}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
