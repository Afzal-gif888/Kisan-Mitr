import axios from 'axios';

const crops = [
  "paddy", "maize", "jowar", "bajra", "ragi", 
  "redgram", "greengram", "blackgram", "bengalgram",
  "horsegram", "cowpea", "groundnut", "sunflower", 
  "sesame", "castor", "cotton", "sugarcane", "tobacco",
  "mango", "banana", "coconut", "guava", "papaya", "sapota",
  "tomato", "chilli", "brinjal", "onion", "okra", "drumstick",
  "turmeric", "coriander", "fenugreek", "mustard", "cashew", "arecanut"
];

const cropNameMapping = {
  "paddy": "Paddy(Dhan)(Common)",
  "redgram": "Arhar (Tur/Red Gram)(Whole)",
  "greengram": "Green Gram (Moong)(Whole)",
  "blackgram": "Black Gram (Urd Beans)(Whole)",
  "bengalgram": "Bengal Gram (Gram)(Whole)",
  "bajra": "Bajra(Pearl Millet)",
  "ragi": "Ragi (Finger Millet)",
  "jowar": "Jowar(Sorghum)",
  "okra": "Bhindi(Ladies Finger)",
  "chilli": "Chillies",
  "sesame": "Sesamum"
};

async function verifyAllPrices() {
  console.log("🔍 Starting Comprehensive Crop Price Verification...");
  console.log("--------------------------------------------------");
  
  const results = [];

  for (const crop of crops) {
    const agmarknetName = cropNameMapping[crop] || crop.charAt(0).toUpperCase() + crop.slice(1);
    try {
      const response = await axios.get(`http://localhost:5000/api/prices/fetch?crop=${encodeURIComponent(agmarknetName)}`);
      const data = response.data;
      
      if (data.price) {
        console.log(`✅ ${crop.padEnd(12)} | Found: ${data.price} | Market: ${data.market}`);
        results.push({ crop, status: "OK", price: data.price });
      } else {
        console.log(`❌ ${crop.padEnd(12)} | NOT AVAILABLE`);
        results.push({ crop, status: "FAIL", nameUsed: agmarknetName });
      }
    } catch (error) {
       console.log(`⚠️ ${crop.padEnd(12)} | ERROR: ${error.message}`);
       results.push({ crop, status: "ERROR" });
    }
  }

  console.log("--------------------------------------------------");
  const fails = results.filter(r => r.status !== "OK");
  console.log(`📊 Summary: ${results.length - fails.length} OK, ${fails.length} FAILED.`);
  
  if (fails.length > 0) {
    console.log("\n🛑 Failed Items:");
    fails.forEach(f => console.log(` - ${f.crop} (${f.nameUsed || 'Error'})`));
  }
}

verifyAllPrices();
