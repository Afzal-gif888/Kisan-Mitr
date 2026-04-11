import { ArrowRight, Languages, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { translations } from "../lib/translations";
import farmHero from "../assets/farm-hero.jpg"; 
import kisanHero from "../assets/kisan-hero.webp"; 

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen = ({ onStart }: HomeScreenProps) => {
  const { language, setLanguage, userName, setUserName } = useApp();
  const t = (translations as any)[language];

  const handleStart = () => {
    if (!userName.trim()) {
        alert(t.enterName || "Please enter your name");
        return;
    }
    onStart();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-between max-w-md mx-auto relative overflow-hidden shadow-2xl">
      
      {/* 🖼️ BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
          <img 
            src={farmHero} 
            alt="Field" 
            className="w-full h-full object-cover scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#1B5E20] z-10" />
      </div>

      {/* 🧑‍🌾 FARMER AI IMAGE LOGO */}
      <div className="w-full pt-12 flex flex-col items-center relative z-20 space-y-4">
          <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full" />
              <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden relative group">
                  <img src={kisanHero} alt="Farmer Advisor" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic drop-shadow-2xl leading-none">
              {language === "te" ? "కిసాన్ మిత్ర" : (
                <>Kisan<span className="text-white/60">Mitr</span></>
              )}
            </h1>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] ml-2 italic">
                {t.smartAdvisor || "Smart Advisor"}
            </p>
          </div>
      </div>

      {/* ✍️ NAME INPUT SECTION */}
      <div className="w-full px-10 relative z-20 space-y-8 flex-1 flex flex-col justify-center">
          <div className="space-y-4">
              <p className="text-sm font-black text-white/70 uppercase tracking-[0.3em] text-center italic">
                  {t.welcomeFarmer || "Welcome, Farmer"}
              </p>
              <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                      <User size={22} />
                  </div>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t.yourName || "Your Name"}
                    className="w-full py-6 pl-16 pr-6 bg-white/10 backdrop-blur-2xl rounded-[2rem] border-2 border-white/20 text-white placeholder:text-white/30 text-xl font-black focus:border-white/50 outline-none transition-all shadow-2xl uppercase italic"
                  />
              </div>
          </div>
      </div>

      {/* 🚦 FOOTER ACTIONS */}
      <div className="w-full px-10 pb-10 relative z-30 space-y-6">
        
        {/* REPOSITIONED LANGUAGE TOGGLE */}
        <div className="flex justify-center">
            <button 
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              className="flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 shadow-xl active:scale-95 transition-all text-white group"
            >
              <Languages size={18} className="group-hover:rotate-12 transition-transform opacity-70" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                  {t.changeLang || "Change Language"}
              </span>
            </button>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-6 bg-white text-[#1B5E20] rounded-[2.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.4)] flex items-center justify-center gap-4 active:scale-95 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[#1B5E20]/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">
              {t.startBtn || "Get Started"}
          </span>
          <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
        </button>

        <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-white" />
                <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">
                    {t.expertGuidance || "Expert Field Guidance"}
                </p>
                <div className="h-px w-6 bg-white" />
            </div>
            <p className="text-[7px] font-black text-white/50 uppercase tracking-[0.3em]">
                {t.builtForAP || "Built for AP"}
            </p>
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;
