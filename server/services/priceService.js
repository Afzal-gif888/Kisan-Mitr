import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DATA_GOV_API_KEY;

// 🔥 IMPORTANT: crop name mapping
const cropMap = {
  paddy: "PADDY",
  rice: "PADDY",
  groundnut: "GROUNDNUT",
  cotton: "COTTON",
  maize: "MAIZE",
  chilli: "CHILLI",
  onion: "ONION",
  cashew: "Cashewnuts",
  turmeric: "Turmeric",
  tomato: "Tomato",
  banana: "Banana",
  coconut: "Coconut",
  mango: "Mango",
  jowar: "Jowar(Sorghum)",
  bajra: "Bajra(Pearl Millet)",
  ragi: "Ragi(Finger Millet)",
  redgram: "Red Gram",
  greengram: "Green Gram",
  blackgram: "Black Gram",
  bengalgram: "Bengal Gram(Gram)",
  sesame: "Sesamum(Sesame,Gingelly,Til)"
};

export const fetchCropPriceFromGov = async (cropName) => {
  try {
    const commodity = cropMap[cropName.toLowerCase()] || cropName.toUpperCase();

    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": API_KEY,
          format: "json",
          "filters[commodity]": commodity,
          limit: 1
        }
      }
    );

    const record = response.data.records?.[0];

    return {
      crop: cropName,
      price: record?.modal_price || null,
      market: record?.market || null,
      district: record?.district || null
    };

  } catch (error) {
    console.error("API Error:", error.message);

    return {
      crop: cropName,
      price: null,
      market: null
    };
  }
};
