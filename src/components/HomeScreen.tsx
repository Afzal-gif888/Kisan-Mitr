import { ArrowRight, Leaf } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import kisanIcon from "@/assets/kisan-hero.webp";

interface HomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇮🇳" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
];

// REALISTIC ASSETS (Natural Photography)
const REALISTIC_HERO = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000";
const REALISTIC_KISAN = kisanIcon;

const HomeScreen = ({ language, onLanguageChange, onStart }: HomeScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* 1. HERO BACKGROUND WITH DARK OVERLAY (Natural Photo) */}
      <div className="absolute inset-0">
        <img 
            src={REALISTIC_HERO} 
            alt="Natural Farm" 
            className="w-full h-full object-cover scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/90 via-[#1B5E20]/60 to-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. CENTERED CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 max-w-md mx-auto w-full text-center">
        
        {/* Logo/Hero Icon (Realistic Portrait) */}
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-[#4CAF50]/40 rounded-full blur-3xl group-hover:bg-[#81C784]/50 transition-all duration-1000" />
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative border-4 border-white/30 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                <img 
                    src={REALISTIC_KISAN} 
                    alt="Kisan Mitra" 
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>

        {/* App Title */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-6xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">
            {t.appName}
          </h1>
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-black uppercase tracking-widest rounded-full border border-white/30 shadow-lg">
            <Leaf size={16} className="text-[#81C784]" />
            <span>{language === "te" ? "మీ వ్యవసాయ నేస్తం" : "Your Farming Partner"}</span>
          </div>
        </div>

        {/* 4. LANGUAGE SELECTOR */}
        <div className="w-full space-y-4 mb-10">
            <p className="text-white/80 text-xs font-black uppercase tracking-[0.3em] mb-4">{t.selectLanguage}</p>
            <div className="flex flex-wrap gap-3 justify-center">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`px-6 py-3 rounded-2xl text-lg font-bold transition-all duration-500 backdrop-blur-md shadow-xl flex items-center gap-2 border-2 ${
                            language === lang.code
                            ? "bg-white text-[#1B5E20] border-white scale-110 shadow-[0_10px_30px_rgba(255,255,255,0.3)]"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                        }`}
                    >
                        <span className="text-xl">{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>

        {/* 5. START BUTTON */}
        <button
          onClick={onStart}
          className="w-full py-6 bg-white text-[#1B5E20] rounded-[2.2rem] text-2xl font-black shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-white/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/0 via-[#1B5E20]/5 to-[#1B5E20]/0 skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <span className="relative">{t.startButton}</span>
          <ArrowRight className="relative group-hover:translate-x-2 transition-transform" size={28} />
        </button>

      </div>
    </div>
  );
};

export default HomeScreen;
