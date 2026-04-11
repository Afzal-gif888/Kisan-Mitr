import cropsMaster from "../data/apCropsDataset.json";

/**
 * 🚜 SMART CROP SCORING ENGINE (v16.0) - WEIGHTED INTELLIGENCE
 * -----------------------------------------------------------
 * This engine replaces strict filtering with a weighted scoring system
 * to ensure farmers always receive actionable recommendations, 
 * ranked by district, soil, and weather suitability.
 */

export const getAPCropRecommendations = (
  weatherResult: any, 
  selectedSoil: string, 
  districtName: string, 
  language = "en"
) => {
  // 🛡️ Data Safety Guards
  if (!weatherResult || !districtName) return { recommendedCrops: [], disclaimer: "" };

  // --- 🔧 STEP 1: NORMALIZE INPUTS ---
  const normalize = (value: string) => value.toLowerCase().trim().replace(/\s+district$/i, "");
  
  const district = normalize(districtName);
  const soil = normalize(selectedSoil);

  // Determine local weather condition from NASA/Forecast data
  const { features } = weatherResult;
  const temp = parseFloat(features?.avgTemp || "28");
  const rain = parseFloat(features?.totalRain || "0");

  let weatherType = "normal";
  if (temp > 35) weatherType = "hot";
  else if (rain > 60) weatherType = "rainy";
  else if (rain < 10) weatherType = "dry";

  // --- 🔧 STEP 2: SCORING LOGIC ---
  const scoredCrops = cropsMaster.map((crop: any) => {
    let score = 0;

    // A. DISTRICT MATCH (+50)
    // We check if the district name is explicitly listed or if it's a sub-region (like Eluru)
    if (crop.districts.some((d: string) => normalize(d) === district || district.includes(normalize(d)))) {
      score += 50;
    }

    // B. SOIL MATCH (+30)
    if (crop.soils.some((s: string) => normalize(s) === soil || soil.includes(normalize(s)))) {
      score += 30;
    }

    // C. WEATHER MATCH (+20)
    if (crop.weather.includes(weatherType)) {
      score += 20;
    }

    // Console Trace for Debugging (Step 6)
    console.log(`-- [Engine] Crop: ${crop.name.en} | Score: ${score} | Weather: ${weatherType}`);

    return {
      ...crop,
      score,
      weatherTypeDetected: weatherType
    };
  });

  // --- 🔧 STEP 3: FILTER & SORT ---
  // Threshold: Keep crops with score >= 40 (Step 3)
  const results = scoredCrops
    .filter(crop => crop.score >= 40)
    .sort((a, b) => b.score - a.score)
    .map((crop: any) => ({
      id: crop.id,
      englishName: crop.name.en,
      teluguName: crop.name.te,
      score: crop.score,
      // Step 5: Suitability Labels
      suitabilityLabel: crop.score >= 80 ? (language === "te" ? "⭐ అత్యంత ఉత్తమం" : "⭐ Highly Suitable") : 
                        crop.score >= 60 ? (language === "te" ? "✅ అనుకూలమైనది" : "✅ Suitable") : 
                                          (language === "te" ? "⚠️ జాగ్రత్త" : "⚠️ Try Carefully"),
      reason: language === "te" 
        ? `${selectedSoil} మరియు ${districtName} కు తగినది` 
        : `Ranked for ${selectedSoil} in ${districtName}`,
      waterNeed: crop.details.water,
      duration: crop.details.duration
    }));

  return {
    recommendedCrops: results,
    disclaimer: language === "te" 
      ? "గమనిక: ఈ ఫలితాలు జిల్లా, నేల మరియు ప్రస్తుత వాతావరణం ఆధారంగా అంచనా వేయబడినవి." 
      : "Note: Results ranked by District, Soil, and live Weather trends.",
    weatherTypeDetected: weatherType,
    districtName
  };
};
