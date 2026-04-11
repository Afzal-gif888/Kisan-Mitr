import { Check } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import { useApp } from "../context/AppContext";

interface WeatherScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const WeatherScreen = ({ onNext, onBack }: WeatherScreenProps) => {
  const { language, district, weatherResult, setWeatherResult } = useApp();

  const handleAnalysisComplete = (result: any) => {
    setWeatherResult(result);
    if (result.triggerNext) {
        onNext();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl relative safe-area-inset">
      <div className="flex-1 overflow-y-auto w-full">
        <WeatherCard 
          district={district}
          state="Andhra Pradesh"
          language={language}
          onAnalysisComplete={handleAnalysisComplete}
        />
      </div>

      {weatherResult && !weatherResult.triggerNext && (
        <div className="px-6 pb-10 pt-4 bg-white/80 backdrop-blur-xl border-t border-slate-50 sticky bottom-0 z-50">
           <button 
              onClick={onNext}
              className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.2rem] text-2xl font-black shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-[#1B5E20]/30 uppercase italic tracking-tighter"
           >
              <span>{language === "te" ? "తదుపరి" : "See Soil Guide"}</span>
              <Check size={28} />
           </button>
        </div>
      )}
    </div>
  );
};

export default WeatherScreen;
