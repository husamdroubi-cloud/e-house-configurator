import fs from "fs";
import path from "path";
import archiver from "archiver";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("✅ Wrote", filePath);
}

const base = path.join(process.cwd(), "e-house-configurator");
const publicDir = path.join(base, "public");

// --- Core files ---
writeFile(path.join(base, "package.json"), `{
  "name": "e-house-configurator",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.378.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "jspdf": "^2.5.1",
    "file-saver": "^2.0.5"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "vite": "^5.2.0"
  }
}`);

writeFile(path.join(base, "vite.config.js"), `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": "/src" } }
});`);

writeFile(path.join(base, "index.html"), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-House Configurator</title>
  </head>
  <body class="bg-gray-100">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);

writeFile(path.join(base, "postcss.config.js"), `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`);

writeFile(path.join(base, "tailwind.config.js"), `export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: []
};`);

// --- src entry ---
writeFile(path.join(base, "src/index.css"), `@tailwind base;
@tailwind components;
@tailwind utilities;
body { @apply bg-gray-100 text-gray-800; }`);

writeFile(path.join(base, "src/main.jsx"), `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);`);

writeFile(path.join(base, "src/App.jsx"), `import RoleRouter from "./RoleRouter";
import "./styles/typography.css";
import "./styles/responsive.css";
import "./styles/focusMode.css";
import "./styles/compliance.css";
import "./styles/DashboardLayout.css";
function App() { return <RoleRouter />; }
export default App;`);

// --- Copy logo ---
ensureDir(publicDir);
const logoSrc = path.join(process.cwd(), "logo.png");
const logoDest = path.join(publicDir, "logo.png");
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, logoDest);
  console.log("🖼️ Copied logo.png to public/");
} else {
  console.warn("⚠️ No logo.png found in current folder. Place your logo next to this script.");
}

// --- RoleRouter ---
writeFile(path.join(base, "src/RoleRouter.jsx"), `import { useState } from "react";
import EngineerDashboard from "./dashboards/EngineerDashboard";
import PMAdminDashboard from "./dashboards/PMAdminDashboard";
import ClientDashboard from "./dashboards/ClientDashboard";
import { Button } from "@/components/ui/button";

export default function RoleRouter() {
  const [role, setRole] = useState(null);

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <img src="/logo.png" alt="Braeden Logo" className="h-20 w-auto" />
        <h1 className="text-2xl font-bold">Select Role</h1>
        <div className="space-x-2">
          <Button onClick={() => setRole("engineer")}>👷 Engineer</Button>
          <Button onClick={() => setRole("pmadmin")}>📋 PM/Admin</Button>
          <Button onClick={() => setRole("client")}>👤 Client</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <span className="text-lg font-semibold">
          Active Role: {role === "engineer" ? "👷 Engineer" : role === "pmadmin" ? "📋 PM/Admin" : "👤 Client"}
        </span>
        <Button variant="outline" onClick={() => setRole(null)}>🔄 Switch Role</Button>
      </div>
      {role === "engineer" && <EngineerDashboard />}
      {role === "pmadmin" && <PMAdminDashboard />}
      {role === "client" && <ClientDashboard />}
    </div>
  );
}`);

