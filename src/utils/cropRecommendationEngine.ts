import cropsMaster from "../data/apCropsMaster.json";
import districtCropMapping from "../data/apDistrictCropMapping.json";

/**
 * Enhanced Crop Recommendation Engine v7.0
 * Implements Strict Weather Filtering + District/Soil Scoring + Ranking
 */
export const getAPCropRecommendations = (weatherResult, soilSelection, districtName, language = "en") => {
  if (!weatherResult || !soilSelection) return { recommendedCrops: [], disclaimer: "" };

  const { summary, features } = weatherResult;
  
  // STEP 1: DEFINE WEATHER TYPE
  let weatherType = "Hot"; // Default
  const rainfall = parseFloat(features?.avgRain || "0");
  const temperature = parseFloat(features?.avgTemp || "25");

  if (rainfall > 800) {
      weatherType = "Rainy";
  } else if (temperature < 22) {
      weatherType = "Winter";
  } else if (temperature > 30 || (temperature > 25 && rainfall < 200)) {
      weatherType = "Hot";
  }

  const normalizedSoil = soilSelection.toLowerCase();
  const districtCrops = districtCropMapping[districtName] || [];

  // STEP 3: FILTER & STEP 4: SCORING
  const recommendations = cropsMaster
    .map((crop) => {
      let score = 0;
      let reasons: string[] = [];
      let teReasons: string[] = [];

      // 1. District Match
      const districtMatch = districtCrops.includes(crop.id);
      if (districtMatch) {
          score += 40;
          reasons.push(`${districtName} suited`);
          teReasons.push(`${districtName} కు అనుకూలం`);
      }

      // 2. Soil Match
      const soilMatch = crop.soil.types.some(s => 
          normalizedSoil.includes(s.toLowerCase()) || 
          s.toLowerCase().includes(normalizedSoil)
      );
      if (soilMatch) {
          score += 30;
          reasons.push("Soil compatible");
          teReasons.push("నేలకు సరిపోతుంది");
      }

      // 3. Weather Match
      const weatherMatch = crop.weatherSuitability.includes(weatherType);
      if (weatherMatch) {
          score += 30;
          reasons.push(`${weatherType} season ready`);
          teReasons.push(`${weatherType} కాలానికి తగినది`);
      }

      // BONUS: Perfect Match
      if (districtMatch && soilMatch && weatherMatch) {
          score += 10;
      }

      // PENALTY: Risk Check
      const hasWaterRisk = weatherType === "Hot" && crop.water.requirement === "Very High";
      const hasColdRisk = weatherType === "Winter" && crop.climate.sensitivity.includes("Cold sensitive");
      if (hasWaterRisk || hasColdRisk) {
          score -= 20;
      }

      // STRICT FILTER: Must pass ALL 3 conditions
      if (!districtMatch || !soilMatch || !weatherMatch) {
          return null;
      }

      const suitabilityLabel = score >= 100 ? "Best Suitable" : score >= 85 ? "Suitable" : "Try Carefully";
      const teSuitabilityLabel = score >= 100 ? "అత్యంత అనుకూలమైనది" : score >= 85 ? "అనుకూలమైనది" : "జాగ్రత్త అవసరం";

      return {
        id: crop.id,
        englishName: crop.name.en,
        teluguName: crop.name.te,
        image: crop.image,
        score,
        suitabilityLabel: language === "te" ? teSuitabilityLabel : suitabilityLabel,
        reason: language === "te" ? teReasons[0] : reasons[0],
        weatherReason: language === "te" ? teReasons[2] : reasons[2],
        soilReason: language === "te" ? teReasons[1] : reasons[1],
        waterNeed: crop.water.requirement,
        heatTolerance: crop.climate.temperature
      };
    })
    .filter(c => c !== null) // Remove failed filters
    .sort((a, b) => b!.score - a!.score); // Sort by score descending

  const safetyDisclaimer = language === "te" 
    ? "ఇవి కేవలం సూచనలు మాత్రమే. దయచేసి స్థానిక వ్యవసాయ అధికారులను సంప్రదించండి."
    : "These are recommendations only. Please consult local agricultural authorities.";

  return {
    recommendedCrops: recommendations,
    disclaimer: safetyDisclaimer,
    weatherTypeDetected: weatherType,
    districtAdvice: districtName ? (language === "te" ? `${districtName} జిల్లాకు ఎంపికలు (${weatherType})` : `Choices for ${districtName} (${weatherType})`) : ""
  };
};
