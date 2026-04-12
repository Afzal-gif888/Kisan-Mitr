import { useMemo, useEffect } from "react";
import { ArrowLeft, CheckCircle2, Star, AlertTriangle, MapPin, RefreshCw, Info } from "lucide-react";
import { translations } from "../lib/translations";
import { getAPCropRecommendations } from "../utils/cropRecommendationEngine";
import { getCropImage } from "../utils/getCropImage";
import { useApp } from "../context/AppContext";
import CropCard from "../components/CropCard";
import farmHero from "../assets/farm-hero.jpg"; 

interface RecommendationScreenProps {
  onViewGuide: (cropId: string) => void;
  onBack: () => void;
}

const translateSoilAndWeather = (text: string, lang: string) => {
    if (lang !== 'te' || !text) return text;
    const map: Record<string, string> = {
        'Red Soil': 'ఎర్ర నేలలు',
        'Black Soil': 'నల్లరేగడి నేలలు',
        'Alluvial Soil': 'ఒండ్రు నేలలు',
        'Sandy Soil': 'ఇసుక నేలలు',
        'Loamy Soil': 'గరుప నేలలు',
        'Red Loam Soil': 'ఎర్ర గరుప నేలలు',
        'Black Cotton Soil': 'నల్లరేగడి నేలలు',
        'Laterite Soil': 'ఎర్ర లాటరైట్ నేలలు',
        'Gravelly Soil': 'రాతి నేలలు',
        'Delta Alluvial Soil': 'డెల్టా ఒండ్రు నేలలు',
        'Coastal Sandy Soil': 'తీరప్రాంత ఇసుక నేలలు',
        'Saline Soil': 'చౌడు నేలలు',
        'Clay Soil': 'బంకమట్టి నేలలు',
        'Red Sandy Soil': 'ఎర్ర ఇసుక నేలలు',
        'normal': 'సాధారణం',
        'hot': 'వేడి వాతావరణం',
        'rainy': 'వర్షం',
        'dry': 'పొడి వాతావరణం'
    };
    return map[String(text)] || text;
};

