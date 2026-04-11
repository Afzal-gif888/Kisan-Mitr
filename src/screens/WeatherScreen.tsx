import WeatherCard from "../components/WeatherCard";
import { useApp } from "../context/AppContext";

interface WeatherScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const WeatherScreen = ({ onNext, onBack }: WeatherScreenProps) => {
  const { language, district, setWeatherResult } = useApp();

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
          onBack={onBack}
        />
      </div>
      
      {/* 🛡️ Footer button removed to prevent duplication. 
          The primary 'Select Soil' action remains inside the WeatherCard 
          to maintain a single, focused agricultural journey. */}
    </div>
  );
};

export default WeatherScreen;
