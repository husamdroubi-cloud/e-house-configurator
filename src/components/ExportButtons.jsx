import React from "react";
import { exportCSVFromConfig, exportJSON } from "../utils/exporters";

export default function ExportButtons({ config }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => exportJSON(config)} style={btn}>Export JSON</button>
      <button onClick={() => exportCSVFromConfig(config)} style={btn}>Export CSV</button>
    </div>
  );
}

const btn = { padding: "8px 12px", borderRadius: 6, border: "1px solid #bbb", background: "#f8f8f8", cursor: "pointer" };
