import React, { useState } from "react";
import EngineerDashboard from "./components/EngineerDashboard";
import PMDashboard from "./components/PMDashboard";
import ClientDashboard from "./ClientDashboard";

export default function RoleRouter() {
  const [role, setRole] = useState("Engineer");

  return (
    <div>
      <h1>🏠 E-House Configurator Portal</h1>

      <label>Select a role to continue: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Engineer</option>
        <option>Project Manager</option>
        <option>Client</option>
      </select>

      {role === "Engineer" && <EngineerDashboard />}
      {role === "Project Manager" && <PMDashboard />}
      {role === "Client" && <ClientDashboard />}
    </div>
  );
}
