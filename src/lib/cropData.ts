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
}

export const crops: Record<string, CropInfo> = {
  rice: {
    name: { en: "Rice", hi: "चावल", te: "వరి" },
    image: cropRice,
    sowingTime: { en: "June – July", hi: "जून – जुलाई", te: "జూన్ – జూలై" },
    water: "high",
    fertilizer: { en: "Use natural compost", hi: "प्राकृतिक खाद का उपयोग करें", te: "సహజ కంపోస్ట్ వాడండి" },
    yield: { en: "20–25 quintals per acre", hi: "20–25 क्विंटल प्रति एकड़", te: "ఎకరానికి 20–25 క్వింటాళ్లు" },
  },
  wheat: {
    name: { en: "Wheat", hi: "गेहूं", te: "గోధుమ" },
    image: cropWheat,
    sowingTime: { en: "October – November", hi: "अक्टूबर – नवंबर", te: "అక్టోబర్ – నవంబర్" },
    water: "medium",
    fertilizer: { en: "Light manure before sowing", hi: "बुवाई से पहले हल्की खाद", te: "విత్తనం ముందు తేలికపాటి ఎరువు" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 क्विंटल प्रति एकड़", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
  },
  maize: {
    name: { en: "Maize", hi: "मक्का", te: "మొక్కజొన్న" },
    image: cropMaize,
    sowingTime: { en: "June – July", hi: "जून – जुलाई", te: "జూన్ – జూలై" },
    water: "medium",
    fertilizer: { en: "Add compost once a month", hi: "महीने में एक बार खाद डालें", te: "నెలకు ఒకసారి కంపోస్ట్ వేయండి" },
    yield: { en: "18–22 quintals per acre", hi: "18–22 क्विंटल प्रति एकड़", te: "ఎకరానికి 18–22 క్వింటాళ్లు" },
  },
  sunflower: {
    name: { en: "Sunflower", hi: "सूरजमुखी", te: "పొద్దుతిరుగుడు" },
    image: cropSunflower,
    sowingTime: { en: "January – February", hi: "जनवरी – फरवरी", te: "జనవరి – ఫిబ్రవరి" },
    water: "low",
    fertilizer: { en: "Minimal fertilizer needed", hi: "कम खाद की जरूरत", te: "తక్కువ ఎరువు అవసరం" },
    yield: { en: "8–10 quintals per acre", hi: "8–10 क्विंटल प्रति एकड़", te: "ఎకరానికి 8–10 క్వింటాళ్లు" },
  },
  cotton: {
    name: { en: "Cotton", hi: "कपास", te: "పత్తి" },
    image: cropCotton,
    sowingTime: { en: "April – May", hi: "अप्रैल – मई", te: "ఏప్రిల్ – మే" },
    water: "medium",
    fertilizer: { en: "Use cow dung manure", hi: "गोबर की खाद का उपयोग करें", te: "ఆవు పేడ ఎరువు వాడండి" },
    yield: { en: "10–15 quintals per acre", hi: "10–15 क्विंटल प्रति एकड़", te: "ఎకరానికి 10–15 క్వింటాళ్లు" },
  },
};

// Simple recommendation based on soil type
export function getRecommendation(soil: SoilType): { best: string; alternatives: string[] } {
  const map: Record<SoilType, { best: string; alternatives: string[] }> = {
    sandy: { best: "sunflower", alternatives: ["maize", "cotton"] },
    black: { best: "cotton", alternatives: ["wheat", "sunflower"] },
    red: { best: "maize", alternatives: ["sunflower", "rice"] },
    loamy: { best: "rice", alternatives: ["wheat", "maize"] },
  };
  return map[soil];
}
