import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DATA_GOV_API_KEY;

// 🔥 IMPORTANT: crop name mapping
const cropMap = {
  paddy: "Paddy(Dhan)(Common)",
  rice: "Paddy(Dhan)(Common)",
  groundnut: "Groundnut",
  cotton: "Cotton",
  maize: "Maize",
  chilli: "Chilli Red",
  chillies: "Chilli Red",
  onion: "Onion",
  cashew: "Cashew Kernels",
  cashewnuts: "Cashewnuts",
  turmeric: "Turmeric",
  tomato: "Tomato",
  banana: "Banana",
  coconut: "Coconut",
  mango: "Mango",
  jowar: "Jowar(Sorghum)",
  bajra: "Bajra(Pearl Millet)",
  ragi: "Ragi (Finger Millet)",
  redgram: "Arhar (Tur/Red Gram)(Whole)",
  greengram: "Green Gram (Moong)(Whole)",
  blackgram: "Black Gram (Urd Beans)(Whole)",
  bengalgram: "Bengal Gram (Gram)(Whole)",
  sesame: "Sesamum",
  horsegram: "Horse Gram",
  sugarcane: "Gur(Jaggery)",
  fenugreek: "Fenugreek Seed"
};


export const fetchCropPriceFromGov = async (cropName, retry = true) => {
  try {
    const lower = cropName.toLowerCase().trim();
    const commodity = cropMap[lower] || cropName;

    console.log(`🔎 Fetching price for: ${commodity} (Original: ${cropName})`);
    
    let response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": API_KEY,
          format: "json",
          "filters[commodity]": commodity,
          limit: 10 // Increased limit to find best match
        },
        timeout: 15000,
        headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
      }
    );

    // ⚡ FALLBACK: If specific name (e.g. 'Chilli Red') returns nothing, try generic name
    if ((!response.data.records || response.data.records.length === 0) && commodity !== cropName) {
        console.log(`⚠️ No data for ${commodity}. Trying fallback: ${cropName}`);
        response = await axios.get(
          "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
          {
            params: { "api-key": API_KEY, format: "json", "filters[commodity]": cropName, limit: 1 },
            timeout: 10000,
            headers: { "User-Agent": "Mozilla/5.0" }
          }
        );
    }

    const record = response.data.records?.[0];
    if (record) {
        console.log(`✅ Success: Found price for ${cropName} (${record.modal_price})`);
    } else {
        console.log(`❌ Fail: No price data available for ${cropName} on data.gov.in`);
    }


    return {
      crop: cropName,
      price: record?.modal_price || null,
      market: record?.market || null,
      district: record?.district || null
    };

  } catch (error) {
    if (retry && (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT')) {
      console.warn(`🔄 Connection reset. Retrying for ${cropName}...`);
      await new Promise(r => setTimeout(r, 1500));
      return fetchCropPriceFromGov(cropName, false);
    }

    console.error("API Error:", error.message);
    return { crop: cropName, price: null, market: null };
  }
};

