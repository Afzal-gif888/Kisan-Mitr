// 🖼️ Centralized Crop Image Mapping System
// Standardizing all agricultural assets to natural, field-based photography

import paddy from "@/assets/crops/paddy.png";
import maize from "@/assets/crops/maize.png";
import groundnut from "@/assets/crops/groundnut.png";
import cotton from "@/assets/crops/cotton.png";
import sugarcane from "@/assets/crops/sugarcane.png";
import mango from "@/assets/crops/mango.png";
import banana from "@/assets/crops/banana.png";
import tomato from "@/assets/crops/tomato.png";
import chilli from "@/assets/crops/chilli.png";

const cropImages: Record<string, string> = {
  "Paddy": paddy,
  "Maize": maize,
  "Groundnut": groundnut,
  "Cotton": cotton,
  "Sugarcane": sugarcane,
  "Mango": mango,
  "Banana": banana,
  "Tomato": tomato,
  "Chilli": chilli,
  
  // Agricultural Fallbacks for newly mapped crops (Linked to standard names in apCropsDataset.json)
  "Jowar": "https://images.unsplash.com/photo-1530519729491-acf515b9b961?auto=format&fit=crop&q=80&w=1000",
  "Bajra": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
  "Ragi": "https://images.unsplash.com/photo-1596450514735-31ce7697395e?auto=format&fit=crop&q=80&w=1000",
  "Red Gram": "https://images.unsplash.com/photo-1596450514735-31ce7697395e?auto=format&fit=crop&q=80&w=1000",
  "Green Gram": "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=1000",
  "Black Gram": "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=1000",
  "Bengal Gram": "https://images.unsplash.com/photo-1629117732990-6da456ae86e5?auto=format&fit=crop&q=80&w=1000",
  "Horse Gram": "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=1000",
  "Cowpea": "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=1000",
  "Sunflower": "https://images.unsplash.com/photo-1597424216782-488663806a74?auto=format&fit=crop&q=80&w=1000",
  "Black Sesame": "https://images.unsplash.com/photo-1536630596251-b12ba0d7f79a?auto=format&fit=crop&q=80&w=1000",
  "White Sesame": "https://images.unsplash.com/photo-1536630596251-b12ba0d7f79a?auto=format&fit=crop&q=80&w=1000",
  "Castor": "https://images.unsplash.com/photo-1536630596251-b12ba0d7f79a?auto=format&fit=crop&q=80&w=1000",
  "Tobacco": "https://images.unsplash.com/photo-1551609189-eba71b3a8566?auto=format&fit=crop&q=80&w=1000",
  "Oil Palm": "https://images.unsplash.com/photo-1588613437144-8fc7981507d3?auto=format&fit=crop&q=80&w=1000",
  "Coconut": "https://images.unsplash.com/photo-1551609189-eba71b3a8566?auto=format&fit=crop&q=80&w=1000",
  "Guava": "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=1000",
  "Papaya": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000",
  "Sapota": "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=1000",
  "Brinjal": "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=1000",
  "Onion": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=1000",
  "Okra": "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=1000",
  "Drumstick": "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=1000",
  "Turmeric": "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=1000",
  "Coriander": "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=1000",
  "Fenugreek": "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=1000",
  "Mustard": "https://images.unsplash.com/photo-1597424153997-22d76f827878?auto=format&fit=crop&q=80&w=1000",
  "Cashew": "https://images.unsplash.com/photo-1596450514735-31ce7697395e?auto=format&fit=crop&q=80&w=1000",
  "Arecanut": "https://images.unsplash.com/photo-1551609189-eba71b3a8566?auto=format&fit=crop&q=80&w=1000",
  "Coffee": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
  "Black Pepper": "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=1000"
};

export default cropImages;
