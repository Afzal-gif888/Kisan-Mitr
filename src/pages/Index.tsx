import { useApp } from "../context/AppContext";
import HomeScreen from "../screens/HomeScreen";
import LocationScreen from "../screens/LocationScreen";
import WeatherScreen from "../screens/WeatherScreen";
import SoilSelectionScreen from "../screens/SoilSelectionScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import GuidanceScreen from "../screens/GuidanceScreen";

const Index = () => {
  const { 
    screen, setScreen, 
    soil, setSoil,
    setSelectedCrop
  } = useApp() as any; 

  return (
    <div className="min-h-screen bg-[#F5EFE6] relative">
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