// --- Styles ---
writeFile(path.join(base, "src/styles/DashboardLayout.css"), `
.dashboard-section { @apply bg-white p-4 rounded-2xl shadow-sm; }
.dashboard-heading { @apply text-xl font-semibold mb-2; }
`);
writeFile(path.join(base, "src/styles/focusMode.css"), `
.focus-dimmed { @apply relative; }
.focus-dimmed::after { content: ""; @apply absolute inset-0 bg-black bg-opacity-40 pointer-events-none transition-opacity; }
.focus-highlight { @apply ring-4 ring-green-400 animate-pulse; }
`);
writeFile(path.join(base, "src/styles/responsive.css"), `
.sidebar { @apply w-56 bg-white border-r p-4 space-y-2 hidden md:block; }
.sidebar-collapsed { @apply w-14 bg-white border-r p-2 block md:hidden; }
.card-grid { @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6; }
`);
writeFile(path.join(base, "src/styles/compliance.css"), `
.badge { @apply inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium; }
.badge-green { @apply bg-green-100 text-green-800; }
.badge-amber { @apply bg-amber-100 text-amber-800; }
.badge-red { @apply bg-red-100 text-red-800; }
`);
writeFile(path.join(base, "src/styles/typography.css"), `
.h1 { @apply text-3xl font-extrabold tracking-tight text-gray-900; }
.h2 { @apply text-2xl font-bold tracking-tight text-gray-800; }
.h3 { @apply text-xl font-semibold text-gray-700; }
.body-text { @apply text-base text-gray-700; }
.body-muted { @apply text-sm text-gray-500; }
`);
// --- Components ---
writeFile(path.join(base, "src/components/EquipmentCard.jsx"), `
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import "../styles/compliance.css";

export default function EquipmentCard({ eq, equipmentStyles = {}, complianceIssues = [], comments = {}, onClick }) {
  const specs = equipmentStyles[eq.name] || {};
  const eqId = eq.id || eq.name;

  const iconMap = {
    Transformer: "⚡",
    Switchgear: "🗄️",
    Generator: "🔋",
    "Motorized Generators": "🔋",
    "Fuel Cell": "🔬"
  };
  const icon = iconMap[eq.name] || "📦";

  const hasError = complianceIssues.some(i => i.equipmentId === eqId && i.type === "error");
  const hasWarning = complianceIssues.some(i => i.equipmentId === eqId && i.type === "warning");

  let badgeClass = "badge badge-green";
  let status = "Compliant";
  if (hasError) { badgeClass = "badge badge-red"; status = "Error"; }
  else if (hasWarning) { badgeClass = "badge badge-amber"; status = "Warning"; }

  const unresolvedCount = (comments[eqId] || []).filter(c => !c.resolved).length;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 cursor-pointer hover:shadow-lg transition" onClick={onClick}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{icon} {eq.name}</span>
                <span className={badgeClass}>{status}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {unresolvedCount > 0 && <span>📌 {unresolvedCount} comments</span>}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <pre className="text-xs max-w-xs whitespace-pre-wrap">{JSON.stringify(specs, null, 2)}</pre>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
`);

writeFile(path.join(base, "src/components/CommentSidebar.jsx"), `
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CommentSidebar({ equipmentId, comments = {}, setComments, role = "engineer" }) {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [showResolved, setShowResolved] = useState(false);

  if (!equipmentId) return null;
  const eqComments = comments[equipmentId] || [];

  const addComment = (text, parentId = null) => {
    if (!text.trim()) return;
    const newC = {
      id: Date.now().toString(),
      role,
      text,
      timestamp: new Date().toISOString(),
      resolved: false,
      parentId
    };
    setComments(prev => ({
      ...prev,
      [equipmentId]: [...(prev[equipmentId] || []), newC]
    }));
    setNewComment("");
    setReplyTo(null);
  };

  const toggleResolved = (id) => {
    setComments(prev => ({
      ...prev,
      [equipmentId]: prev[equipmentId].map(c => c.id === id ? { ...c, resolved: !c.resolved } : c)
    }));
  };

  const renderComment = (c, depth = 0) => (
    <div key={c.id} className={\`mb-2 pl-\${depth * 4}\`}>
      <div className="p-2 border rounded bg-gray-50 flex justify-between items-start">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm max-w-xs truncate">{c.text}</span>
            </TooltipTrigger>
            <TooltipContent><span className="text-xs">{c.text}</span></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-xs text-gray-500 ml-2">
          {c.role === "engineer" ? "👷 Engineer" : c.role === "pmadmin" ? "📋 PM/Admin" : "👤 Client"} – {new Date(c.timestamp).toLocaleString()}
        </span>
      </div>
      <div className="flex space-x-2 mt-1">
        {(role === "engineer" || role === "pmadmin") && (
          <Button size="xs" variant="outline" onClick={() => setReplyTo(c.id)}>Reply</Button>
        )}
        {(role === "engineer" || role === "pmadmin") && (
          <Button size="xs" variant={c.resolved ? "secondary" : "outline"} onClick={() => toggleResolved(c.id)}>
            {c.resolved ? "Reopen" : "Resolve"}
          </Button>
        )}
      </div>
      {eqComments.filter(r => r.parentId === c.id).map(r => renderComment(r, depth + 1))}
      {replyTo === c.id && (
        <div className="mt-2 flex space-x-2">
          <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Reply..." />
          <Button size="sm" onClick={() => addComment(newComment, c.id)}>Add</Button>
        </div>
      )}
    </div>
  );

  const topLevel = eqComments.filter(c => !c.parentId && (showResolved || !c.resolved));

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white border-l p-4 overflow-y-auto">
      <h3 className="text-lg font-bold mb-2">Comments for {equipmentId}</h3>
      {(role === "engineer" || role === "pmadmin") && (
        <Button size="sm" onClick={() => setShowResolved(!showResolved)}>
          {showResolved ? "Hide Resolved" : "Show Resolved"}
        </Button>
      )}
      <div className="mt-4 space-y-2">
        {topLevel.map(c => renderComment(c))}
      </div>
      {(role === "engineer" || role === "pmadmin") && (
        <div className="mt-4 flex space-x-2">
          <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." />
          <Button onClick={() => addComment(newComment)}>Add</Button>
        </div>
      )}
    </div>
  );
}
`);

