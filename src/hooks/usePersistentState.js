import { useEffect, useState } from "react";
import { usePersistencePrefix } from "../state/PersistenceProvider";

export function usePersistentState(key, defaultValue) {
  const prefix = usePersistencePrefix();
  const namespaced = `${prefix}:${key}`;

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(namespaced);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(namespaced, JSON.stringify(state));
    } catch {}
  }, [namespaced, state]);

  return [state, setState];
}
