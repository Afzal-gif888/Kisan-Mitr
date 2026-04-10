import { ArrowLeft, Check } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";

import soilSandy from "@/assets/soil-sandy.jpg";
import soilBlack from "@/assets/soil-black.jpg";
import soilRed from "@/assets/soil-red.jpg";
import soilLoamy from "@/assets/soil-loamy.jpg";

interface SoilScreenProps {
  language: Language;
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

const soilTypes: { key: SoilType; labelKey: string; image: string; emoji: string; description: Record<string, string> }[] = [
  { 
    key: "sandy", 
    labelKey: "sandy", 
    image: soilSandy, 
    emoji: "🏜️",
    description: { en: "Dry & light", hi: "सूखी और हल्की", te: "పొడి మరియు తేలికపాటి" }
  },
  { 
    key: "black", 
    labelKey: "black", 
    image: soilBlack, 
    emoji: "🌒",
    description: { en: "Moist & rich", hi: "नम और उपजाऊ", te: "తేమ మరియు సారవంతమైన" }
  },
  { 
    key: "red", 
    labelKey: "red", 
    image: soilRed, 
    emoji: "🍂",
    description: { en: "Dry & airy", hi: "सूखी और हवादार", te: "పొడి మరియు గాలి" }
  },
  { 
    key: "loamy", 
    labelKey: "loamy", 
    image: soilLoamy, 
    emoji: "🌾",
    description: { en: "Rich & perfect", hi: "उपजाऊ और उत्तम", te: "సారవంతమైన మరియు ఉత్తమమైన" }
  },
];

const SoilScreen = ({ language, onSelect, onBack }: SoilScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl">
      {/* Header */}
      <div className="bg-primary p-6 flex items-center gap-4 sticky top-0 z-20 shadow-md">
        <button 
          onClick={onBack} 
          className="text-primary-foreground p-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="text-2xl font-black text-primary-foreground tracking-tight underline decoration-white/30 decoration-4 underline-offset-4">
          {t.selectSoil}
        </h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="bg-earth/10 border-l-4 border-earth p-4 rounded-r-2xl animate-fade-in-up">
          <p className="text-earth text-lg font-bold">
            💡 {language === "te" ? "మీ నేల రకాన్ని బట్టి సరైన పంటను ఎంచుకోండి" : language === "hi" ? "अपनी मिट्टी के अनुसार सही फसल चुनें" : "Select the soil type to find the best crop for your farm."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {soilTypes.map((soil, i) => (
            <button
              key={soil.key}
              onClick={() => onSelect(soil.key)}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-primary active:scale-[0.98] transition-all duration-300 animate-scale-in flex items-stretch h-32"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-1/3 relative overflow-hidden">
                <img src={soil.image} alt={t[soil.labelKey]} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
              </div>
              
              <div className="flex-1 p-5 flex flex-col justify-center text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl drop-shadow-sm">{soil.emoji}</span>
                  <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors">
                    {t[soil.labelKey]}
                  </h3>
                </div>
                <p className="text-muted-foreground font-bold text-sm uppercase tracking-wider">
                  {soil.description[language]}
                </p>
              </div>

              <div className="w-16 bg-muted/30 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <div className="w-10 h-10 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all">
                  <Check size={20} className="text-transparent group-hover:text-primary-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoilScreen;
