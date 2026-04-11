import cropRice from "@/assets/crop-rice.jpg";
import cropWheat from "@/assets/crop-wheat.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSunflower from "@/assets/crop-sunflower.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";
import farmHero from "@/assets/farm-hero.jpg";

export type SoilType = "sandy" | "black" | "red" | "loamy";

export interface CropInfo {
  name: Record<string, string>;
  image: string;
  sowingTime: Record<string, string>;
  water: "low" | "medium" | "high";
  fertilizer: Record<string, string>;
  yield: Record<string, string>;
  idealSeason: string[];
  minRain: number; 
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
  paddy: {
    name: { en: "Paddy", hi: "धान", te: "వరి" },
    image: cropRice,
    sowingTime: { en: "June – July", hi: "జూన్ – जुलाई", te: "జూన్ – జూలై" },
    water: "high",
    fertilizer: { en: "Use urea and DAP", hi: "यूरिया और डीएपी का प्रयोग करें", te: "యూరియా మరియు DAP వాడండి" },
    yield: { en: "20–25 quintals", hi: "20–25 क्विंटल", te: "20–25 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 20
  },
  wheat: {
    name: { en: "Wheat", hi: "गेहूं", te: "గోధుమ" },
    image: cropWheat,
    sowingTime: { en: "October – November", hi: "అక్టోబర్ – నవంబర్", te: "అక్టోబర్ – నవంబర్" },
    water: "medium",
    fertilizer: { en: "Light manure before sowing", hi: "बुवाई से पहले हल्की खाद", te: "విత్తనం ముందు తేలికపాటి ఎరువు" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 क्विंटल प्रति एकड़", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
    idealSeason: ["Rabi (Winter)"],
    minRain: 5,
  },
  maize: {
    name: { en: "Maize", hi: "मक्का", te: "మొక్కజొన్న" },
    image: cropMaize,
    sowingTime: { en: "June – July", hi: "జూన్ – जुलाई", te: "జూన్ – జూలై" },
    water: "medium",
    fertilizer: { en: "Add compost once a month", hi: "మहीने में एक बार खाद डालें", te: "నెలకు ఒకసారి కంపోస్ట్ వేయండి" },
    yield: { en: "18–22 quintals per acre", hi: "18–22 क्विंटल प्रति एकड़", te: "ఎకరానికి 18–22 క్వింటాళ్లు" },
    idealSeason: ["Kharif (Rainy)"],
    minRain: 12,
  },
  sunflower: {
    name: { en: "Sunflower", hi: "सूरजमुखी", te: "పొద్దుతిరుగుడు" },
    image: cropSunflower,
    sowingTime: { en: "January – February", hi: "జనవరి – फरवरी", te: "జనవరి – ఫిబ్రవరి" },
    water: "low",
    fertilizer: { en: "Minimal fertilizer needed", hi: "कम खाद की जरूरत", te: "తక్కువ ఎరువు అవసరం" },
    yield: { en: "8–10 quintals per acre", hi: "8–10 क्विंटल प्रति एकड़", te: "ఎకరానికి 8–10 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 5,
  },
  cotton: {
    name: { en: "Cotton", hi: "कपास", te: "పత్తి" },
    image: cropCotton,
    sowingTime: { en: "April – May", hi: "अप्रैल – मई", te: "ఏప్రిల్ – మే" },
    water: "medium",
    fertilizer: { en: "Use cow dung manure", hi: "गोबर की खाद का उपयोग करें", te: "ఆవు పేడ ఎరువు వాడండి" },
    yield: { en: "10–15 quintals per acre", hi: "10–15 क्विंटल प्रति एकड़", te: "ఎకరానికి 10–15 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 10,
  },
  groundnut: {
    name: { en: "Groundnut", hi: "मूंगफली", te: "వేరుశెనగ" },
    image: farmHero,
    sowingTime: { en: "June – July", hi: "జూన్ – जुलाई", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "Gypsum application is key", hi: "जिप्सम का प्रयोग महत्वपूर्ण है", te: "జిప్సం వాడకం ముఖ్యం" },
    yield: { en: "10–12 quintals per acre", hi: "10–12 क्विंटल प्रति एकड़", te: "ఎకరానికి 10–12 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 8
  },
  sugarcane: {
    name: { en: "Sugarcane", hi: "गन्ना", te: "చెరకు" },
    image: farmHero,
    sowingTime: { en: "January – March", hi: "జనవరి – మాత్", te: "జనవరి – మార్చి" },
    water: "high",
    fertilizer: { en: "Heavy nitrogen required", hi: "भारी नाइट्रोजन की आवश्यकता", te: "ఎక్కువ నత్రజని అవసరం" },
    yield: { en: "300–400 quintals per acre", hi: "300–400 क्विंटल प्रति एकड़", te: "ఎకరానికి 300–400 క్వింటాళ్లు" },
    idealSeason: ["Year"],
    minRain: 30
  },
  chilli: {
    name: { en: "Chilli", hi: "మిర్చి", te: "మిర్చి" },
    image: farmHero,
    sowingTime: { en: "August – September", hi: "అగస్ట్ – సితంబర్", te: "ఆగస్టు – సెప్టెంబర్" },
    water: "medium",
    fertilizer: { en: "Use organic manure", hi: "జైవిక ఫాద్ కా ఉపయోగ کریں", te: "సేంద్రియ ఎరువు వాడండి" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 క్వింటాళ్లు", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 10
  },
  turmeric: {
     name: { en: "Turmeric", hi: "హోల్దీ", te: "పసుపు" },
     image: farmHero,
     sowingTime: { en: "May – June", hi: "మయ్ – జూన్", te: "మే – జూన్" },
     water: "high",
     fertilizer: { en: "Use FYM and Vermicompost", hi: "ఎఫ్ వైఎం మరియు వర్మికంపోస్ట్ వాడండి", te: "FYM మరియు వర్మికంపోస్ట్ వాడండి" },
     yield: { en: "20–25 quintals per acre", hi: "20–25 క్వింటాళ్లు", te: "ఎకరానికి 20–25 క్వింటాళ్లు" },
     idealSeason: ["Kharif"],
     minRain: 15
  }
};
