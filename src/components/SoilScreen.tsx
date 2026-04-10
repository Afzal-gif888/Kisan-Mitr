import { ArrowLeft } from "lucide-react";
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

const soilTypes: { key: SoilType; labelKey: string; image: string; emoji: string }[] = [
  { key: "sandy", labelKey: "sandy", image: soilSandy, emoji: "🟤" },
  { key: "black", labelKey: "black", image: soilBlack, emoji: "⚫" },
  { key: "red", labelKey: "red", image: soilRed, emoji: "🔴" },
  { key: "loamy", labelKey: "loamy", image: soilLoamy, emoji: "🟡" },
];

const SoilScreen = ({ language, onSelect, onBack }: SoilScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-primary-foreground p-2 rounded-xl hover:bg-primary/80">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary-foreground">🌱 {t.selectSoil}</h2>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-2 gap-4">
          {soilTypes.map((soil) => (
            <button
              key={soil.key}
              onClick={() => onSelect(soil.key)}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 animate-scale-in"
            >
              <img src={soil.image} alt={t[soil.labelKey]} loading="lazy" width={512} height={512} className="w-full h-32 object-cover" />
              <div className="p-4 text-center">
                <span className="text-2xl">{soil.emoji}</span>
                <p className="font-bold text-base mt-1">{t[soil.labelKey]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoilScreen;
