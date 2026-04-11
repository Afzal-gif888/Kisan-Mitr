import cropsMaster from "../data/apCropsDataset.json";

/**
 * ══════════════════════════════════════════════════════════════
 *  SMART CROP SCORING ENGINE (v15.0) - ACCURACY STABILIZATION
 * ══════════════════════════════════════════════════════════════
 *  Resolves the "No Results" issue by enforcing absolute normalization
 *  across both the user inputs and the 40+ crop master dataset.
 */

export const getAPCropRecommendations = (weatherResult: any, selectedSoil: string, districtName: string, language = "en") => {
  if (!weatherResult || !districtName) return { recommendedCrops: [], disclaimer: "" };

  // --- 🔧 STEP 1: NORMALIZE INPUTS ---
  const normalize = (value: string) => value.toLowerCase().trim().replace(/\s+district$/i, "");
  
  const district = normalize(districtName);
  const soil = normalize(selectedSoil);

  // --- 🔧 STEP 2: NORMALIZE DATASET AT RUNTIME ---
  const normalizedCrops = cropsMaster.map((crop: any) => ({
    ...crop,
    normalizedDistricts: crop.districts.map(normalize),
    normalizedSoils: crop.soils.map(normalize)
  }));

  // --- 🔧 STEP 3: DISTRICT FILTER (DEBUG FIRST) ---
  const districtFiltered = normalizedCrops.filter(crop =>
    crop.normalizedDistricts.some(d => district.includes(d) || d.includes(district))
  );

  // --- 🔧 STEP 4: SOIL FILTER ---
  const soilFiltered = districtFiltered.filter(crop =>
    crop.normalizedSoils.some(s => soil.includes(s) || s.includes(soil))
  );

  // --- 🔧 STEP 6: FAILSAFE DEBUG ---
  if (districtFiltered.length === 0) {
    console.error("❌ BIO-MAPPING ERROR: DISTRICT NOT MATCHING DATASET", { input: district });
  }
  if (soilFiltered.length === 0) {
    console.error("❌ BIO-MAPPING ERROR: SOIL NOT MATCHING DATASET", { input: soil });
  }

  const { features } = weatherResult;
  const temp = parseFloat(features?.avgTemp || "28");
  const rain = parseFloat(features?.totalRain || "0");

  let weatherType = "normal";
  if (temp > 35) weatherType = "hot";
  else if (rain > 60) weatherType = "rainy";
  else if (rain < 10) weatherType = "dry";

  const results = soilFiltered.map((crop: any) => {
    let score = 80; // Base score for passing both mandatory gates

    if (crop.weather.includes(weatherType)) score += 20;
    else score += 5;

    return {
      id: crop.id,
      englishName: crop.name.en,
      teluguName: crop.name.te,
      score,
      suitabilityLabel: score >= 95 ? (language === "te" ? "⭐ అత్యంత ఉత్తమం" : "⭐ Best") : 
                        score >= 80 ? (language === "te" ? "✅ అనుకూలమైనది" : "✅ Suitable") : 
                                      (language === "te" ? "⚠️ జాగ్రత్త" : "⚠️ Try Carefully"),
      reason: language === "te" 
        ? `${selectedSoil} కు అత్యంత అనువైనది` 
        : `Perfectly matches ${selectedSoil} properties`,
      waterNeed: crop.details.water,
      heatTolerance: weatherType
    };
  }).sort((a, b) => b.score - a.score);

  // --- 🧪 STEP 8: FINAL TRACE ---
  console.log("--- 🕵️ BIO-MAPPING REGISTRY TRACE ---", {
    input_district: district,
    input_soil: soil,
    district_matches: districtFiltered.length,
    soil_matches: soilFiltered.length,
    final_output: results.map(c => c.englishName)
  });

  return {
    recommendedCrops: results,
    disclaimer: language === "te" ? "జిల్లా మరియు నేల రకం ఆధారంగా." : "Strictly filtered by district and soil type.",
    weatherTypeDetected: weatherType,
    districtName
  };
};
