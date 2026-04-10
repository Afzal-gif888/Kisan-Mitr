import { ArrowLeft, ArrowRight, CheckCircle2, Star, Sparkles, Sprout } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops, getRecommendation, SoilType } from "@/lib/cropData";

interface RecommendationScreenProps {
  language: Language;
  soil: SoilType;
  features: any;
  season: string;
  onViewGuide: (cropKey: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ language, soil, features, season, onViewGuide, onBack }: RecommendationScreenProps) => {
  const t = translations[language];
  const rec = getRecommendation(soil, season, features);
  const bestCrop = crops[rec.best];

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      {/* 1. TOP HEADER (DEEP SOIL) */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center gap-4 relative">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
              <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
              <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1">
                {t.bestCrop}
              </h2>
              <p className="text-[#C49A6C] text-[9px] font-black uppercase tracking-widest opacity-80 leading-none">Intelligence Step 03</p>
          </div>
          <Sparkles size={24} className="text-[#D4A373] animate-pulse" />
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        {/* Best crop highlight (MINIMAL & PREMIUM) */}
        <div className="relative group">
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white animate-scale-in">
            <div className="relative h-48 sm:h-56">
              <img src={bestCrop.image} alt={bestCrop.name[language]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#8B5E3C] text-white px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 shadow-lg tracking-widest uppercase">
                <Star size={14} className="fill-current" />
                {language === "te" ? "మీకు ఉత్తమ ఎంపిక" : "Top Match"}
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h3 className="text-3xl font-black text-[#5C3A21] mb-6 flex items-center justify-center gap-3 tracking-tighter">
                {bestCrop.name[language]}
              </h3>

              {/* Reasons (Minimalistic) */}
              <div className="bg-[#F5EFE6]/50 p-5 rounded-[2rem] space-y-4 mb-6 text-left border border-white">
                <p className="text-sm font-black flex items-center gap-2 text-[#8B5E3C]">
                  <Sprout size={18} />
                  {t.why}
                </p>
                <div className="grid gap-2.5">
                  {[
                    { icon: "🌧️", text: t.goodRainfall },
                    { icon: "🌱", text: t.suitableSoil },
                    { icon: "📅", text: t.rightSeason }
                  ].map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl border border-white/50 text-sm font-bold text-[#5C3A21]">
                      <span className="text-xl">{reason.icon}</span>
                      {reason.text}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onViewGuide(rec.best)}
                className="w-full py-5 bg-[#8B5E3C] text-white rounded-[1.8rem] text-xl font-black flex items-center justify-center gap-4 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t.viewGuide} <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Alternatives (Minimalist Grid) */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 px-2">
            <h4 className="text-[10px] font-black text-[#C49A6C] uppercase tracking-[0.3em] whitespace-nowrap">
              {t.alternatives}
            </h4>
            <div className="h-px w-full bg-[#8B5E3C]/10" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {rec.alternatives.map((key, i) => {
              const crop = crops[key];
              return (
                <button
                  key={key}
                  onClick={() => onViewGuide(key)}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-md border-2 border-transparent hover:border-[#8B5E3C]/20 active:scale-[0.95] transition-all animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="h-28 relative overflow-hidden">
                    <img src={crop.image} alt={crop.name[language]} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-black text-sm text-[#5C3A21] group-hover:text-[#8B5E3C] transition-colors">{crop.name[language]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