writeFile(path.join(base, "src/components/SidebarNav.jsx"), `
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SidebarNav({ step, setStep }) {
  const steps = [
    { id: 1, label: "Project Setup" },
    { id: 2, label: "Equipment Selection" },
    { id: 3, label: "Layout Design" },
    { id: 4, label: "Compliance & Review" },
    { id: 5, label: "Export & Handoff" }
  ];

  return (
    <>
      <div className="sidebar">
        <h2 className="text-lg font-bold mb-4">Wizard</h2>
        {steps.map(s => (
          <Button
            key={s.id}
            variant={step === s.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setStep(s.id)}
          >
            {s.id}. {s.label}
          </Button>
        ))}
      </div>
      <div className="sidebar-collapsed">
        <Menu className="w-6 h-6" />
      </div>
    </>
  );
}
`);

writeFile(path.join(base, "src/components/TabsNav.jsx"), `
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="2d">2D View</TabsTrigger>
        <TabsTrigger value="3d">3D View</TabsTrigger>
        <TabsTrigger value="compliance">Compliance View</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
`);

writeFile(path.join(base, "src/components/Toolbar.jsx"), `
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FileDown, FileSpreadsheet, FileJson, Ruler, Package, Import } from "lucide-react";

export default function Toolbar({ onExportPDF, onExportBOM, onExportJSON, onExportDXF, onExportAll, onImport }) {
  return (
    <div className="flex justify-end space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default"><Package className="w-4 h-4 mr-2" /> Exports</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportPDF}><FileDown className="w-4 h-4 mr-2" /> Export PDF</DropdownMenuItem>
          <DropdownMenuItem onClick={onExportBOM}><FileSpreadsheet className="w-4 h-4 mr-2" /> Export BOM (CSV)</DropdownMenuItem>
          <DropdownMenuItem onClick={onExportJSON}><FileJson className="w-4 h-4 mr-2" /> Export Project (JSON)</DropdownMenuItem>
          <DropdownMenuItem onClick={onExportDXF}><Ruler className="w-4 h-4 mr-2" /> Export CAD (DXF)</DropdownMenuItem>
          <DropdownMenuItem onClick={onExportAll}><Package className="w-4 h-4 mr-2" /> Export All</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" onClick={onImport}><Import className="w-4 h-4 mr-2" /> Import Project</Button>
    </div>
  );
}
`);
// --- Dashboards ---
writeFile(path.join(base, "src/dashboards/EngineerDashboard.jsx"), `
import { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import TabsNav from "../components/TabsNav";
import Toolbar from "../components/Toolbar";
import EquipmentCard from "../components/EquipmentCard";
import CommentSidebar from "../components/CommentSidebar";
import { useSharedComments } from "../hooks/useSharedComments";
import { useVersionedDrafts } from "../hooks/useVersionedDrafts";
import { exportPDF, exportBOM, exportGLTF, exportDXF } from "../utils/exportUtils";
import "../styles/typography.css";
import "../styles/responsive.css";
import "../styles/focusMode.css";

export default function EngineerDashboard() {
  const [step, setStep] = useState(3);
  const [activeTab, setActiveTab] = useState("2d");
  const [focusMode, setFocusMode] = useState(false);
  const [highlighted, setHighlighted] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [equipmentStyles, setEquipmentStyles] = useState({});
  const [complianceIssues, setComplianceIssues] = useState([]);
  const [selectedEq, setSelectedEq] = useState(null);
  const [comments, setComments] = useSharedComments();
  const { saveDraft } = useVersionedDrafts();

  const highlightClass = (id) => highlighted === id ? "focus-highlight" : (focusMode ? "focus-dimmed" : "");

  const handleExportAll = () => {
    exportPDF(null, complianceIssues, equipmentStyles, { equipment }, comments);
    exportBOM(equipment, equipmentStyles, () => [0,0,0], comments, complianceIssues);
    exportGLTF(equipment, equipmentStyles, complianceIssues, () => [0,0,0], comments);
    exportDXF(equipment, equipmentStyles, complianceIssues, { w: 10, l: 20, h: 5 });
    saveDraft({ equipment, equipmentStyles, complianceIssues, comments }, true);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarNav step={step} setStep={setStep} />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="h1">Engineer Dashboard</h1>
          <Toolbar
            onExportPDF={() => exportPDF(null, complianceIssues, equipmentStyles, { equipment }, comments)}
            onExportBOM={() => exportBOM(equipment, equipmentStyles, () => [0,0,0], comments, complianceIssues)}
            onExportJSON={() => exportGLTF(equipment, equipmentStyles, complianceIssues, () => [0,0,0], comments)}
            onExportDXF={() => exportDXF(equipment, equipmentStyles, complianceIssues, { w: 10, l: 20, h: 5 })}
            onExportAll={handleExportAll}
            onImport={() => {}}
          />
        </div>
        {step === 3 && <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />}
        <div className={\`dashboard-section \${highlightClass("layout")}\`}>
          <h2 className="h2">Layout Editor</h2>
          <div className="card-grid">
            {equipment.map(eq => (
              <EquipmentCard
                key={eq.id || eq.name}
                eq={eq}
                equipmentStyles={equipmentStyles}
                complianceIssues={complianceIssues}
                comments={comments}
                onClick={() => setSelectedEq(eq.id || eq.name)}
              />
            ))}
          </div>
        </div>
        <div className={\`dashboard-section \${highlightClass("compliance")}\`}>
          <h2 className="h2">Compliance Overview</h2>
        </div>
        <CommentSidebar equipmentId={selectedEq} comments={comments} setComments={setComments} role="engineer" />
      </div>
    </div>
  );
}
`);

