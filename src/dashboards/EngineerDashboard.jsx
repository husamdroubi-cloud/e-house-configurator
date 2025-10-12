import React from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import ConfigEditor from "../components/ConfigEditor";
import ExportButtons from "../components/ExportButtons";

const DEFAULT_CONFIG = {
  categories: {
    Generators: {
      "Diesel Generators": [
        { id: "gen-1", manufacturerPN: "GEN-1000", rating: "1000 kW", price: 123456.78, notes: "Initial default item" }
      ]
    }
  }
};

export default function EngineerDashboard() {
  const [config, setConfig] = usePersistentState("config", DEFAULT_CONFIG);
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
      <ConfigEditor config={config} onChange={setConfig} />
      <ExportButtons config={config} />
    </div>
  );
}
