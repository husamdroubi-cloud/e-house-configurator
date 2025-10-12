import React, { createContext, useContext, useMemo } from "react";

const PersistenceContext = createContext({ prefix: "ehouse" });

export function PersistenceProvider({ storagePrefix = "ehouse-v1", children }) {
  const value = useMemo(() => ({ prefix: storagePrefix }), [storagePrefix]);
  return <PersistenceContext.Provider value={value}>{children}</PersistenceContext.Provider>;
}

export function usePersistencePrefix() {
  return useContext(PersistenceContext).prefix || "ehouse-v1";
}
