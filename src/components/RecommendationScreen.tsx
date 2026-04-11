import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, Droplets, Thermometer, CheckCircle2, Star, Check } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { getAPCropRecommendations } from "@/utils/cropRecommendationEngine";

// Import existing images
import cropRice from "@/assets/crop-rice.jpg";
import cropMaize from "@/assets/crop-maize.jpg";
import cropSunflower from "@/assets/crop-sunflower.jpg";
import cropCotton from "@/assets/crop-cotton.jpg";
import cropWheat from "@/assets/crop-wheat.jpg";
import farmHero from "@/assets/farm-hero.jpg"; // Fallback image

interface RecommendationScreenProps {
  language: Language;
  soil: string;
  weatherResult: any;
  onViewGuide: (cropKey: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ language, soil, weatherResult, onViewGuide, onBack }: RecommendationScreenProps) => {
  const t = translations[language];
  
  const recommendations = useMemo(() => {
    return getAPCropRecommendations(weatherResult, soil, weatherResult.district, language);
  }, [weatherResult, soil, language]);

  const topCrops = recommendations.recommendedCrops.slice(0, 3);

  const getImage = (name: string) => {
      const lower = name.toLowerCase();
      if (lower.includes("paddy") || lower.includes("rice")) return cropRice;
      if (lower.includes("maize")) return cropMaize;
      if (lower.includes("sunflower")) return cropSunflower;
      if (lower.includes("cotton")) return cropCotton;
      if (lower.includes("wheat")) return cropWheat;
      return farmHero; 
  };

  const getRankData = (index: number) => {
    const ranks = {
        0: { icon: "🥇", label: language === "te" ? "ఉత్తమ ఎంపిక" : "Best Choice", color: "from-amber-400 to-amber-600" },
        1: { icon: "🥈", label: language === "te" ? "మంచి ఎంపిక" : "Good Choice", color: "from-slate-300 to-slate-500" },
        2: { icon: "🥉", label: language === "te" ? "ప్రత్యామ్నాయం" : "Alternative", color: "from-orange-400 to-orange-600" }
    };
    return ranks[index] || ranks[2];
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER (BRANDED BROWN) */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between relative">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter">
                {language === "te" ? "మీకు సరైన పంటలు" : "Suggested Crops"}
            </h2>
            <p className="text-[#C49A6C] text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">Decision Intelligence</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Star className="text-[#D4A373] fill-current" size={20} />
          </div>
      </div>

      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        
        {/* DISTRICT CONTEXT LABEL */}
        {recommendations.districtAdvice && (
            <div className="px-2">
                <p className="text-[10px] font-black text-[#8B5E3C] uppercase tracking-[0.3em] opacity-60">
                    📍 {recommendations.districtAdvice}
                </p>
            </div>
        )}

        {/* CROP CARDS LIST */}
        <div className="space-y-10 mt-4">
            {topCrops.map((crop, idx) => {
                const rank = getRankData(idx);
                const isBest = idx === 0;
                
                return (
                    <div 
                        key={idx} 
                        className={`bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all duration-700 animate-in slide-in-from-bottom-12 ${isBest ? 'scale-105 border-[#8B5E3C]/20 ring-4 ring-[#8B5E3C]/5 z-10 shadow-emerald-900/10' : 'scale-100'}`}
                        style={{ animationDelay: `${idx * 200}ms` }}
                    >
                        {/* 🖼️ IMAGE SECTION */}
                        <div className="relative h-48 sm:h-52 overflow-hidden">
                            <img 
                                src={getImage(crop.englishName)} 
                                alt={crop.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            
                            {/* Rank Badge */}
                            <div className={`absolute top-4 right-4 px-5 py-2 rounded-full bg-gradient-to-r ${rank.color} text-white shadow-2xl flex items-center gap-2 border border-white/20`}>
                                <span className="text-lg">{rank.icon}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{rank.label}</span>
                            </div>
                        </div>

                        {/* 📝 CONTENT SECTION */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-3xl font-black text-[#5C3A21] tracking-tighter mb-2">
                                    {crop.englishName} ({crop.teluguName})
                                </h3>
                                <div className="space-y-1.5 mt-4">
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-emerald-500 rounded-full p-1 mt-0.5 shrink-0">
                                            <Check size={10} className="text-white" />
                                        </div>
                                        <p className="text-sm font-black text-[#8B5E3C] leading-none">{crop.reason}</p>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-[#8B5E3C] rounded-full p-1 mt-0.5 shrink-0">
                                            <Check size={10} className="text-white" />
                                        </div>
                                        <p className="text-sm font-bold text-[#5C3A21]/70 leading-none">{crop.weatherReason}</p>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="bg-[#8B5E3C] rounded-full p-1 mt-0.5 shrink-0">
                                            <Check size={10} className="text-white" />
                                        </div>
                                        <p className="text-sm font-bold text-[#5C3A21]/70 leading-none">{crop.soilReason}</p>
                                    </div>
                                    {crop.marketOutlook && (
                                        <div className="flex items-start gap-2.5">
                                            <div className="bg-orange-500 rounded-full p-1 mt-0.5 shrink-0">
                                                <Star size={10} className="text-white fill-current" />
                                            </div>
                                            <p className="text-sm font-black text-orange-600 leading-none uppercase tracking-tighter">
                                                💰 {crop.marketOutlook}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 📊 FEATURE ROW */}
                            <div className="grid grid-cols-3 gap-2 py-5 border-y border-[#F5F1EB]">
                                <div className="text-center space-y-1.5">
                                    <div className="flex justify-center text-blue-500 mb-1"><Droplets size={22} /></div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{language === "te" ? "వర్షం" : "Water"}</p>
                                    <p className="text-xs font-black text-[#5C3A21] uppercase">{crop.waterNeed}</p>
                                </div>
                                <div className="text-center space-y-1.5 border-x border-[#F5F1EB]">
                                    <div className="flex justify-center text-orange-500 mb-1"><Thermometer size={22} /></div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{language === "te" ? "వేడి" : "Heat"}</p>
                                    <p className="text-xs font-black text-[#5C3A21] uppercase">{crop.heatTolerance}</p>
                                </div>
                                <div className="text-center space-y-1.5">
                                    <div className="flex justify-center text-[#2E7D32] mb-1"><CheckCircle2 size={22} /></div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{language === "te" ? "నేల" : "Soil"}</p>
                                    <p className="text-xs font-black text-[#5C3A21] uppercase">{language === "te" ? "సరిపోతుంది" : "Perfect"}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    const cropId = crop.englishName.toLowerCase().replace(/[^a-z0-9]/g, '');
                                    onViewGuide(cropId);
                                }}
                                className="w-full py-5 bg-[#8B5E3C]/5 border-2 border-[#8B5E3C]/10 text-[#8B5E3C] rounded-[1.8rem] text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                <span>{language === "te" ? "సాగు విధానం" : "Farming Guide"}</span>
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* 🌱 FINAL ADVICE CARD */}
        <div className="bg-gradient-to-br from-[#8B5E3C] to-[#5C3A21] p-10 rounded-[3rem] shadow-2xl text-center text-white relative overflow-hidden mt-6 mb-10">
            <div className="relative z-10">
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.6em] mb-4">🌻 {language === "te" ? "చివరి సూచన" : "Suggestion"}</p>
                <h4 className="text-2xl font-black italic leading-tight tracking-tight">
                    {language === "te" ? "ఇప్పుడు ఈ పంటలు వేయడం మంచిది" : "It's time to sow these crops for a healthy harvest."}
                </h4>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

      </div>

      {/* 🏁 CTA BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#F5F1EB] via-[#F5F1EB] to-transparent z-40 max-w-md mx-auto">
          <button 
              onClick={() => window.location.reload()} 
              className="w-full py-6 bg-[#2E7D32] text-white rounded-[2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-5 active:scale-95 transition-all shadow-[#2E7D32]/30"
          >
              <CheckCircle2 size={28} />
              <span>{language === "te" ? "ముగించు" : "Done"}</span>
          </button>
      </div>

    </div>
  );
};

export default RecommendationScreen;
