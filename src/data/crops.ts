export const crops = [

  // 🌾 CEREALS (Alluvial, Clay, Red, Loamy, Black Sandy)
  {
    id: "paddy",
    name: "Paddy",
    districts: [
      "East Godavari", "West Godavari", "Krishna", "Guntur", "Nellore", "Bapatla", "NTR", "Konaseema", 
      "Kakinada", "Eluru", "Srikakulam", "Vizianagaram", "Prakasam", "Kurnool", "Nandyal", "Palnadu"
    ],
    soils: ["Alluvial Soil", "Clay Soil", "Delta Alluvial Soil", "Silty Soil", "Red Soil"],
    weather: ["rainy", "humid"],
    durationDays: 135,
    waterNeed: "High",
    climate: "Hot and Humid"
  },
  {
    id: "maize",
    name: "Maize",
    districts: [
      "Kurnool", "Anantapur", "YSR Kadapa", "Nandyal", "Annamayya", "NTR", "Guntur", "Prakasam", "Sri Sathya Sai",
      "Visakhapatnam", "Anakapalli", "Vizianagaram"
    ],
    soils: ["Loamy Soil", "Red Sandy Soil", "Red Soil", "Black Cotton Soil", "Alluvial Soil"],
    weather: ["normal", "rainy"],
    durationDays: 110,
    waterNeed: "Moderate",
    climate: "Warm and Temperate"
  },
  {
    id: "jowar",
    name: "Jowar",
    districts: [
      "Anantapur", "Kurnool", "Nandyal", "YSR Kadapa", "Prakasam", "Palnadu", "Sri Sathya Sai", "Tirupati"
    ],
    soils: ["Red Sandy Soil", "Black Soil", "Black Cotton Soil", "Red Soil", "Gravelly Soil"],
    weather: ["dry", "hot"],
    durationDays: 110,
    waterNeed: "Low",
    climate: "Hot and Dry"
  },
  {
    id: "bajra",
    name: "Bajra",
    districts: [
      "Anantapur", "Nandyal", "Sri Sathya Sai", "Kurnool", "YSR Kadapa", "Prakasam", "Annamayya"
    ],
    soils: ["Sandy Soil", "Red Sandy Soil", "Gravelly Soil", "Red Soil"],
    weather: ["dry", "hot"],
    durationDays: 85,
    waterNeed: "Low",
    climate: "Hot and Dry"
  },
  {
    id: "ragi",
    name: "Ragi",
    districts: [
      "Chittoor", "Tirupati", "Annamayya", "Visakhapatnam", "Vizianagaram", "Parvathipuram Manyam", 
      "Alluri Sitharama Raju", "Anakapalli", "Srikakulam", "Sri Sathya Sai"
    ],
    soils: ["Red Soil", "Laterite Soil", "Red Loam Soil", "Red Sandy Soil", "Gravelly Soil"],
    weather: ["normal", "dry"],
    durationDays: 115,
    waterNeed: "Moderate",
    climate: "Warm and Dry"
  },

  // 🌱 PULSES (Red, Black, Alluvial, Laterite)
  {
    id: "redgram",
    name: "Red Gram",
    districts: [
      "Prakasam", "Kurnool", "YSR Kadapa", "Nandyal", "Annamayya", "Palnadu", "Anantapur", "Sri Sathya Sai",
      "Tirupati", "Chittoor", "Vizianagaram"
    ],
    soils: ["Red Soil", "Black Soil", "Black Cotton Soil", "Laterite Soil"],
    weather: ["dry", "hot"],
    durationDays: 160,
    waterNeed: "Low",
    climate: "Hot and Dry"
  },
  {
    id: "greengram",
    name: "Green Gram",
    districts: [
      "Guntur", "Krishna", "Bapatla", "NTR", "East Godavari", "West Godavari", "Kakinada", "Eluru", "Prakasam"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Clay Soil", "Red Soil"],
    weather: ["normal"],
    durationDays: 65,
    waterNeed: "Moderate",
    climate: "Warm"
  },
  {
    id: "blackgram",
    name: "Black Gram",
    districts: [
      "Krishna", "Nellore", "Bapatla", "NTR", "Guntur", "Eluru", "Prakasam", "Palnadu", "Kurnool"
    ],
    soils: ["Black Cotton Soil", "Black Soil", "Alluvial Soil", "Clay Soil"],
    weather: ["rainy", "normal"],
    durationDays: 75,
    waterNeed: "Moderate",
    climate: "Warm and Humid"
  },
  {
    id: "bengalgram",
    name: "Bengal Gram",
    districts: [
      "Kurnool", "Anantapur", "Nandyal", "YSR Kadapa", "Prakasam", "Palnadu"
    ],
    soils: ["Black Cotton Soil", "Black Soil"],
    weather: ["cool", "dry"],
    durationDays: 105,
    waterNeed: "Low",
    climate: "Cool and Dry"
  },
  {
    id: "horsegram",
    name: "Horse Gram",
    districts: [
      "Anantapur", "Nandyal", "Sri Sathya Sai", "YSR Kadapa", "Annamayya", "Chittoor", "Visakhapatnam", "Parvathipuram Manyam"
    ],
    soils: ["Red Sandy Soil", "Gravelly Soil", "Red Soil", "Laterite Soil"],
    weather: ["dry", "hot"],
    durationDays: 140,
    waterNeed: "Low",
    climate: "Hot and Dry"
  },

  // 🌻 OILSEEDS (Sandy, Loamy, Laterite, Coastal)
  {
    id: "groundnut",
    name: "Groundnut",
    districts: [
      "Anantapur", "Kurnool", "Nandyal", "Annamayya", "Chittoor", "Tirupati", "YSR Kadapa", "Sri Sathya Sai", "Visakhapatnam"
    ],
    soils: ["Red Sandy Soil", "Red Soil", "Red Loam Soil", "Laterite Soil", "Gravelly Soil"],
    weather: ["dry", "hot"],
    durationDays: 110,
    waterNeed: "Moderate",
    climate: "Warm and Dry"
  },
  {
    id: "sunflower",
    name: "Sunflower",
    districts: [
      "YSR Kadapa", "Kurnool", "Nandyal", "Prakasam", "Anantapur", "NTR"
    ],
    soils: ["Loamy Soil", "Black Soil", "Red Soil"],
    weather: ["normal"],
    durationDays: 95,
    waterNeed: "Moderate",
    climate: "Warm and Sunny"
  },
  {
    id: "sesame",
    name: "Sesame",
    districts: [
      "Prakasam", "Bapatla", "Nellore", "Srikakulam", "Kakinada", "Konaseema", "Visakhapatnam", "Tirupati", "Krishna"
    ],
    soils: ["Sandy Soil", "Coastal Sandy Soil", "Saline Soil"],
    weather: ["hot", "dry"],
    durationDays: 85,
    waterNeed: "Low",
    climate: "Hot and Dry"
  },

  // 🌿 COMMERCIAL (Black Cotton, Alluvial)
  {
    id: "cotton",
    name: "Cotton",
    districts: [
      "Guntur", "Prakasam", "Kurnool", "Nandyal", "Palnadu", "YSR Kadapa", "Bapatla"
    ],
    soils: ["Black Cotton Soil", "Black Soil", "Red Soil"],
    weather: ["hot", "dry"],
    durationDays: 160,
    waterNeed: "Moderate",
    climate: "Hot and Dry"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    districts: [
      "Krishna", "East Godavari", "West Godavari", "NTR", "Visakhapatnam", "Anakapalli", "Chittoor", "Eluru"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Clay Soil", "Red Soil"],
    weather: ["humid", "rainy"],
    durationDays: 365,
    waterNeed: "Very High",
    climate: "Hot and Humid"
  },

  // 🍎 FRUITS (Red, Alluvial, Coastal, Saline)
  {
    id: "mango",
    name: "Mango",
    districts: [
      "Chittoor", "Tirupati", "Annamayya", "Krishna", "NTR", "Vizianagaram", "Eluru", "YSR Kadapa"
    ],
    soils: ["Red Soil", "Red Loam Soil", "Laterite Soil", "Gravelly Soil", "Loamy Soil"],
    weather: ["hot", "normal"],
    durationDays: 365,
    waterNeed: "Moderate",
    climate: "Hot and Humid"
  },
  {
    id: "banana",
    name: "Banana",
    districts: [
      "Guntur", "Krishna", "Bapatla", "NTR", "YSR Kadapa", "Anantapur", "Kurnool", "West Godavari", "East Godavari"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Red Soil", "Black Soil"],
    weather: ["humid", "normal"],
    durationDays: 330,
    waterNeed: "High",
    climate: "Warm and Humid"
  },
  {
    id: "coconut",
    name: "Coconut",
    districts: [
      "East Godavari", "West Godavari", "Konaseema", "Kakinada", "Srikakulam", "Bapatla", "Nellore", "Tirupati", "Vizianagaram"
    ],
    soils: ["Coastal Sandy Soil", "Delta Alluvial Soil", "Alluvial Soil", "Saline Soil"],
    weather: ["humid", "rainy"],
    durationDays: 365,
    waterNeed: "High",
    climate: "Coastal Humid"
  },

  // 🌶 VEGETABLES (Loamy, Black, Sandy, Red)
  {
    id: "tomato",
    name: "Tomato",
    districts: [
      "Chittoor", "Tirupati", "Anantapur", "Annamayya", "Kurnool", "Prakasam", "Visakhapatnam", "NTR"
    ],
    soils: ["Loamy Soil", "Red Soil", "Red Sandy Soil", "Alluvial Soil"],
    weather: ["normal"],
    durationDays: 110,
    waterNeed: "Moderate",
    climate: "Warm"
  },
  {
    id: "chilli",
    name: "Chilli",
    districts: [
      "Guntur", "Prakasam", "Bapatla", "Kurnool", "Nandyal", "Palnadu", "Krishna"
    ],
    soils: ["Black Soil", "Black Cotton Soil", "Red Soil"],
    weather: ["hot", "dry"],
    durationDays: 160,
    waterNeed: "Moderate",
    climate: "Warm and Dry"
  },
  {
    id: "onion",
    name: "Onion",
    districts: [
      "Kurnool", "YSR Kadapa", "Nandyal", "Anantapur", "Prakasam"
    ],
    soils: ["Sandy Soil", "Red Sandy Soil", "Red Soil", "Loamy Soil"],
    weather: ["dry", "cool"],
    durationDays: 130,
    waterNeed: "Moderate",
    climate: "Cool and Dry"
  },

  // 🌿 SPICES (Red, Laterite, Gravelly)
  {
    id: "turmeric",
    name: "Turmeric",
    districts: [
      "YSR Kadapa", "Nandyal", "Guntur", "Visakhapatnam", "Palnadu", "Chittoor"
    ],
    soils: ["Red Soil", "Loamy Soil", "Laterite Soil", "Black Soil"],
    weather: ["humid", "normal"],
    durationDays: 250,
    waterNeed: "High",
    climate: "Warm and Humid"
  },
  {
    id: "cashew",
    name: "Cashew",
    districts: [
      "Srikakulam", "Vizianagaram", "Visakhapatnam", "Anakapalli", "Bapatla", "Prakasam", "Nellore", "Tirupati", "Kakinada"
    ],
    soils: ["Coastal Sandy Soil", "Laterite Soil", "Red Soil", "Saline Soil"],
    weather: ["hot", "humid"],
    durationDays: 365,
    waterNeed: "Moderate",
    climate: "Hot and Humid"
  }

];
