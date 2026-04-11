import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Droplets, Thermometer, CheckCircle2, Star, Check, AlertTriangle, Info, MapPin, Sprout } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { getAPCropRecommendations } from "@/engine/cropRecommendationEngine";
import { cropImages } from "@/data/cropImages";
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

  // Group by Suitability based on score
  const groupedCrops = {
      best: allFilteredCrops.filter(c => c.score >= 115),
      suitable: allFilteredCrops.filter(c => c.score >= 100 && c.score < 115),
      tryCarefully: allFilteredCrops.filter(c => c.score < 100)
  };

  const getSuitabilityColor = (score: number) => {
      if (score >= 115) return "from-[#1B5E20] to-[#2E7D32]";
      if (score >= 100) return "from-blue-600 to-blue-400";
      return "from-amber-600 to-amber-400";
  };

  const RenderCropSection = ({ title, crops, icon, teTitle }: { title: string, teTitle: string, crops: any[], icon: any }) => {
      if (crops.length === 0) return null;
      return (
          <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">{icon}</div>
                  <h3 className="text-xl font-black text-[#1B5E20] tracking-tighter uppercase italic">
                      {language === "te" ? teTitle : title}
                  </h3>
              </div>
              <div className="space-y-8 mt-4">
                  {crops.map((crop) => (
                      <div 
                          key={crop.id} 
                          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all hover:scale-[1.02] active:scale-95"
                      >
                          <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-200">
                              {(() => {
                                  const imgSource = (cropImages as any)[crop.englishName] || farmHero;
                                  console.log("🖼️ DEBUG: Crop Image Mapping", {
                                      crop: crop.englishName,
                                      source: imgSource
                                  });
                                  return (
                                    <div className="relative w-full h-full">
                                        <img 
                                            src={imgSource} 
                                            alt={crop.englishName} 
                                            className="w-full h-full object-cover"
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = farmHero; }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 rounded-xl" />
                                    </div>
                                  );
                              })()}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              
                              <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white tracking-tighter drop-shadow-lg">
                                 {language === 'te' ? crop.teluguName : crop.englishName}
                              </h3>

                              <div className={`absolute top-4 right-4 px-5 py-2 rounded-full bg-gradient-to-r ${getSuitabilityColor(crop.score)} text-white shadow-2xl border border-white/20`}>
                                  <span className="text-[10px] font-black uppercase tracking-widest">{crop.suitabilityLabel}</span>
                              </div>
                          </div>

                          <div className="p-6 space-y-6">
                              <div>
                                  <div className="space-y-1.5">
                                      <div className="flex items-start gap-2.5">
                                          <div className={`rounded-full p-1 mt-0.5 shrink-0 bg-[#1B5E20]`}>
                                              <Check size={10} className="text-white" />
                                          </div>
                                          <p className="text-sm font-black text-[#1B5E20] leading-none italic">{crop.reason}</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 py-5 border-y border-[#F1F8E9]">
                                  <div className="text-center space-y-1.5 border-r border-[#F1F8E9]">
                                      <div className="flex justify-center text-blue-500 mb-1"><Droplets size={20} /></div>
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{language === "te" ? "నీరు" : "Water Need"}</p>
                                      <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{crop.waterNeed}</p>
                                  </div>
                                  <div className="text-center space-y-1.5">
                                      <div className="flex justify-center text-orange-500 mb-1"><Thermometer size={20} /></div>
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{language === "te" ? "వాతావరణం" : "Temp"}</p>
                                      <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{crop.heatTolerance}</p>
                                  </div>
                              </div>

                              <button
                                  onClick={() => onViewGuide(crop.id)}
                                  className="w-full py-5 bg-[#F1F8E9] border-2 border-transparent text-[#1B5E20] rounded-[1.8rem] text-sm font-black uppercase tracking-[0.1em] flex items-center justify-center gap-3 active:scale-95 group transition-all"
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
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between relative z-50">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter">
                {language === "te" ? "పంటల ఎంపిక" : "Crop Selector"}
            </h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">{weatherResult.district}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Star className="text-white fill-current" size={20} />
          </div>
      </div>

      <div className="flex-1 p-5 space-y-10 overflow-y-auto pt-10">
        
        {/* DISTRICT SOIL INTELLIGENCE CARD */}
        <div className="bg-[#E8F5E9] rounded-[2.5rem] p-6 shadow-md border-t-4 border-[#1B5E20] space-y-6">
            <div className="flex items-center gap-3">
                <MapPin className="text-[#1B5E20] shrink-0" size={20} />
                <p className="text-lg font-black text-[#1B5E20] uppercase tracking-tighter">
                    {language === "te" ? `జిల్లా: ${weatherResult.district}` : `District: ${weatherResult.district}`}
                </p>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Sprout className="text-[#1B5E20]" size={18} />
                    <h4 className="text-sm font-black text-[#1B5E20] uppercase tracking-widest leading-none">
                        {language === "te" ? "మీ ప్రాంతంలో నేలలు:" : "Soils in your location:"}
                    </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {recommendations.districtSoils?.map((soilType, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-transparent shadow-sm">
                           <div className="bg-[#1B5E20] rounded-full p-0.5"><Check size={8} className="text-white" /></div>
                           <span className="text-[10px] font-bold text-[#1B5E20] leading-none">{soilType}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-widest leading-none">
                <div className="px-3 py-1 bg-[#1B5E20] text-white rounded-full italic opacity-90">Season: {recommendations.seasonDetected}</div>
                <div className="px-3 py-1 bg-[#1B5E20] text-white rounded-full italic opacity-90">Weather: {recommendations.weatherTypeDetected}</div>
                <div className="px-3 py-1 bg-white text-[#1B5E20] rounded-full italic border border-[#1B5E20]/10">Soil: {soil}</div>
            </div>
        </div>

        {allFilteredCrops.length === 0 ? (
            <div className="bg-white p-12 rounded-[3.5rem] text-center space-y-6 shadow-xl border-2 border-[#1B5E20]/5">
                <div className="w-24 h-24 bg-[#F1F8E9] rounded-full mx-auto flex items-center justify-center border-2 border-[#E8F5E9]">
                    <Info size={40} className="text-[#1B5E20]" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-black text-[#1B5E20] tracking-tighter uppercase">No Perfect Matches</h3>
                    <p className="text-xs font-bold text-[#1B5E20]/60 italic leading-snug px-4">
                        {language === "te" 
                            ? "ప్రస్తుత మట్టి మరియు వాతావరణ పరిస్థితులకు సరిపోయే పంటలు ఏవీ లేవు. దయచేసి వివరాలను సరిచూసుకోండి."
                            : "We couldn't find crops that strictly match these conditions. Ensure your district and soil are correctly selected."}
                    </p>
                </div>
                <button onClick={onBack} className="w-full py-5 bg-[#1B5E20] text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg">Adjust Filters</button>
            </div>
        ) : (
            <div className="space-y-20 pt-4">
                <RenderCropSection 
                    title="🔥 Best Suitable" 
                    teTitle="అత్యంత అనుకూలం"
                    icon={<CheckCircle2 className="text-[#1B5E20]" size={24} />} 
                    crops={groupedCrops.best} 
                />
                
                <RenderCropSection 
                    title="👍 Suitable" 
                    teTitle="అనుకూలమైనది"
                    icon={<Star className="text-blue-600" size={24} />} 
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
        <div className="pt-10 pb-20">
            <button 
                onClick={() => window.location.reload()} 
                className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-5 active:scale-95 transition-all shadow-[#1B5E20]/40"
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
