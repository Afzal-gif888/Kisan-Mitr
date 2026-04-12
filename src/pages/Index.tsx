import { useEffect, useState, Suspense, lazy, useTransition } from "react";
import { useApp, Screen } from "../context/AppContext";

// 🚀 Performance: Lazy Imports for Split Bundling & Faster Initial Load
const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const LocationScreen = lazy(() => import("../screens/LocationScreen"));
const WeatherScreen = lazy(() => import("../screens/WeatherScreen"));
const SoilSelectionScreen = lazy(() => import("../screens/SoilSelectionScreen"));
const RecommendationScreen = lazy(() => import("../screens/RecommendationScreen"));
const GuidanceScreen = lazy(() => import("../screens/GuidanceScreen"));

// 🖼️ Asset Preloading for "Instant" Images
import farmHero from "../assets/sunrise-farm.png"; 
import kisanHero from "../assets/kisan-hero.webp";
import soilImages from "../data/soilImages";
import cropImages from "../data/cropImages";

const preloadPriorityAssets = () => {
  const priority = [farmHero, kisanHero];
  priority.forEach(src => {
    const img = new Image();
    img.src = src;
    (img as any).fetchPriority = 'high';
  });
};

const preloadSoilAssets = () => {
    Object.values(soilImages).forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

const preloadCropAssets = () => {
    Object.values(cropImages).forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

const SCREENS_ORDER: Screen[] = ["home", "location", "weather", "soil", "recommendation", "guidance"];

const Index = () => {
  const { 
    screen, setScreen: setAppScreen, 
    setSoil,
    setSelectedCrop,
    language,
    setLanguage
  } = useApp();

  const [isPending, startTransition] = useTransition();

  const setScreen = (newScreen: Screen) => {
    startTransition(() => {
        setAppScreen(newScreen);
    });
  };

  const currentStep = SCREENS_ORDER.indexOf(screen);
  const progress = (currentStep / (SCREENS_ORDER.length - 1)) * 100;

  useEffect(() => {
    preloadPriorityAssets();
  }, []);

  // Strategic preloading based on current screen
  useEffect(() => {
    if (screen === "location") preloadSoilAssets();
    if (screen === "soil") preloadCropAssets();
  }, [screen]);

  return (
    <div className={`min-h-screen bg-white relative font-sans selection:bg-[#1B5E20] selection:text-white transition-opacity duration-300 ${isPending ? 'opacity-70' : 'opacity-100'}`}>
      
      {/* 🚀 ELITE NAVIGATION PROGRESS BAR */}
      {screen !== "home" && (
          <div className="fixed top-0 left-0 w-full h-1.5 z-[1000] bg-[#1B5E20]/10 overflow-hidden">
              <div 
                  className="h-full bg-[#1B5E20] transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(27,94,32,0.5)]" 
                  style={{ width: `${progress}%` }} 
              />
          </div>
      )}
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

      <Suspense fallback={
        <div className="fixed inset-0 bg-[#F5F1E9] flex items-center justify-center z-[100]">
           <div className="w-16 h-16 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
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
      </Suspense>
    </div>
  );
};


export default Index;
