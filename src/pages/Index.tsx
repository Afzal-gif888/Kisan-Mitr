import { useState } from "react";
import HomeScreen from "@/components/HomeScreen";
import LocationScreen from "@/components/LocationScreen";
import SoilScreen from "@/components/SoilScreen";
import RecommendationScreen from "@/components/RecommendationScreen";
import GuidanceScreen from "@/components/GuidanceScreen";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";

type Screen = "home" | "location" | "soil" | "recommendation" | "guidance";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [soil, setSoil] = useState<SoilType>("loamy");
  const [selectedCrop, setSelectedCrop] = useState("rice");

  const [weatherFeatures, setWeatherFeatures] = useState<any>(null);
  const [season, setSeason] = useState<string>("Normal");

  const handleSoilSelect = (s: SoilType) => {
    setSoil(s);
    setScreen("recommendation");
  };

  const handleLocationNext = (feat: any, seas: string) => {
    setWeatherFeatures(feat);
    setSeason(seas);
    setScreen("soil");
  };

  const handleViewGuide = (cropKey: string) => {
    setSelectedCrop(cropKey);
    setScreen("guidance");
  };

  const handleStartOver = () => {
    setScreen("home");
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] relative">
      {/* GLOBAL LANGUAGE TOGGLE (FLOATING) */}
      <div className="fixed top-12 right-6 z-[60] flex gap-1.5 p-1 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          {["en", "hi", "te"].map((l) => (
              <button
                  key={l}
                  onClick={() => setLanguage(l as Language)}
                  className={`w-10 h-10 rounded-full text-[10px] font-black uppercase transition-all duration-500 flex items-center justify-center ${
                      language === l 
                      ? "bg-[#8B5E3C] text-white shadow-lg scale-110" 
                      : "text-[#5C3A21]/60 hover:bg-white/20"
                  }`}
              >
                  {l === "en" ? "EN" : l === "hi" ? "हि" : "తె"}
              </button>
          ))}
      </div>

      {screen === "home" && (
        <HomeScreen language={language} onLanguageChange={setLanguage} onStart={() => setScreen("location")} />
      )}
      {screen === "location" && (
        <LocationScreen 
          language={language} 
          onNext={handleLocationNext} 
          onBack={() => setScreen("home")} 
        />
      )}
      {screen === "soil" && (
        <SoilScreen language={language} onSelect={handleSoilSelect} onBack={() => setScreen("location")} />
      )}
      {screen === "recommendation" && (
        <RecommendationScreen 
          language={language} 
          soil={soil} 
          features={weatherFeatures}
          season={season}
          onViewGuide={handleViewGuide} 
          onBack={() => setScreen("soil")} 
        />
      )}
      {screen === "guidance" && (
        <GuidanceScreen language={language} cropKey={selectedCrop} onBack={() => setScreen("recommendation")} onStartOver={handleStartOver} />
      )}
    </div>
  );
};

export default Index;
