import React from "react";
import { 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Thermometer, 
  Info
} from "lucide-react";
import { weatherText } from "@/translations/weather";

// 🌿 SECTION 1: HERO CARD
export const HeroCard = ({ season, language, t }) => {
  const getHeroIcon = (s) => {
    if (s === "Rainy") return "🌧️";
    if (s === "Dry") return "☀️";
    return "🌤️";
  };

  const seasonNames = {
    "Rainy": { te: "వర్షాకాలం", en: "Rainy Season", hi: "वर्षा ऋतु" },
    "Dry": { te: "ఎండాకాలం", en: "Dry Season", hi: "शुष्क मौसम" },
    "Hot": { te: "వేసవి కాలం", en: "Hot Season", hi: "गर्मी का मौसम" },
    "Cool / Dry": { te: "శీతాకాలం", en: "Cool Season", hi: "सर्दी का मौसम" },
    "Normal": { te: "సాధారణ కాలం", en: "Normal Season", hi: "सामान्य मौसम" }
  };

  const name = seasonNames[season]?.[language] || seasonNames[season]?.en || season;

  return (
    <div className="w-full bg-gradient-to-br from-[#8B5E3C] to-[#C49A6C] rounded-[2.5rem] p-8 text-center shadow-lg border-b-4 border-[#8B5E3C]/20 mt-4 animate-in fade-in zoom-in duration-500">
        <div className="text-7xl mb-4 drop-shadow-md">{getHeroIcon(season)}</div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{name}</h1>
        <p className="text-sm font-bold text-white/80">{t.favorable}</p>
    </div>
  );
};

// 📊 SECTION 2: SEASONAL SUMMARY
export const SeasonalSummary = ({ rLevel, tLevel, mLevel, t }) => {
  const renderDots = (level) => {
    const map = { "Very Low": 1, "Low": 1, "Mild": 1, "Cool": 1, "Dry": 1, "Normal": 3, "Moderate": 3, "High": 4, "Extreme": 5, "Very High": 5, "Wet": 5 };
    const count = map[level] || 2;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < count ? "bg-[#8B5E3C]" : "bg-[#8B5E3C]/20"}`} />
        ))}
      </div>
    );
  };

  const getLabel = (l) => {
    const map = { "Very Low": t.veryLow, "Low": t.low, "Normal": t.normal, "High": t.high, "Very High": t.veryHigh, "Extreme": t.veryHigh, "Moderate": t.normal, "Mild": t.low, "Dry": t.low, "Wet": t.high };
    return map[l] || l;
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-[#F5F1EB] mt-4 space-y-5">
        <h2 className="text-xs font-black text-[#8B5E3C]/40 uppercase tracking-[0.2em]">{t.seasonalTitleBrief}</h2>
        
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <CloudRain size={20} className="text-blue-500" />
                    <span className="text-sm font-bold text-[#5C3A21]">{t.rain}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#8B5E3C]">{getLabel(rLevel)}</span>
                    {renderDots(rLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Thermometer size={20} className="text-orange-500" />
                    <span className="text-sm font-bold text-[#5C3A21]">{t.heat}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#8B5E3C]">{getLabel(tLevel)}</span>
                    {renderDots(tLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Droplets size={20} className="text-emerald-500" />
                    <span className="text-sm font-bold text-[#5C3A21]">{t.moisture}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[#8B5E3C]">{getLabel(mLevel)}</span>
                    {renderDots(mLevel)}
                </div>
            </div>
        </div>
    </div>
  );
};

// ⚠️ SECTION 3: RISK ALERT
export const RiskAlert = ({ risks, t }) => {
  if (!risks || risks.length === 0) return null;
  return (
    <div className="w-full bg-orange-100 rounded-[2rem] p-5 mt-4 border border-orange-200 flex items-start gap-4 animate-pulse-subtle">
        <AlertTriangle size={24} className="text-orange-600 shrink-0" />
        <div>
            <p className="text-sm font-black text-orange-900 leading-tight mb-1">{risks[0]}</p>
            <p className="text-[10px] font-bold text-orange-800/60 uppercase tracking-widest">{t.risk}</p>
        </div>
    </div>
  );
};

// 🌱 SECTION 5: FINAL ADVICE
export const FinalAdvice = ({ advice, t }) => {
  if (!advice) return null;
  return (
    <div className="w-full bg-gradient-to-br from-[#8B5E3C] to-[#5C3A21] rounded-[2.5rem] p-8 text-center shadow-xl mt-4 relative overflow-hidden group">
        <div className="relative z-10">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-3">{t.adviceTitle}</h4>
            <p className="text-xl font-black text-white leading-tight tracking-tight italic">
                "{advice}"
            </p>
        </div>
    </div>
  );
};

const SeasonalPrediction = ({ ...props }) => {
  // This component is now just a container for the sub-components if needed in legacy code
  // But we will call sub-components directly in WeatherModule for the specific order.
  return null; 
};

export default SeasonalPrediction;
