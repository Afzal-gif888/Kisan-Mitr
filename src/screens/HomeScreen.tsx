import { ArrowRight, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { translations } from "../lib/translations";
import farmHero from "../assets/sunrise-farm.png"; 
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
    <div className="fixed inset-0 h-[100dvh] w-[100vw] bg-[#0A2E0F] flex flex-col items-center justify-center gap-8 overflow-hidden touch-none overscroll-none z-50">
      
      {/* 🌐 TOP-RIGHT LANGUAGE TOGGLE */}
      <div className="absolute top-6 right-6 z-40 bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/20 flex shadow-2xl">
          <button 
             onClick={() => setLanguage('en')}
             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-white text-[#1B5E20]' : 'text-white/60 hover:text-white'}`}
          >
              EN
          </button>
          <button 
             onClick={() => setLanguage('te')}
             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${language === 'te' ? 'bg-white text-[#1B5E20]' : 'text-white/60 hover:text-white'}`}
          >
              TE
          </button>
      </div>

      {/* 🖼️ BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
          <img 
            src={farmHero} 
            alt="Sunrise Field" 
            className="w-full h-full object-cover scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#1B5E20]/20 to-[#0A2E0F] z-10" />
      </div>

      {/* 🧑‍🌾 FARMER AI IMAGE LOGO */}
      <div className="w-full mt-16 flex flex-col items-center relative z-20 space-y-3">
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
      <div className="w-full px-8 max-w-md relative z-20 mt-4">
          <div className="space-y-4">
              <p className="text-sm font-black text-white/70 uppercase tracking-[0.3em] text-center italic">
                  {t.welcomeFarmer || "Welcome, Farmer"}
              </p>
              <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1B5E20]/40 group-focus-within:text-[#1B5E20] transition-colors z-10">
                      <User size={22} />
                  </div>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={t.yourName || "Your Name"}
                    className="w-full py-6 pl-16 pr-6 bg-white/95 backdrop-blur-2xl rounded-[2rem] border-4 border-white text-[#1B5E20] placeholder:text-[#1B5E20]/50 text-xl font-black focus:border-[#4CAF50] outline-none transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] uppercase italic relative z-0"
                  />
              </div>
          </div>
      </div>

      {/* 🚦 FOOTER ACTIONS */}
      <div className="w-full px-8 max-w-md relative z-30 space-y-5 mt-6">
        


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
