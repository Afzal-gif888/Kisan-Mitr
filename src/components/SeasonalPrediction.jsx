import { CloudRain, Droplets, AlertTriangle, Thermometer } from "lucide-react";
import { translations } from "@/lib/translations";

const SeasonalPrediction = ({ season, summary, message, language, risks = [] }) => {
  const t = translations[language] || translations.en;

  // Helper to render visual dot symbols ● ● ● ○ ○
  const renderSymbols = (value) => {
    const map = {
      "No": 0, "Very Low": 1, "Low": 1, "Dry": 1, "Cool": 1,
      "Mild": 2,
      "Medium": 3, "Moderate": 3, "Normal": 3,
      "High": 4, "Wet": 4,
      "Very High": 5, "Extreme": 5,
    };
    const active = map[value] ?? 2;

    return (
      <div className="flex gap-1 items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl leading-none ${i < active ? "text-[#8B5E3C]" : "text-[#8B5E3C]/20"}`}>
            ●
          </span>
        ))}
      </div>
    );
  };

  // Farmer-friendly labels (en / hi / te)
  const getRainLabel = (val) => {
    const labels = {
      "No":        { en: "No Rain",       hi: "बारिश नहीं",     te: "వర్షం లేదు" },
      "Very Low":  { en: "Very Low",      hi: "बहुत कम बारिश",  te: "చాలా తక్కువ వర్షం" },
      "Low":       { en: "Light Rain",    hi: "हल्की बारिश",     te: "తక్కువ వర్షం" },
      "Normal":    { en: "Normal Rain",   hi: "सामान्य बारिश",   te: "సాధారణ వర్షం" },
      "High":      { en: "Heavy Rain",    hi: "भारी बारिश",      te: "భారీ వర్షాలు" },
      "Very High": { en: "Very Heavy",    hi: "बहुत भारी बारिश", te: "చాలా భారీ వర్షాలు" },
    };
    return labels[val]?.[language] || labels[val]?.en || val;
  };

  const getHeatLabel = (val) => {
    const labels = {
      "Cool":     { en: "Cool",          hi: "ठंडा",           te: "చల్లగా ఉంటుంది" },
      "Mild":     { en: "Mild",          hi: "हल्की गर्मी",     te: "తేలికపాటి వేడి" },
      "Moderate": { en: "Moderate Heat",  hi: "सामान्य गर्मी",   te: "సాధారణ ఎండ" },
      "High":     { en: "High Heat",     hi: "तेज गर्मी",       te: "తీవ్రమైన ఎండ" },
      "Extreme":  { en: "Extreme Heat",  hi: "भीषण गर्मी",      te: "అత్యంత తీవ్రమైన ఎండ" },
    };
    return labels[val]?.[language] || labels[val]?.en || val;
  };

  const getMoistureLabel = (val) => {
    const labels = {
      "Dry":    { en: "Dry Soil",        hi: "सूखी मिट्टी",     te: "పొడి నేల" },
      "Low":    { en: "Low Moisture",    hi: "कम नमी",          te: "తక్కువ తేమ" },
      "Normal": { en: "Normal Moisture", hi: "सामान्य नमी",     te: "సరైన తేమ" },
      "Wet":    { en: "Wet Soil",        hi: "गीली मिट्टी",     te: "ఎక్కువ తేమ" },
    };
    return labels[val]?.[language] || labels[val]?.en || val;
  };

  const getSeasonLabel = (s) => {
    const labels = {
      "Rainy":      { en: "Rainy Season",  hi: "बारिश का मौसम",   te: "వర్షాకాలం" },
      "Dry":        { en: "Dry Season",    hi: "सूखा मौसम",       te: "ఎండాకాలం" },
      "Hot":        { en: "Hot Season",    hi: "गर्मी का मौसम",    te: "వేసవి కాలం" },
      "Cool / Dry": { en: "Cool Season",   hi: "सर्दी का मौसम",    te: "శీతాకాలం" },
      "Normal":     { en: "Normal Season", hi: "सामान्य मौसम",    te: "సాధారణ కాలం" },
    };
    return labels[s]?.[language] || labels[s]?.en || s;
  };

  const getTeluguTitle = (s) => {
    if (language === "hi") {
      if (s === "Rainy") return "खरीफ (वर्षा ऋतु)";
      if (s === "Dry" || s === "Hot") return "ज़ैद (ग्रीष्म ऋतु)";
      if (s === "Cool / Dry") return "रबी (शीत ऋतु)";
      return "सामान्य मौसम";
    }
    if (s === "Rainy") return "వర్షాకాలం (ఖరీఫ్)";
    if (s === "Dry" || s === "Hot") return "ఎండాకాలం (జైద్)";
    if (s === "Cool / Dry") return "శీతాకాలం (రబీ)";
    return "సాధారణ వాతావరణం";
  };

  const getLocalizedMessage = (msg) => {
    if (language === "en") return msg;
    // Telugu translations
    if (language === "te") {
      if (msg.includes("stable")) return "వ్యవసాయానికి వాతావరణం అనుకూలంగా ఉంది";
      if (msg.includes("Dry conditions")) return "పొడి వాతావరణం — తక్కువ నీటి పంటలు సురక్షితం";
      if (msg.includes("Very dry")) return "చాలా పొడి — కరువు-నిరోధక పంటలు మాత్రమే";
      if (msg.includes("Good moisture")) return "మంచి తేమ — వరి, వరి పంటలకు అనుకూలం";
      if (msg.includes("Hot weather")) return "వేడి వాతావరణం — నీరు పెట్టండి";
      if (msg.includes("Heavy rains")) return "భారీ వర్షాలు — మురుగు నీటి ఏర్పాటు చేయండి";
      if (msg.includes("Unexpected rain")) return "ఊహించని వర్షం — కోత పంటలను కప్పండి";
      if (msg.includes("Extreme heat")) return "తీవ్ర వేడి — పంటలను, పశువులను కాపాడండి";
      if (msg.includes("Cool season")) return "చల్లని కాలం — గోధుమ, శనగలకు అనుకూలం";
    }
    // Hindi translations
    if (language === "hi") {
      if (msg.includes("stable")) return "मौसम खेती के लिए अनुकूल है";
      if (msg.includes("Dry conditions")) return "सूखा मौसम — कम पानी की फसलें उगाएं";
      if (msg.includes("Very dry")) return "बहुत सूखा — केवल सूखा-सहनशील फसलें";
      if (msg.includes("Good moisture")) return "अच्छी नमी — धान और चावल की फसलों के लिए उपयुक्त";
      if (msg.includes("Hot weather")) return "गर्म मौसम — अच्छी सिंचाई करें";
      if (msg.includes("Cool season")) return "ठंडा मौसम — गेहूं, चना उगाने के लिए उपयुक्त";
    }
    return msg;
  };


  const getHeroIcon = (s) => {
    if (s === "Rainy") return "🌧";
    if (s === "Dry") return "☀️";
    return "🌤";
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-sm mx-auto">
      
      {/* 1. HERO CARD (REDUCED SIZE) */}
      <div className="w-full bg-white rounded-[2rem] p-8 text-center shadow-lg border-b-4 border-[#F5EFE6] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8B5E3C] to-[#C49A6C]" />
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="text-5xl mb-3 drop-shadow-sm select-none">
                {getHeroIcon(season)}
            </div>
            <h1 className="text-2xl font-black text-[#5C3A21] uppercase tracking-tighter mb-1">
                {getSeasonLabel(season)}
            </h1>
            <p className="text-base font-bold text-[#8B5E3C] italic opacity-70">
                {getTeluguTitle(season)}
            </p>
        </div>
      </div>

      {/* 2. BIG ICON ROW (MINIMAL CARDS) */}
      <div className="grid grid-cols-1 gap-4 px-1">
        
        {/* Rain Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-md border-l-4 border-blue-400 flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-500 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <CloudRain size={28} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">Rain</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">{getRainLabel(summary.rain)}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-black text-[#8B5E3C]/20 uppercase tracking-widest">Level</span>
                {renderSymbols(summary.rain)}
            </div>
        </div>

        {/* Heat Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-md border-l-4 border-orange-400 flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-500 shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                    <Thermometer size={28} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">Heat</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">{getHeatLabel(summary.heat)}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-black text-[#8B5E3C]/20 uppercase tracking-widest">Intensity</span>
                {renderSymbols(summary.heat)}
            </div>
        </div>

        {/* Moisture Card */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-md border-l-4 border-emerald-400 flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                    <Droplets size={28} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">Moisture</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">{getMoistureLabel(summary.moisture)}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-black text-[#8B5E3C]/20 uppercase tracking-widest">Soil State</span>
                {renderSymbols(summary.moisture)}
            </div>
        </div>

      </div>

      {/* 3. INSIGHT BOX (REFINED SIZE) */}
      <div className="bg-[#F5EFE6] p-6 rounded-[2rem] text-center shadow-lg border-2 border-white relative group">
        <p className="text-[#5C3A21] text-lg font-black leading-tight italic tracking-tight relative z-10">
            🌾 "{getLocalizedMessage(message).replace("Good for", language === "te" ? "అనుకూలం: " : "Good for")}"
        </p>
        <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 bg-white/40 rounded-full border border-white/50">
            <p className="text-[8px] font-black text-[#8B5E3C] uppercase tracking-[0.3em] leading-none">Smart Farming Guidance</p>
        </div>
      </div>

      {/* 4. RISK ALERT (COMPACT CAUTION) */}
      {risks.length > 0 && (
        <div className="bg-orange-50 border-4 border-white p-5 rounded-[2rem] flex items-center gap-5 shadow-lg animate-bounce-subtle">
            <div className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg ring-4 ring-orange-500/10">
                <AlertTriangle size={20} />
            </div>
            <div>
                <p className="text-[9px] font-black text-orange-800 uppercase tracking-widest mb-1">{language === "te" ? "హెచ్చరిక" : "Caution"}</p>
                <p className="text-base font-black text-[#5C3A21] leading-tight">
                    {risks[0]}
                </p>
            </div>
        </div>
      )}

    </div>
  );
};

export default SeasonalPrediction;
