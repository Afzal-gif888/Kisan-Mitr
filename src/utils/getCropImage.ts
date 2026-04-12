import cropImages from "../data/cropImages";

/**
 * 🚜 STRICT CROP IMAGE RESOLVER (v3.0)
 * ----------------------------
 * 1. Enforces strict ID-based mapping.
 * 2. Returns null for missing mappings to prevent silent wheat/fallback replication.
 * 3. Incorporates diagnostic audit logs.
 */
export const getCropImage = (cropId: string) => {
  if (!cropId) return null;
  
  const img = cropImages[cropId];

  if (!img) {
    console.error("❌ [CRITICAL] Missing image mapping for crop ID:", cropId);
    return null; // Return null so UI can handle error/placeholder explicitly
  }

  return img;
};
