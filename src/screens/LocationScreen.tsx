import { MapPin, ArrowLeft, ArrowRight, Loader2, Navigation2 } from "lucide-react";
import { useState } from "react";
import { translations } from "../lib/translations";
import { indiaDistricts } from "../lib/indiaData";
import { useApp } from "../context/AppContext";

interface LocationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const states = Object.keys(indiaDistricts).sort();

const LocationScreen = ({ onNext, onBack }: LocationScreenProps) => {
  const { language, setDistrict: setGlobalDistrict } = useApp();
  const t = (translations as any)[language];
  
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [state, setState] = useState("");
  const [localDistrict, setLocalDistrict] = useState("");

  const handleDetect = () => {
    setDetecting(true);
    if (!navigator.geolocation) { alert(t.locationError); setDetecting(false); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
          if (!apiKey) throw new Error("API Key Missing");
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=${apiKey}&countrycode=in&language=en`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.results?.[0]) {
            const comp = data.results[0].components;
            let sName = comp.state || "Andhra Pradesh";
            const matchedState = states.find(s => s.toLowerCase() === sName.toLowerCase()) || "Andhra Pradesh";
            setState(matchedState);

            let dName = comp.state_district || comp.county || comp.city || "Unknown";
            dName = dName.replace(/ District| City| Division/gi, "").trim();
            setLocalDistrict(dName);
            setDetected(true);
          }
        } catch (e) { 
           // Fallback to manual selection if API fails or is missing
           console.error("Geocoding failed:", e);
           alert(language === 'te' ? "స్థానాన్ని గుర్తించలేకపోయాము. దయచేసి మాన్యువల్‌గా ఎంచుకోండి." : "Location detection failed. Please select manually.");
        } finally { setDetecting(false); }
      },
      () => { setDetecting(false); alert(t.locationError); },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleContinue = () => {
    setGlobalDistrict(localDistrict);
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden safe-area-inset pb-10">
      
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-14 pb-10 px-6 rounded-b-[2.5rem] shadow-lg flex items-center gap-4 relative z-20">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
              <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-black text-white tracking-tight leading-none uppercase italic">{t.appName}</h2>
      </div>

      <div className="flex-1 px-6 pt-10 space-y-10 overflow-y-auto">
          
          {/* VISUAL HERO */}
          <div className="bg-gradient-to-br from-[#2E7D32] to-[#81C784] text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
              <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner border border-white/20">
                      <Navigation2 className={`${detecting ? "animate-spin" : "animate-pulse"} text-white`} size={28} />
                  </div>
                  <h1 className="text-3xl font-black leading-tight tracking-tighter uppercase italic">
                      {language === "te" ? "మీ పొలం స్థానాన్ని గుర్తిద్దాం" : "Locate Your Farm"}
                  </h1>
              </div>
          </div>

          <div className="space-y-6">
              {/* PRIMARY DETECT BUTTON */}
              <button 
                  onClick={handleDetect} 
                  disabled={detecting}
                  className="w-full bg-[#F1F8E9] p-6 rounded-[2.5rem] shadow-md border-2 border-transparent hover:border-[#2E7D32]/20 transition-all flex items-center gap-6 group active:scale-95"
              >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${detected ? "bg-[#1B5E20] text-white" : "bg-white text-[#1B5E20] group-hover:bg-[#1B5E20] group-hover:text-white"}`}>
                      {detecting ? <Loader2 size={32} className="animate-spin" /> : <MapPin size={32} />}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                      <p className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.2em] mb-1.5">{language === 'te' ? 'లొకేషన్ ఆటో డిటెక్ట్' : 'Auto Detect Location'}</p>
                      <p className="text-xl font-black text-[#1B5E20] truncate uppercase leading-none italic">
                          {detecting ? (language === 'te' ? "వెతుకుతుంది..." : "Locating...") : detected ? localDistrict : (language === 'te' ? "ఆటో డిటెక్ట్ చేయండి" : "Tap to detect")}
                      </p>
                  </div>
              </button>

              <div className="flex items-center gap-4 px-4 overflow-hidden py-2">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap">{language === 'te' ? "మాన్యువల్‌గా ఎంచుకోండి" : "Manual Selection"}</span>
                  <div className="h-px flex-1 bg-slate-100" />
              </div>

              {/* MANUAL SELECTION */}
              <div className="space-y-4">
                  <select 
                      value={state} 
                      onChange={(e) => { setState(e.target.value); setLocalDistrict(""); setDetected(false); }} 
                      className="w-full py-5 px-8 bg-white rounded-[1.8rem] border-2 border-slate-50 focus:border-[#2E7D32]/30 text-lg font-black text-slate-800 outline-none transition-all uppercase shadow-sm"
                  >
                      <option value="">{language === 'te' ? "రాష్ట్రాన్ని ఎంచుకోండి" : "Select State"}</option>
                      {states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  
                  {state && (
                      <select 
                          value={localDistrict} 
                          onChange={(e) => { setLocalDistrict(e.target.value); setDetected(true); }} 
                          className="w-full py-5 px-8 bg-white rounded-[1.8rem] border-2 border-slate-50 focus:border-[#2E7D32]/30 text-lg font-black text-slate-800 outline-none transition-all uppercase shadow-sm animate-in slide-in-from-top-2"
                      >
                          <option value="">{language === 'te' ? "జిల్లాను ఎంచుకోండి" : "Select District"}</option>
                          {(indiaDistricts[state] || []).map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                  )}
              </div>
          </div>
      </div>

      {/* FOOTER CTA */}
      <div className="px-6 mt-8">
          <button 
              disabled={!state || !localDistrict || detecting}
              onClick={handleContinue} 
              className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-[#1B5E20]/30 disabled:opacity-30 disabled:grayscale uppercase italic tracking-tighter"
          >
              <span>{language === "te" ? "తదుపరి" : "Continue"}</span>
              <ArrowRight size={28} />
          </button>
      </div>

    </div>
  );
};

export default LocationScreen;
