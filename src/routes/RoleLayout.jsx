import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const link = ({ isActive }) => ({
  padding: "6px 10px",
  borderRadius: 6,
  textDecoration: "none",
  color: isActive ? "#111" : "#444",
  background: isActive ? "#eee" : "transparent",
  border: "1px solid #ddd",
});

export default function RoleLayout() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>e-house-configurator</h1>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <NavLink to="/" style={link} end>Home</NavLink>
        <NavLink to="/engineer" style={link}>Engineer</NavLink>
        <NavLink to="/pmadmin" style={link}>PM/Admin</NavLink>
        <NavLink to="/client" style={link}>Client</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
