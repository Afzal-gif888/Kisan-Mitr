import cropRice from "@/assets/crop-rice.jpg";
import cropWheat from "@/assets/crop-wheat.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSunflower from "@/assets/crop-sunflower.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";
import cropGroundnut from "@/assets/crop-groundnut.png";
import cropChilli from "@/assets/crop-chilli.png";
import cropSugarcane from "@/assets/crop-sugarcane.png";
import cropTurmeric from "@/assets/crop-turmeric.png";
import cropRedgram from "@/assets/crop-redgram.png";
import cropJowar from "@/assets/crop-jowar.png";
import cropBlackgram from "@/assets/crop-blackgram.png";
import cropTomato from "@/assets/crop-tomato.png";
import cropBajra from "@/assets/crop-bajra.png";
import cropRagi from "@/assets/crop-ragi.png";
import cropBengalgram from "@/assets/crop-bengalgram.png";
import cropGreengram from "@/assets/crop-greengram.png";
import cropOnion from "@/assets/crop-onion.png";
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
    fertilizer: { en: "Add compost once a month", hi: "महीने में एक बार खाद डालें", te: "నెలకు ఒకసారి కంపోస్ట్ వేయండి" },
    yield: { en: "18–22 quintals per acre", hi: "18–22 क्विंटল प्रति एकड़", te: "ఎకరానికి 18–22 క్వింటాళ్లు" },
    idealSeason: ["Kharif (Rainy)"],
    minRain: 12,
  },
  sunflower: {
    name: { en: "Sunflower", hi: "सूरजमुखी", te: "పొద్దుతిరుగుడు" },
    image: cropSunflower,
    sowingTime: { en: "January – February", hi: "జనవరి – ఫిబ్రవరి", te: "జనవరి – ఫిబ్రవరి" },
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
    image: cropGroundnut,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "Gypsum application is key", hi: "जिप्सम का प्रयोग महत्वपूर्ण है", te: "జిప్సం వాడకం ముఖ్యం" },
    yield: { en: "10–12 quintals per acre", hi: "10–12 क्विंटल प्रति एकड़", te: "ఎకరానికి 10–12 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 8
  },
  sugarcane: {
    name: { en: "Sugarcane", hi: "गन्ना", te: "చెరకు" },
    image: cropSugarcane,
    sowingTime: { en: "January – March", hi: "జనవరి – మార్చి", te: "జనవరి – మార్చి" },
    water: "high",
    fertilizer: { en: "Heavy nitrogen required", hi: "भारी नाइट्रोजन की आवश्यकता", te: "ఎక్కువ నత్రజని అవసరం" },
    yield: { en: "300–400 quintals per acre", hi: "300–400 क्विंटल प्रति एकड़", te: "ఎకరానికి 300–400 క్వింటాళ్లు" },
    idealSeason: ["Year"],
    minRain: 30
  },
  chilli: {
    name: { en: "Chilli", hi: "मिर्ची", te: "మిర్చి" },
    image: cropChilli,
    sowingTime: { en: "August – September", hi: "ఆగస్టు – సెప్టెంబర్", te: "ఆగస్టు – సెప్టెంబర్" },
    water: "medium",
    fertilizer: { en: "Use organic manure", hi: "सेंद्रिय ఎరువు వాడండి", te: "సేంద్రియ ఎరువు వాడండి" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 క్వింటాళ్లు", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 10
  },
  chillies: {
    name: { en: "Chillies", hi: "मिर्ची", te: "మిర్చి" },
    image: cropChilli,
    sowingTime: { en: "August – September", hi: "ఆగస్టు – సెప్టెంబర్", te: "ఆగస్టు – సెప్టెంబర్" },
    water: "medium",
    fertilizer: { en: "Use organic manure", hi: "सेंद्रિయ ఎరువు వాడండి", te: "సేంద్రియ ఎరువు వాడండి" },
    yield: { en: "15–20 quintals per acre", hi: "15–20 క్వింటాళ్లు", te: "ఎకరానికి 15–20 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 10
  },
  turmeric: {
    name: { en: "Turmeric", hi: "हल्दी", te: "పసుపు" },
    image: cropTurmeric,
    sowingTime: { en: "May – June", hi: "మే – జూన్", te: "మే – జూన్" },
    water: "high",
    fertilizer: { en: "Use FYM and Vermicompost", hi: "FYM మరియు వర్మికంపోస్ట్ వాడండి", te: "FYM మరియు వర్మికంపోస్ట్ వాడండి" },
    yield: { en: "20–25 quintals per acre", hi: "20–25 క్వింటాళ్లు", te: "ఎకరానికి 20–25 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 15
  },
  redgram: {
    name: { en: "Red Gram", hi: "अरहर", te: "కందులు" },
    image: cropRedgram,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "DAP + Phosphorus", hi: "DAP + ఫాస్ఫరస్", te: "DAP + ఫాస్ఫరస్" },
    yield: { en: "6–8 quintals per acre", hi: "6–8 క్వింటాళ్లు", te: "ఎకరానికి 6–8 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 8
  },
  jowar: {
    name: { en: "Jowar", hi: "ज्वार", te: "జొన్నలు" },
    image: cropJowar,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "NPK balanced", hi: "NPK సమతులం", te: "NPK సమతులం" },
    yield: { en: "12–15 quintals per acre", hi: "12–15 క్వింటాళ్లు", te: "ఎకరానికి 12–15 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 6
  },
  blackgram: {
    name: { en: "Black Gram", hi: "उड़द", te: "మినుములు" },
    image: cropBlackgram,
    sowingTime: { en: "October – November", hi: "అక్టోబర్ – నవంబర్", te: "అక్టోబర్ – నవంబర్" },
    water: "low",
    fertilizer: { en: "DAP + Phosphorus", hi: "DAP + ఫాస్ఫరస్", te: "DAP + ఫాస్ఫరస్" },
    yield: { en: "5–6 quintals per acre", hi: "5–6 క్వింటాళ్లు", te: "ఎకరానికి 5–6 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 8
  },
  tomato: {
    name: { en: "Tomato", hi: "टमाटर", te: "టమాటా" },
    image: cropTomato,
    sowingTime: { en: "Aug – Sep / Jan – Feb", hi: "ఆగస్టు – సెప్టెంబర్", te: "ఆగస్టు – సెప్టెంబర్" },
    water: "high",
    fertilizer: { en: "NPK + Micronutrients", hi: "NPK + మైక్రో న్యూట్రియంట్స్", te: "NPK + మైక్రో న్యూట్రియంట్స్" },
    yield: { en: "80–100 quintals per acre", hi: "80–100 క్వింటాళ్లు", te: "ఎకరానికి 80–100 క్వింటాళ్లు" },
    idealSeason: ["Kharif", "Rabi"],
    minRain: 10
  },
  bajra: {
    name: { en: "Bajra", hi: "बाजरा", te: "సజ్జలు" },
    image: cropBajra,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "NPK minimal", hi: "NPK తక్కువ", te: "NPK తక్కువ" },
    yield: { en: "8–12 quintals per acre", hi: "8–12 క్వింటాళ్లు", te: "ఎకరానికి 8–12 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 4
  },
  ragi: {
    name: { en: "Ragi", hi: "रागी", te: "రాగి" },
    image: cropRagi,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "Organic + NPK", hi: "సేంద్రియ + NPK", te: "సేంద్రియ + NPK" },
    yield: { en: "10–12 quintals per acre", hi: "10–12 క్వింటాళ్లు", te: "ఎకరానికి 10–12 క్వింటాళ్లు" },
    idealSeason: ["Kharif"],
    minRain: 6
  },
  bengalgram: {
    name: { en: "Bengal Gram", hi: "चना", te: "శనగలు" },
    image: cropBengalgram,
    sowingTime: { en: "October – November", hi: "అక్టోబర్ – నవంబర్", te: "అక్టోబర్ – నవంబర్" },
    water: "low",
    fertilizer: { en: "SSP + DAP", hi: "SSP + DAP", te: "SSP + DAP" },
    yield: { en: "6–8 quintals per acre", hi: "6–8 క్వింటాళ్లు", te: "ఎకరానికి 6–8 క్వింటాళ్లు" },
    idealSeason: ["Rabi"],
    minRain: 5
  },
  greengram: {
    name: { en: "Green Gram", hi: "मूंग", te: "పెసలు" },
    image: cropGreengram,
    sowingTime: { en: "June – July", hi: "జూన్ – జూలై", te: "జూన్ – జూలై" },
    water: "low",
    fertilizer: { en: "DAP minimal", hi: "DAP తక్కువ", te: "DAP తక్కువ" },
    yield: { en: "4–6 quintals per acre", hi: "4–6 క్వింటాళ్లు", te: "ఎకరానికి 4–6 క్వింటాళ్లు" },
    idealSeason: ["Kharif", "Summer"],
    minRain: 6
  },
  onion: {
    name: { en: "Onion", hi: "प्याज", te: "ఉల్లి" },
    image: cropOnion,
    sowingTime: { en: "Oct – Nov / Jun – Jul", hi: "అక్టోబర్ – నవంబర్", te: "అక్టోబర్ – నవంబర్" },
    water: "medium",
    fertilizer: { en: "NPK + Sulphur", hi: "NPK + సల్ఫర్", te: "NPK + సల్ఫర్" },
    yield: { en: "60–80 quintals per acre", hi: "60–80 క్వింటాళ్లు", te: "ఎకరానికి 60–80 క్వింటాళ్లు" },
    idealSeason: ["Kharif", "Rabi"],
    minRain: 8
  }
};
