import React from 'react';
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import WeatherCard from "@/components/WeatherCard";
import { useApp } from "@/context/AppContext";

interface WeatherScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const WeatherScreen = ({ onNext, onBack }: WeatherScreenProps) => {
  const { language, district, setWeatherResult, weatherResult } = useApp();

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl relative overflow-y-auto">
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center justify-between relative z-50">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90">
              <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                {language === "te" ? "వాతావరణం" : "Weather Report"}
            </h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">{district}</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Star className="text-white fill-current" size={20} />
          </div>
      </div>

      <div className="w-full flex-1">
        <WeatherCard 
          district={district}
          language={language}
          onAnalysisComplete={(res: any) => {
            setWeatherResult(res);
            if (res.triggerNext) {
              onNext();
            }
          }}
        />
      </div>
    </div>
  );
};

export default WeatherScreen;
