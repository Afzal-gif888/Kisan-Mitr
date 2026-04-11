import { useState, useEffect } from "react";
import HomeScreen from "@/components/HomeScreen";
import LocationScreen from "@/components/LocationScreen";
import SoilScreen from "@/components/SoilScreen";
import RecommendationScreen from "@/components/RecommendationScreen";
import GuidanceScreen from "@/components/GuidanceScreen";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";
import { validateDistrictMapping } from "@/utils/validateDistrictMapping";

type Screen = "home" | "location" | "soil" | "recommendation" | "guidance";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [soil, setSoil] = useState<SoilType>("loamy");
  const [selectedCrop, setSelectedCrop] = useState("rice");

  const [weatherResult, setWeatherResult] = useState<any>(null);

  useEffect(() => {
    // 🔍 Run district mapping validation once on startup
    validateDistrictMapping();
  }, []);

  const handleSoilSelect = (s: SoilType) => {
    setSoil(s);
    setScreen("recommendation");
  };

  const handleLocationNext = (result: any) => {
    setWeatherResult(result);
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
        <SoilScreen 
          language={language} 
          district={weatherResult?.district}
          onSelect={handleSoilSelect} 
          onBack={() => setScreen("location")} 
        />
      )}
      {screen === "recommendation" && (
        <RecommendationScreen 
          language={language} 
          soil={soil} 
          weatherResult={weatherResult}
          onViewGuide={handleViewGuide} 
          onBack={() => setScreen("soil")} 
        />
      )}
      {screen === "guidance" && (
        <GuidanceScreen 
          language={language} 
          cropKey={selectedCrop} 
          weatherResult={weatherResult}
          onBack={() => setScreen("recommendation")} 
          onStartOver={handleStartOver} 
        />
      )}
    </div>
  );
};

export default Index;
