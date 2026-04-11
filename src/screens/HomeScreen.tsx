import { Sprout, ArrowRight, Languages, Ghost } from "lucide-react";
import { useApp } from "../context/AppContext";
import { translations } from "../lib/translations";
import farmHero from "../assets/farm-hero.jpg"; // Farmer Background Image

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen = ({ onStart }: HomeScreenProps) => {
  const { language, setLanguage } = useApp();
  const t = (translations as any)[language];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-between max-w-md mx-auto relative overflow-hidden shadow-2xl">
      
      {/* 🖼️ FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
          <img 
            src={farmHero} 
            alt="Farmer in Field" 
            className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_infinite]" 
          />
          {/* MULTI-STAGE GRADIENT OVERLAY FOR READABILITY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#1B5E20]/90 z-10" />
      </div>

      {/* 1. TOP NAV / LANGUAGE TOGGLE */}
      <div className="w-full flex justify-end p-8 relative z-30">
        <button 
          onClick={() => setLanguage(language === "en" ? "te" : "en")}
          className="flex items-center gap-2.5 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl active:scale-90 transition-all group"
        >
          <Languages size={18} className="text-white group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
              {language === "en" ? "భాష మార్చు" : "Change Language"}
          </span>
        </button>
      </div>

      {/* 2. LOGO / BRANDING (Floating over background) */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-20 w-full animate-in fade-in zoom-in-95 duration-1000">
        <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full animate-pulse" />
            <div className="w-28 h-28 bg-white/10 backdrop-blur-2xl rounded-[3rem] shadow-2xl flex items-center justify-center border-2 border-white/30 transform hover:rotate-6 transition-all duration-500">
                <Sprout size={56} className="text-white drop-shadow-2xl" />
            </div>
            <div className="absolute -bottom-4 -right-2 w-12 h-12 bg-[#1B5E20] rounded-2xl shadow-xl flex items-center justify-center border-2 border-white/20">
                <Ghost className="text-white" size={20} />
            </div>
        </div>
        
        <div className="text-center space-y-6 px-10">
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-white tracking-tighter leading-none italic uppercase drop-shadow-2xl">
              Kisan<span className="text-white/60">Mitr</span>
            </h1>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-2">Smart Farming Assistant</p>
          </div>
          <div className="h-1.5 w-16 bg-white/20 rounded-full mx-auto" />
          <p className="text-lg font-black text-white max-w-[280px] leading-tight mx-auto italic uppercase drop-shadow-lg opacity-90">
            {t.subtitle || "The Ultimate Agricultural Intelligence Platform"}
          </p>
        </div>
      </div>

      {/* 3. CTA FOOTER */}
      <div className="w-full space-y-8 p-10 relative z-30">
        <button 
          onClick={onStart}
          className="w-full py-7 bg-white text-[#1B5E20] rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center gap-5 active:scale-95 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[#1B5E20]/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="text-2xl font-black tracking-tighter uppercase leading-none">{t.startBtn || "Get Started"}</span>
          <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
        </button>
        
        <div className="flex items-center justify-center gap-4 opacity-40">
            <div className="h-0.5 w-6 bg-white/30" />
            <p className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Expert Field Guidance</p>
            <div className="h-0.5 w-6 bg-white/30" />
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;
