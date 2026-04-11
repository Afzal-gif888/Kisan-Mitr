import React, { useMemo } from "react";
import { ArrowLeft, Volume2, Droplets, Sprout, BarChart3, Clock, CalendarCheck, RotateCcw, AlertCircle, CheckCircle2, Thermometer, MapPin, Beaker, Lightbulb, Waves } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops } from "@/lib/cropData";
import cropGuides from "@/data/cropGuides.json";
import districtMap from "@/data/apDistrictCropMap.json";
import farmHero from "@/assets/farm-hero.jpg";

interface GuidanceScreenProps {
  language: Language;
  cropKey: string;
  weatherResult: any;
  soilType: string;
  onBack: () => void;
  onStartOver: () => void;
}

const GuidanceScreen = ({ language, cropKey, weatherResult, soilType, onBack, onStartOver }: GuidanceScreenProps) => {
  const t = translations[language];

  // 1. DATA RETRIEVAL
  const normalizedKey = cropKey?.toLowerCase().trim().replace(/[^a-z]/g, '');
  const baseCrop = (crops as any)[normalizedKey]; 
  const guide = (cropGuides as any)[normalizedKey] || null;
  const districtName = weatherResult?.district || "";
  const districtInfo = (districtMap as any)[districtName] || null;

  // 2. DYNAMIC INTELLIGENCE LOGIC
  const dynamicAdvice = useMemo(() => {
     if (!guide || !weatherResult) return null;

     const alerts = [];
     const { features, summary } = weatherResult;
     const avgTemp = features?.avgTemp ? parseFloat(features.avgTemp) : 28;
     const totalRain = features?.totalRain ? parseFloat(features.totalRain) : 50;
     
     // Weather-based Dynamic Logic
     if (avgTemp > guide.climate_profile.ideal_temp.max) {
         alerts.push({
             type: "weather",
             te: "ఎక్కువ వేడి వలన నేలలో తేమ ఆరిపోవచ్చు, మల్చింగ్ (గడ్డి కప్పడం) చేయండి.",
             en: "High temperature detected; apply mulching to retain soil moisture."
         });
     }
     if (totalRain < guide.climate_profile.rainfall_range.min / 4) { // Simplified seasonal check
         alerts.push({
             type: "water",
             te: "వర్షం తక్కువగా ఉంది, ప్రతి 7-10 రోజులకు ఒకసారి తేలికపాటి తడి ఇవ్వండి.",
             en: "Low rainfall forecast; ensure supplemental irrigation every 7-10 days."
         });
     }

     // District-based intelligence
     if (districtInfo?.boostCrops.some((c: string) => c.toLowerCase().includes(normalizedKey))) {
         alerts.push({
             type: "district",
             te: `${districtName} జిల్లా ఈ పంటకు చాలా అనుకూలమైనది.`,
             en: `${districtName} district is historically successful for this crop.`
         });
     }

     return alerts;
  }, [guide, weatherResult, districtName, normalizedKey]);

  // 3. FALLBACK
  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle size={48} className="text-orange-500 animate-pulse" />
        </div>
        <div className="space-y-3">
            <h2 className="text-2xl font-black text-[#5C3A21]">
                {language === "te" ? "ఈ పంట వివరాలు సిద్ధంగా లేవు" : "Guide Not Found"}
            </h2>
            <p className="text-sm font-bold text-[#8B5E3C]/60 italic">
                The detailed guide for "{cropKey}" is currently being prepared by our experts.
            </p>
        </div>
        <button onClick={onBack} className="px-10 py-5 bg-[#8B5E3C] text-white rounded-[2rem] font-black shadow-2xl">
           {language === "te" ? "వెనుకకు వెళ్లండి" : "Go Back"}
        </button>
      </div>
    );
  }

  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const text = `${guide.name[language]}. ${guide.water_profile.te}. ${guide.duration_days} రోజుల పంట కాలం. ${dynamicAdvice?.map(a => a[language]).join(". ")}. ${guide.growth_stages.map((s: any) => s.te).join(". ")}`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = language === "te" ? "te-IN" : "en-US";
      msg.rate = 0.85;
      speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER (BRANDED) */}
      <div className="bg-gradient-to-br from-[#1E3A1A] to-[#2E7D32] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between sticky top-0 z-30">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-black text-white tracking-tighter leading-none mb-1">
              {language === "te" ? "సాగు మార్గదర్శిని" : "Expert Farming Guide"}
            </h2>
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] leading-none">{districtName} • Intelligence Step 05</p>
          </div>
          <button onClick={onStartOver} className="text-white/40 hover:text-white transition-colors">
              <RotateCcw size={24} />
          </button>
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        
        {/* 2. DYNAMIC SMART ADVICE (WEATHER + DISTRICT) */}
        {dynamicAdvice && dynamicAdvice.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-6 shadow-2xl text-white space-y-4 animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <Lightbulb className="text-yellow-400 fill-current" size={20} />
                    <h4 className="text-sm font-black uppercase tracking-widest">{language === "te" ? "మీ పొలం కోసం ప్రత్యేక సూచనలు" : "Smart Field Advice"}</h4>
                </div>
                <div className="space-y-4 pt-1">
                    {dynamicAdvice.map((advice, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-glow" />
                            <p className="text-sm font-bold leading-tight tracking-tight italic opacity-90">{advice[language]}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* 3. CROP HERO (PREMIUM) */}
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white animate-scale-in relative">
          <div className="h-52 relative">
            <img src={baseCrop?.image || farmHero} alt={guide.name[language]} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-8 pb-10 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.4em] mb-1 leading-none">Selected Crop</p>
                <h3 className="text-3xl font-black tracking-tighter leading-none">{guide.name[language]} ({guide.name.te})</h3>
            </div>
          </div>
        </div>

        {/* 4. MASTER PROFILE DATA (Climate, Soil, Water) */}
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-[2rem] shadow-sm flex items-start gap-5 border border-white">
                <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl shrink-0"><Droplets size={22} /></div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{language === "te" ? "నీటి అవసరం" : "Water Requirement"}</p>
                    <p className="text-base font-black text-[#5C3A21] leading-tight tracking-tight">{guide.water_profile.te}</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-[2rem] shadow-sm flex items-start gap-5 border border-white">
                <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl shrink-0"><Thermometer size={22} /></div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{language === "te" ? "వాతావరణం" : "Climate Check"}</p>
                    <p className="text-base font-black text-[#5C3A21] leading-tight tracking-tight">{guide.climate_profile.te}</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-[2rem] shadow-sm flex items-start gap-5 border border-white">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0"><Beaker size={22} /></div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{language === "te" ? "నేల తనిఖీ" : "Soil Compatibility"}</p>
                    <p className="text-base font-black text-[#5C3A21] leading-tight tracking-tight">{guide.soil_preference.te}</p>
                </div>
            </div>
        </div>

        {/* 5. GROWTH STAGES (DYNAMIC NUMBERED LIST) */}
        <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl space-y-10 border-2 border-[#F5F1EB]">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#2E7D32] shadow-inner">
                 <CalendarCheck size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[#5C3A21] leading-none mb-1">{language === "te" ? "సాగు దశలు" : "Farming Stages"}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Expert Protocol</p>
              </div>
           </div>
           
           <div className="space-y-10 relative">
              <div className="absolute left-5 top-2 bottom-8 w-0.5 bg-gradient-to-b from-emerald-100 via-emerald-200 to-transparent" />
              
              {guide.growth_stages.map((s: any, idx: number) => (
                <div key={idx} className="flex gap-8 relative group animate-in slide-in-from-bottom-6" style={{ animationDelay: `${idx * 150}ms` }}>
                   <div className="w-10 h-10 rounded-full bg-white border-4 border-emerald-50 z-10 flex items-center justify-center font-black text-sm text-[#2E7D32] shadow-xl group-hover:scale-110 transition-transform">
                      {idx + 1}
                   </div>
                   <div className="flex-1 space-y-1.5">
                      <p className="text-xs font-black text-emerald-600/60 uppercase tracking-widest leading-none">{s.stage}</p>
                      <h5 className="text-lg font-black text-[#5C3A21] leading-tight tracking-tight">{s.te}</h5>
                      <p className="text-sm font-bold text-slate-500/70 leading-relaxed italic">{s.description}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 6. RISK AWARENESS SECTION */}
        <div className="bg-red-500/5 rounded-[2.5rem] p-8 border-2 border-red-500/10 space-y-5">
            <div className="flex items-center gap-4">
                <AlertCircle size={24} className="text-red-600" />
                <h4 className="text-xl font-black text-red-800 leading-none">{language === "te" ? "జాగ్రత్తలు" : "Risks & Control"}</h4>
            </div>
            <div className="space-y-4">
                {guide.risks.map((risk: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 animate-in fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <p className="text-sm font-bold text-[#5C3A21] italic leading-tight">{risk}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* 7. VOICE ASSISTANT */}
        <button
          onClick={handleVoice}
          className="w-full py-6 bg-[#2E7D32] text-white rounded-[2rem] text-2xl font-black flex items-center justify-center gap-5 shadow-2xl active:scale-[0.98] transition-all relative overflow-hidden group shadow-[#2E7D32]/20"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Volume2 size={30} />
          <span>{language === "te" ? "గైడ్ వినండి" : "Listen Strategy"}</span>
        </button>

      </div>
    </div>
  );
};

export default GuidanceScreen;
