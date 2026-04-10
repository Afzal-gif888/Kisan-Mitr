import { Volume2 } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import kisanHero from "@/assets/kisan-hero.webp";
import { Language, translations } from "@/lib/translations";

interface HomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
];

const HomeScreen = ({ language, onLanguageChange, onStart }: HomeScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img src={farmHero} alt="Farm" className="w-full h-full object-cover" width={1024} height={1536} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 max-w-md mx-auto w-full">
        {/* Logo/Hero Image */}
        <div className="relative mb-8 animate-scale-in">
          <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white p-1 shadow-2xl relative border-4 border-white/50 overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img 
              src={kisanHero} 
              alt="Kisan Mitra" 
              className="w-full h-full object-cover rounded-[2.2rem]"
            />
          </div>
        </div>

        {/* App title */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">{t.appName}</h1>
          <p className="text-white/90 text-xl font-medium tracking-tight bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
            {t.selectLanguage}
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 animate-fade-in-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300 backdrop-blur-md shadow-lg ${
                language === lang.code
                  ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/30"
                  : "bg-white/95 text-slate-800 hover:bg-white"
              }`}
            >
              <span className="mr-2 text-2xl">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full py-6 bg-primary text-primary-foreground rounded-3xl text-2xl font-black shadow-2xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 animate-fade-in-up flex items-center justify-center gap-4 group"
        >
          <div className="p-1.5 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
            ✅
          </div>
          {t.startButton}
        </button>

        {/* Voice hint */}
        <button className="mt-8 flex items-center justify-center gap-2 text-white/80 text-base font-medium animate-fade-in-up hover:text-white transition-colors">
          <Volume2 size={24} className="animate-bounce-horizontal" />
          <span>🎤 {t.listenExplanation}</span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
