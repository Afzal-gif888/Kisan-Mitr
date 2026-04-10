import { Sun, CloudRain, Droplets, AlertTriangle, Thermometer } from "lucide-react";
import { translations } from "@/lib/translations";

const SeasonalPrediction = ({ season, summary, message, language, risks = [] }) => {
  const t = translations[language] || translations.en;

  // Helper to render visual dot symbols ● ● ● ○ ○
  const renderSymbols = (value) => {
    let active = 0;
    if (value === "High" || value === "Wet") active = 5;
    else if (value === "Moderate" || value === "Normal" || value === "Medium") active = 3;
    else if (value === "Low" || value === "Dry") active = 1;

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

  // Farmer-friendly labels
  const getRainLabel = (val) => {
    if (val === "High") return language === "te" ? "భారీ వర్షాలు" : "Heavy Rain";
    if (val === "Low") return language === "te" ? "తక్కువ వర్షం" : "Light Rain";
    return language === "te" ? "వర్షం లేదు" : "No Rain";
  };

  const getHeatLabel = (val) => {
    if (val === "High") return language === "te" ? "తీవ్రమైన ఎండ" : "High Heat";
    if (val === "Moderate") return language === "te" ? "సాధారణ ఎండ" : "Moderate Heat";
    return language === "te" ? "చల్లగా ఉంటుంది" : "Cool";
  };

  const getMoistureLabel = (val) => {
    if (val === "High" || val === "Wet") return language === "te" ? "ఎక్కువ తేమ" : "Wet Soil";
    if (val === "Normal" || val === "Moderate") return language === "te" ? "సరైన తేమ" : "Normal Moisture";
    return language === "te" ? "పొడి నేల" : "Dry Soil";
  };

  const getSeasonLabel = (s) => {
    if (s === "Rainy") return t["Kharif (Rainy)"] || "Rainy Season";
    if (s === "Dry") return t["Zaid (Summer)"] || "Dry Season";
    return t["Moderate (Spring)"] || "Normal Season";
  };

  const getTeluguTitle = (s) => {
     if (s === "Rainy") return "వర్షాకాలం (ఖరీఫ్)";
     if (s === "Dry") return "ఎండాకాలం (జైద్)";
     return "సాధారణ వాతావరణం";
  };

  const getLocalizedMessage = (msg) => {
    if (language !== "te") return msg;
    if (msg.includes("stable")) return "వ్యవసాయానికి వాతావరణం అనుకూలంగా ఉంది";
    if (msg.includes("Dry conditions")) return "తక్కువ నీటి పంటలకు అనుకూలం";
    if (msg.includes("Rainy conditions")) return "వర్షాలు పడవచ్చు. నీరు నిల్వ ఉండకుండా చూసుకోండి";
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
