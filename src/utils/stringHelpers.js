// src/utils/stringHelpers.js
export function isSimilarName(name, existingNames) {
  const normalize = (s) => s.trim().toLowerCase();

  const target = normalize(name);

  for (const existing of existingNames) {
    const ex = normalize(existing);

    // Case-insensitive exact match
    if (ex === target) {
      return { match: true, reason: "exact match" };
    }

    // Singular/plural detection
    if (ex.replace(/s$/, "") === target.replace(/s$/, "")) {
      return { match: true, reason: "singular/plural match" };
    }

    // Substring detection (e.g. "Generator" vs "Diesel Generator")
    if (ex.includes(target) || target.includes(ex)) {
      return { match: true, reason: "very similar" };
    }
  }

  return { match: false };
}
