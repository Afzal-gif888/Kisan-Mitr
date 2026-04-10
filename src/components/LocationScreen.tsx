import { MapPin, Thermometer, CloudRain, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Language, translations } from "@/lib/translations";

interface LocationScreenProps {
  language: Language;
  onNext: () => void;
  onBack: () => void;
}

const states = ["Andhra Pradesh", "Telangana", "Maharashtra", "Karnataka", "Tamil Nadu", "Madhya Pradesh", "Uttar Pradesh"];
const districts: Record<string, string[]> = {
  "Andhra Pradesh": ["Guntur", "Krishna", "Kurnool", "Anantapur"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  Maharashtra: ["Pune", "Nagpur", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Belgaum", "Dharwad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Agra", "Kanpur"],
};

const LocationScreen = ({ language, onNext, onBack }: LocationScreenProps) => {
  const t = translations[language];
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const handleDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      setDetected(true);
      setState("Telangana");
      setDistrict("Warangal");
    }, 1500);
  };

  const showWeather = detected || (state && district);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-primary-foreground p-2 rounded-xl hover:bg-primary/80">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary-foreground">📍 {t.detectLocation}</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Auto detect button */}
        <button
          onClick={handleDetect}
          disabled={detecting}
          className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {detecting ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={24} />}
          {detecting ? "..." : t.detectLocation}
        </button>

        {/* Manual selection */}
        <div className="text-center text-muted-foreground font-semibold">{t.orSelectManually}</div>

        <select
          value={state}
          onChange={(e) => { setState(e.target.value); setDistrict(""); setDetected(false); }}
          className="w-full py-4 px-4 bg-card rounded-2xl text-lg font-semibold border-2 border-border focus:border-primary outline-none"
        >
          <option value="">{t.selectState}</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {state && (
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full py-4 px-4 bg-card rounded-2xl text-lg font-semibold border-2 border-border focus:border-primary outline-none animate-fade-in-up"
          >
            <option value="">{t.selectDistrict}</option>
            {(districts[state] || []).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        )}

        {/* Weather display */}
        {showWeather && (
          <div className="bg-card rounded-2xl p-5 shadow-md animate-scale-in">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🌤️ {t.weather}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/30 rounded-xl p-4 text-center">
                <Thermometer size={32} className="mx-auto text-destructive mb-2" />
                <div className="text-sm text-muted-foreground">{t.temperature}</div>
                <div className="text-xl font-bold">🔥 {t.hot}</div>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <CloudRain size={32} className="mx-auto text-primary mb-2" />
                <div className="text-sm text-muted-foreground">{t.rainfall}</div>
                <div className="text-xl font-bold">🌧️ {t.moderateRain}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Next button */}
        {showWeather && (
          <button
            onClick={onNext}
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 animate-fade-in-up"
          >
            {t.next} <ArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationScreen;
