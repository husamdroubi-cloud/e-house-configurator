import React from "react";
import { usePersistentState } from "../hooks/usePersistentState";

function extractRows(config) {
  const cats = config?.categories || {};
  const firstGroup = Object.values(cats)[0] || {};
  const list = Object.values(firstGroup)[0];
  return Array.isArray(list) ? list : [];
}

export default function ClientDashboard() {
  const [config] = usePersistentState("config", {});
  const rows = extractRows(config);

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Client View</h2>
      {rows.length === 0 ? (
        <p style={{ color: "#555" }}>No items yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Manufacturer PN</th>
              <th style={th}>Rating</th>
              <th style={th}>Price</th>
              <th style={th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id || r.manufacturerPN}>
                <td style={td}>{r.manufacturerPN}</td>
                <td style={td}>{r.rating}</td>
                <td style={td}>{r.price}</td>
                <td style={td}>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px 6px" };
const td = { borderBottom: "1px solid #eee", padding: "8px 6px", color: "#333" };
