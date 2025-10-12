export function downloadBlob(filename, text, type = "application/octet-stream") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportJSON(obj, filename = "config.json") {
  downloadBlob(filename, JSON.stringify(obj, null, 2), "application/json");
}

export function exportCSVFromConfig(config, filename = "config.csv") {
  const rows = inferRows(config);
  if (!rows.length) return downloadBlob(filename, "", "text/csv");

  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach(k => set.add(k));
      return set;
    }, new Set())
  );
  const escape = (v) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map(r => headers.map(h => escape(r[h])).join(",")),
  ];
  downloadBlob(filename, lines.join("\n"), "text/csv");
}

function inferRows(config) {
  try {
    const categories = config?.categories || {};
    const firstGroup = Object.values(categories)[0] || {};
    const firstArray = Object.values(firstGroup)[0];
    if (Array.isArray(firstArray)) return firstArray;
  } catch {}
  if (Array.isArray(config)) return config;
  return [];
}
