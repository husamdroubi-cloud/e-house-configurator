import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState("home");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>⚡ E-House</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <button onClick={() => setStep("home")} style={navBtnStyle}>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => setStep("layout")} style={navBtnStyle}>
                Layout
              </button>
            </li>
            <li>
              <button onClick={() => setStep("equipment")} style={navBtnStyle}>
                Equipment
              </button>
            </li>
            <li>
              <button onClick={() => setStep("summary")} style={navBtnStyle}>
                Summary
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px" }}>
        {step === "home" && (
          <div>
            <h1>🏠 Welcome to E-House Configurator</h1>
            <p>Use the sidebar to start configuring your e-house.</p>
          </div>
        )}

        {step === "layout" && (
          <div>
            <h1>📐 Layout Configuration</h1>
            <p>Define the structure and layout of your E-House.</p>
          </div>
        )}

        {step === "equipment" && (
          <div>
            <h1>🔌 Equipment Selection</h1>
            <p>Choose the equipment and systems for your E-House.</p>
          </div>
        )}

        {step === "summary" && (
          <div>
            <h1>📊 Summary</h1>
            <p>Review your configuration before saving/exporting.</p>
          </div>
        )}
      </main>
    </div>
  );
}

const navBtnStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px",
  marginBottom: "5px",
  background: "none",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
};
