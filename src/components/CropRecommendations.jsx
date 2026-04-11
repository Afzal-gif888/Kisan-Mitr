import React from "react";
import { Droplets, Thermometer, Info } from "lucide-react";

/**
 * CropRecommendations Component
 * Displays the top 3 recommended crops with icons and reasons.
 * Optimized for the Premium Earthy theme.
 */
const CropRecommendations = ({ recommendations, language, t }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const getRankIcon = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🌱";
  };

  const adviceTitle = language === "te" ? "🌾 సూచించబడిన పంటలు" : 
                    language === "hi" ? "🌾 अनुशंसित फसलें" : "🌾 Recommended Crops";

  return (
    <div className="w-full mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-3 px-1">
        <h2 className="text-sm font-semibold text-[#8B5E3C]/60 uppercase tracking-widest">{adviceTitle}</h2>
        <div className="h-px w-full bg-[#8B5E3C]/10" />
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 3).map((crop, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-[1.8rem] p-4 shadow-sm border border-[#F5F1EB] flex flex-col gap-2 group hover:border-[#8B5E3C]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRankIcon(idx)}</span>
                <span className="text-lg font-black text-[#8B5E3C] tracking-tight">{crop.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                  crop.suitability === "High" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                }`}>
                  {crop.suitability}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-1 border-t border-[#F5F1EB] pt-3">
              <div className="flex items-center gap-2">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {crop.waterNeed} {language === "te" ? "నీరు" : "Water"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer size={14} className="text-orange-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {crop.heatNeed} {language === "te" ? "వేడి" : "Heat"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-1">
              <Info size={12} className="text-[#8B5E3C]/40 mt-0.5 shrink-0" />
              <p className="text-[11px] font-bold text-[#5C3A21]/70 leading-tight">
                {crop.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 px-2 py-3 bg-[#8B5E3C]/5 rounded-2xl border border-[#8B5E3C]/10">
        <p className="text-[9px] font-bold text-[#8B5E3C]/60 leading-tight italic uppercase text-center tracking-tighter">
          ⚠️ {language === "te" ? "తుది నిర్ణయం తీసుకునే ముందు స్థానిక అధికారులను సంప్రదించండి." : "Check with local experts before finalizing."}
        </p>
      </div>
    </div>
  );
};

export default CropRecommendations;
