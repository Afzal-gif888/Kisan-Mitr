import { MapPin, Thermometer, CloudRain, ArrowLeft, ArrowRight, Loader2, Navigation } from "lucide-react";
import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import WeatherModule from "./WeatherModule";
import { indiaDistricts } from "@/lib/indiaData";

interface LocationScreenProps {
  language: Language;
  onNext: (features: any, season: string) => void;
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
  const [analysisResult, setAnalysisResult] = useState<{features: any, season: string} | null>(null);

  const handleDetect = () => {
    setDetecting(true);
    setDetected(false);
    setConfirmed(false);
    setAnalysisResult(null);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setDetecting(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 GPS:", latitude, longitude);

        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&countrycode=in&language=en`;
          
          const response = await fetch(url);
          const data = await response.json();
          console.log("🌐 OpenCage Response:", data);

          if (data.results && data.results.length > 0) {
            const comp = data.results[0].components;
            
            // Normalize state name to match our database keys
            let stateName = comp.state || "Unknown";
            if (stateName.includes("Delhi")) stateName = "Delhi";
            
            const districtName = 
              comp.state_district || 
              comp.county || 
              comp.city || 
              comp.town || 
              comp.village || 
              "Unknown";
            
            setState(stateName);
            setDistrict(districtName);
            setCoords({ lat: latitude, lon: longitude });
            setDetected(true);
          }
        } catch (error) {
          console.error("Geocoding failed", error);
          alert("Network error. Please check your internet.");
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        setDetecting(false);
        
        if (!window.isSecureContext) {
          alert("Location requires a secure connection (HTTPS). Please test on a secure site or localhost.");
          return;
        }

        switch(error.code) {
          case 1:
            alert("Permission denied. Please enable location access in your phone settings.");
            break;
          case 2:
            alert("Location signal lost. Please move to an open area and try again.");
            break;
          case 3:
            alert("Request timed out. Please try again.");
            break;
          default:
            alert("An unknown error occurred while detecting location.");
        }
      },
      options
    );
  };

  const tLoc = (name: string) => t[name] || name;

  const canConfirm = state && district;
  const showWeather = confirmed && state && district;

  // Get districts for current state, and make sure the detected district is included
  const getDistrictOptions = () => {
    if (!state) return [];
    const baseDistricts = [...(indiaDistricts[state] || [])];
    if (district && !baseDistricts.includes(district)) {
      baseDistricts.unshift(district); // Add detected district to front if missing
    }
    return baseDistricts;
  };

  const handleConfirm = () => {
    if (canConfirm) {
      setConfirmed(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl">
      {/* Header */}
      <div className="bg-primary p-6 flex items-center gap-4 sticky top-0 z-20 shadow-md">
        <button 
          onClick={onBack} 
          className="text-primary-foreground p-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="text-2xl font-black text-primary-foreground tracking-tight underline decoration-white/30 decoration-4 underline-offset-4">
          📍 {t.detectLocation}
        </h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Manual selection - Moved to Top */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-black text-muted-foreground ml-2 uppercase tracking-tighter">{t.selectState}</label>
            <select
              value={state}
              onChange={(e) => { 
                setState(e.target.value); 
                setDistrict(""); 
                setDetected(false); 
                setConfirmed(false); 
                setAnalysisResult(null);
              }}
              className="w-full py-5 px-6 bg-card rounded-3xl text-xl font-black border-4 border-transparent focus:border-primary outline-none shadow-inner drop-shadow-sm appearance-none"
            >
              <option value="">{t.selectState}</option>
              {states.map((s) => <option key={s} value={s}>{tLoc(s)}</option>)}
            </select>
          </div>

          {state && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-black text-muted-foreground ml-2 uppercase tracking-tighter">{t.selectDistrict}</label>
              <select
                value={district}
                onChange={(e) => { 
                  setDistrict(e.target.value); 
                  setConfirmed(false); 
                }}
                className="w-full py-5 px-6 bg-card rounded-3xl text-xl font-black border-4 border-transparent focus:border-primary outline-none shadow-inner drop-shadow-sm appearance-none"
              >
                <option value="">{t.selectDistrict}</option>
                {getDistrictOptions().map((d) => <option key={d} value={d}>{tLoc(d)}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-x-0 h-px bg-border" />
          <span className="relative px-4 bg-background text-muted-foreground font-black text-sm uppercase tracking-widest leading-none">
            {t.orSelectManually || "OR"}
          </span>
        </div>

        {/* Auto detect button - Moved below manual */}
        <button
          onClick={handleDetect}
          disabled={detecting}
          className={`w-full py-6 rounded-[2rem] text-xl font-black shadow-xl transition-all flex items-center justify-center gap-4 border-b-8 active:border-b-0 active:translate-y-2 ${
            detected 
            ? "bg-secondary text-white border-secondary/70" 
            : "bg-primary text-primary-foreground border-primary/70"
          }`}
        >
          {detecting ? (
            <Loader2 size={32} className="animate-spin" />
          ) : detected ? (
            <Navigation size={32} className="animate-pulse" />
          ) : (
            <MapPin size={32} />
          )}
          {detecting ? "..." : detected ? <span>{tLoc(district)}, {tLoc(state)}</span> : t.detectLocation}
        </button>

        {/* Confirm Button - The New Gateway */}
        {canConfirm && !confirmed && (
          <button
            onClick={handleConfirm}
            className="w-full py-5 mt-2 bg-indigo-600 text-white rounded-3xl text-2xl font-black shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all animate-bounce-subtle flex items-center justify-center gap-3"
          >
            ✅ Confirm Location
          </button>
        )}




        {/* Weather display */}
        {showWeather && (
          <div className="animate-scale-in">
            {coords ? (
              <WeatherModule 
                lat={coords.lat} 
                lon={coords.lon} 
                onAnalysisComplete={setAnalysisResult}
              />
            ) : (
              <div className="bg-card rounded-[2.5rem] p-6 shadow-2xl border-4 border-primary/10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-primary">
                  <span className="p-2 bg-primary/10 rounded-xl">🌤️</span> 
                  {t.weather}
                </h3>
                <div className="p-6 text-center text-muted-foreground font-bold italic">
                  Select location to see weather
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Next button */}
        {showWeather && (
          <button
            onClick={() => onNext(analysisResult?.features, analysisResult?.season || "Normal")}
            className="w-full py-6 bg-primary text-primary-foreground rounded-[2rem] text-2xl font-black shadow-2xl hover:shadow-primary/40 active:scale-[0.95] transition-all flex items-center justify-center gap-4 animate-fade-in-up border-b-8 border-primary/70"
          >
            {t.next} <ArrowRight size={32} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationScreen;
