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
    weather: ["rainy", "humid"]
  },
  {
    id: "maize",
    name: "Maize",
    districts: [
      "Kurnool", "Anantapur", "Kadapa", "Nandyal", "Annamayya", "NTR", "Guntur", "Prakasam", "Sri Sathya Sai",
      "Visakhapatnam", "Anakapalli", "Vizianagaram"
    ],
    soils: ["Loamy Soil", "Red Sandy Soil", "Red Soil", "Black Cotton Soil", "Alluvial Soil"],
    weather: ["normal", "rainy"]
  },
  {
    id: "jowar",
    name: "Jowar",
    districts: [
      "Anantapur", "Kurnool", "Nandyal", "Kadapa", "Prakasam", "Palnadu", "Sri Sathya Sai", "Tirupati"
    ],
    soils: ["Red Sandy Soil", "Black Soil", "Black Cotton Soil", "Red Soil", "Gravelly Soil"],
    weather: ["dry", "hot"]
  },
  {
    id: "bajra",
    name: "Bajra",
    districts: [
      "Anantapur", "Nandyal", "Sri Sathya Sai", "Kurnool", "Kadapa", "Prakasam", "Annamayya"
    ],
    soils: ["Sandy Soil", "Red Sandy Soil", "Gravelly Soil", "Red Soil"],
    weather: ["dry", "hot"]
  },
  {
    id: "ragi",
    name: "Ragi",
    districts: [
      "Chittoor", "Tirupati", "Annamayya", "Visakhapatnam", "Vizianagaram", "Parvathipuram Manyam", 
      "Alluri Sitharama Raju", "Anakapalli", "Srikakulam", "Sri Sathya Sai"
    ],
    soils: ["Red Soil", "Laterite Soil", "Red Loam Soil", "Red Sandy Soil", "Gravelly Soil"],
    weather: ["normal", "dry"]
  },

  // 🌱 PULSES (Red, Black, Alluvial, Laterite)
  {
    id: "redgram",
    name: "Red Gram",
    districts: [
      "Prakasam", "Kurnool", "Kadapa", "Nandyal", "Annamayya", "Palnadu", "Anantapur", "Sri Sathya Sai",
      "Tirupati", "Chittoor", "Vizianagaram"
    ],
    soils: ["Red Soil", "Black Soil", "Black Cotton Soil", "Laterite Soil"],
    weather: ["dry", "hot"]
  },
  {
    id: "greengram",
    name: "Green Gram",
    districts: [
      "Guntur", "Krishna", "Bapatla", "NTR", "East Godavari", "West Godavari", "Kakinada", "Eluru", "Prakasam"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Clay Soil", "Red Soil"],
    weather: ["normal"]
  },
  {
    id: "blackgram",
    name: "Black Gram",
    districts: [
      "Krishna", "Nellore", "Bapatla", "NTR", "Guntur", "Eluru", "Prakasam", "Palnadu", "Kurnool"
    ],
    soils: ["Black Cotton Soil", "Black Soil", "Alluvial Soil", "Clay Soil"],
    weather: ["rainy", "normal"]
  },
  {
    id: "bengalgram",
    name: "Bengal Gram",
    districts: [
      "Kurnool", "Anantapur", "Nandyal", "Kadapa", "Prakasam", "Palnadu"
    ],
    soils: ["Black Cotton Soil", "Black Soil"],
    weather: ["cool", "dry"]
  },
  {
    id: "horsegram",
    name: "Horse Gram",
    districts: [
      "Anantapur", "Nandyal", "Sri Sathya Sai", "Kadapa", "Annamayya", "Chittoor", "Visakhapatnam", "Parvathipuram Manyam"
    ],
    soils: ["Red Sandy Soil", "Gravelly Soil", "Red Soil", "Laterite Soil"],
    weather: ["dry", "hot"]
  },

  // 🌻 OILSEEDS (Sandy, Loamy, Laterite, Coastal)
  {
    id: "groundnut",
    name: "Groundnut",
    districts: [
      "Anantapur", "Kurnool", "Nandyal", "Annamayya", "Chittoor", "Tirupati", "Kadapa", "Sri Sathya Sai", "Visakhapatnam"
    ],
    soils: ["Red Sandy Soil", "Red Soil", "Red Loam Soil", "Laterite Soil", "Gravelly Soil"],
    weather: ["dry", "hot"]
  },
  {
    id: "sunflower",
    name: "Sunflower",
    districts: [
      "Kadapa", "Kurnool", "Nandyal", "Prakasam", "Anantapur", "NTR"
    ],
    soils: ["Loamy Soil", "Black Soil", "Red Soil"],
    weather: ["normal"]
  },
  {
    id: "sesame",
    name: "Sesame",
    districts: [
      "Prakasam", "Bapatla", "Nellore", "Srikakulam", "Kakinada", "Konaseema", "Visakhapatnam", "Tirupati", "Krishna"
    ],
    soils: ["Sandy Soil", "Coastal Sandy Soil", "Saline Soil"],
    weather: ["hot", "dry"]
  },

  // 🌿 COMMERCIAL (Black Cotton, Alluvial)
  {
    id: "cotton",
    name: "Cotton",
    districts: [
      "Guntur", "Prakasam", "Kurnool", "Nandyal", "Palnadu", "Kadapa", "Bapatla"
    ],
    soils: ["Black Cotton Soil", "Black Soil", "Red Soil"],
    weather: ["hot", "dry"]
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    districts: [
      "Krishna", "East Godavari", "West Godavari", "NTR", "Visakhapatnam", "Anakapalli", "Chittoor", "Eluru"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Clay Soil", "Red Soil"],
    weather: ["humid", "rainy"]
  },

  // 🍎 FRUITS (Red, Alluvial, Coastal, Saline)
  {
    id: "mango",
    name: "Mango",
    districts: [
      "Chittoor", "Tirupati", "Annamayya", "Krishna", "NTR", "Vizianagaram", "Eluru", "Kadapa"
    ],
    soils: ["Red Soil", "Red Loam Soil", "Laterite Soil", "Gravelly Soil", "Loamy Soil"],
    weather: ["hot", "normal"]
  },
  {
    id: "banana",
    name: "Banana",
    districts: [
      "Guntur", "Krishna", "Bapatla", "NTR", "Kadapa", "Anantapur", "Kurnool", "West Godavari", "East Godavari"
    ],
    soils: ["Alluvial Soil", "Delta Alluvial Soil", "Red Soil", "Black Soil"],
    weather: ["humid", "normal"]
  },
  {
    id: "coconut",
    name: "Coconut",
    districts: [
      "East Godavari", "West Godavari", "Konaseema", "Kakinada", "Srikakulam", "Bapatla", "Nellore", "Tirupati", "Vizianagaram"
    ],
    soils: ["Coastal Sandy Soil", "Delta Alluvial Soil", "Alluvial Soil", "Saline Soil"],
    weather: ["humid", "rainy"]
  },

  // 🌶 VEGETABLES (Loamy, Black, Sandy, Red)
  {
    id: "tomato",
    name: "Tomato",
    districts: [
      "Chittoor", "Tirupati", "Anantapur", "Annamayya", "Kurnool", "Prakasam", "Visakhapatnam", "NTR"
    ],
    soils: ["Loamy Soil", "Red Soil", "Red Sandy Soil", "Alluvial Soil"],
    weather: ["normal"]
  },
  {
    id: "chilli",
    name: "Chilli",
    districts: [
      "Guntur", "Prakasam", "Bapatla", "Kurnool", "Nandyal", "Palnadu", "Krishna"
    ],
    soils: ["Black Soil", "Black Cotton Soil", "Red Soil"],
    weather: ["hot", "dry"]
  },
  {
    id: "onion",
    name: "Onion",
    districts: [
      "Kurnool", "Kadapa", "Nandyal", "Anantapur", "Prakasam"
    ],
    soils: ["Sandy Soil", "Red Sandy Soil", "Red Soil", "Loamy Soil"],
    weather: ["dry", "cool"]
  },

  // 🌿 SPICES (Red, Laterite, Gravelly)
  {
    id: "turmeric",
    name: "Turmeric",
    districts: [
      "Kadapa", "Nandyal", "Guntur", "Visakhapatnam", "Palnadu", "Chittoor"
    ],
    soils: ["Red Soil", "Loamy Soil", "Laterite Soil", "Black Soil"],
    weather: ["humid", "normal"]
  },
  {
    id: "cashew",
    name: "Cashew",
    districts: [
      "Srikakulam", "Vizianagaram", "Visakhapatnam", "Anakapalli", "Bapatla", "Prakasam", "Nellore", "Tirupati", "Kakinada"
    ],
    soils: ["Coastal Sandy Soil", "Laterite Soil", "Red Soil", "Saline Soil"], // Crucial addition to cover Saline and Coastal profiles
    weather: ["hot", "humid"]
  }

];
