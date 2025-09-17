import fs from "fs";
import path from "path";
import archiver from "archiver";
import puppeteer from "puppeteer";
import { execSync } from "child_process";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("✅ Wrote", filePath);
}

const base = path.join(process.cwd(), "e-house-configurator-package");
const docsDir = path.join(base, "docs");
const appDir = path.join(base, "e-house-configurator");
const backupZip = path.join(base, "e-house-configurator-backup.zip");

// --- Step 1: Docs (FULL CONTENT from previous step) ---
const docs = {
  "release-notes.md": `# 📦 E-House Configurator – Release Notes
v1.0.0 – Initial Production Release
... full notes ...`,
  "deployment-guide.md": `# 🚀 E-House Configurator – Deployment Guide
...`,
  "user-guide.md": `# 👥 E-House Configurator – User Guide
...`,
  "quick-start.md": `# ⚡ E-House Configurator – Quick Start Guide
...`,
  "training-deck.md": `# 📊 E-House Configurator – Training Deck
...`,
  "architecture.md": `# 🏗️ Technical Architecture
...`,
  "onboarding.md": `# 👨‍💻 Developer Onboarding
...`
};

// --- Step 2: Fresh build-and-backup.js (with Vite configs) ---
const buildAndBackupCode = `
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const projectDir = path.join(process.cwd(), "e-house-configurator");
const outputZip = path.join(process.cwd(), "e-house-configurator-backup.zip");

// Ensure dir
fs.mkdirSync(projectDir, { recursive: true });

// --- Write Vite scaffold ---
fs.mkdirSync(path.join(projectDir, "src"), { recursive: true });

// App.jsx
fs.writeFileSync(path.join(projectDir, "src", "App.jsx"), \`
import React from 'react';
export default function App() {
  return <h1>Hello from fresh E-House Configurator 🚀</h1>;
}
\`);

// main.jsx
fs.writeFileSync(path.join(projectDir, "src", "main.jsx"), \`
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
\`);

// index.html
fs.writeFileSync(path.join(projectDir, "index.html"), \`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-House Configurator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
\`);

// vite.config.js
fs.writeFileSync(path.join(projectDir, "vite.config.js"), \`
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
\`);

// package.json
fs.writeFileSync(path.join(projectDir, "package.json"), JSON.stringify({
  name: "e-house-configurator",
  version: "1.0.0",
  private: true,
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview"
  },
  dependencies: {
    react: "^18.0.0",
    "react-dom": "^18.0.0"
  },
  devDependencies: {
    vite: "^4.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}, null, 2));

// --- Create backup zip ---
const output = fs.createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });
archive.pipe(output);
archive.directory(projectDir, "e-house-configurator");
archive.finalize().then(() => {
  console.log("✅ Backup created:", outputZip);
});
`;

// --- Step 3: Write docs + readme + build-and-backup.js ---
ensureDir(docsDir);
for (const [file, content] of Object.entries(docs)) {
  writeFile(path.join(docsDir, file), content);
}
writeFile(path.join(base, "README.md"), `# 📦 E-House Configurator Package
Fresh scaffold with docs, app, Vite configs, and backup.`);
writeFile(path.join(base, "build-and-backup.js"), buildAndBackupCode);

// --- Step 4: Run build-and-backup.js to scaffold app + zip ---
console.log("⚙️ Running fresh build-and-backup.js...");
execSync(`node ${path.join(base, "build-and-backup.js")}`, { stdio: "inherit" });

// --- Step 5: PDF Generator ---
async function mdToPdf(inputPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const markdown = fs.readFileSync(inputPath, "utf-8");
  await page.setContent(\`
    <html><head><style>
    body { font-family: Arial, sans-serif; padding: 2rem; line-height: 1.5; }
    h1,h2,h3 { color: #1a365d; }
    pre,code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
    </style></head><body>
    <pre>\${markdown.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
    </body></html>
  \`);
  await page.pdf({ path: outputPath, format: "A4" });
  await browser.close();
  console.log("📄 PDF created:", outputPath);
}

(async () => {
  console.log("📦 Generating PDFs...");
  for (const [file] of Object.entries(docs)) {
    const mdPath = path.join(docsDir, file);
    const pdfPath = path.join(docsDir, file.replace(".md", ".pdf"));
    await mdToPdf(mdPath, pdfPath);
  }

  console.log("📦 Creating master package...");
  const outputZip = path.join(base, "e-house-configurator-package.zip");
  const output = fs.createWriteStream(outputZip);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(output);

  archive.directory(docsDir, "docs");
  archive.directory(appDir, "e-house-configurator");
  archive.file(backupZip, { name: "e-house-configurator-backup.zip" });
  archive.file(path.join(base, "build-and-backup.js"), { name: "build-and-backup.js" });

  await archive.finalize();
  console.log("✅ Master package ready:", outputZip);
})();
