import apCropGuides from "../data/apCropGuides.json";
import apDistrictCropMapping from "../data/apDistrictCropMapping.json";

export interface PersonalizedGuide {
  guide: any;
  situationalAdvice: { te: string; en: string }[];
}

/**
 * Farming Guide Engine v2.0 (District-Locked)
 * 
 * Since the recommendation engine already filters crops by district,
 * every crop reaching this guide is GUARANTEED to be district-suitable.
 * No "not suitable" warnings needed.
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

  // 2. Generate situational advice based on Weather
  const advice: { te: string; en: string }[] = [];
  
  if (weatherResult) {
    const { summary, features } = weatherResult;
    const avgTemp = features?.avgTemp ? parseFloat(features.avgTemp) : null;

    // Heat Logic
    if (avgTemp && avgTemp > 35) {
      advice.push({
        te: "ఎండ ఎక్కువగా ఉంది: విత్తనాలను కొంచెం ఆలస్యంగా నాటడం మంచిది మరియు మల్చింగ్ (గడ్డి కప్పడం) చేయండి.",
        en: "High temperature detected: Delay sowing slightly and use mulching to retain moisture."
      });
    }

    // Rain Logic
    if (summary?.rain === "Low" || summary?.rain === "Very Low") {
      advice.push({
        te: "వర్షం తక్కువగా ఉంది: ప్రతి 7-10 రోజులకు ఒకసారి తేలికపాటి నీటి పారుదల ఇవ్వండి.",
        en: "Low rainfall forecast: Ensure supplemental irrigation every 7-10 days."
      });
    }

    if (summary?.rain === "High" || summary?.rain === "Very High") {
      advice.push({
        te: "భారీ వర్షాలు: పొలంలో నీరు నిల్వ ఉండకుండా డ్రైనేజీ కాలువలు సిద్ధం చేయండి.",
        en: "Heavy rain predicted: Prepare drainage channels to prevent waterlogging."
      });
    }
  }

  return {
    guide: baseGuide,
    situationalAdvice: advice
  };
};
