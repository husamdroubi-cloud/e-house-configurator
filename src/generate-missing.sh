#!/bin/bash

# --- COMPONENTS ---

cat << 'EOF' > components/SidebarNav.jsx
import React from "react";

export default function SidebarNav() {
  return (
    <aside style={{ width: "200px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Navigation</h3>
      <ul>
        <li><a href="#">Layout</a></li>
        <li><a href="#">Equipment</a></li>
        <li><a href="#">Reports</a></li>
      </ul>
    </aside>
  );
}
EOF

cat << 'EOF' > components/TabsNav.jsx
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
EOF

cat << 'EOF' > components/Toolbar.jsx
import React from "react";

export default function Toolbar() {
  return (
    <div style={{ marginTop: "20px" }}>
      <button>💾 Save</button>
      <button>📤 Export</button>
      <button>⚙️ Settings</button>
    </div>
  );
}
EOF

cat << 'EOF' > components/CommentSidebar.jsx
import React from "react";

export default function CommentSidebar() {
  return (
    <aside style={{ width: "250px", background: "#fafafa", padding: "10px" }}>
      <h3>💬 Comments</h3>
      <ul>
        <li>Engineer: Added new generator.</li>
        <li>PM: Please check compliance docs.</li>
        <li>Client: Can we move the entrance?</li>
      </ul>
    </aside>
  );
}
EOF

# --- HOOKS ---

cat << 'EOF' > hooks/useAuth.js
import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState({ role: "engineer", name: "Demo User" });

  return {
    user,
    login: (role) => setUser({ role, name: "Demo User" }),
    logout: () => setUser(null),
  };
}
EOF

cat << 'EOF' > hooks/useConfig.js
import { useState } from "react";

export default function useConfig() {
  const [config, setConfig] = useState({
    layout: {},
    equipment: [],
  });

  return {
    config,
    updateLayout: (layout) => setConfig((c) => ({ ...c, layout })),
    addEquipment: (item) =>
      setConfig((c) => ({ ...c, equipment: [...c.equipment, item] })),
  };
}
EOF

# --- UTILS ---

cat << 'EOF' > utils/api.js
export function fetchProject() {
  return Promise.resolve({
    id: 1,
    name: "Pilot E-House Project",
    status: "In Progress",
  });
}

export function saveProject(data) {
  console.log("Saving project...", data);
  return Promise.resolve({ success: true });
}
EOF

cat << 'EOF' > utils/validators.js
export function validateLayout(layout) {
  if (!layout || Object.keys(layout).length === 0) {
    return "Layout cannot be empty";
  }
  return null;
}

export function validateEquipment(equipment) {
  if (!equipment || equipment.length === 0) {
    return "At least one equipment item is required";
  }
  return null;
}
EOF
