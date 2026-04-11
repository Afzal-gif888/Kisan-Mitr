import { 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  Info,
  ShieldCheck,
  Waves
} from "lucide-react";
import { translations } from "@/lib/translations";

const SeasonalPrediction = ({ 
  season, 
  summary, 
  message, 
  language, 
  risks = [], 
  seasonalDetails, 
  seasonalTrends, 
  confidence, 
  insights = [],
  farmerInsights
}) => {
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

  const getHeroIcon = (s) => {
    if (s === "Rainy") return "🌧";
    if (s === "Dry") return "☀️";
    return "🌤";
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-lg mx-auto">
      
      {/* 1. HERO CARD - SEASONAL PRIORITY */}
      <div className="w-full bg-gradient-to-br from-[#8B5E3C] to-[#2E7D32] rounded-[2.5rem] p-8 text-center shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
            <Waves size={120} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="text-7xl mb-6 drop-shadow-2xl select-none animate-bounce-subtle">
                {getHeroIcon(season)}
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-sm">
                {getSeasonLabel(season)}
            </h1>
        </div>
      </div>

      {/* 2. CORE INTELLIGENCE CARDS (FARMER FRIENDLY) */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Rain Card */}
        <div className="bg-white rounded-[2rem] p-5 shadow-md border border-[#F5EFE6] flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-50/50 rounded-2xl text-blue-500 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <CloudRain size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">{language === "te" ? "వర్షం" : "Rainfall"}</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">
                        {farmerInsights ? farmerInsights.rain.level : summary.rain}
                   </p>
                </div>
            </div>
            {renderSymbols(farmerInsights ? farmerInsights.rain.level : summary.rain)}
        </div>

        {/* Heat Card */}
        <div className="bg-white rounded-[2rem] p-5 shadow-md border border-[#F5EFE6] flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-50/50 rounded-2xl text-orange-500 shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                    <Thermometer size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">{language === "te" ? "వేడి" : "Heat Pattern"}</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">{farmerInsights ? farmerInsights.temperature.level : summary.heat}</p>
                </div>
            </div>
            {renderSymbols(farmerInsights ? farmerInsights.temperature.level : summary.heat)}
        </div>

        {/* Moisture Card */}
        <div className="bg-white rounded-[2rem] p-5 shadow-md border border-[#F5EFE6] flex items-center justify-between group hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-50/50 rounded-2xl text-emerald-500 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                    <Droplets size={28} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#C49A6C] uppercase tracking-[0.2em] mb-0.5">{language === "te" ? "తేమ" : "Moisture"}</p>
                   <p className="text-lg font-black text-[#5C3A21] tracking-tight">{farmerInsights ? farmerInsights.moisture.level : summary.moisture}</p>
                </div>
            </div>
            {renderSymbols(farmerInsights ? farmerInsights.moisture.level : summary.moisture)}
        </div>
      </div>

      {/* 3. ONE-LINE INSIGHT & RISKS */}
      {(farmerInsights || risks.length > 0) && (
        <div className="bg-[#F5EFE6]/50 rounded-[2.5rem] p-6 border-2 border-white shadow-inner space-y-4">
            {/* One Line Insight */}
            {farmerInsights && (
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#8B5E3C] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#8B5E3C]/20">
                        <Info size={20} className="text-white" />
                    </div>
                    <p className="text-base font-black text-[#5C3A21] leading-tight tracking-tight italic">
                        "{language === "te" ? farmerInsights.summary : 
                          farmerInsights.summary === "సాధారణ వాతావరణం — పంటలకు అనుకూలం" ? "Normal weather — suitable for crops" : 
                          farmerInsights.summary}"
                    </p>
                </div>
            )}

            {/* Risk Alert */}
            {risks.length > 0 && (
                <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-200 flex items-start gap-4 animate-pulse-subtle">
                    <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{language === "te" ? "ప్రమాద హెచ్చరిక" : "Risk Detected"}</p>
                        {risks.slice(0, 1).map((r, i) => (
                            <p key={i} className="text-sm font-black text-[#5C3A21] leading-tight">
                                {r}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}


    </div>
  );
};

export default SeasonalPrediction;
