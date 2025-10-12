import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistenceProvider } from "./src/state/PersistenceProvider";
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/e-house-configurator">
      <PersistenceProvider storagePrefix="ehouse-v1">
        <App />
      </PersistenceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
