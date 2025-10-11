import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState({ role: "engineer", name: "Demo User" });

  return {
    user,
    login: (role) => setUser({ role, name: "Demo User" }),
    logout: () => setUser(null),
  };
}