const translateDistrict = (district: string, lang: string) => {
    if (lang !== 'te' || !district) return district;
    const map: Record<string, string> = {
        'Tirupati': 'తిరుపతి', 'Chittoor': 'చిత్తూరు', 'Anantapur': 'అనంతపురం', 'YSR Kadapa': 'వైఎస్ఆర్ కడప',
        'Kurnool': 'కర్నూలు', 'Nandyal': 'నంద్యాల', 'Prakasam': 'ప్రకాశం', 'Guntur': 'గుంటూరు',
        'Bapatla': 'బాపట్ల', 'Palnadu': 'పల్నాడు', 'Krishna': 'కృష్ణా', 'NTR': 'ఎన్టీఆర్', 
        'Eluru': 'ఏలూరు', 'West Godavari': 'పశ్చిమ గోదావరి', 'East Godavari': 'తూర్పు గోదావరి',
        'Kakinada': 'కాకినాడ', 'Konaseema': 'కోనసీమ', 'Visakhapatnam': 'విశాఖపట్నం', 
        'Anakapalli': 'అనకాపల్లి', 'Vizianagaram': 'విజయనగరం', 'Srikakulam': 'శ్రీకాకుళం',
        'Parvathipuram Manyam': 'పార్వతీపురం మన్యం', 'Alluri Sitharama Raju': 'అల్లూరి సీతారామరాజు',
        'Annamayya': 'అన్నమయ్య', 'Sri Sathya Sai': 'శ్రీ సత్యసాయి', 'Nellore': 'నెల్లూరు'
    };
    return map[district] || district;
};

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
      best: allFilteredCrops.filter(c => c.score >= 80),
      suitable: allFilteredCrops.filter(c => c.score >= 60 && c.score < 80),
      tryCarefully: allFilteredCrops.filter(c => c.score < 60)
  };

  const getSuitabilityColor = (score: number) => {
      if (score >= 80) return "from-[#1B5E20] to-[#2E7D32]";
      if (score >= 60) return "from-blue-600 to-blue-400";
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
                  {crops.map((crop) => {
                    // 🚨 STRICT ID BINDING (v4.0)
                    const rawImage = getCropImage(crop.id);
                    
                    // Force refresh for remote images to beat browser cache and ensure uniqueness
                    const uniqueSeed = String(crop.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const finalImageSource = (rawImage && rawImage.startsWith("http")) 
                        ? `${rawImage}&refresh=${uniqueSeed}` 
                        : (rawImage || "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?auto=format&fit=crop&q=80&w=600&sig=fallback_soil");

                    console.log(`[UI BINDING] Rendering: ${crop.englishName} | ID: ${crop.id} | Result: ${!!rawImage ? "SUCCESS" : "MISSING (Using Soil Fallback)"}`);

                    return (
                      <CropCard 
                        key={crop.id}
                        crop={crop}
                        language={language}
                        suitabilityColor={getSuitabilityColor(crop.score)}
                        onViewGuide={onViewGuide}
                        imgSource={finalImageSource}
                        farmHero={farmHero}
                      />
                    );
                  })}
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
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2 truncate italic">{weatherResult?.district ? translateDistrict(weatherResult.district, language) : ''}</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <Star className="text-white fill-current" size={24} />
          </div>
      </div>

      <div className="flex-1 p-6 space-y-12 overflow-y-auto pt-8">
        
        {/* 📊 CONCISE SUMMARY CARD */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-[#1B5E20]/10 border-b-8 border-[#1B5E20]/10 space-y-4 relative z-40">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F1F8E9] rounded-xl shadow-md border border-[#1B5E20]/10 ring-2 ring-[#1B5E20]/5"><MapPin className="text-[#1B5E20]" size={18} /></div>
                <p className="text-base font-black text-[#1B5E20] uppercase tracking-tighter italic">
                    {language === "te" ? `జిల్లా: ${weatherResult?.district ? translateDistrict(weatherResult.district, language) : ''}` : `District: ${weatherResult?.district}`}
                </p>
            </div>
            <div className="flex flex-wrap gap-2 text-wrap">
                <div className="px-4 py-2 bg-white text-[#1B5E20] rounded-2xl text-[10px] font-black uppercase tracking-widest italic border border-[#1B5E20]/10 drop-shadow-md flex items-center gap-2 shadow-sm shadow-[#1B5E20]/10">
                    <RefreshCw size={12} className="animate-spin-slow" />
                    {translateSoilAndWeather(recommendations.weatherTypeDetected, language)}
                </div>
                <div className="px-4 py-2 bg-white text-[#1B5E20] rounded-2xl text-[10px] font-black uppercase tracking-widest italic border border-[#1B5E20]/10 drop-shadow-sm shadow-sm shadow-[#1B5E20]/5">
                    {translateSoilAndWeather(soil, language)}
                </div>
            </div>
        </div>

        {allFilteredCrops.length === 0 ? (
            <div className="bg-white p-12 rounded-[3.5rem] text-center space-y-8 shadow-2xl border-4 border-white animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-orange-50/50">
                    <Info className="text-orange-500" size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">{language === 'te' ? 'సరిపోయే పంటలు లేవు' : 'No Matches Found'}</h3>
                    <p className="text-sm font-bold text-slate-400 tracking-tight leading-relaxed px-4">
                        {language === 'te' 
                           ? 'ఈ నేల మరియు వాతావరణానికి సరిపోయే పంటలు కనిపించలేదు. దయచేసి మరొక నేల రకాన్ని ఎంచుకోండి.'
                           : 'We couldn\'t find crops for this specific soil and weather. Try selecting a different soil type.'}
                    </p>
                </div>
                <button onClick={onBack} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all">
                    {language === 'te' ? 'పారామితులను మార్చండి' : 'Change Parameters'}
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

        <div className="pt-6 pb-12">
            <button onClick={() => window.location.reload()} className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.5rem] text-2xl font-black shadow-[0_20px_40px_rgba(27,94,32,0.3)] flex items-center justify-center gap-5 active:scale-95 hover:scale-[1.02] transition-all uppercase tracking-tighter italic">
                <CheckCircle2 size={32} />
                <span>{language === "te" ? "ముగించు" : "Done"}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
