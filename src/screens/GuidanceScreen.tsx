import { useMemo, useEffect } from "react";
import { ArrowLeft, Volume2, Droplets, Clock, CalendarCheck, RotateCcw, AlertCircle, CheckCircle2, Thermometer, Info, CloudRain, AlertTriangle, Lightbulb, Sprout } from "lucide-react";
import { translations } from "../lib/translations";
import { generateFarmingGuide, getFarmingGuide } from "../utils/farmingGuideEngine";
import { getCropImage } from "../utils/getCropImage";
import { useApp } from "../context/AppContext";
import farmHero from "../assets/farm-hero.jpg"; // Fallback image

interface GuidanceScreenProps {
  onBack: () => void;
  onStartOver: () => void;
}

const translateMetric = (text: string, lang: string) => {
    if (lang !== 'te' || !text) return text;
    const map: Record<string, string> = {
        'Low': 'తక్కువ',
        'Moderate': 'మధ్యస్థం',
        'High': 'ఎక్కువ',
        'Very High': 'చాలా ఎక్కువ',
        'Hot and Dry': 'వేడి మరియు పొడిగాలి',
        'Warm and Humid': 'వెచ్చని మరియు తేమ',
        'Mild': 'సాధారణం',
        'Cool and Humid': 'చల్లని మరియు తేమ',
        'Warm': 'వెచ్చని ఉష్ణోగ్రత',
        'Unexpected rain': 'అనుకోని వర్షం',
        'Pest attacks depending on weather': 'వాతావరణ అనుగుణంగా చీడపీడల దాడి',
        'Heavy rain during flowering can cause flower drop': 'భారీ వర్షాల వలన పూత రాలిపోతుంది',
        'Fungal diseases in high humidity': 'అధిక తేమలో బూజు/శిలీంధ్ర తెగుళ్లు',
        'Waterlogging can cause severe root rot': 'నీరు నిల్వ వలన తీవ్రమైన వేరు కుళ్ళు',
        'High temperature causes flower drop': 'అధిక వేడి వలన పూత రాలిపోతుంది',
        'Drought stress during pod formation': 'కాయ ఏర్పడే సమయంలో నీటి ఎద్దడి సమస్య',
        'Root rot in waterlogged soils': 'నీరు నిలిస్తే వేరు కుళ్ళు',
        'Stem borer attacks': 'కాండం తొలిచే పురుగుల దాడి',
        'Sensitive to extreme cold': 'తీవ్రమైన చలిని తట్టుకోలేదు',
        'Cyclone damage': 'తుఫాను/గాలివాన వల్ల నష్టం',
        'Extremely sensitive to standing water': 'నీరు నిలిస్తే మొక్క నాశనం అవుతుంది'
    };
    return map[text] || text;
};