writeFile(path.join(base, "src/dashboards/PMAdminDashboard.jsx"), `
import { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import TabsNav from "../components/TabsNav";
import Toolbar from "../components/Toolbar";
import EquipmentCard from "../components/EquipmentCard";
import CommentSidebar from "../components/CommentSidebar";
import { useSharedComments } from "../hooks/useSharedComments";
import { useVersionedDrafts } from "../hooks/useVersionedDrafts";
import { exportPDF, exportBOM, exportGLTF, exportDXF } from "../utils/exportUtils";
import "../styles/typography.css";
import "../styles/responsive.css";
import "../styles/focusMode.css";

export default function PMAdminDashboard() {
  const [step, setStep] = useState(3);
  const [activeTab, setActiveTab] = useState("2d");
  const [focusMode, setFocusMode] = useState(false);
  const [highlighted, setHighlighted] = useState(null);
  const [selectedEq, setSelectedEq] = useState(null);
  const [comments, setComments] = useSharedComments();
  const [equipment, setEquipment] = useState([]);
  const [equipmentStyles, setEquipmentStyles] = useState({});
  const [complianceIssues, setComplianceIssues] = useState([]);
  const { saveDraft } = useVersionedDrafts();

  const highlightClass = (id) => highlighted === id ? "focus-highlight" : (focusMode ? "focus-dimmed" : "");

  const handleExportAll = () => {
    exportPDF(null, complianceIssues, equipmentStyles, { equipment }, comments);
    exportBOM(equipment, equipmentStyles, () => [0,0,0], comments, complianceIssues);
    exportGLTF(equipment, equipmentStyles, complianceIssues, () => [0,0,0], comments);
    exportDXF(equipment, equipmentStyles, complianceIssues, { w: 10, l: 20, h: 5 });
    saveDraft({ equipment, equipmentStyles, complianceIssues, comments }, true);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarNav step={step} setStep={setStep} />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="h1">PM/Admin Dashboard</h1>
          <Toolbar
            onExportPDF={() => exportPDF(null, complianceIssues, equipmentStyles, { equipment }, comments)}
            onExportBOM={() => exportBOM(equipment, equipmentStyles, () => [0,0,0], comments, complianceIssues)}
            onExportJSON={() => exportGLTF(equipment, equipmentStyles, complianceIssues, () => [0,0,0], comments)}
            onExportDXF={() => exportDXF(equipment, equipmentStyles, complianceIssues, { w: 10, l: 20, h: 5 })}
            onExportAll={handleExportAll}
            onImport={() => {}}
          />
        </div>
        {step === 3 && <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />}
        <div className={\`dashboard-section \${highlightClass("project")}\`}>
          <h2 className="h2">Project Details</h2>
          <div className="card-grid">
            {Object.keys(comments).map(eqId => (
              <EquipmentCard
                key={eqId}
                eq={{ id: eqId, name: eqId }}
                equipmentStyles={equipmentStyles}
                complianceIssues={complianceIssues}
                comments={comments}
                onClick={() => setSelectedEq(eqId)}
              />
            ))}
          </div>
        </div>
        <CommentSidebar equipmentId={selectedEq} comments={comments} setComments={setComments} role="pmadmin" />
      </div>
    </div>
  );
}
`);

