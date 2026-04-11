import React from "react";
import { 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Thermometer, 
  Sprout
} from "lucide-react";

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
    "Hot": { te: "వేసవి కాలం", en: "Hot Season", hi: "गर्మీ కా मौसम" },
    "Cool / Dry": { te: "శీతాకాలం", en: "Cool Season", hi: "सर्दी का मौसम" },
    "Normal": { te: "సాధారణ కాలం", en: "Normal Season", hi: "सामान्य मौसम" }
  };

  const name = seasonNames[season]?.[language] || seasonNames[season]?.en || season;

  return (
    <div className="w-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[2rem] p-6 text-center shadow-[0_12px_24px_rgba(27,94,32,0.2)] mt-4 animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-3 drop-shadow-xl translate-y-[-5px]">{getHeroIcon(season)}</div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{name}</h1>
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-[9px] font-black uppercase text-white tracking-widest">
            {t.favorable}
        </div>
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
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < count ? "bg-[#1B5E20]" : "bg-[#1B5E20]/15"}`} />
        ))}
      </div>
    );
  };

  const getLabel = (l) => {
    const map = { "Very Low": t.veryLow, "Low": t.low, "Normal": t.normal, "High": t.high, "Very High": t.veryHigh, "Extreme": t.veryHigh, "Moderate": t.normal, "Mild": t.low, "Dry": t.low, "Wet": t.high };
    return map[l] || l;
  };

  return (
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mt-4 space-y-5">
        <div className="flex items-center gap-2">
            <Sprout size={14} className="text-[#1B5E20]" />
            <h2 className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.2em]">{t.seasonalTitleBrief}</h2>
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 shadow-sm"><CloudRain size={16} /></div>
                    <span className="text-xs font-black text-slate-700">{t.rain}</span>
                </div>
                <div className="text-right space-y-0.5">
                    <p className="text-xs font-black text-[#1B5E20]">{getLabel(rLevel)}</p>
                    {renderDots(rLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 shadow-sm"><Thermometer size={16} /></div>
                    <span className="text-xs font-black text-slate-700">{t.heat}</span>
                </div>
                <div className="text-right space-y-0.5">
                    <p className="text-xs font-black text-[#1B5E20]">{getLabel(tLevel)}</p>
                    {renderDots(tLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-[#1B5E20] shadow-sm"><Droplets size={16} /></div>
                    <span className="text-xs font-black text-slate-700">{t.moisture}</span>
                </div>
                <div className="text-right space-y-0.5">
                    <p className="text-xs font-black text-[#1B5E20]">{getLabel(mLevel)}</p>
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
    <div className="w-full bg-[#FFF3E0] rounded-[2rem] p-5 mt-4 border border-orange-200/30 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-50 shrink-0">
            <AlertTriangle size={20} className="animate-pulse" />
        </div>
        <div>
            <p className="text-[9px] font-black text-orange-800/50 uppercase tracking-[0.2em] mb-0.5">{t.risk}</p>
            <p className="text-xs font-black text-orange-950 leading-tight">{risks[0]}</p>
        </div>
    </div>
  );
};

// 🌱 SECTION 5: FINAL ADVICE
export const FinalAdvice = ({ advice, t }) => {
  if (!advice) return null;
  return (
    <div className="w-full bg-white rounded-[2rem] p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-slate-100 mt-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1B5E20]" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 bg-[#F1F8E9] rounded-full flex items-center justify-center text-[#1B5E20] mb-3">
                <Sprout size={16} />
            </div>
            <h4 className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.3em] mb-3 bg-[#F1F8E9] px-3 py-1 rounded-full">{t.adviceTitle}</h4>
            <p className="text-xl font-black text-slate-800 leading-tight tracking-tight italic">
                "{advice}"
            </p>
        </div>
    </div>
  );
};

const SeasonalPrediction = ({ ...props }) => {
  return null; 
};

export default SeasonalPrediction;
