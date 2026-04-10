import { ArrowRight } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import kisanHero from "@/assets/kisan-hero.webp";
import { Language, translations } from "@/lib/translations";

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

const HomeScreen = ({ language, onLanguageChange, onStart }: HomeScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#F5EFE6]">
      {/* 1. HERO BACKGROUND WITH DARK OVERLAY */}
      <div className="absolute inset-0">
        <img src={farmHero} alt="Farm" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* 2. CENTERED CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 max-w-md mx-auto w-full text-center">
        
        {/* Logo/Hero Icon */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-[#8B5E3C]/40 rounded-full blur-3xl group-hover:bg-[#D4A373]/50 transition-all duration-1000" />
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#8B5E3C] to-[#C49A6C] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative border-4 border-white/20 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                <img 
                    src={kisanHero} 
                    alt="Kisan Mitra" 
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>

        {/* App Title */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-6xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">
            {t.appName}
          </h1>
          <div className="inline-block px-6 py-2 bg-[#D4A373] text-[#5C3A21] text-sm font-black uppercase tracking-widest rounded-full shadow-lg">
            {language === "te" ? "మీ వ్యవసాయ నేస్తం" : "Your Farming Partner"}
          </div>
        </div>

        {/* 4. LANGUAGE SELECTOR (EARTHY TOES) */}
        <div className="w-full space-y-4 mb-10">
            <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-4">{t.selectLanguage}</p>
            <div className="flex flex-wrap gap-3 justify-center">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-500 backdrop-blur-md shadow-xl flex items-center gap-2 ${
                            language === lang.code
                            ? "bg-[#8B5E3C] text-white scale-110 ring-4 ring-[#8B5E3C]/30 shadow-[#8B5E3C]/40"
                            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                        }`}
                    >
                        <span className="text-xl">{lang.flag}</span>
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>

        {/* 5. START BUTTON (ACCENT GREEN) */}
        <button
          onClick={onStart}
          className="w-full py-6 bg-[#2E7D32] text-white rounded-[2rem] text-2xl font-black shadow-[0_15px_30px_rgba(46,125,50,0.4)] hover:shadow-[#2E7D32]/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <span className="relative">{t.startButton}</span>
          <ArrowRight className="relative group-hover:translate-x-2 transition-transform" size={28} />
        </button>



      </div>
    </div>
  );
};

export default HomeScreen;
