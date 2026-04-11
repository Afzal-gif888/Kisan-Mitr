import apCropGuides from "../data/apCropGuides.json";
import apDistrictCropMapping from "../data/apDistrictCropMapping.json";

export interface PersonalizedGuide {
  guide: any;
  situationalAdvice: { te: string; en: string }[];
  isDistrictSuitable: boolean;
}

/**
 * Farming Guide Engine v1.0
 * Generates a hyper-personalized farming guide based on Crop, District, and Weather Context.
 */
export const generateFarmingGuide = (
  cropId: string, 
  districtName: string, 
  weatherResult: any
): PersonalizedGuide | null => {
  
  // 1. Find the base guide
  const normalizedCropId = cropId.toLowerCase().replace(/[^a-z]/g, '');
  const baseGuide = (apCropGuides as any[]).find(g => g.id === normalizedCropId);
  
  if (!baseGuide) return null;

  // 2. Check district suitability
  const mapping = (apDistrictCropMapping as any)[districtName] || [];
  const isDistrictSuitable = mapping.includes(normalizedCropId);

  // 3. Generate situational advice based on Weather
  const advice: { te: string; en: string }[] = [];
  
  if (weatherResult) {
    const { summary, features } = weatherResult;
    const avgTemp = features?.avgTemp ? parseFloat(features.avgTemp) : null;
    const totalRain = features?.totalRain ? parseFloat(features.totalRain) : null;

    // Heat Logic
    if (avgTemp && avgTemp > 35) {
      advice.push({
        te: "ఎండ ఎక్కువగా ఉంది: విత్తనాలను కొంచెం ఆలస్యంగా నాటడం మంచిది మరియు మల్చింగ్ (గడ్డి కప్పుడం) చేయండి.",
        en: "High temperature: Delay sowing slightly and use mulching to retain moisture."
      });
    }

    // Rain Logic
    if (summary?.rain === "Low" || summary?.rain === "Very Low") {
      advice.push({
        te: "వర్షం తక్కువగా ఉంది: ప్రతి 7-10 రోజులకు ఒకసారి తేలికపాటి నీటి పారుదల ఇవ్వండి.",
        en: "Low rainfall: Ensure light irrigation every 7-10 days."
      });
    }

    if (summary?.rain === "High" || summary?.rain === "Very High") {
      advice.push({
        te: "భారీ వర్షాలు: పొలంలో నీరు నిల్వ ఉండకుండా డ్రైనేజీ కాలువలు సిద్ధం చేయండి.",
        en: "Heavy Rain predicted: Ensure proper drainage to avoid waterlogging."
      });
    }
  }

  // 4. District Compatibility Advice
  if (!isDistrictSuitable) {
    advice.push({
      te: "గమనిక: ఈ పంట మీ ప్రాంత వాతావరణానికి మరియు నేలకు పూర్తిగా సరిపోకపోవచ్చు. స్థానిక నిపుణుల సలహా తీసుకోండి.",
      en: "Notice: This crop may not be fully suitable for your district's historical climate/soil."
    });
  } else {
    advice.push({
      te: "అభినందనలు: ఈ పంట మీ జిల్లా వాతావరణానికి అత్యంత అనుకూలమైనది.",
      en: "Congrats: This crop is highly suitable for your district's geography."
    });
  }

  return {
    guide: baseGuide,
    situationalAdvice: advice,
    isDistrictSuitable
  };
};
