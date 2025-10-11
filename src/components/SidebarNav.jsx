import React from "react";

export default function SidebarNav() {
  return (
    <aside style={{ width: "200px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Navigation</h3>
      <ul>
        <li><a href="#">Layout</a></li>
        <li><a href="#">Equipment</a></li>
        <li><a href="#">Reports</a></li>
      </ul>
    </aside>
  );
}
