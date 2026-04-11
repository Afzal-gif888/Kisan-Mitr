import cropsMaster from "../data/apCropsMaster.json";
import districtCropMapping from "../data/apDistrictCropMapping.json";
import districtSoilMap from "../data/apDistrictSoilMap.json";
import soilCropMap from "../data/soilCropMap.json";

/**
 * Supercharged Crop Intelligence v8.3 (STRICT COMPLIANCE & REPAIR)
 * Implements the 10-step Dynamic Soil Mapping Fix
 */
export const getAPCropRecommendations = (weatherResult: any, userSoilSelection: string, districtName: string, language = "en") => {
  if (!weatherResult || !districtName) return { recommendedCrops: [], disclaimer: "" };

  const { features } = weatherResult;
  
  // STEP 2: NORMALIZE DISTRICT NAME
  const formattedDistrict = districtName.trim().toLowerCase();
  
  // NORMALIZE DATASET KEYS
  const normalizedSoilMap = Object.fromEntries(
      Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
  );
  const normalizedCropMap = Object.fromEntries(
      Object.entries(districtCropMapping).map(([k, v]) => [k.toLowerCase(), v])
  );

  // STEP 3 & 4: FIX LOOKUP LOGIC (NO STATIC DEFAULT FALLBACK)
  const soils = normalizedSoilMap[formattedDistrict];
  const districtHistoricalCrops = normalizedCropMap[formattedDistrict] || [];

  // STEP 5: DEBUG LOG
  console.log("District:", formattedDistrict);
  console.log("Soils:", soils);

  // STEP 6: HANDLE UNDEFINED CASE
  if (!soils) {
      return { 
          recommendedCrops: [], 
          disclaimer: language === "te" ? "నేల సమాచారం అందుబాటులో లేదు" : "Soil data not available",
          districtSoils: ["Soil data not available"],
          districtName
      };
  }

  // 1. DYNAMIC WEATHER DETECTION
  let weatherType = "Hot"; 
  const rainfall = parseFloat(features?.avgRain || "300");
  const temperature = parseFloat(features?.avgTemp || "28");

  if (rainfall > 800) weatherType = "Rainy";
  else if (temperature < 22) weatherType = "Winter";
  else weatherType = "Hot";

  // Map of all crops matching soils in this district
  const districtSoilCompatibleCrops = new Set<string>();
  soils.forEach((soilType: string) => {
      const cropsForThisSoil = (soilCropMap as any)[soilType] || [];
      cropsForThisSoil.forEach((id: string) => districtSoilCompatibleCrops.add(id));
  });

  // 3. CORE FILTER & SCORING LOGIC
  const recommendations = cropsMaster
    .map((crop) => {
      let score = 0;
      let reasons: string[] = [];
      let teReasons: string[] = [];

      // A. SOIL MATCH (+40)
      const soilMatch = districtSoilCompatibleCrops.has(crop.id);
      if (soilMatch) {
          score += 40;
          reasons.push(`${districtName} soils suited`);
          teReasons.push(`${districtName} నేలలకు అనుకూలం`);
      }

      // B. WEATHER MATCH (+30)
      const weatherMatch = crop.weatherSuitability.includes(weatherType);
      if (weatherMatch) {
          score += 30;
          reasons.push(`${weatherType} season ready`);
          teReasons.push(`${weatherType} కాలానికి తగినది`);
      }

      // C. DISTRICT MATCH (+30)
      const districtMatch = districtHistoricalCrops.includes(crop.id);
      if (districtMatch) {
          score += 30;
          reasons.push("Regional success record");
          teReasons.push("ఈ ప్రాంతంలో మంచి దిగుబడి చరిత్ర ఉంది");
      }

      // STRICT INTEGRITY FILTER (Requirement: Crop must pass ALL 3 conditions)
      if (!soilMatch || !weatherMatch || !districtMatch) {
          return null;
      }

      // BONUS/PENALTY
      if (userSoilSelection && crop.soil.types.some(s => userSoilSelection.toLowerCase().includes(s.toLowerCase()))) {
          score += 10;
      }

      const suitability = score >= 105 ? "Best Suitable" : score >= 85 ? "Suitable" : "Try Carefully";
      const teSuitability = score >= 105 ? "అత్యంత అనుకూలం" : score >= 85 ? "అనుకూలమైనది" : "జాగ్రత్తగా ప్రయత్నించండి";

      return {
        id: crop.id,
        englishName: crop.name.en,
        teluguName: crop.name.te,
        image: crop.image,
        score,
        suitabilityLabel: language === "te" ? teSuitability : suitability,
        reason: language === "te" ? teReasons[2] : reasons[2],
        weatherReason: language === "te" ? teReasons[1] : reasons[1],
        soilReason: language === "te" ? teReasons[0] : reasons[0],
        waterNeed: crop.water.requirement,
        heatTolerance: crop.climate.temperature
      };
    })
    .filter(c => c !== null)
    .sort((a, b) => b!.score - a!.score);

  return {
    recommendedCrops: recommendations,
    disclaimer: language === "te" ? "శాస్త్రీయ విశ్లేషణ ఆధారంగా కూర్చబడింది." : "Based on scientific analysis.",
    weatherTypeDetected: weatherType,
    districtSoils: soils,
    districtName
  };
};
