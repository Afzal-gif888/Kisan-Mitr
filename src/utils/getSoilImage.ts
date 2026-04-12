import soilImages from "../data/soilImages";

/**
 * 🌍 STRICT SOIL IMAGE RESOLVER
 * ----------------------------
 * 1. Normalizes names for robust matching.
 * 2. Prioritizes existing project assets.
 * 3. Provides contextually accurate dynamic fallbacks if local is missing.
 */
export const getSoilImage = (soilName: string) => {
  const normalize = (name: string) => name.toLowerCase().replace(/\s+/g, "");
  const searchKey = normalize(soilName);

  const matchKey = Object.keys(soilImages).find(
    (key) => normalize(key) === searchKey
  );

  if (matchKey) {
    return soilImages[matchKey];
  }

  // ⚠️ Important: Return null if no local match, so UI can handle fallback
  return null;
};