const GuidanceScreen = ({ onBack, onStartOver }: GuidanceScreenProps) => {
  const { language, selectedCrop: cropKey, weatherResult } = useApp();
  const t = (translations as any)[language];

  // 🛡️ ANALYZE & GENERATE INTELLIGENT GUIDE
  const result = useMemo(() => {
    return generateFarmingGuide(cropKey, weatherResult?.district || "", weatherResult, language);
  }, [cropKey, weatherResult, language]);

  if (!result || !result.crop) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in duration-700">
        <div className="w-28 h-28 bg-amber-50 rounded-full flex items-center justify-center shadow-inner">
            <Info size={48} className="text-amber-500" />
        </div>
        <div className="space-y-4">
            <h2 className="text-3xl font-black text-[#5C3A21] tracking-tighter uppercase">Registry Missing</h2>
            <p className="text-sm font-bold text-[#8B5E3C]/60 italic leading-relaxed max-w-xs uppercase">
                {language === "te" 
                   ? `"${cropKey}" పంటకు సంబంధించిన సమాచారం ప్రస్తుతానికి అందుబాటులో లేదు.`
                   : `Data for "${cropKey}" is currently missing from our expert registry.`
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

  const { crop, isDistrictSuitable, weatherAdjustments, weatherWarnings, status } = result;

  const guide = useMemo(() => getFarmingGuide(cropKey), [cropKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const text = language === "te" 
        ? `${crop.name?.te || crop.name}. ఇది ${crop.durationDays || "120"} రోజుల పంట. ${crop.farmer_advice_te ? crop.farmer_advice_te.join(". ") : "సమయానికి సరైన విధానం వాడుకోండి."}`
        : `${crop.name?.en || crop.name}. This is a ${crop.durationDays || "120"} day crop. ${crop.waterNeed || "Moderate"} water requirement.`;
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = language === "te" ? "te-IN" : "en-US";
      msg.rate = 0.85;
      speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      
      {/* 1. PREMIUM HEADER */}
      <div className={`pt-14 pb-10 px-6 rounded-b-[3rem] shadow-2xl flex items-center justify-between sticky top-0 z-40 ring-8 ring-white/5 transition-colors duration-500 ${
        status === 'critical' ? 'bg-gradient-to-br from-[#7f1d1d] to-[#ef4444]' : 
        status === 'warning' ? 'bg-gradient-to-br from-[#92400e] to-[#f59e0b]' :
        'bg-gradient-to-br from-[#1E3A1A] to-[#2E7D32]'
      }`}>
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1.5 uppercase italic">
              {language === 'te' ? crop.name.te : crop.name.en}
            </h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] leading-none">
                {weatherResult?.district} • Guidance v2.5
            </p>
          </div>
          <button onClick={onStartOver} className="text-white/20 hover:text-white transition-colors">
              <RotateCcw size={22} />
          </button>
      </div>

      <div className="flex-1 p-6 space-y-6 mt-4 overflow-y-auto">
        
        {/* DISTRICT SUITABILITY WARNING */}
        {!isDistrictSuitable && (
          <div className="bg-amber-100 border-2 border-amber-300 p-5 rounded-[2rem] flex gap-4 animate-in slide-in-from-top-4">
            <AlertTriangle className="text-amber-600 shrink-0" size={24} />
            <div className="space-y-1">
              <p className="text-xs font-black text-amber-800 uppercase tracking-wider">REGIONAL ALERT</p>
              <p className="text-[13px] font-bold text-amber-900/80 leading-snug italic">
                {language === 'te' 
                  ? `${weatherResult?.district} లో ఈ పంట సాగు సాధారణం కాదు. జాగ్రత్త వహించండి.`
                  : `This crop is not native to ${weatherResult?.district}. Proceed with caution.`}
              </p>
            </div>
          </div>
        )}

        {/* WEATHER WARNINGS & ADJUSTMENTS */}
        {(weatherWarnings.length > 0 || weatherAdjustments.length > 0) && (
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl space-y-4 border border-white">
            <div className="flex items-center gap-3">
              <CloudRain className="text-blue-500" size={20} />
              <h4 className="text-lg font-black text-slate-800 italic uppercase tracking-tighter">
                {language === 'te' ? 'వాతావరణ సర్దుబాట్లు' : 'Weather Sync'}
              </h4>
            </div>
            
            <div className="space-y-3">
              {weatherWarnings.map((w: string, i: number) => (
                <div key={i} className="flex gap-3 bg-red-50 p-3 rounded-2xl border border-red-100">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-red-900 leading-tight uppercase italic">{w}</p>
                </div>
              ))}
              {weatherAdjustments.map((a: string, i: number) => (
                <div key={i} className="flex gap-3 bg-blue-50 p-3 rounded-2xl border border-blue-100">
                  <Lightbulb size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-blue-900 leading-tight uppercase italic">{a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LONG-TERM COMMITMENT BANNER */}
        {crop.durationDays && crop.durationDays > 200 && (
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-8" />
             <div className="relative z-10 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-[1.2rem] bg-white/10 flex items-center justify-center backdrop-blur-md shrink-0 border border-white/20">
                    <CalendarCheck className="text-purple-300" size={24} />
                </div>
                <div>
                   <h4 className="text-white font-black italic uppercase tracking-widest text-xs mb-0.5">
                      {language === 'te' ? 'దీర్ఘకాలిక పెట్టుబడి' : 'Long-Term Commitment'}
                   </h4>
                   <p className="text-purple-200/80 text-[10px] uppercase font-bold leading-tight">
                      {language === 'te' 
                        ? `ఈ పంట దిగుబడికి ${crop.durationDays} రోజుల నిరంతర ఆదరణ అవసరం.` 
                        : `This crop requires continuous maintenance for ${crop.durationDays} days.`}
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* CROP HERO */}
        <div className="bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative group animate-in zoom-in-95 duration-700">
          <div className="h-48 relative overflow-hidden">
            <img 
               src={getCropImage(crop.id) || farmHero} 
               alt={crop.name} 
               className="w-full h-full object-cover transition-opacity duration-300"
               onError={(e: any) => {
                 e.target.onerror = null;
                 e.target.src = farmHero;
               }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 text-white">
                <Clock size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{crop.durationDays || "120"} {language === 'te' ? 'రోజులు' : 'Days'}</span>
            </div>
          </div>
        </div>

        {/* MASTER METRICS */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[2.5rem] shadow-lg border border-white flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-xl mb-1"><Droplets size={24} /></div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{language === "te" ? "నీటి అవసరం" : "Water Need"}</p>
                <p className="text-xs font-black text-[#1E3A1A] uppercase leading-none italic">{translateMetric(crop.waterNeed, language)}</p>
            </div>
            <div className="bg-white p-5 rounded-[2.5rem] shadow-lg border border-white flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-orange-50 text-orange-500 rounded-xl mb-1"><Thermometer size={24} /></div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{language === "te" ? "వాతావరణం" : "Climate Check"}</p>
                <p className="text-xs font-black text-[#1E3A1A] uppercase leading-none italic">{translateMetric(crop.climate, language)}</p>
            </div>
        </div>

        {/* FARMING GUIDE PROTOCOL (6 STEPS) */}
        {guide && (
        <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl space-y-10 border-2 border-[#F5F1EB] relative overflow-hidden">
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#2E7D32] shadow-inner">
                 <CalendarCheck size={28} />
              </div>
              <div>
                <h4 className="text-xl font-black text-[#1E3A1A] leading-none mb-1 italic uppercase tracking-tighter">{language === "te" ? "సాగు విధానం" : "Farming Guide"}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-none">Step-by-step Execution</p>
              </div>
           </div>
           
           <div className="space-y-10 relative z-10 pl-2">
              <div className="absolute left-6 top-3 bottom-8 w-0.5 bg-gradient-to-b from-emerald-100 via-emerald-200 to-transparent" />
              
              {[
                { title: language === "te" ? "నేల తయారీ" : "1. Soil Preparation", data: guide.soilPreparation[language as 'en'|'te'] || guide.soilPreparation.en },
                { title: language === "te" ? "విత్తడం" : "2. Sowing", data: guide.sowing[language as 'en'|'te'] || guide.sowing.en },
                { title: language === "te" ? "నీటిపారుదల" : "3. Irrigation", data: guide.irrigation[language as 'en'|'te'] || guide.irrigation.en },
                { title: language === "te" ? "ఎరువులు" : "4. Fertilizers", data: guide.fertilizers[language as 'en'|'te'] || guide.fertilizers.en },
                { title: language === "te" ? "చీడపీడల నియంత్రణ" : "5. Pest Control", data: guide.pestControl[language as 'en'|'te'] || guide.pestControl.en },
                { title: language === "te" ? "కోత" : "6. Harvesting", data: guide.harvesting[language as 'en'|'te'] || guide.harvesting.en }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-8 relative group animate-in slide-in-from-bottom-6" style={{ animationDelay: `${idx * 150}ms` }}>
                   <div className="w-10 h-10 rounded-[1rem] bg-white border-4 border-emerald-50 z-10 flex items-center justify-center font-black text-sm text-[#2E7D32] shadow-lg shrink-0">
                      <Sprout size={16} />
                   </div>
                   <div className="flex-1 space-y-2 pt-1">
                      <h5 className="text-lg font-black text-[#1E3A1A] leading-tight tracking-tight italic uppercase">{step.title}</h5>
                      <ul className="space-y-1">
                         {step.data.map((point: string, i: number) => (
                            <li key={i} className="text-[13px] font-bold text-slate-500 leading-tight italic flex items-start gap-2">
                               <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                               <span>{point}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
              ))}
           </div>
        </div>
        )}

        {/* RISKS */}
        <div className="bg-red-500/5 rounded-[3rem] p-8 border-2 border-red-500/10 space-y-4">
            <div className="flex items-center gap-3">
                <AlertCircle size={22} className="text-red-600" />
                <h4 className="text-xl font-black text-red-900 tracking-tighter leading-none italic uppercase">
                   {language === 'te' ? 'ప్రమాద కారకాలు' : 'Risk Factors'}
                </h4>
            </div>
            <div className="space-y-3">
                {(crop.risks || ["Unexpected rain", "Pest attacks depending on weather"]).map((risk: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        <p className="text-sm font-black text-[#5C3A21] leading-none italic uppercase">{translateMetric(risk, language)}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* VOICE & FINISH */}
        <div className="space-y-4 pt-4">
            <button
                onClick={handleVoice}
                className="w-full py-6 bg-[#2E7D32] text-white rounded-[2.5rem] text-xl font-black flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] transition-all relative overflow-hidden group shadow-emerald-900/20"
            >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Volume2 size={28} />
                <span>{language === "te" ? "గైడ్ వినండి" : "Listen Strategy"}</span>
            </button>
            
            <button
              onClick={onStartOver}
              className="w-full py-4 text-[#8B5E3C]/40 hover:text-[#8B5E3C] transition-all text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4"
            >
                <RotateCcw size={18} />
                {language === "te" ? "మొదటినుండి" : "Reset Flow"}
            </button>
        </div>

      </div>
    </div>
  );
};

export default GuidanceScreen;
