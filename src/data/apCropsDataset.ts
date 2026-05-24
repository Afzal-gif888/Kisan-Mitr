export type Crop = {
  id: string;
  name: string;
  category: string;
  districts: string[];
  soils: string[];
  weather: string[];
  waterNeed: "low" | "moderate" | "high";
};

export const crops: Crop[] = [

  // 🌾 CEREALS (5)
  {
    id: "paddy",
    name: "Paddy",
    category: "cereal",
    districts: ["East Godavari","West Godavari","Krishna","Guntur","Nellore"],
    soils: ["Alluvial Soil","Clay Soil"],
    weather: ["rainy","humid"],
    waterNeed: "high"
  },
  {
    id: "maize",
    name: "Maize",
    category: "cereal",
    districts: ["Kurnool","Anantapur","Kadapa"],
    soils: ["Loamy Soil","Red Sandy Soil"],
    weather: ["normal","rainy"],
    waterNeed: "moderate"
  },
  {
    id: "jowar",
    name: "Jowar",
    category: "cereal",
    districts: ["Anantapur","Kurnool"],
    soils: ["Red Sandy Soil"],
    weather: ["dry","hot"],
    waterNeed: "low"
  },
  {
    id: "bajra",
    name: "Bajra",
    category: "cereal",
    districts: ["Anantapur"],
    soils: ["Sandy Soil"],
    weather: ["dry","hot"],
    waterNeed: "low"
  },
  {
    id: "ragi",
    name: "Ragi",
    category: "cereal",
    districts: ["Chittoor"],
    soils: ["Red Soil","Laterite Soil"],
    weather: ["normal"],
    waterNeed: "low"
  },

  // 🌱 PULSES (6)
  {
    id: "redgram",
    name: "Red Gram",
    category: "pulse",
    districts: ["Prakasam","Kurnool","Kadapa"],
    soils: ["Red Soil"],
    weather: ["dry","hot"],
    waterNeed: "low"
  },
  {
    id: "greengram",
    name: "Green Gram",
    category: "pulse",
    districts: ["Guntur","Krishna"],
    soils: ["Alluvial Soil"],
    weather: ["normal"],
    waterNeed: "low"
  },
  {
    id: "blackgram",
    name: "Black Gram",
    category: "pulse",
    districts: ["Krishna","Nellore"],
    soils: ["Black Cotton Soil"],
    weather: ["rainy"],
    waterNeed: "low"
  },
  {
    id: "bengalgram",
    name: "Bengal Gram",
    category: "pulse",
    districts: ["Kurnool","Anantapur"],
    soils: ["Black Cotton Soil"],
    weather: ["cool","dry"],
    waterNeed: "low"
  },
  {
    id: "horsegram",
    name: "Horse Gram",
    category: "pulse",
    districts: ["Anantapur"],
    soils: ["Red Sandy Soil"],
    weather: ["dry"],
    waterNeed: "low"
  },
  {
    id: "cowpea",
    name: "Cowpea",
    category: "pulse",
    districts: ["Guntur","Prakasam"],
    soils: ["Sandy Soil"],
    weather: ["hot"],
    waterNeed: "low"
  },

  // 🌻 OILSEEDS (6)
  {
    id: "groundnut",
    name: "Groundnut",
    category: "oilseed",
    districts: ["Anantapur","Kurnool"],
    soils: ["Red Sandy Soil"],
    weather: ["dry","hot"],
    waterNeed: "low"
  },
  {
    id: "sunflower",
    name: "Sunflower",
    category: "oilseed",
    districts: ["Kadapa","Kurnool"],
    soils: ["Loamy Soil"],
    weather: ["normal"],
    waterNeed: "moderate"
  },
  {
    id: "sesame",
    name: "Sesame",
    category: "oilseed",
    districts: ["Prakasam"],
    soils: ["Sandy Soil"],
    weather: ["hot"],
    waterNeed: "low"
  },
  {
    id: "blacksesame",
    name: "Black Sesame",
    category: "oilseed",
    districts: ["Prakasam"],
    soils: ["Sandy Soil"],
    weather: ["hot"],
    waterNeed: "low"
  },
  {
    id: "whitesesame",
    name: "White Sesame",
    category: "oilseed",
    districts: ["Guntur"],
    soils: ["Sandy Soil"],
    weather: ["hot"],
    waterNeed: "low"
  },
  {
    id: "castor",
    name: "Castor",
    category: "oilseed",
    districts: ["Anantapur"],
    soils: ["Red Soil"],
    weather: ["dry"],
    waterNeed: "low"
  },

  // 🌿 COMMERCIAL (4)
  {
    id: "cotton",
    name: "Cotton",
    category: "commercial",
    districts: ["Guntur","Prakasam"],
    soils: ["Black Cotton Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    category: "commercial",
    districts: ["Krishna","East Godavari"],
    soils: ["Alluvial Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },
  {
    id: "tobacco",
    name: "Tobacco",
    category: "commercial",
    districts: ["Prakasam"],
    soils: ["Sandy Soil"],
    weather: ["dry"],
    waterNeed: "moderate"
  },
  {
    id: "oilpalm",
    name: "Oil Palm",
    category: "commercial",
    districts: ["East Godavari"],
    soils: ["Alluvial Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },

  // 🍎 FRUITS (8)
  {
    id: "mango",
    name: "Mango",
    category: "fruit",
    districts: ["Chittoor","Krishna"],
    soils: ["Red Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruit",
    districts: ["Guntur","Krishna"],
    soils: ["Alluvial Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },
  {
    id: "coconut",
    name: "Coconut",
    category: "fruit",
    districts: ["East Godavari","West Godavari"],
    soils: ["Coastal Sandy Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },
  {
    id: "guava",
    name: "Guava",
    category: "fruit",
    districts: ["Chittoor"],
    soils: ["Loamy Soil"],
    weather: ["normal"],
    waterNeed: "moderate"
  },
  {
    id: "papaya",
    name: "Papaya",
    category: "fruit",
    districts: ["Anantapur"],
    soils: ["Red Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "sapota",
    name: "Sapota",
    category: "fruit",
    districts: ["Chittoor"],
    soils: ["Red Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "cashew",
    name: "Cashew",
    category: "fruit",
    districts: ["Visakhapatnam"],
    soils: ["Laterite Soil"],
    weather: ["humid"],
    waterNeed: "low"
  },
  {
    id: "arecanut",
    name: "Arecanut",
    category: "fruit",
    districts: ["East Godavari"],
    soils: ["Alluvial Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },

  // 🌶 VEGETABLES (6)
  {
    id: "tomato",
    name: "Tomato",
    category: "vegetable",
    districts: ["Chittoor","Anantapur"],
    soils: ["Loamy Soil"],
    weather: ["normal"],
    waterNeed: "moderate"
  },
  {
    id: "chilli",
    name: "Chilli",
    category: "vegetable",
    districts: ["Guntur"],
    soils: ["Black Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "brinjal",
    name: "Brinjal",
    category: "vegetable",
    districts: ["Kurnool"],
    soils: ["Loamy Soil"],
    weather: ["normal"],
    waterNeed: "moderate"
  },
  {
    id: "onion",
    name: "Onion",
    category: "vegetable",
    districts: ["Kurnool","Kadapa"],
    soils: ["Sandy Soil"],
    weather: ["dry"],
    waterNeed: "low"
  },
  {
    id: "okra",
    name: "Okra",
    category: "vegetable",
    districts: ["Guntur"],
    soils: ["Loamy Soil"],
    weather: ["hot"],
    waterNeed: "moderate"
  },
  {
    id: "drumstick",
    name: "Drumstick",
    category: "vegetable",
    districts: ["Anantapur"],
    soils: ["Red Soil"],
    weather: ["dry"],
    waterNeed: "low"
  },

  // 🌿 SPICES (5)
  {
    id: "turmeric",
    name: "Turmeric",
    category: "spice",
    districts: ["Kadapa"],
    soils: ["Red Soil"],
    weather: ["humid"],
    waterNeed: "high"
  },
  {
    id: "coriander",
    name: "Coriander",
    category: "spice",
    districts: ["Kurnool"],
    soils: ["Loamy Soil"],
    weather: ["cool"],
    waterNeed: "low"
  },
  {
    id: "fenugreek",
    name: "Fenugreek",
    category: "spice",
    districts: ["Kurnool"],
    soils: ["Loamy Soil"],
    weather: ["cool"],
    waterNeed: "low"
  },
  {
    id: "mustard",
    name: "Mustard",
    category: "spice",
    districts: ["Kadapa"],
    soils: ["Alluvial Soil"],
    weather: ["cool"],
    waterNeed: "low"
  },
  {
    id: "cumin",
    name: "Cumin",
    category: "spice",
    districts: ["Anantapur"],
    soils: ["Sandy Soil"],
    weather: ["dry"],
    waterNeed: "low"
  }

];
