import fs from "fs";
import path from "path";
import archiver from "archiver";
import puppeteer from "puppeteer";

// --- Docs to generate ---
const docs = [
  { name: "E-House Configurator – Release Notes", file: "release-notes.md" },
  { name: "E-House Configurator – Deployment Guide", file: "deployment-guide.md" },
  { name: "E-House Configurator – User Guide", file: "user-guide.md" },
  { name: "E-House Configurator – Quick Start Guide", file: "quick-start.md" },
  { name: "E-House Configurator – Training Deck", file: "training-deck.md" },
  { name: "E-House Configurator – Technical Architecture", file: "architecture.md" },
  { name: "E-House Configurator – Developer Onboarding Guide", file: "onboarding.md" }
];

const base = process.cwd();
const docsDir = path.join(base, "docs");
const outputZip = path.join(base, "e-house-configurator-package.zip");

// --- Ensure docs dir ---
fs.mkdirSync(docsDir, { recursive: true });

// --- Helper: Convert Markdown to PDF using Puppeteer ---
async function mdToPdf(inputPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const markdown = fs.readFileSync(inputPath, "utf-8");

  // Simple HTML wrapper for markdown
  await page.setContent(`
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; }
        h1,h2,h3 { color: #1a365d; }
        code, pre { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
      </style>
    </head>
    <body>
      <pre>${markdown.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
    </body>
    </html>
  `);

  await page.pdf({ path: outputPath, format: "A4" });
  await browser.close();
  console.log("📄 Generated PDF:", outputPath);
}

// --- Main Task ---
(async () => {
  console.log("📦 Generating PDFs...");

  for (const doc of docs) {
    const mdPath = path.join(docsDir, doc.file);
    const pdfPath = path.join(docsDir, doc.name + ".pdf");

    if (!fs.existsSync(mdPath)) {
      console.warn(`⚠️ Skipping missing file: ${doc.file}`);
      continue;
    }

    await mdToPdf(mdPath, pdfPath);
  }

  console.log("📦 Creating master package...");

  const output = fs.createWriteStream(outputZip);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(`✅ Package complete: ${archive.pointer()} bytes`);
    console.log(`➡️ Archive ready: ${outputZip}`);
  });

  archive.on("error", (err) => { throw err; });

  archive.pipe(output);

  // Add docs folder with PDFs
  archive.directory(docsDir, "docs");

  // Add source + backup
  if (fs.existsSync(path.join(base, "e-house-configurator"))) {
    archive.directory(path.join(base, "e-house-configurator"), "e-house-configurator");
  }
  if (fs.existsSync(path.join(base, "e-house-configurator-backup.zip"))) {
    archive.file(path.join(base, "e-house-configurator-backup.zip"), { name: "e-house-configurator-backup.zip" });
  }
  if (fs.existsSync(path.join(base, "build-and-backup.js"))) {
    archive.file(path.join(base, "build-and-backup.js"), { name: "build-and-backup.js" });
  }

  await archive.finalize();
})();
