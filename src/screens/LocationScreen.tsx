import React, { useState, useCallback, memo } from "react";
import { MapPin, ArrowLeft, ArrowRight, Loader2, Navigation2 } from "lucide-react";
import { translations } from "../lib/translations";
import { indiaDistricts } from "../lib/indiaData";
import { useApp } from "../context/AppContext";

interface LocationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const STATE_TRANSLATIONS: Record<string, string> = {
    "Andhra Pradesh": "ఆంధ్ర ప్రదేశ్",
    "Karnataka": "కర్ణాటక",
    "Kerala": "కేరళ",
    "Tamil Nadu": "తమిళనాడు",
    "Telangana": "తెలంగాణ"
};

const DISTRICT_TRANSLATIONS: Record<string, string> = {
    'Tirupati': 'తిరుపతి', 'Chittoor': 'చిత్తూరు', 'Anantapur': 'అనంతపురం', 'YSR Kadapa': 'వైఎస్ఆర్ కడప',
    'Kurnool': 'కర్నూలు', 'Nandyal': 'నంద్యాల', 'Prakasam': 'ప్రకాశం', 'Guntur': 'గుంటూరు',
    'Bapatla': 'బాపట్ల', 'Palnadu': 'పల్నాడు', 'Krishna': 'కృష్ణా', 'NTR': 'ఎన్టీఆర్', 
    'Eluru': 'ఏలూరు', 'West Godavari': 'పశ్చిమ గోదావరి', 'East Godavari': 'తూర్పు గోదావరి',
    'Kakinada': 'కాకినాడ', 'Konaseema': 'కోనసీమ', 'Visakhapatnam': 'విశాఖపట్నం', 
    'Anakapalli': 'అనకాపల్లి', 'Vizianagaram': 'విజయనగరం', 'Srikakulam': 'శ్రీకాకుళం',
    'Parvathipuram Manyam': 'పార్వతీపురం మన్యం', 'Alluri Sitharama Raju': 'అల్లూరి సీతారామరాజు',
    'Annamayya': 'అన్నమయ్య', 'Sri Sathya Sai': 'శ్రీ సత్యసాయి', 'Nellore': 'నెల్లూరు'
};

const translateState = (st: string, lang: string) => {
    if (lang !== 'te') return st;
    return STATE_TRANSLATIONS[st] || st;
};

const translateDistrict = (district: string, lang: string) => {
    if (lang !== 'te') return district;
    return DISTRICT_TRANSLATIONS[district] || district;
};

const states = ["Andhra Pradesh"];

