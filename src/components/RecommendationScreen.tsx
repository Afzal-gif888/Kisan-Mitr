import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Droplets, Thermometer, CheckCircle2, Star, Check, AlertTriangle, Info } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { getAPCropRecommendations } from "@/utils/cropRecommendationEngine";
import farmHero from "@/assets/farm-hero.jpg"; // Fallback image

interface RecommendationScreenProps {
  language: Language;
  soil: string;
  weatherResult: any;
  onViewGuide: (cropId: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ language, soil, weatherResult, onViewGuide, onBack }: RecommendationScreenProps) => {
  const recommendations = useMemo(() => {
    return getAPCropRecommendations(weatherResult, soil, weatherResult.district, language);
  }, [weatherResult, soil, language]);

  const allFilteredCrops = recommendations.recommendedCrops;

  // Group by Suitability
  const groupedCrops = {
      best: allFilteredCrops.filter(c => c.score >= 105), // Perfect Match Bonus
      suitable: allFilteredCrops.filter(c => c.score >= 90 && c.score < 105),
      tryCarefully: allFilteredCrops.filter(c => c.score < 90)
  };

  const getSuitabilityColor = (score: number) => {
      if (score >= 105) return "from-emerald-600 to-emerald-400";
      if (score >= 90) return "from-blue-600 to-blue-400";
      return "from-amber-600 to-amber-400";
  };

  const RenderCropSection = ({ title, crops, icon, teTitle }: { title: string, teTitle: string, crops: any[], icon: any }) => {
      if (crops.length === 0) return null;
      return (
          <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
                  <h3 className="text-xl font-black text-[#5C3A21] tracking-tighter uppercase italic">
                      {language === "te" ? teTitle : title}
                  </h3>
              </div>
              <div className="space-y-8 mt-4">
                  {crops.map((crop, idx) => (
                      <div 
                          key={crop.id} 
                          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all hover:scale-[1.02]"
                      >
                          <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-200">
                              <img 
                                  src={crop.image} 
                                  alt={crop.englishName} 
                                  className="w-full h-full object-cover"
                                  onError={(e: any) => { e.target.onerror = null; e.target.src = farmHero; }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              
                              <div className={`absolute top-4 right-4 px-5 py-2 rounded-full bg-gradient-to-r ${getSuitabilityColor(crop.score)} text-white shadow-2xl border border-white/20`}>
                                  <span className="text-[10px] font-black uppercase tracking-widest">{crop.suitabilityLabel}</span>
                              </div>
                          </div>

                          <div className="p-6 space-y-6">
                              <div>
                                  <h3 className="text-2xl font-black text-[#5C3A21] tracking-tighter mb-2">
                                      {language === 'te' ? crop.teluguName : crop.englishName}
                                  </h3>
                                  <div className="space-y-1.5 mt-4">
                                      <div className="flex items-start gap-2.5">
                                          <div className={`rounded-full p-1 mt-0.5 shrink-0 ${crop.score >= 100 ? 'bg-emerald-500' : 'bg-[#8B5E3C]'}`}>
                                              <Check size={10} className="text-white" />
                                          </div>
                                          <p className="text-sm font-black text-[#8B5E3C] leading-none">{crop.reason}</p>
                                      </div>
                                      <div className="flex items-start gap-2.5">
                                          <div className="bg-[#8B5E3C]/80 rounded-full p-1 mt-0.5 shrink-0">
                                              <Check size={10} className="text-white" />
                                          </div>
                                          <p className="text-sm font-bold text-[#5C3A21]/70 leading-none">{crop.weatherReason}</p>
                                      </div>
                                      <div className="flex items-start gap-2.5">
                                          <div className="bg-[#8B5E3C]/80 rounded-full p-1 mt-0.5 shrink-0">
                                              <Check size={10} className="text-white" />
                                          </div>
                                          <p className="text-sm font-bold text-[#5C3A21]/70 leading-none">{crop.soilReason}</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 py-5 border-y border-[#F5F1EB]">
                                  <div className="text-center space-y-1.5 border-r border-[#F5F1EB]">
                                      <div className="flex justify-center text-blue-500 mb-1"><Droplets size={20} /></div>
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{language === "te" ? "నీరు" : "Water Need"}</p>
                                      <p className="text-xs font-black text-[#5C3A21] uppercase mt-1">{crop.waterNeed}</p>
                                  </div>
                                  <div className="text-center space-y-1.5">
                                      <div className="flex justify-center text-orange-500 mb-1"><Thermometer size={20} /></div>
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{language === "te" ? "వాతావరణం" : "Temp"}</p>
                                      <p className="text-xs font-black text-[#5C3A21] uppercase mt-1">{crop.heatTolerance}</p>
                                  </div>
                              </div>

                              <button
                                  onClick={() => onViewGuide(crop.id)}
                                  className="w-full py-5 bg-[#8B5E3C]/5 border-2 border-[#8B5E3C]/10 text-[#8B5E3C] rounded-[1.8rem] text-sm font-black uppercase tracking-[0.1em] flex items-center justify-center gap-3 active:scale-95 group transition-all"
                              >
                                  <span>{language === "te" ? "సాగు విధానం" : "Farming Guide"}</span>
                                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between relative z-50">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter">
                {language === "te" ? "మీ పంటల ఎంపిక" : "Crop Choices"}
            </h2>
            <p className="text-[#C49A6C] text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">{weatherResult.district}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Star className="text-[#D4A373] fill-current" size={20} />
          </div>
      </div>

      <div className="flex-1 p-5 space-y-12 overflow-y-auto pt-10">
        
        {/* DISTRICT CONTEXT LABEL */}
        {recommendations.districtAdvice && (
            <div className="px-2">
                <p className="text-[10px] font-black text-[#8B5E3C] uppercase tracking-[0.3em] opacity-60">
                    📍 {recommendations.districtAdvice}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                    <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-full uppercase">Weather: {recommendations.weatherTypeDetected}</div>
                    <div className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black rounded-full uppercase">Soil: {soil}</div>
                </div>
            </div>
        )}

        {allFilteredCrops.length === 0 ? (
            <div className="bg-white p-10 rounded-[3rem] text-center space-y-6 shadow-xl">
                <div className="p-6 bg-amber-50 rounded-[2rem] w-fit mx-auto border-2 border-amber-100">
                    <Info size={48} className="text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-[#5C3A21] uppercase tracking-tighter">No Crops Found</h3>
                    <p className="text-xs font-bold text-[#8B5E3C]/60 italic leading-relaxed">
                        {language === "te" 
                            ? "ప్రస్తుత పరిస్థితులకు సరిపోయే పంటలు లేవు. మళ్ళీ ప్రయత్నించండి."
                            : "No crops strictly match these current conditions. Try selecting a different soil or district."}
                    </p>
                </div>
                <button onClick={onBack} className="w-full py-4 bg-[#8B5E3C] text-white rounded-2xl font-black uppercase tracking-widest text-xs">Adjust Filters</button>
            </div>
        ) : (
            <div className="space-y-16">
                <RenderCropSection 
                    title="🔥 Best Suitable" 
                    teTitle="అత్యంత అనుకూలం"
                    icon={<CheckCircle2 className="text-emerald-500" size={24} />} 
                    crops={groupedCrops.best} 
                />
                
                <RenderCropSection 
                    title="👍 Suitable" 
                    teTitle="అనుకూలమైనది"
                    icon={<Star className="text-blue-500" size={24} />} 
                    crops={groupedCrops.suitable} 
                />
                
                <RenderCropSection 
                    title="⚠️ Try Carefully" 
                    teTitle="జాగ్రత్తగా ప్రయత్నించండి"
                    icon={<AlertTriangle className="text-amber-500" size={24} />} 
                    crops={groupedCrops.tryCarefully} 
                />
            </div>
        )}

        {/* 🏁 CTA BUTTON */}
        <div className="pt-6 pb-20">
            <button 
                onClick={() => window.location.reload()} 
                className="w-full py-6 bg-[#2E7D32] text-white rounded-[2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-5 active:scale-95 transition-all"
            >
                <CheckCircle2 size={28} />
                <span>{language === "te" ? "ముగించు" : "Done"}</span>
            </button>
        </div>

      </div>

    </div>
  );
};

export default RecommendationScreen;
