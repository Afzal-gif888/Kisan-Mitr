import { useMemo, useEffect } from "react";
import { ArrowLeft, CheckCircle2, Star, AlertTriangle, MapPin, RefreshCw, Info } from "lucide-react";
import { translations } from "../lib/translations";
import { getAPCropRecommendations } from "../utils/cropRecommendationEngine";
import cropImages from "../data/cropImages";
import { useApp } from "../context/AppContext";
import CropCard from "../components/CropCard";
import farmHero from "../assets/farm-hero.jpg"; 

interface RecommendationScreenProps {
  onViewGuide: (cropId: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ onViewGuide, onBack }: RecommendationScreenProps) => {
  const { language, soil, weatherResult } = useApp();
  const t = (translations as any)[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const recommendations = useMemo(() => {
    return getAPCropRecommendations(weatherResult, soil, weatherResult?.district, language);
  }, [weatherResult, soil, language]);

  const allFilteredCrops = recommendations.recommendedCrops;

  const groupedCrops = {
      best: allFilteredCrops.filter(c => c.score >= 95),
      suitable: allFilteredCrops.filter(c => c.score >= 80 && c.score < 95),
      tryCarefully: allFilteredCrops.filter(c => c.score < 80)
  };

  const getSuitabilityColor = (score: number) => {
      if (score >= 95) return "from-[#1B5E20] to-[#2E7D32]";
      if (score >= 80) return "from-blue-600 to-blue-400";
      return "from-amber-600 to-amber-400";
  };

  const RenderCropSection = ({ title, crops, icon, teTitle }: { title: string, teTitle: string, crops: any[], icon: any }) => {
      if (crops.length === 0) return null;
      return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 px-2">
                  <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 ring-4 ring-[#1B5E20]/5">{icon}</div>
                  <h3 className="text-xl font-black text-[#1B5E20] tracking-tighter uppercase italic">
                      {language === "te" ? teTitle : title}
                  </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-4">
                  {crops.map((crop) => (
                    <CropCard 
                      key={crop.id}
                      crop={crop}
                      language={language}
                      suitabilityColor={getSuitabilityColor(crop.score)}
                      onViewGuide={onViewGuide}
                      imgSource={(cropImages as any)[crop.englishName] || farmHero}
                      farmHero={farmHero}
                    />
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden safe-area-inset pb-10">
      
      {/* 🚀 ELITE HEADER */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-14 pb-10 px-8 rounded-b-[3rem] shadow-xl flex items-center justify-between relative z-50">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center min-w-0 flex-1 px-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase leading-none italic truncate">
                {language === "te" ? "పంటల ఎంపిక" : "Crop Selector"}
            </h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2 truncate italic">{weatherResult?.district}</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <Star className="text-white fill-current" size={24} />
          </div>
      </div>

      <div className="flex-1 p-6 space-y-12 overflow-y-auto pt-8">
        
        {/* 📊 CONCISE SUMMARY CARD */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-b-8 border-[#1B5E20]/10 space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F1F8E9] rounded-xl"><MapPin className="text-[#1B5E20]" size={18} /></div>
                <p className="text-base font-black text-slate-800 uppercase tracking-tighter italic">
                    {language === "te" ? `జిల్లా: ${weatherResult?.district}` : `District: ${weatherResult?.district}`}
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-[#1B5E20]/5 text-[#1B5E20] rounded-2xl text-[10px] font-black uppercase tracking-widest italic border border-[#1B5E20]/10 flex items-center gap-2">
                    <RefreshCw size={12} className="animate-spin-slow" />
                    {recommendations.weatherTypeDetected}
                </div>
                <div className="px-4 py-2 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic border border-slate-100">
                    {soil}
                </div>
            </div>
        </div>

        {allFilteredCrops.length === 0 ? (
            <div className="bg-white p-12 rounded-[3.5rem] text-center space-y-8 shadow-2xl border-4 border-white animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-orange-50/50">
                    <Info className="text-orange-500" size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">No Matches Found</h3>
                    <p className="text-sm font-bold text-slate-400 tracking-tight leading-relaxed px-4">
                        We couldn't find crops for this specific soil and weather. Try selecting a different soil type.
                    </p>
                </div>
                <button 
                    onClick={onBack}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
                >
                    Change Parameters
                </button>
            </div>
        ) : (
            <div className="space-y-16 pt-2">
                <RenderCropSection 
                    title="⭐ Elite Matches" 
                    teTitle="అత్యంత ఉత్తమం"
                    icon={<CheckCircle2 className="text-[#1B5E20]" size={24} />} 
                    crops={groupedCrops.best} 
                />
                <RenderCropSection 
                    title="✅ Highly Suitable" 
                    teTitle="అనుకూలమైనది"
                    icon={<Star className="text-blue-600" size={24} />} 
                    crops={groupedCrops.suitable} 
                />
                <RenderCropSection 
                    title="⚠️ Use Caution" 
                    teTitle="జాగ్రత్త"
                    icon={<AlertTriangle className="text-amber-500" size={24} />} 
                    crops={groupedCrops.tryCarefully} 
                />
            </div>
        )}

        {/* 🏁 FINAL ACTION */}
        <div className="pt-6 pb-12">
            <button 
                onClick={() => window.location.reload()} 
                className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.5rem] text-2xl font-black shadow-[0_20px_40px_rgba(27,94,32,0.3)] flex items-center justify-center gap-5 active:scale-95 hover:scale-[1.02] transition-all uppercase tracking-tighter italic"
            >
                <CheckCircle2 size={32} />
                <span>{language === "te" ? "ముగించు" : "Done"}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
