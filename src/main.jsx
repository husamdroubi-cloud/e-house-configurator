import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PersistenceProvider } from "./state/PersistenceProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistenceProvider storagePrefix="ehouse-v1">
      <App />
    </PersistenceProvider>
  </React.StrictMode>
);
