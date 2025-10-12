import { Routes, Route, Link, Navigate } from "react-router-dom";
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
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>e-house-configurator</h1>
      <nav style={{marginBottom:12}}><Link to="/">Home</Link></nav>
      <div style={{ display: "grid", gap: 16, maxWidth: 800 }}>
        <ConfigEditor config={config} onChange={setConfig} />
        <ExportButtons config={config} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
