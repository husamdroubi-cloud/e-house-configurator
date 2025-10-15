# E-House Configurator — Resume Point (Checkpoint)

**Date:** $(date)  
**Branch:** main  
**Hosting (GH Pages):** https://husamdroubi-cloud.github.io/e-house-configurator/

## What’s Working
- Vite + React app renders under subpath `/e-house-configurator/`.
- `BrowserRouter` with `basename="/e-house-configurator"` is configured in `main.jsx`.
- Persistence via localStorage using `PersistenceProvider` + `usePersistentState`.
- Config editor with basic fields (PN, Rating, Price, Notes).
- Export to JSON and CSV works.
- GitHub Pages deployed (ensure `vite.config.js` has `base: '/e-house-configurator/'` and `404.html` copies from `index.html`).

## Key Files
- **Entry**
  - `index.html` → `<script type="module" src="/main.jsx">`
  - `main.jsx` → wraps `<BrowserRouter basename="/e-house-configurator"><PersistenceProvider><App/></…>`
  - `vite.config.js` → `base: '/e-house-configurator/'`
- **App + Routes**
  - `App.jsx` → `Routes` inside role layout
  - `src/routes/RoleLayout.jsx` → top tabs: Home / Engineer / PM/Admin / Client
- **Dashboards**
  - `src/dashboards/EngineerDashboard.jsx`
  - `src/dashboards/PMAdminDashboard.jsx`
  - `src/dashboards/ClientDashboard.jsx`
- **Persistence & UI**
  - `src/state/PersistenceProvider.jsx`
  - `src/hooks/usePersistentState.js`
  - `src/components/ConfigEditor.jsx`
  - `src/components/ExportButtons.jsx`
  - `src/utils/exporters.js`

## Local Dev
```bash
cd ~/e-house-configurator-repo
npm install
npm run dev
# open: http://localhost:5173/e-house-configurator/

npm run build
# Make sure SPA fallback exists:
cp dist/index.html dist/404.html
# Deploy (needs "predeploy"/"deploy" scripts or use npx):
npm run deploy
# or
npx gh-pages -d dist

