import React from "react";
import { usePersistentState } from "../hooks/usePersistentState";

export default function PMAdminDashboard() {
  const [config] = usePersistentState("config", {});
  return (
    <div style={{ maxWidth: 900 }}>
      <h2>PM/Admin Dashboard</h2>
      <p style={{ color: "#555" }}>Review configuration snapshot below.</p>
      <pre style={{ background: "#f8f8f8", padding: 12, borderRadius: 8, overflow: "auto" }}>
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
