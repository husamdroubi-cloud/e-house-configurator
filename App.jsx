cat > App.jsx <<'EOF'
import React from "react";
import { usePersistentState } from "./src/hooks/usePersistentState";
import ConfigEditor from "./src/components/ConfigEditor";
import ExportButtons from "./src/components/ExportButtons";

export default function App() {
  // --- Step 2: persistent state setup ---
  const initialConfig = {
    categories: {
      Generators: {
        "Diesel Generators": [
          {
            manufacturerPN: "DG-100",
            manufacturer: "Caterpillar",
            braedenPN: "BR-001",
            price: 50000,
            rating: "100kVA",
            notes: "Standard backup generator",
          },
        ],
      },
    },
  };

  const [config, setConfig] = usePersistentState(
    "engineer-config",
    initialConfig
  );

  // --- Step 3: render with editor + export ---
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "24px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>E-House Configurator Portal</h1>

      <div
        style={{
          padding: 12,
          margin: "12px 0",
          border: "1px solid #e5e5e5",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>Engineer Dashboard</h2>
          <ExportButtons config={config} />
        </div>

        <ConfigEditor config={config} onChange={setConfig} />
      </div>

      <pre
        style={{
          background: "#f6f6f6",
          padding: 12,
          borderRadius: 6,
          fontSize: 13,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
EOF