writeFile(path.join(base, "src/dashboards/ClientDashboard.jsx"), `
import { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "../styles/typography.css";
import "../styles/responsive.css";
import "../styles/focusMode.css";

export default function ClientDashboard({ equipment = [] }) {
  const [step, setStep] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [highlighted, setHighlighted] = useState(null);

  const highlightClass = (id) => highlighted === id ? "focus-highlight" : (focusMode ? "focus-dimmed" : "");

  const iconMap = {
    Transformer: "⚡",
    Switchgear: "🗄️",
    Generator: "🔋",
    "Motorized Generators": "🔋",
    "Fuel Cell": "🔬"
  };

  return (
    <div className="flex min-h-screen">
      <SidebarNav step={step} setStep={setStep} />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="h1">Client Dashboard</h1>
        <div id="overview-section" className={\`dashboard-section \${highlightClass("overview")}\`}>
          <h2 className="h2">Project Overview</h2>
          <div className="card-grid">
            {equipment.map(eq => (
              <Card key={eq.id || eq.name} className="p-4">
                <CardHeader>
                  <CardTitle>{iconMap[eq.name] || "📦"} {eq.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>Equipment details here</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`);
// --- Hooks ---
writeFile(path.join(base, "src/hooks/useSharedComments.js"), `
import { useEffect, useState } from "react";

// A shared comments store that syncs automatically between tabs/users
export function useSharedComments() {
  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem("shared-comments");
    return stored ? JSON.parse(stored) : {};
  });

  // Save to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem("shared-comments", JSON.stringify(comments));
    window.dispatchEvent(new Event("comments-updated"));
  }, [comments]);

  // Listen for external changes (sync across browser tabs)
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("shared-comments");
      if (stored) setComments(JSON.parse(stored));
    };
    window.addEventListener("comments-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("comments-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return [comments, setComments];
}
`);

