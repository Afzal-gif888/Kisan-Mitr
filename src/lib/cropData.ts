import cropRice from "@/assets/crop-rice.jpg";
import cropWheat from "@/assets/crop-wheat.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSunflower from "@/assets/crop-sunflower.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";

export type SoilType = "sandy" | "black" | "red" | "loamy";

export interface CropInfo {
  name: Record<string, string>;
  image: string;
  sowingTime: Record<string, string>;
  water: "low" | "medium" | "high";
  fertilizer: Record<string, string>;
  yield: Record<string, string>;
  idealSeason: string[];
  minRain: number; // minimum rainfall needed in mm
}

export const crops: Record<string, CropInfo> = {
  rice: {
    name: { en: "Rice", hi: "चावल", te: "వరి" },
    image: cropRice,
    sowingTime: { en: "June – July", hi: "जून – जुलाई", te: "జూన్ – జూలై" },
    water: "high",
    fertilizer: { en: "Use natural compost", hi: "प्राकृतिक खाद का उपयोग करें", te: "సహజ కంపోస్ట్ వాడండి" },
    yield: { en: "20–25 quintals per acre", hi: "20–25 क्विंटल प्रति एकड़", te: "ఎకరానికి 20–25 క్వింటాళ్లు" },
    idealSeason: ["Kharif (Rainy)"],
    minRain: 25,
  },
  wheat: {
    name: { en: "Wheat", hi: "गेहूं", te: "గోధుమ" },
    image: cropWheat,
    sowingTime: { en: "October – November", hi: "अक्टूबर – नवंबर", te: "అక్టోబర్ – నవంబర్" },
    water: "medium",
    fertilizer: { en: "Light manure before sowing", hi: "बुवाई से पहले हल्की खाद", te: "విత్తనం ముందు తేలికపాటి ఎరువు" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 क्विंटल प्रति एकड़", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
    idealSeason: ["Rabi (Winter)"],
    minRain: 5,
  },
  maize: {
    name: { en: "Maize", hi: "मक्का", te: "మొక్కజొన్న" },
    image: cropMaize,
    sowingTime: { en: "June – July", hi: "जून – जुलाई", te: "జూన్ – జూలై" },
    water: "medium",
    fertilizer: { en: "Add compost once a month", hi: "महीने में एक बार खाद डालें", te: "నెలకు ఒకసారి కంపోస్ట్ వేయండి" },
    yield: { en: "18–22 quintals per acre", hi: "18–22 क्विंटल प्रति एकड़", te: "ఎకరానికి 18–22 క్వింటాళ్లు" },
    idealSeason: ["Kharif (Rainy)", "Zaid (Summer)"],
    minRain: 12,
  },
  sunflower: {
    name: { en: "Sunflower", hi: "सूरजमुखी", te: "పొద్దుతిరుగుడు" },
    image: cropSunflower,
    sowingTime: { en: "January – February", hi: "जनवरी – फरवरी", te: "జనవరి – ఫిబ్రవరి" },
    water: "low",
    fertilizer: { en: "Minimal fertilizer needed", hi: "कम खाद की जरूरत", te: "తక్కువ ఎరువు అవసరం" },
    yield: { en: "8–10 quintals per acre", hi: "8–10 क्विंटल प्रति एकड़", te: "ఎకరానికి 8–10 క్వింటాళ్లు" },
    idealSeason: ["Rabi (Winter)", "Moderate (Spring)"],
    minRain: 5,
  },
  cotton: {
    name: { en: "Cotton", hi: "कपास", te: "పత్తి" },
    image: cropCotton,
    sowingTime: { en: "April – May", hi: "अप्रैल – मई", te: "ఏప్రిల్ – మే" },
    water: "medium",
    fertilizer: { en: "Use cow dung manure", hi: "गोबर की खाद का उपयोग करें", te: "ఆవు పేడ ఎరువు వాడండి" },
    yield: { en: "10–15 quintals per acre", hi: "10–15 क्विंटल प्रति एकड़", te: "ఎకరానికి 10–15 క్వింటాళ్లు" },
    idealSeason: ["Kharif (Rainy)", "Zaid (Summer)"],
    minRain: 10,
  },
};

/**
 * Advanced Recommendation Engine
 * Weighs Soil, Season, and Weather Features to rank crops.
 */
export function getRecommendation(
  soil: SoilType, 
  predictedSeason: string, 
  features: any
): { best: string; alternatives: string[] } {
  
  const soilMap: Record<SoilType, string[]> = {
    sandy: ["sunflower", "maize", "cotton"],
    black: ["cotton", "wheat", "maize"],
    red: ["maize", "sunflower", "rice"],
    loamy: ["rice", "wheat", "maize", "cotton"],
  };

  const compatibleCrops = soilMap[soil] || [];
  const scoredCrops = compatibleCrops.map(key => {
    const crop = crops[key];
    let score = 0;

    // 1. Season Match (Major Weight)
    if (crop.idealSeason.includes(predictedSeason)) {
        score += 50;
    }

    // 2. Rainfall Match
    const rain = features ? parseFloat(features.totalRain) : 10;
    if (rain >= crop.minRain) {
        score += 30;
    } else {
        score -= 20; // Penalize if not enough water
    }

    // 3. Humidity Synergy
    const hum = features ? parseFloat(features.avgHumidity) : 50;
    if (crop.water === "high" && hum > 65) score += 10;
    if (crop.water === "low" && hum < 45) score += 10;

    return { key, score };
  });

  // Sort by score descending
  const sorted = scoredCrops.sort((a, b) => b.score - a.score);
  
  return {
    best: sorted[0]?.key || "maize",
    alternatives: sorted.slice(1, 4).map(item => item.key)
  };
}
