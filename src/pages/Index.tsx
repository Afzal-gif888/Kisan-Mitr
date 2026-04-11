import { useState, useEffect } from "react";
import HomeScreen from "@/screens/HomeScreen";
import LocationScreen from "@/screens/LocationScreen";
import SoilScreen from "@/screens/SoilScreen";
import RecommendationScreen from "@/screens/RecommendationScreen";
import GuidanceScreen from "@/screens/GuidanceScreen";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/types";
import { validateDistrictMapping } from "@/utils/validateDistrictMapping";

type Screen = "home" | "location" | "soil" | "recommendation" | "guidance";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [soil, setSoil] = useState<SoilType>("Red Loamy Soil");
  const [selectedCrop, setSelectedCrop] = useState("rice");

  const [weatherResult, setWeatherResult] = useState<any>(null);

  useEffect(() => {
    // 🔍 Run district mapping validation once on startup
    validateDistrictMapping();
  }, []);

  // 📝 STEP 12: DEBUG LOG VALIDATION
  useEffect(() => {
    console.log("--- 🕵️ KISAN-MITR SYSTEM TRACE ---", {
      screen,
      language,
      district: weatherResult?.district || "None",
      soilSelected: soil,
      weatherFeatures: weatherResult?.features || "Analyzing...",
      cropSelected: selectedCrop
    });
  }, [screen, language, soil, weatherResult, selectedCrop]);

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