writeFile(path.join(base, "src/hooks/useVersionedDrafts.js"), `
import { useEffect, useState } from "react";

// Hook to manage versioned project drafts (Engineer-only feature)
export function useVersionedDrafts() {
  const [versions, setVersions] = useState(() => {
    const stored = localStorage.getItem("project-versions");
    return stored ? JSON.parse(stored) : [];
  });

  const saveDraft = (data, auto = false) => {
    const timestamp = new Date().toISOString();
    const version = { id: timestamp, data, auto };
    let updated = [version, ...versions];
    // keep only 10 versions max
    updated = updated.slice(0, 10);
    setVersions(updated);
    localStorage.setItem("project-versions", JSON.stringify(updated));
  };

  const restoreDraft = (id) => {
    const v = versions.find(v => v.id === id);
    return v ? v.data : null;
  };

  useEffect(() => {
    localStorage.setItem("project-versions", JSON.stringify(versions));
  }, [versions]);

  return { versions, saveDraft, restoreDraft };
}
`);
// --- Utils ---
writeFile(path.join(base, "src/utils/exportUtils.js"), `
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

// PDF Export with logo + metadata
export function exportPDF(canvasRef, complianceIssues, equipmentStyles, projectData, comments) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Logo + company info
  const logo = "/logo.png";
  try {
    doc.addImage(logo, "PNG", 10, 10, 40, 20);
  } catch (e) {
    console.warn("⚠️ Could not embed logo, ensure logo.png is accessible.");
  }
  doc.setFontSize(12);
  doc.text("Braeden Inc.", pageWidth - 60, 20);
  doc.text("www.braeden.com", pageWidth - 60, 28);

  // Contact info (first page only)
  doc.setFontSize(10);
  doc.text("Contact: Husam Droubi, SME", 10, 45);
  doc.text("5650 Guhn Rd Suite 118, Houston, TX 77040 USA", 10, 52);
  doc.text("(469)343-6287 (C)", 10, 59);
  doc.text("hadroubi@braeden.com", 10, 66);

  // Compliance summary
  doc.setFontSize(14);
  doc.text("Compliance Report", 10, 85);
  complianceIssues.forEach((issue, i) => {
    doc.setFontSize(10);
    doc.text(\`\${i+1}. [\${issue.type.toUpperCase()}] \${issue.message}\`, 10, 95 + i*7);
  });

  doc.save("compliance-report.pdf");
}

// BOM / CSV Export
export function exportBOM(equipment, equipmentStyles, getPosition, comments, complianceIssues) {
  let rows = ["Name,Width,Length,Height,X,Y,Z,Has Comments,Compliant"];
  equipment.forEach(eq => {
    const style = equipmentStyles[eq.name] || {};
    const [x,y,z] = getPosition(eq);
    const hasComments = (comments[eq.id || eq.name] || []).length > 0 ? "Yes" : "No";
    const hasError = complianceIssues.some(i => i.equipmentId === (eq.id || eq.name) && i.type === "error");
    const compliant = hasError ? "No" : "Yes";
    rows.push(\`\${eq.name},\${style.w||0},\${style.l||0},\${style.h||0},\${x},\${y},\${z},\${hasComments},\${compliant}\`);
  });
  const blob = new Blob([rows.join("\\n")], { type: "text/csv;charset=utf-8" });
  saveAs(blob, "bom.csv");
}

// JSON (GLTF-like) Export
export function exportGLTF(equipment, equipmentStyles, complianceIssues, getPosition, comments) {
  const data = equipment.map(eq => ({
    id: eq.id || eq.name,
    name: eq.name,
    style: equipmentStyles[eq.name] || {},
    position: getPosition(eq),
    comments: comments[eq.id || eq.name] || [],
    compliance: complianceIssues.filter(i => i.equipmentId === (eq.id || eq.name))
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  saveAs(blob, "project.json");
}

// DXF Export (simplified placeholder)
export function exportDXF(equipment, equipmentStyles, complianceIssues, container) {
  let dxf = "0\\nSECTION\\n2\\nHEADER\\n0\\nENDSEC\\n0\\nSECTION\\n2\\nTABLES\\n0\\nENDSEC\\n0\\nSECTION\\n2\\nBLOCKS\\n0\\nENDSEC\\n0\\nSECTION\\n2\\nENTITIES\\n";
  equipment.forEach(eq => {
    dxf += \`0\\n3DFACE\\n8\\n0\\n10\\n0\\n20\\n0\\n30\\n0\\n\`; // minimal placeholder
  });
  dxf += "0\\nENDSEC\\n0\\nEOF";
  const blob = new Blob([dxf], { type: "application/dxf" });
  saveAs(blob, "layout.dxf");
}
`);
// --- Create zip archive ---
const outputZip = path.join(process.cwd(), "e-house-configurator-backup.zip");
const output = fs.createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`📦 Backup complete: ${archive.pointer()} bytes`);
  console.log(`➡️ Archive ready at: ${outputZip}`);
});

archive.on("error", (err) => { throw err; });

archive.pipe(output);
archive.directory(base, false);
archive.finalize();
