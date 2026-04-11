import { useMemo } from "react";
import { ArrowLeft, CheckCircle2, Star, AlertTriangle, MapPin } from "lucide-react";
import { translations } from "@/lib/translations";
import { getAPCropRecommendations } from "@/engine/cropRecommendationEngine";
import cropImages from "@/data/cropImages";
import { useApp } from "@/context/AppContext";
import CropCard from "@/components/CropCard";
import farmHero from "@/assets/farm-hero.jpg"; // Fallback image

interface RecommendationScreenProps {
  onViewGuide: (cropId: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ onViewGuide, onBack }: RecommendationScreenProps) => {
  const { language, soil, weatherResult } = useApp();
  const t = (translations as any)[language];

  const recommendations = useMemo(() => {
    return getAPCropRecommendations(weatherResult, soil, weatherResult?.district, language);
  }, [weatherResult, soil, language]);

  const allFilteredCrops = recommendations.recommendedCrops;

  // Group by Suitability based on score
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
          <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">{icon}</div>
                  <h3 className="text-xl font-black text-[#1B5E20] tracking-tighter uppercase italic">
                      {language === "te" ? teTitle : title}
                  </h3>
              </div>
              <div className="space-y-8 mt-4">
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
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between relative z-50">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                {language === "te" ? "పంటల ఎంపిక" : "Crop Selector"}
            </h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{weatherResult?.district}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Star className="text-white fill-current" size={20} />
          </div>
      </div>

      <div className="flex-1 p-5 space-y-10 overflow-y-auto pt-10">
        <div className="bg-[#E8F5E9] rounded-[2.5rem] p-6 shadow-md border-t-4 border-[#1B5E20] space-y-6">
            <div className="flex items-center gap-3">
                <MapPin className="text-[#1B5E20] shrink-0" size={20} />
                <p className="text-lg font-black text-[#1B5E20] uppercase tracking-tighter italic">
                    {language === "te" ? `జిల్లా: ${weatherResult?.district}` : `District: ${weatherResult?.district}`}
                </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-widest leading-none">
                <div className="px-3 py-1 bg-[#1B5E20] text-white rounded-full italic opacity-90">Weather: {recommendations.weatherTypeDetected}</div>
                <div className="px-3 py-1 bg-white text-[#1B5E20] rounded-full italic border border-[#1B5E20]/10">Soil: {soil}</div>
            </div>
        </div>

        {allFilteredCrops.length === 0 ? (
            <div className="bg-white p-12 rounded-[3.5rem] text-center space-y-6 shadow-xl border-2 border-[#1B5E20]/5">
                <h3 className="text-2xl font-black text-[#1B5E20] tracking-tighter uppercase">No Results Found</h3>
            </div>
        ) : (
            <div className="space-y-20 pt-4">
                <RenderCropSection 
                    title="⭐ Best Matches" 
                    teTitle="అత్యంత ఉత్తమం"
                    icon={<CheckCircle2 className="text-[#1B5E20]" size={24} />} 
                    crops={groupedCrops.best} 
                />
                <RenderCropSection 
                    title="✅ Suitable" 
                    teTitle="అనుకూలమైనది"
                    icon={<Star className="text-blue-600" size={24} />} 
                    crops={groupedCrops.suitable} 
                />
                <RenderCropSection 
                    title="⚠️ Try Carefully" 
                    teTitle="జాగ్రత్త"
                    icon={<AlertTriangle className="text-amber-500" size={24} />} 
                    crops={groupedCrops.tryCarefully} 
                />
            </div>
        )}

        <div className="pt-10 pb-20">
            <button 
                onClick={() => window.location.reload()} 
                className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-5 active:scale-95 transition-all shadow-[#1B5E20]/40 uppercase"
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