const LocationScreen = memo(({ onNext, onBack }: LocationScreenProps) => {
  const { language, setDistrict: setGlobalDistrict, userName } = useApp();
  const t = (translations as any)[language] || {};
  
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [state, setState] = useState("Andhra Pradesh");
  const [localDistrict, setLocalDistrict] = useState("");

  const handleDetect = useCallback(() => {
    setDetecting(true);
    if (!navigator.geolocation) { 
        alert(t.locationError || "Geolocation not supported"); 
        setDetecting(false); 
        return; 
    }

    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 20000, // 20 seconds
        maximumAge: 0
    };

    const successCallback = async (pos: GeolocationPosition) => {
        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
          if (!apiKey) throw new Error("API Key Missing");
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=${apiKey}&countrycode=in&language=en`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.results?.[0]) {
            const comp = data.results[0].components;
            let sName = comp?.state || "Andhra Pradesh";
            const matchedState = states.find(s => s.toLowerCase() === sName.toLowerCase()) || "Andhra Pradesh";
            setState(matchedState);

            let dName = comp?.state_district || comp?.county || comp?.city || "Unknown";
            dName = String(dName).replace(/ District| City| Division/gi, "").trim();
            setLocalDistrict(dName);
            setDetected(true);
          }
        } catch (e) { 
           console.error("Geocoding failed:", e);
           alert(language === 'te' ? "స్థానాన్ని గుర్తించలేకపోయాము. దయచేసి మాన్యువల్‌గా ఎంచుకోండి." : "Location detection failed. Please select manually.");
        } finally { setDetecting(false); }
    };

    const errorCallback = (error: GeolocationPositionError) => {
        // If High Accuracy fails, try one more time with Low Accuracy
        if (geoOptions.enableHighAccuracy) {
            console.warn("High accuracy failed, retrying with low accuracy...");
            geoOptions.enableHighAccuracy = false;
            navigator.geolocation.getCurrentPosition(successCallback, finalErrorCallback, geoOptions);
        } else {
            finalErrorCallback(error);
        }
    };

    const finalErrorCallback = (error: GeolocationPositionError) => {
        setDetecting(false);
        console.error("Geolocation Error details:", error);
        
        // Default message from translations or generic fallback
        let msg = t.locationError || "Location Error";
        
        if (error.code === 1) { // PERMISSION_DENIED
            msg = language === 'te' 
                ? "అనుమతి నిరాకరించబడింది. దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో లొకేషన్ అనుమతించండి." 
                : "Permission Denied. Please enable location access in your browser or phone settings.";
        } else if (error.code === 2) { // POSITION_UNAVAILABLE
            msg = language === 'te' 
                ? "స్థాన సమాచారం అందుబాటులో లేదు. దయచేసి మీ జీపీఎస్ (GPS) ఆన్ చేయండి." 
                : "Position unavailable. Please ensure your GPS/Location is turned on.";
        } else if (error.code === 3) { // TIMEOUT
            msg = language === 'te' 
                ? "లొకేషన్ గుర్తించడంలో ఆలస్యమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి." 
                : "Location request timed out. Please try again in a clearer area.";
        }
        
        alert(msg);
    };


    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOptions);
  }, [language, t.locationError]);


  const handleContinue = useCallback(() => {
    setGlobalDistrict(localDistrict);
    onNext();
  }, [localDistrict, onNext, setGlobalDistrict]);

  return (
    <div className="fixed inset-0 sm:relative sm:h-[850px] bg-white flex flex-col sm:max-w-md sm:mx-auto sm:shadow-2xl sm:rounded-[3rem] overflow-hidden border-slate-100 sm:border">
      
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-12 pb-8 px-8 rounded-b-[2.5rem] shadow-lg flex items-center gap-4 relative z-20 shrink-0">
          <button onClick={onBack} className="text-white p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
              <ArrowLeft size={22} />
          </button>
          <h2 className="text-lg font-black text-white tracking-tight leading-none uppercase italic">
              <span className="opacity-90">{language === 'te' ? '🙏 నమస్తే, ' : '👋 HI, '}</span>
              {language === 'te' ? `${userName} గారు!` : `${userName}!`}
          </h2>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 px-8 pt-6 flex flex-col pb-8 overflow-hidden">
        <div className="space-y-6">
          {/* AUTO DETECT */}
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
                {detecting ? (language === 'te' ? "వెతుకుతుంది..." : "Locating...") : detected ? translateDistrict(localDistrict, language) : (language === 'te' ? "ఆటో డిటెక్ట్ చేయండి" : "Tap to detect")}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-4 px-4 py-2">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap">{language === 'te' ? "మాన్యువల్‌గా ఎంచుకోండి" : "Manual Selection"}</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <div className="space-y-4">
            <select 
              value={state} 
              onChange={(e) => { setState(e.target.value); setLocalDistrict(""); setDetected(false); }} 
              className="w-full py-5 px-8 bg-white rounded-[1.8rem] border-2 border-slate-50 focus:border-[#2E7D32]/30 text-lg font-black text-[#1B5E20] outline-none transition-all uppercase shadow-sm"
            >
              {states.map((s) => <option className="text-[#1B5E20] font-black" key={s} value={s}>{translateState(s, language)}</option>)}
            </select>
            
            <select 
              value={localDistrict} 
              onChange={(e) => { setLocalDistrict(e.target.value); setDetected(true); }} 
              disabled={!state}
              className={`w-full py-5 px-8 bg-white rounded-[1.8rem] border-2 border-slate-50 focus:border-[#2E7D32]/30 text-lg font-black text-[#1B5E20] outline-none transition-all uppercase shadow-sm ${!state ? 'opacity-50 cursor-not-allowed' : 'animate-in slide-in-from-top-2'}`}
            >
              <option className="text-[#1B5E20] font-black" value="">{language === 'te' ? "జిల్లాను ఎంచుకోండి" : "Select District"}</option>
              {state && (indiaDistricts[state] || []).map((d) => <option className="text-[#1B5E20] font-black" key={d} value={d}>{translateDistrict(d, language)}</option>)}
            </select>
          </div>

          {/* DYNAMIC CONFIRMATION BADGE */}
          {state && localDistrict && (
            <div className="animate-in zoom-in-95 duration-500 bg-[#E8F5E9] p-5 rounded-[2rem] border-2 border-[#1B5E20]/20 flex items-center gap-4 shadow-xl shadow-emerald-900/5">
              <div className="w-12 h-12 bg-[#1B5E20] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <MapPin size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.2em] leading-none mb-2">{language === 'te' ? 'ఎంచుకున్న ప్రాంతం' : 'Selected Location'}</p>
                <div className="space-y-0.5">
                  <h3 className="text-xl font-black text-[#1B5E20] italic leading-none truncate">
                    {translateDistrict(localDistrict, language)}
                  </h3>
                  <p className="text-[11px] font-bold text-[#1B5E20]/60 uppercase tracking-wider italic">
                    {translateState(state, language)}
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1B5E20] shadow-sm shrink-0">
                <Navigation2 size={20} fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* FOOTER PUSHED TO BOTTOM */}
        <div className="mt-auto pt-6">
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
    </div>
  );
});

export default LocationScreen;
