import React from "react";
import SidebarNav from "./components/SidebarNav";
import CommentSidebar from "./components/CommentSidebar";

export default function ClientDashboard() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar */}
      <SidebarNav />

      {/* Main content */}
      <main style={{ flex: 1 }}>
        <h2>Client Dashboard</h2>
        <p>
          Welcome! Here you can review the latest project layouts, equipment lists, and reports
          shared by the engineers and project managers.
        </p>
      </main>

      {/* Comments sidebar */}
      <CommentSidebar />
    </div>
  );
}
