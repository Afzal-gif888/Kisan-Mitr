import cropsData from "../data/apCrops.json";

/**
 * getAPCropRecommendations v1.0
 * Scores and filters crops based on environmental conditions and risks
 * specifically for Andhra Pradesh farming.
 */
export const getAPCropRecommendations = (weatherResult, language = "en") => {
  const { condition, summary, risks } = weatherResult;
  const rain = summary.rain; // Low / Normal / High
  const heat = summary.heat; // Cool / Moderate / High
  const moisture = summary.moisture; // Low / Normal / Wet

  const recommendations = cropsData.map((crop) => {
    let score = 0;
    let reasons = [];

    // 1. Water vs Rain Match (+2)
    if (crop.water === rain) {
      score += 2;
      reasons.push(language === "te" ? "వర్షపాతం అనుకూలం" : "Rainfall matches water needs");
    }

    // 2. Temp vs Heat Match (+2)
    if (crop.temp === heat) {
      score += 2;
      reasons.push(language === "te" ? "ఉష్ణోగ్రత అనుకూలం" : "Temperature is ideal");
    }

    // 3. Moisture Match (+2)
    if (crop.moisture === moisture) {
      score += 2;
      reasons.push(language === "te" ? "నేల తేమ సరిపోతుంది" : "Soil moisture is suitable");
    }

    // 4. Season vs Condition Match (+3)
    if (crop.season.includes(condition)) {
      score += 3;
      reasons.push(language === "te" ? "ప్రస్తుత కాలానికి సరైనది" : "Perfect for the current season");
    }

    // 5. Risk Penalties (-2)
    risks.forEach((risk) => {
      const r = risk.toLowerCase();
      if (r.includes("low rain") || r.includes("dry") || r.includes("takkkuva varsham")) {
        if (crop.water === "High") {
          score -= 2;
          reasons.push(language === "te" ? "నీరు ఎక్కువగా అవసరం (ప్రమాదం)" : "High water need (risk in dry conditions)");
        }
      }
      if (r.includes("heavy") || r.includes("ekkuva varsham")) {
        if (crop.water === "Low") {
          score -= 2;
          reasons.push(language === "te" ? "ఎక్కువ వర్షం నేలకు సరిపోదు" : "Too much rain for dry crops");
        }
      }
      if (r.includes("heat") || r.includes("enda")) {
        if (crop.temp === "Cool") {
          score -= 2;
          reasons.push(language === "te" ? "వేడికి తట్టుకోలేదు" : "Poor heat tolerance");
        }
      }
    });

    // Bonus for high match
    if (score >= 7) {
      score += 2;
    }

    return {
      name: language === "te" ? crop.teluguName : crop.name,
      englishName: crop.name,
      teluguName: crop.teluguName,
      suitability: score >= 9 ? "High" : score >= 6 ? "Medium" : "Low",
      waterNeed: crop.water,
      heatNeed: crop.temp,
      reason: reasons.length > 0 ? reasons[0] : (language === "te" ? "సాధారణంగా పెంచవచ్చు" : "Generally suitable"),
      score
    };
  });

  // Filter and Sort
  const filteredCrops = recommendations
    .filter((c) => c.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const safetyDisclaimer = language === "te" 
    ? "ఇవి ప్రస్తుత వాతావరణం మరియు చారిత్రక డేటా ఆధారంగా సూచనలు మాత్రమే. వాతావరణం మారవచ్చు. తుది నిర్ణయం తీసుకునే ముందు స్థానిక నిపుణులను సంప్రదించండి."
    : "These are suggestions based on current weather and historical data. Weather may change. Please consult local experts before final decision.";

  return {
    recommendedCrops: filteredCrops,
    disclaimer: safetyDisclaimer
  };
};
