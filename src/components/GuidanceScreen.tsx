import React, { useMemo } from "react";
import { ArrowLeft, Volume2, Droplets, Sprout, BarChart3, Clock, CalendarCheck, RotateCcw, AlertCircle, CheckCircle2, Thermometer, MapPin, Beaker } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops } from "@/lib/cropData";
import cropGuides from "@/data/cropGuides.json";
import farmHero from "@/assets/farm-hero.jpg";

interface GuidanceScreenProps {
  language: Language;
  cropKey: string;
  onBack: () => void;
  onStartOver: () => void;
}

const GuidanceScreen = ({ language, cropKey, onBack, onStartOver }: GuidanceScreenProps) => {
  const t = translations[language];

  // 🛡️ HARDENED VALIDATION LAYER (CRASH FIX)
  const normalizedKey = cropKey?.toLowerCase().trim();
  const baseCrop = crops[normalizedKey]; 
  const guide = (cropGuides as any)[normalizedKey] || null;

  // 🚨 ERROR FALLBACK (USER FRIENDLY)
  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle size={48} className="text-orange-500 animate-pulse" />
        </div>
        <div className="space-y-3">
            <h2 className="text-2xl font-black text-[#5C3A21]">
                {language === "te" ? "ఈ పంట వివరాలు త్వరలో వస్తాయి" : "Detailed Guide Coming Soon"}
            </h2>
            <p className="text-sm font-bold text-[#8B5E3C]/60 italic leading-relaxed">
                We are currently building the specialized expert guide for "{cropKey}".
            </p>
        </div>
        <button onClick={onBack} className="px-10 py-5 bg-[#8B5E3C] text-white rounded-[2rem] font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
           {language === "te" ? "వెనుకకు వెళ్లండి" : "Back to Selections"}
        </button>
      </div>
    );
  }

  // 🎙️ VOICE ASSISTANT (CUSTOM LOGIC)
  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const text = `${guide.name[language]}. ${guide.water_profile.te}. ${guide.duration_days} రోజుల పంట కాలం. ${guide.growth_stages.map((s: any) => s.te).join(". ")}`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = language === "te" ? "te-IN" : "en-US";
      msg.rate = 0.85;
      speechSynthesis.speak(msg);
    }
  };

  // 📊 MASTER PROFILE DATA
  const profiles = [
    { icon: <Droplets size={22} />, label: language === "te" ? "నీటి అవసరం" : "Water Need", value: guide.water_profile.te, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: <Thermometer size={22} />, label: language === "te" ? "వాతావరణం" : "Climate", value: guide.climate_profile.te, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: <Beaker size={22} />, label: language === "te" ? "నేల రకం" : "Soil Choice", value: guide.soil_preference.te, color: "text-[#8B5E3C]", bg: "bg-[#F5EFE6]" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER (BRANDED) */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between sticky top-0 z-30">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-black text-white tracking-tighter leading-none mb-1">
              {language === "te" ? "సాగు మార్గదర్శిని" : "Expert Farming Guide"}
            </h2>
            <p className="text-[#C49A6C] text-[9px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">Intelligence Step 05</p>
          </div>
          <button onClick={onStartOver} className="text-white/40 hover:text-white transition-colors">
              <RotateCcw size={24} />
          </button>
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        
        {/* 2. CROP HERO (PREMIUM) */}
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white animate-scale-in relative">
          <div className="h-52 relative">
            <img src={baseCrop?.image || farmHero} alt={guide.name[language]} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-8 pb-10 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.4em] mb-1 leading-none">{language === "te" ? "ప్రధాన పంట" : "Primary Selection"}</p>
                <h3 className="text-3xl font-black tracking-tighter leading-none">{guide.name[language]}</h3>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 text-white shadow-lg">
                <Clock size={16} />
                <span className="text-xs font-black uppercase tracking-widest">{guide.duration_days} Days</span>
            </div>
          </div>
        </div>

        {/* 3. VOICE ENGINE */}
        <button
          onClick={handleVoice}
          className="w-full py-5 bg-[#8B5E3C] text-white rounded-[1.8rem] text-xl font-black flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Volume2 size={26} />
          <span>{language === "te" ? "గైడ్ వినండి (Telugu)" : "Listen Expert Guide"}</span>
        </button>

        {/* 4. ENVIRONMENTAL PROFILE (UNIQUE PER CROP) */}
        <div className="space-y-4">
            {profiles.map((p, idx) => (
                <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm flex items-start gap-5 border border-white hover:shadow-md transition-all animate-in slide-in-from-right-4" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className={`p-4 ${p.bg} ${p.color} rounded-2xl shadow-inner shrink-0`}>
                        {p.icon}
                    </div>
                    <div className="pt-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{p.label}</p>
                        <p className="text-base font-black text-[#5C3A21] leading-tight tracking-tight">{p.value}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* 5. GROWTH STAGES (DYNAMIC NUMBERED LIST) */}
        <div className="bg-white rounded-[3rem] p-8 shadow-2xl space-y-8 border-2 border-transparent hover:border-[#F5F1EB] transition-all">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2E7D32] shadow-inner">
                 <CalendarCheck size={24} />
              </div>
              <div>
                <h4 className="text-xl font-black text-[#5C3A21] leading-none mb-1">{language === "te" ? "సాగు దశలు" : "Farming Stages"}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === "te" ? "పంట ఎదుగుదల ప్రయాణం" : "Journey to Harvest"}</p>
              </div>
           </div>
           
           <div className="space-y-8 relative">
              {/* Stepper Vertical Line */}
              <div className="absolute left-4 top-2 bottom-8 w-0.5 bg-dashed bg-gradient-to-b from-emerald-100 via-emerald-200 to-transparent" />
              
              {guide.growth_stages.map((s: any, idx: number) => (
                <div key={idx} className="flex gap-6 relative group animate-in slide-in-from-bottom-6" style={{ animationDelay: `${idx * 150}ms` }}>
                   <div className="w-9 h-9 rounded-full bg-white border-4 border-emerald-50 z-10 flex items-center justify-center font-black text-sm text-[#2E7D32] shadow-lg group-hover:scale-110 transition-transform">
                      {idx + 1}
                   </div>
                   <div className="flex-1 space-y-1">
                      <p className="text-sm font-black text-[#2E7D32] uppercase tracking-tighter leading-none">{s.stage}</p>
                      <h5 className="text-lg font-black text-[#5C3A21] leading-tight tracking-tight">{s.te}</h5>
                      <p className="text-sm font-bold text-[#8B5E3C]/60 leading-relaxed italic">{s.description}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 6. RISK AWARENESS SECTION */}
        <div className="bg-orange-500/5 rounded-[2.5rem] p-8 border-2 border-orange-500/10 space-y-4">
            <div className="flex items-center gap-3">
                <AlertCircle size={24} className="text-orange-500" />
                <h4 className="text-lg font-black text-orange-700 leading-none">{language === "te" ? "ముఖ్యమైన జాగ్రత్తలు" : "Critical Risks"}</h4>
            </div>
            <div className="space-y-3">
                {guide.risks.map((risk: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-sm font-bold text-[#5C3A21] italic">{risk}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="h-4" /> {/* Spacing */}

      </div>
    </div>
  );
};

export default GuidanceScreen;
