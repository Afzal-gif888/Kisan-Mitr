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
    <div className="min-h-screen bg-background">
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
