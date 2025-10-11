import React from "react";

export default function CommentSidebar() {
  return (
    <aside style={{ width: "250px", background: "#fafafa", padding: "10px" }}>
      <h3>💬 Comments</h3>
      <ul>
        <li>Engineer: Added new generator.</li>
        <li>PM: Please check compliance docs.</li>
        <li>Client: Can we move the entrance?</li>
      </ul>
    </aside>
  );
}
