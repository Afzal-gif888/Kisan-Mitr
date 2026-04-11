import cropsDataset from "../data/apCropDataset.json";
import districtMap from "../data/apDistrictCropMap.json";

/**
 * getAPCropRecommendations v4.0 (Location-Aware intelligence)
 * Adds District-specific boosting and removal logic to the precision engine.
 */
export const getAPCropRecommendations = (weatherResult, soilSelection, districtName, language = "en") => {
  if (!weatherResult || !soilSelection) return { recommendedCrops: [], disclaimer: "" };

  const { summary, risks, features } = weatherResult;
  
  const tempVal = features?.avgTemp ? parseFloat(features.avgTemp) : (summary.heat === "Hot" ? 38 : summary.heat === "Cool" ? 18 : 28);
  const humVal = features?.avgHumidity ? parseFloat(features.avgHumidity) : (summary.moisture === "High Moisture" ? 85 : summary.moisture === "Dry" ? 30 : 60);

  const normalizedSoil = soilSelection.split('-')[0].toLowerCase();
  
  // District Logic Setup
  const districtInfo = districtMap[districtName] || null;

  const recommendations = cropsDataset.map((crop) => {
    let score = 0;
    let weatherReasons = [];
    let districtLabel = "";

    // --- RULE: HARD GUARD (Weather Only) ---
    if (summary.rain === "Very Low" && crop.waterRequirement === "high") {
      return { ...crop, score: 0 };
    }

    // 1. Weather Logic (Standard Scoring)
    const waterMatch = 
      (summary.rain === "High" && crop.waterRequirement === "high") ||
      (summary.rain === "Normal" && crop.waterRequirement === "medium") ||
      (summary.rain === "Low" && crop.waterRequirement === "low") ||
      (summary.rain === "Very Low" && crop.waterRequirement === "low");

    if (waterMatch) score += 40; else score += 15;
    if (tempVal >= crop.idealTemp.min && tempVal <= crop.idealTemp.max) score += 25;
    if (humVal >= crop.idealHumidity.min && humVal <= crop.idealHumidity.max) score += 15;
    
    // 2. Soil Match
    const matchesSoil = crop.soilTypes.some(s => s === normalizedSoil || normalizedSoil.includes(s));
    if (matchesSoil) score += 20;

    // --- 3. DISTRICT INTELLIGENCE LAYER ---
    if (districtInfo) {
        if (districtInfo.boostCrops.includes(crop.name)) {
            score += 20;
            districtLabel = language === "te" ? "మీ ప్రాంతానికి అనుకూలమైన పంట" : "Recommended for your district";
        }
        if (districtInfo.avoidCrops.includes(crop.name)) {
            score -= 30;
            // HARD RULE: If in avoid list AND score is not already High -> REMOVE
            if (score < 80) return { ...crop, score: 0 };
        }
    }

    return {
      name: crop.name,
      teluguName: crop.telugu,
      englishName: crop.name,
      suitability: score >= 85 ? "High" : score >= 60 ? "Medium" : "Low",
      reason: language === "te" ? "ఈ సీజన్కు మంచి ఎంపిక" : "Perfect for the current season",
      weatherReason: waterMatch 
        ? (summary.rain === "Low" || summary.rain === "Very Low" ? (language === "te" ? "తక్కువ వర్షానికి సరిపోతుంది" : "Suitable for low rain") : (language === "te" ? "సరైన వర్షపాతం" : "Ideal rainfall"))
        : (language === "te" ? "తట్టుకోగలదు" : "Can tolerate current conditions"),
      soilReason: language === "te" ? "మీ నేలకు అనుకూలం" : "Matches your soil type",
      waterNeed: crop.waterRequirement === "low" ? (language === "te" ? "తక్కువ" : "Low") : crop.waterRequirement === "medium" ? (language === "te" ? "మధ్యస్థం" : "Medium") : (language === "te" ? "ఎక్కువ" : "High"),
      heatTolerance: tempVal > 30 ? (language === "te" ? "ఎక్కువ" : "High") : (language === "te" ? "మధ్యస్థం" : "Medium"),
      score
    };
  });

  // Filter and Sort
  const finalCrops = recommendations
    .filter(c => c.score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const districtAdvice = districtInfo 
    ? (language === "te" ? `${districtName} జిల్లాలో ఈ పంటలు బాగా పెరుగుతాయి` : `${districtName} district is historically good for these crops`)
    : "";

  const safetyDisclaimer = language === "te" 
    ? "ఇవి ప్రస్తుత వాతావరణం మరియు నేల రకం ఆధారంగా సూచనలు మాత్రమే. దయచేసి తుది నిర్ణయం తీసుకునే ముందు స్థానిక నిపుణులను సంప్రదించండి."
    : "These are suggestions based on current weather and soil type. Please consult local experts before final decision.";

  return {
    recommendedCrops: finalCrops,
    disclaimer: safetyDisclaimer,
    districtAdvice: districtAdvice,
    hasRisks: risks.length > 0
  };
};
