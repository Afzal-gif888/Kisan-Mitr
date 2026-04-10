import { Volume2 } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
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
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6 pb-10 max-w-md mx-auto w-full">
        {/* App title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-primary-foreground mb-2">🌾 {t.appName}</h1>
          <p className="text-primary-foreground/80 text-lg">{t.selectLanguage}</p>
        </div>

        {/* Language selector */}
        <div className="flex gap-3 justify-center mb-8 animate-fade-in-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                language === lang.code
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card/90 text-card-foreground hover:bg-card"
              }`}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xl font-extrabold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 animate-fade-in-up flex items-center justify-center gap-3"
        >
          ✅ {t.startButton}
        </button>

        {/* Voice hint */}
        <button className="mt-4 flex items-center justify-center gap-2 text-primary-foreground/70 text-sm animate-fade-in-up">
          <Volume2 size={18} />
          <span>🎤 {t.listenExplanation}</span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
