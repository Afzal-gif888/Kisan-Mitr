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
  const PARENT_DISTRICTS: Record<string, string[]> = {
    "annamayya": ["kadapa", "chittoor"],
    "sri sathya sai": ["anantapur"],
    "nandyal": ["kurnool"],
    "tirupati": ["chittoor", "nellore"],
    "anakapalli": ["visakhapatnam"],
    "alluri sitharama raju": ["visakhapatnam", "east godavari"],
    "kakinada": ["east godavari"],
    "konaseema": ["east godavari"],
    "eluru": ["west godavari", "krishna"],
    "ntr": ["krishna"],
    "palnadu": ["guntur"],
    "bapatla": ["guntur", "prakasam"],
    "parvathipuram manyam": ["vizianagaram", "srikakulam"],
    "ysr kadapa": ["kadapa"],
    "spsr nellore": ["nellore"]
  };

  const UI_SOIL_MAP: Record<string, string[]> = {
    // 🛑 STRICT DISJOINT MAPPING TO PREVENT OVERLAP
    "red sandy soil": ["sandy soil", "coastal sandy soil"],
    "coastal sandy soil": ["coastal sandy soil", "sandy soil"],
    
    "red loam soil": ["red loamy soil", "loamy soil"],
    "loamy soil": ["loamy soil"],
    
    "deep red soil": ["red soil"],
    "gravelly soil": ["red soil", "laterite soil"],
    "laterite soil": ["laterite soil"],
    
    "black cotton soil": ["black cotton soil"],
    "medium black soil": ["black cotton soil", "black soil"],
    "shallow black soil": ["black cotton soil"],
    
    "alluvial soil": ["alluvial soil"],
    "delta alluvial soil": ["delta alluvial soil", "alluvial soil"],
    "silty soil": ["alluvial soil", "clay soil"],
    
    "clay soil": ["clay soil"],
    "saline soil": ["coastal sandy soil"],
    "alkaline soil": ["loamy soil"]
  };

  const districtTargets = [district, ...(PARENT_DISTRICTS[district] || [])];
  const mappedSoils = UI_SOIL_MAP[soil] || [soil];

  // STRICT Exact Matching Only
  const doesDistrictMatch = (cropDistricts: string[]) => {
    return cropDistricts.some((d: string) => districtTargets.includes(normalize(d)));
  };

  const doesSoilMatch = (cropSoils: string[]) => {
    return cropSoils.some((s: string) => mappedSoils.includes(normalize(s)));
  };

  // --- 🎯 STEP 1: DISTRICT FILTER (FIRST & STRICT) ---
  const districtCrops = cropsMaster.filter(crop =>
    doesDistrictMatch(crop.districts)
  );

  // --- 🎯 STEP 2: SOIL FILTER (SECOND LEVEL) ---
  const soilFiltered = districtCrops.filter(crop =>
    doesSoilMatch(crop.soils)
  );

  // --- 🎯 STEP 3: CONTROLLED FALLBACK (STRICT RULE) ---
  // Allow fallback to district only, NEVER to all crops
  let filteredCrops = soilFiltered.length > 0 ? soilFiltered : districtCrops;

  // --- 🎯 STEP 4: WEATHER-BASED RANKING (NOT FILTERING) ---
  const rankedCrops = filteredCrops.map((crop: any) => {
    let score = 0;

    if (crop.weather.includes(weatherType)) score += 50;
    if (doesSoilMatch(crop.soils)) score += 30;
    if (doesDistrictMatch(crop.districts)) score += 20;

    return { ...crop, score, weatherTypeDetected: weatherType };
  });

  // --- 🎯 STEP 5: SORT BY SCORE ---
  rankedCrops.sort((a, b) => b.score - a.score);

  // --- 🎯 STEP 6: REMOVE DUPLICATES (CRITICAL) ---
  const uniqueCrops = Array.from(
    new Map(rankedCrops.map(crop => [crop.id, crop])).values()
  ) as any[];

  // --- 🎯 STEP 7: FINAL OUTPUT ---
  const finalResults = uniqueCrops.slice(0, 10);

  // --- 🧪 DEBUG LOGGING (MANDATORY) ---
  console.log("DISTRICT:", districtName);
  console.log("SOIL:", selectedSoil);
  console.log("WEATHER:", weatherType);
  console.log("District Crops:", districtCrops.map(c => c.name?.en || c.name));
  console.log("Soil Filtered:", soilFiltered.map(c => c.name?.en || c.name));
  console.log("Final Output:", finalResults.map(c => c.name?.en || c.name));

  // --- 🎯 MAPPED STRUCTURE FOR UI ---
  const results = finalResults.map((crop: any) => ({
      id: crop.id,
      englishName: crop.name.en,
      teluguName: crop.name.te,
      score: crop.score,
      suitabilityLabel: crop.score >= 80 ? (language === "te" ? "⭐ అత్యంత ఉత్తమం" : "⭐ Highly Suitable") : 
                        crop.score >= 60 ? (language === "te" ? "✅ అనుకూలమైనది" : "✅ Suitable") : 
                                          (language === "te" ? "⚠️ జాగ్రత్త" : "⚠️ Try Carefully"),
      reason: language === "te" 
        ? `${selectedSoil} మరియు ${districtName} కు తగినది` 
        : `Ranked for ${selectedSoil} in ${districtName}`,
      waterNeed: crop.details.water,
      duration: crop.details.duration,
      districts: crop.districts,
      soils: crop.soils,
      weather: crop.weather
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
