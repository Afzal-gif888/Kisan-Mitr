import { crops } from "../data/crops";
import { normalizeSoil } from "./normalizeSoil";

/**
 * 🚜 SMART CROP SCORING ENGINE (v17.0) - REAL APPLIED AGRICULTURE
 * -----------------------------------------------------------
 * STRICT 3-STEP PIPELINE: 
 * District (Possibility) -> Soil (Compatibility) -> Weather (Priority)
 */

export const getAPCropRecommendations = (
  weatherResult: any, 
  selectedSoil: string, 
  districtName: string, 
  language = "en"
) => {
  if (!weatherResult || !districtName) return { recommendedCrops: [], disclaimer: "" };

  // Determine local weather condition from NASA/Forecast data
  const { features } = weatherResult;
  const temp = parseFloat(features?.avgTemp || "28");
  const rain = parseFloat(features?.totalRain || "0");

  let weather = "normal";
  if (temp > 35) weather = "hot";
  else if (rain > 60) weather = "rainy";
  else if (rain < 10) weather = "dry";

  // To ensure the strict logic works safely with UI strings, we match non-case-sensitively.
  // We align the UI variables to the dataset format requirements.
  const checkDistrict = (c: any, dTarget: string) => c.districts.some((d: string) => d.toLowerCase() === dTarget.toLowerCase());
  const checkSoil = (c: any, sTarget: string) => c.soils.some((s: string) => s.toLowerCase() === sTarget.toLowerCase());

  // --- 🎯 STEP 1: DISTRICT FILTER ---
  const districtCrops = crops.filter(c => checkDistrict(c, districtName));

  // 🚨 CRITICAL FIX
  if (districtCrops.length === 0) {
    console.error("NO CROPS FOR DISTRICT:", districtName);
    return { recommendedCrops: [], disclaimer: "No crops mapped to this district yet." };
  }

  // --- 🎯 STEP 2: SOIL FILTER ---
  const normalizedSelectedSoil = normalizeSoil(selectedSoil);

  const soilFiltered = districtCrops.filter(crop =>
    crop.soils.some((soil: string) =>
      normalizeSoil(soil) === normalizedSelectedSoil
    )
  );

  // --- 🎯 STEP 3: WEATHER RANKING ---
  const ranked = soilFiltered.map(c => {
    let score = 0;

    if (c.weather.includes(weather)) score += 50;
    if (c.soils.some((soil: string) => normalizeSoil(soil) === normalizedSelectedSoil)) score += 30;
    if (checkDistrict(c, districtName)) score += 20;

    return { ...c, score, weatherTypeDetected: weather };
  });

  // --- 🎯 STEP 4: SORT + UNIQUE ---
  ranked.sort((a, b) => b.score - a.score);

  const unique = Array.from(
    new Map(ranked.map(c => [c.id, c])).values()
  ) as any[];

  // --- 🎯 STEP 5: FINAL OUTPUT (Limit) ---
  const finalResults = unique.slice(0, 12);

  // --- 🧪 DEBUG LOGGING ---
  console.log("----- SOIL DEBUG -----");
  console.log("Selected Soil:", selectedSoil);
  console.log("Normalized Selected Soil:", normalizedSelectedSoil);

  districtCrops.forEach(crop => {
    console.log(
      crop.name,
      "->",
      crop.soils,
      "-> normalized:",
      crop.soils.map((s: string) => normalizeSoil(s))
    );
  });

  console.log("District:", districtName);
  console.log("District crops:", districtCrops.length);
  console.log("Soil Filtered Count:", soilFiltered.length);

  // --- 🎯 UI STRUCTURAL MAPPING ---
  const results = finalResults.map((crop: any) => ({
      id: crop.id,
      // Protect UI if englishName/teluguName object structure missing in new dataset
      englishName: typeof crop.name === 'string' ? crop.name : crop.name?.en,
      teluguName: typeof crop.name === 'string' ? crop.name : crop.name?.te,
      score: crop.score,
      suitabilityLabel: crop.score >= 80 ? (language === "te" ? "⭐ అత్యంత ఉత్తమం" : "⭐ Highly Suitable") : 
                        crop.score >= 60 ? (language === "te" ? "✅ అనుకూలమైనది" : "✅ Suitable") : 
                                          (language === "te" ? "⚠️ జాగ్రత్త" : "⚠️ Try Carefully"),
      reason: language === "te" 
        ? `${selectedSoil} మరియు ${districtName} కు తగినది` 
        : `Ranked for ${selectedSoil} in ${districtName}`,
      waterNeed: crop.waterNeed || crop.details?.water,
      duration: crop.duration || crop.details?.duration || "100-120 days",
      districts: crop.districts,
      soils: crop.soils,
      weather: crop.weather
  }));

  return {
    recommendedCrops: results,
    disclaimer: language === "te" 
      ? "గమనిక: ఈ ఫలితాలు జిల్లా, నేల మరియు ప్రస్తుత వాతావరణం ఆధారంగా అంచనా వేయబడినవి." 
      : "Note: Results ranked by District, Soil, and live Weather trends.",
    weatherTypeDetected: weather,
    districtName
  };
};
