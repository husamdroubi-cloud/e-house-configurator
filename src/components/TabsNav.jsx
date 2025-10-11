import React, { useState } from "react";

export default function TabsNav() {
  const [tab, setTab] = useState("layout");

  return (
    <div>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => setTab("layout")}>Layout</button>
        <button onClick={() => setTab("equipment")}>Equipment</button>
        <button onClick={() => setTab("report")}>Report</button>
      </nav>
      <div>
        {tab === "layout" && <p>Layout configuration view...</p>}
        {tab === "equipment" && <p>Equipment configuration view...</p>}
        {tab === "report" && <p>Generate project reports here...</p>}
      </div>
    </div>
  );
}
