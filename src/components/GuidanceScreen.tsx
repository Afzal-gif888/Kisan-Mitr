import React, { useMemo } from "react";
import { ArrowLeft, Volume2, Droplets, Sprout, BarChart3, Clock, CalendarCheck, RotateCcw, AlertCircle, CheckCircle2, Thermometer, MapPin, Beaker, Lightbulb, Waves, ShieldCheck, Info } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { generateFarmingGuide } from "@/utils/farmingGuideEngine";
import { crops } from "@/lib/cropData";
import farmHero from "@/assets/farm-hero.jpg";

interface GuidanceScreenProps {
  language: Language;
  cropKey: string;
  weatherResult: any;
  onBack: () => void;
  onStartOver: () => void;
}

const GuidanceScreen = ({ language, cropKey, weatherResult, onBack, onStartOver }: GuidanceScreenProps) => {
  const t = translations[language];

  // 🛡️ ANALYZE & GENERATE INTELLIGENT GUIDE
  const result = useMemo(() => {
    return generateFarmingGuide(cropKey, weatherResult?.district || "", weatherResult);
  }, [cropKey, weatherResult]);

  // Handle Missing Guide (Hard Guard)
  if (!result || !result.guide) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in duration-700">
        <div className="w-28 h-28 bg-amber-50 rounded-full flex items-center justify-center shadow-inner">
            <Info size={48} className="text-amber-500" />
        </div>
        <div className="space-y-4">
            <h2 className="text-3xl font-black text-[#5C3A21] tracking-tighter uppercase">Registry Missing</h2>
            <p className="text-sm font-bold text-[#8B5E3C]/60 italic leading-relaxed max-w-xs">
                {language === "te" 
                   ? `"${cropKey}" పంటకు సంబంధించిన సమాచారం ప్రస్తుతానికి అందుబాటులో లేదు. మా నిపుణులు దీనిని రూపొందిస్తున్నారు.`
                   : `Data for "${cropKey}" is currently missing from our expert registry. We are working on adding it.`
                }
            </p>
        </div>
        <button onClick={onBack} className="px-12 py-5 bg-[#8B5E3C] text-white rounded-[2rem] font-black shadow-2xl flex items-center gap-3 active:scale-95 transition-all">
           <ArrowLeft size={20} />
           {language === "te" ? "మళ్ళీ ఎంచుకోండి" : "Go Back"}
        </button>
      </div>
    );
  }

  const { guide, situationalAdvice } = result;
  const baseCrop = (crops as any)[cropKey?.toLowerCase().replace(/[^a-z]/g, '')];

  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const situationalText = situationalAdvice.map(a => a[language]).join(". ");
      const text = `${guide.name[language]}. ${situationalText}. ${guide.growth_stages.map((s: any) => s.stage_te).join(". ")}`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = language === "te" ? "te-IN" : "en-US";
      msg.rate = 0.85;
      speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. PREMIUM HEADER */}
      <div className="bg-gradient-to-br from-[#1E3A1A] to-[#2E7D32] pt-14 pb-10 px-6 rounded-b-[3rem] shadow-2xl flex items-center justify-between sticky top-0 z-30 ring-8 ring-white/5">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5">
              {guide.name[language]} ({guide.name.te})
            </h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] leading-none">
                {weatherResult?.district} • Guidance v1.0
            </p>
          </div>
          <button onClick={onStartOver} className="text-white/20 hover:text-white transition-colors">
              <RotateCcw size={22} />
          </button>
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        


        {/* 3. CROP HERO (MINIMALIST) */}
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative group animate-in zoom-in-95 duration-700">
          <div className="h-56 relative overflow-hidden">
            <img 
               src={baseCrop?.image || farmHero} 
               alt={guide.name.en} 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform" style={{ transitionDuration: '2000ms' }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 text-white shadow-2xl">
                <Clock size={16} />
                <span className="text-xs font-black uppercase tracking-widest">{guide.duration_days} Days</span>
            </div>
          </div>
        </div>

        {/* 4. MASTER METRICS (Icons Row) */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-white flex flex-col items-center text-center space-y-2">
                <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl mb-1"><Droplets size={26} /></div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{language === "te" ? "నీటి అవసరం" : "Water Need"}</p>
                <p className="text-sm font-black text-[#1E3A1A] uppercase leading-none">{guide.water.requirement}</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-white flex flex-col items-center text-center space-y-2">
                <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl mb-1"><Thermometer size={26} /></div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{language === "te" ? "వాతావరణం" : "Climate Check"}</p>
                <p className="text-sm font-black text-[#1E3A1A] uppercase leading-none">{guide.climate.temperature}</p>
            </div>
        </div>

        {/* 5. GROWTH STEPS (The Main Protocol) */}
        <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl space-y-12 border-2 border-[#F5F1EB] relative overflow-hidden">
           <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#2E7D32] shadow-inner">
                 <CalendarCheck size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[#1E3A1A] leading-none mb-1">{language === "te" ? "సాగు దశలు" : "Sowing Protocol"}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em] leading-none">Step-by-step Execution</p>
              </div>
           </div>
           
           <div className="space-y-12 relative z-10 pl-2">
              <div className="absolute left-6 top-3 bottom-10 w-0.5 bg-gradient-to-b from-emerald-100 via-emerald-200 to-transparent" />
              
              {guide.growth_stages.map((s: any, idx: number) => (
                <div key={idx} className="flex gap-10 relative group animate-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 200}ms` }}>
                   <div className="w-12 h-12 rounded-[1.2rem] bg-white border-4 border-emerald-50 z-10 flex items-center justify-center font-black text-lg text-[#2E7D32] shadow-xl group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                      {idx + 1}
                   </div>
                   <div className="flex-1 space-y-2 pt-1">
                      <p className="text-xs font-black text-emerald-600/50 uppercase tracking-[0.2em] leading-none">{s.stage_en}</p>
                      <h5 className="text-xl font-black text-[#1E3A1A] leading-tight tracking-tight">{s.stage_te}</h5>
                      <p className="text-sm font-bold text-slate-500 leading-tight italic">{s.details_te}</p>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Background Decoration */}
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-50/50 rounded-full blur-[80px]" />
        </div>

        {/* 6. RISK AWARENESS (Alert-box) */}
        <div className="bg-red-500/5 rounded-[3rem] p-10 border-2 border-red-500/10 space-y-6">
            <div className="flex items-center gap-4">
                <AlertCircle size={28} className="text-red-600" />
                <h4 className="text-2xl font-black text-red-900 tracking-tighter leading-none">{language === "te" ? "ప్రమాద హెచ్చరికలు" : "Risk Factors"}</h4>
            </div>
            <div className="space-y-4">
                {(Array.isArray(guide.risks) ? guide.risks : (guide.risks[language] || guide.risks.en)).map((risk: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                        <p className="text-base font-black text-[#5C3A21] leading-none italic">{risk}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* 7. VOICE & FINISH */}
        <div className="space-y-4 pt-4">
            <button
                onClick={handleVoice}
                className="w-full py-7 bg-[#2E7D32] text-white rounded-[2.5rem] text-2xl font-black flex items-center justify-center gap-6 shadow-2xl active:scale-[0.98] transition-all relative overflow-hidden group shadow-emerald-900/40"
            >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Volume2 size={32} />
                <span>{language === "te" ? "గైడ్ వినండి" : "Listen Strategy"}</span>
            </button>
            
            <button
              onClick={onStartOver}
              className="w-full py-5 text-[#8B5E3C]/40 hover:text-[#8B5E3C] transition-all text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4"
            >
                <RotateCcw size={20} />
                {language === "te" ? "మొదటినుండి" : "Reset Flow"}
            </button>
        </div>

      </div>
    </div>
  );
};

export default GuidanceScreen;
