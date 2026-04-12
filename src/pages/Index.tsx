import { useEffect } from "react";
import { useApp } from "../context/AppContext";

// 🚀 Performance: Standard Imports for Zero-Flicker Navigation
import HomeScreen from "../screens/HomeScreen";
import LocationScreen from "../screens/LocationScreen";
import WeatherScreen from "../screens/WeatherScreen";
import SoilSelectionScreen from "../screens/SoilSelectionScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import GuidanceScreen from "../screens/GuidanceScreen";

// 🖼️ Asset Preloading for "Instant" Images
import farmHero from "../assets/sunrise-farm.png"; 
import kisanHero from "../assets/kisan-hero.webp";
import soilImages from "../data/soilImages";
import cropImages from "../data/cropImages";

const preloadAssets = () => {
  const assets = [
    farmHero, kisanHero,
    ...Object.values(soilImages),
    ...Object.values(cropImages)
  ];
  assets.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

const Index = () => {
  const { 
    screen, setScreen, 
    setSoil,
    setSelectedCrop,
    language,
    setLanguage
  } = useApp();

  useEffect(() => {
    preloadAssets();
  }, []);

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#1B5E20] selection:text-white">
      
      {/* 🌐 OMNIPRESENT GLOBAL LANGUAGE TOGGLE */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-[999] bg-[#1B5E20]/90 backdrop-blur-3xl rounded-full p-1 border border-white/20 flex shadow-2xl transition-all scale-90 sm:scale-100">
          <button 
             onClick={() => setLanguage('en')}
             className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-white text-[#1B5E20] shadow-md' : 'text-white/70'}`}
          >
              EN
          </button>
          <button 
             onClick={() => setLanguage('te')}
             className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'te' ? 'bg-white text-[#1B5E20] shadow-md' : 'text-white/70'}`}
          >
              తె
          </button>
      </div>

      {screen === "home" && (
        <HomeScreen onStart={() => setScreen("location")} />
      )}
      {screen === "location" && (
        <LocationScreen 
          onNext={() => setScreen("weather")} 
          onBack={() => setScreen("home")} 
        />
      )}
      {screen === "weather" && (
        <WeatherScreen 
          onNext={() => setScreen("soil")} 
          onBack={() => setScreen("location")}
        />
      )}
      {screen === "soil" && (
        <SoilSelectionScreen 
          onSelect={(s) => { setSoil(s); setScreen("recommendation"); }} 
          onBack={() => setScreen("weather")} 
        />
      )}
      {screen === "recommendation" && (
        <RecommendationScreen 
          onViewGuide={(cropId) => { setSelectedCrop(cropId); setScreen("guidance"); }} 
          onBack={() => setScreen("soil")} 
        />
      )}
      {screen === "guidance" && (
        <GuidanceScreen 
          onBack={() => setScreen("recommendation")} 
          onStartOver={() => setScreen("home")} 
        />
      )}
    </div>
  );
};


export default Index;
