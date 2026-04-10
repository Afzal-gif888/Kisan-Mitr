import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops, getRecommendation, SoilType } from "@/lib/cropData";

interface RecommendationScreenProps {
  language: Language;
  soil: SoilType;
  onViewGuide: (cropKey: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ language, soil, onViewGuide, onBack }: RecommendationScreenProps) => {
  const t = translations[language];
  const rec = getRecommendation(soil);
  const bestCrop = crops[rec.best];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-primary-foreground p-2 rounded-xl hover:bg-primary/80">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary-foreground">📊 {t.bestCrop}</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-5">
        {/* Best crop highlight */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-xl border-2 border-primary animate-scale-in">
          <img src={bestCrop.image} alt={bestCrop.name[language]} className="w-full h-48 object-cover" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-primary" size={28} />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">{t.bestCrop}</span>
            </div>
            <h3 className="text-3xl font-extrabold mb-4">🌾 {bestCrop.name[language]}</h3>

            {/* Reasons */}
            <div className="space-y-2">
              <p className="text-base font-semibold flex items-center gap-2">
                <span className="text-lg">📌</span> {t.why}
              </p>
              <div className="ml-7 space-y-1 text-muted-foreground">
                <p>🌧️ {t.goodRainfall}</p>
                <p>🌱 {t.suitableSoil}</p>
                <p>📅 {t.rightSeason}</p>
              </div>
            </div>

            <button
              onClick={() => onViewGuide(rec.best)}
              className="w-full mt-5 py-4 bg-primary text-primary-foreground rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
            >
              {t.viewGuide} <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Alternatives */}
        <h4 className="text-lg font-bold flex items-center gap-2">🔄 {t.alternatives}</h4>
        <div className="grid grid-cols-2 gap-3">
          {rec.alternatives.map((key) => {
            const crop = crops[key];
            return (
              <button
                key={key}
                onClick={() => onViewGuide(key)}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all animate-fade-in-up"
              >
                <img src={crop.image} alt={crop.name[language]} loading="lazy" className="w-full h-24 object-cover" />
                <div className="p-3 text-center">
                  <p className="font-bold">{crop.name[language]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
