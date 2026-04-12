import { Suspense, lazy } from "react";
import { useApp } from "../context/AppContext";

// 🚀 Performance Optimization: Lazy Loading Screens
const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const LocationScreen = lazy(() => import("../screens/LocationScreen"));
const WeatherScreen = lazy(() => import("../screens/WeatherScreen"));
const SoilSelectionScreen = lazy(() => import("../screens/SoilSelectionScreen"));
const RecommendationScreen = lazy(() => import("../screens/RecommendationScreen"));
const GuidanceScreen = lazy(() => import("../screens/GuidanceScreen"));

// Loading Placeholder
const ScreenLoader = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center space-y-4 animate-pulse">
    <div className="w-16 h-16 bg-[#1B5E20]/10 rounded-3xl flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin" />
    </div>
    <p className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.4em] italic">Syncing Agriculture Data...</p>
  </div>
);

const Index = () => {
  const { 
    screen, setScreen, 
    setSoil,
    setSelectedCrop,
    language,
    setLanguage
  } = useApp();

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#1B5E20] selection:text-white">
      
      {/* 🌐 OMNIPRESENT GLOBAL LANGUAGE TOGGLE */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[999] bg-[#1B5E20]/95 backdrop-blur-2xl rounded-full p-1 border border-white/20 flex shadow-[0_8px_30px_rgb(27,94,32,0.3)] transition-all hover:bg-[#1B5E20]">
          <button 
             onClick={() => setLanguage('en')}
             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-white text-[#1B5E20] shadow-lg scale-105' : 'text-white/70 hover:text-white active:scale-95'}`}
          >
              EN
          </button>
          <button 
             onClick={() => setLanguage('te')}
             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'te' ? 'bg-white text-[#1B5E20] shadow-lg scale-105' : 'text-white/70 hover:text-white active:scale-95'}`}
          >
              తె
          </button>
      </div>

      <Suspense fallback={<ScreenLoader />}>
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
