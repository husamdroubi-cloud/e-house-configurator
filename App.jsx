import React from "react";
import { Routes, Route } from "react-router-dom";
import RoleLayout from "./src/routes/RoleLayout";
import EngineerDashboard from "./src/dashboards/EngineerDashboard";
import PMAdminDashboard from "./src/dashboards/PMAdminDashboard";
import ClientDashboard from "./src/dashboards/ClientDashboard";
import { usePersistentState } from "./src/hooks/usePersistentState";
import ConfigEditor from "./src/components/ConfigEditor";
import ExportButtons from "./src/components/ExportButtons";

const DEFAULT_CONFIG = {
  categories: {
    Generators: {
      "Diesel Generators": [
        { id: "gen-1", manufacturerPN: "GEN-1000", rating: "1000 kW", price: 123456.78, notes: "Initial default item" }
      ]
    }
  }
};

function Home() {
  const [config, setConfig] = usePersistentState("config", DEFAULT_CONFIG);
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
      <ConfigEditor config={config} onChange={setConfig} />
      <ExportButtons config={config} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<RoleLayout />}>
        <Route index element={<Home />} />
        <Route path="engineer" element={<EngineerDashboard />} />
        <Route path="pmadmin" element={<PMAdminDashboard />} />
        <Route path="client" element={<ClientDashboard />} />
      </Route>
    </Routes>
  );
}
