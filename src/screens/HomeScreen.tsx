import { Sprout, ArrowRight, Languages, Ghost } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/lib/translations";

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen = ({ onStart }: HomeScreenProps) => {
  const { language, setLanguage } = useApp();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-8 max-w-md mx-auto relative overflow-hidden shadow-2xl">
      
      {/* 1. TOP NAV / LANGUAGE TOGGLE */}
      <div className="w-full flex justify-end pt-4 relative z-20">
        <button 
          onClick={() => setLanguage(language === "en" ? "te" : "en")}
          className="flex items-center gap-2.5 px-6 py-3 bg-[#F1F8E9] rounded-full border border-[#1B5E20]/10 shadow-sm active:scale-90 transition-all group"
        >
          <Languages size={18} className="text-[#1B5E20] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-black text-[#1B5E20] uppercase tracking-widest">{language === "en" ? "మార్చు" : "Telugu"}</span>
        </button>
      </div>

      {/* 2. LOGO / BRANDING (Cinematic) */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10 w-full">
        <div className="relative">
            <div className="absolute inset-0 bg-[#1B5E20]/5 blur-[80px] rounded-full" />
            <div className="w-32 h-32 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[3rem] shadow-2xl flex items-center justify-center transform hover:rotate-6 transition-all duration-500 border-4 border-white/20">
                <Sprout size={64} className="text-white drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-4 -right-2 w-14 h-14 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center">
                <Ghost className="text-[#1B5E20]" size={24} />
            </div>
        </div>
        
        <div className="text-center space-y-4">
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-[#1B5E20] tracking-tighter leading-none italic">
              KISAN<span className="text-slate-800">MITR</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] ml-1">Agricultural Intelligence</p>
          </div>
          <div className="h-1.5 w-16 bg-[#1B5E20]/20 rounded-full mx-auto" />
          <p className="text-sm font-bold text-slate-500 max-w-[240px] leading-relaxed mx-auto italic">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* 3. CTA FOOTER */}
      <div className="w-full space-y-8 pb-8 relative z-10">
        <button 
          onClick={onStart}
          className="w-full py-6 bg-[#1B5E20] text-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(27,94,32,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 italic" />
          <span className="text-2xl font-black tracking-tight">{t.startBtn}</span>
          <ArrowRight size={28} />
        </button>
        
        <div className="flex items-center justify-center gap-3 opacity-30">
            <div className="h-px w-8 bg-slate-400" />
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Built for AP Farmers</p>
            <div className="h-px w-8 bg-slate-400" />
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;
