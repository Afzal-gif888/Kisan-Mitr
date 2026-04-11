import cropsMaster from "../data/apCropsMaster.json";
import districtCropMapping from "../data/apDistrictCropMapping.json";
import districtSoilMap from "../data/apDistrictSoilMap.json";
import soilCropMap from "../data/soilCropMap.json";

/**
 * Supercharged Crop Intelligence v8.0
 * Deep District-Wise Soil Integration + Multi-Soil Mapping
 */
export const getAPCropRecommendations = (weatherResult, userSoilSelection, districtName, language = "en") => {
  if (!weatherResult) return { recommendedCrops: [], disclaimer: "" };

  const { features } = weatherResult;
  
  // 1. DYNAMIC WEATHER DETECTION
  let weatherType = "Hot"; 
  const rainfall = parseFloat(features?.avgRain || "300");
  const temperature = parseFloat(features?.avgTemp || "28");

  if (rainfall > 800) weatherType = "Rainy";
  else if (temperature < 22) weatherType = "Winter";
  else if (temperature > 30 || (temperature > 25 && rainfall < 200)) weatherType = "Hot";

  // 2. AUTO DISTRICT-SOIL INTELLIGENCE
  const districtSoils = districtSoilMap[districtName] || ["Red Soil"]; // Default fallback
  const districtCropIDs = districtCropMapping[districtName] || [];

  // All crops mapped to at least one soil in this district
  const districtSuitableSoilCrops = new Set<string>();
  districtSoils.forEach(soilType => {
      const cropsForThisSoil = soilCropMap[soilType] || [];
      cropsForThisSoil.forEach(id => districtSuitableSoilCrops.add(id));
  });

  // 3. CORE FILTER & SCORING LOGIC
  const recommendations = cropsMaster
    .map((crop) => {
      let score = 0;
      let reasons: string[] = [];
      let teReasons: string[] = [];

      // A. Soil Match (+40) - Check if crop is scientifically recommended for ANY soil in this district
      const isSoilCompatible = districtSuitableSoilCrops.has(crop.id);
      if (isSoilCompatible) {
          score += 40;
          reasons.push(`${districtName} soils suited`);
          teReasons.push(`${districtName} నేలలకు అనుకూలం`);
      }

      // B. Weather Match (+30)
      const isWeatherCompatible = crop.weatherSuitability.includes(weatherType);
      if (isWeatherCompatible) {
          score += 30;
          reasons.push(`${weatherType} season ready`);
          teReasons.push(`${weatherType} కాలానికి తగినది`);
      }

      // C. District Historical Success (+30)
      const isCultivatedInDistrict = districtCropIDs.includes(crop.id);
      if (isCultivatedInDistrict) {
          score += 30;
          reasons.push("Region success record");
          teReasons.push("ఈ ప్రాంతంలో మంచి దిగుబడి చరిత్ర ఉంది");
      }

      // BONUS: Perfect Soil Match (+10) 
      // If the user's specific selected soil is one of the crop's preferred soils
      const isPerfectSoilMatch = userSoilSelection && crop.soil.types.some(s => 
          userSoilSelection.toLowerCase().includes(s.toLowerCase()) || 
          s.toLowerCase().includes(userSoilSelection.toLowerCase())
      );
      if (isPerfectSoilMatch) {
          score += 10;
      }

      // PENALTY: Climate Risk (-20)
      const highWaterRisk = weatherType === "Hot" && crop.water.requirement === "Very High";
      const coldRisk = weatherType === "Winter" && crop.climate.sensitivity.includes("Cold sensitive");
      if (highWaterRisk || coldRisk) {
          score -= 20;
      }

      // STRICT INTEGRITY FILTER: Only show what matches at least District Soil and Weather
      if (!isSoilCompatible || !isWeatherCompatible) {
          return null;
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
        reason: language === "te" ? teReasons[0] : reasons[0],
        weatherReason: language === "te" ? teReasons[1] : reasons[1],
        soilReason: language === "te" ? teReasons[2] : reasons[2],
        waterNeed: crop.water.requirement,
        heatTolerance: crop.climate.temperature
      };
    })
    .filter(c => c !== null)
    .sort((a, b) => b!.score - a!.score);

  const safetyDisclaimer = language === "te" 
    ? "ఇవి కేవలం శాస్త్రీయ సూచనలు మాత్రమే."
    : "Scientific recommendations based on soil/climate analysis.";

  return {
    recommendedCrops: recommendations,
    disclaimer: safetyDisclaimer,
    weatherTypeDetected: weatherType,
    districtSoils, // Return for UI display
    districtName
  };
};
