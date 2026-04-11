import React from "react";
import { 
  CloudRain, 
  Droplets, 
  AlertTriangle, 
  Thermometer, 
  Sprout
} from "lucide-react";

// REALISTIC SEASON BACKDROPS
const SEASON_IMAGES = {
    "Rainy": "https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?auto=format&fit=crop&q=80&w=800",
    "Dry": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    "Hot": "https://images.unsplash.com/photo-1542614471-001ccf90567e?auto=format&fit=crop&q=80&w=800",
    "Normal": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800"
};

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
    "Cool / Dry": { te: "శీతాకాలం", en: "Cool Season", hi: "सर्దీ का मौसम" },
    "Normal": { te: "సాధారణ కాలం", en: "Normal Season", hi: "सामान्य मौसम" }
  };

  const name = seasonNames[season]?.[language] || seasonNames[season]?.en || season;
  const bgImage = SEASON_IMAGES[season] || SEASON_IMAGES["Normal"];

  return (
    <div className="w-full h-44 rounded-[2rem] relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
        <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt={season} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/90 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="text-5xl mb-2 drop-shadow-xl">{getHeroIcon(season)}</div>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{name}</h1>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-[8px] font-black uppercase text-white tracking-widest">
                {t.favorable}
            </div>
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
    <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-2 mb-2">
            <Sprout size={18} className="text-[#1B5E20]" />
            <h2 className="text-sm font-black text-[#1B5E20] uppercase tracking-[0.15em]">{t.seasonalTitleBrief}</h2>
        </div>
        
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shadow-sm"><CloudRain size={18} /></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.rain}</span>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-base font-black text-slate-800">{getLabel(rLevel)}</p>
                    {renderDots(rLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shadow-sm"><Thermometer size={18} /></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.heat}</span>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-base font-black text-slate-800">{getLabel(tLevel)}</p>
                    {renderDots(tLevel)}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1B5E20] shadow-sm"><Droplets size={18} /></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.moisture}</span>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-base font-black text-slate-800">{getLabel(mLevel)}</p>
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
    <div className="w-full bg-[#FFF3E0] rounded-[2rem] p-6 border border-orange-200/30 flex items-start gap-4 shadow-sm animate-in slide-in-from-right duration-500">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-50 shrink-0">
            <AlertTriangle size={24} className="animate-pulse" />
        </div>
        <div className="space-y-2">
            <p className="text-[10px] font-black text-orange-800/60 uppercase tracking-[0.2em]">{t.risk}</p>
            <p className="text-sm font-black text-orange-950 leading-relaxed">{risks[0]}</p>
        </div>
    </div>
  );
};

// 🌱 SECTION 5: FINAL ADVICE
export const FinalAdvice = ({ advice, t }) => {
  if (!advice) return null;
  return (
    <div className="w-full bg-white rounded-[2rem] p-8 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1B5E20]" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 bg-[#F1F8E9] rounded-full flex items-center justify-center text-[#1B5E20] mb-4">
                <Sprout size={20} />
            </div>
            <h4 className="text-[10px] font-black text-[#1B5E20]/50 uppercase tracking-[0.2em] mb-3 bg-[#F1F8E9] px-3 py-1 rounded-full">{t.adviceTitle}</h4>
            <p className="text-base font-black text-slate-800 leading-tight tracking-tight italic text-center">
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
