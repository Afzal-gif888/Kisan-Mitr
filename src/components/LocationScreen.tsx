import { MapPin, ArrowLeft, ArrowRight, Loader2, CheckCircle2, Navigation2 } from "lucide-react";
import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import WeatherModule from "./WeatherModule";
import { indiaDistricts } from "@/lib/indiaData";

interface LocationScreenProps {
  language: Language;
  onNext: (result: any) => void;
  onBack: () => void;
}

const states = Object.keys(indiaDistricts).sort();

const LocationScreen = ({ language, onNext, onBack }: LocationScreenProps) => {
  const t = translations[language];
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleDetect = () => {
    setDetecting(true);
    if (!navigator.geolocation) { alert(t.locationError); setDetecting(false); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=${apiKey}&countrycode=in&language=en`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.results?.[0]) {
            const comp = data.results[0].components;
            let sName = comp.state || "Unknown";
            if (sName.includes("Delhi")) sName = "Delhi";
            
            const matchedState = states.find(s => s.toLowerCase() === sName.toLowerCase()) || sName;
            setState(matchedState);

            let dName = comp.state_district || comp.county || comp.city || "Unknown";
            dName = dName.replace(/ District| City| Division/gi, "").trim();

            if (indiaDistricts[matchedState]) {
                const availableDistricts = indiaDistricts[matchedState];
                const matchedDistrict = availableDistricts.find(d => 
                    d.toLowerCase() === dName.toLowerCase() || 
                    dName.toLowerCase().includes(d.toLowerCase()) ||
                    d.toLowerCase().includes(dName.toLowerCase())
                );
                if (matchedDistrict) dName = matchedDistrict;
            }

            setDistrict(dName);
            setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            setDetected(true);
          }
        } catch (e) { alert(t.locationError); } finally { setDetecting(false); }
      },
      () => { setDetecting(false); alert(t.locationError); },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const tLoc = (name: string) => t[name] || name;

  if (!confirmed) {
    return (
      <div className="min-h-screen bg-[#F5EFE6] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
        {/* 1. TOP HEADER */}
        <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center gap-4 relative">
            <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-black text-white tracking-tight">{t.detectLocation}</h2>
        </div>

        <div className="flex-1 px-6 pt-8 space-y-8 overflow-y-auto">
            {/* 2. HERO CARD */}
            <div className="bg-gradient-to-br from-[#8B5E3C] to-[#D4A373] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md shadow-inner border border-white/20">
                        <Navigation2 className="animate-pulse text-[#F5EFE6]" />
                    </div>
                    <h1 className="text-2xl font-black leading-tight mb-2 tracking-tighter">
                        {language === "te" ? "మీ పొలం స్థానాన్ని గుర్తిద్దాం" : "Identify Farm Location"}
                    </h1>
                </div>
            </div>

            {/* 3. LOCATION BUTTON */}
            <button 
                onClick={handleDetect} 
                disabled={detecting}
                className="w-full bg-white/95 p-6 rounded-[2rem] shadow-xl border-2 border-transparent hover:border-[#8B5E3C]/30 hover:scale-[1.02] transition-all duration-500 flex items-center gap-5 group active:scale-95"
            >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg shadow-[#8B5E3C]/10 ${detected ? "bg-[#2E7D32] text-white" : "bg-[#8B5E3C]/5 text-[#8B5E3C] group-hover:bg-[#8B5E3C] group-hover:text-white"}`}>
                    {detecting ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={28} />}
                </div>
                <div className="text-left flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{t.detectLocation}</p>
                    <p className="text-lg font-black text-[#5C3A21] truncate">
                        {detecting ? "Locating..." : detected ? `${tLoc(district)}, ${tLoc(state)}` : "Click here to detect"}
                    </p>
                </div>
            </button>

            {/* 4. MANUAL SELECT */}
            <div className="space-y-5">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-[#8B5E3C]/10" />
                    <span className="text-[10px] font-black text-[#8B5E3C]/40 uppercase tracking-[0.4em]">{t.orSelectManually}</span>
                    <div className="h-px flex-1 bg-[#8B5E3C]/10" />
                </div>
                <select 
                    value={state} 
                    onChange={(e) => { setState(e.target.value); setDistrict(""); setCoords(null); setDetected(false); }} 
                    className="w-full py-4 px-6 bg-white rounded-2xl border-2 border-[#F5EFE6] text-lg font-black text-[#5C3A21]"
                >
                    <option value="">{t.selectState}</option>
                    {states.map((s) => <option key={s} value={s}>{tLoc(s)}</option>)}
                </select>
                {state && (
                    <select 
                        value={district} 
                        onChange={(e) => setDistrict(e.target.value)} 
                        className="w-full py-4 px-6 bg-white rounded-2xl border-2 border-[#F5EFE6] text-lg font-black text-[#5C3A21]"
                    >
                        <option value="">{t.selectDistrict}</option>
                        {(indiaDistricts[state] || []).map((d) => <option key={d} value={d}>{tLoc(d)}</option>)}
                    </select>
                )}
            </div>
        </div>

        <div className="px-6 mt-10">
            <button 
                disabled={!state || !district || detecting}
                onClick={() => setConfirmed(true)} 
                className="w-full py-6 bg-[#2E7D32] text-white rounded-[2.5rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-4"
            >
                <span>{language === "te" ? "తదుపరి" : "Continue"}</span>
                <ArrowRight size={28} />
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] p-4 flex flex-col items-center max-w-md mx-auto shadow-2xl relative overflow-y-auto">
      <button onClick={() => setConfirmed(false)} className="absolute top-4 left-4 p-2.5 bg-white rounded-full shadow-lg text-slate-400 z-20">
        <ArrowLeft size={20} />
      </button>

      <div className="text-[10px] text-[#8B5E3C] mb-6 font-black mt-12 uppercase tracking-[0.2em] opacity-80">
         📍 {tLoc(district)}, {tLoc(state)}
      </div>

      <div className="w-full">
        <WeatherModule 
          lat={coords?.lat} 
          lon={coords?.lon} 
          state={state}
          district={district}
          language={language}
          onAnalysisComplete={(res: any) => {
            setAnalysisResult(res);
            if (res.triggerNext) {
              onNext(res);
            }
          }}
        />
      </div>
    </div>
  );
};

export default LocationScreen;
