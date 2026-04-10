import { ArrowLeft, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops, getRecommendation, SoilType } from "@/lib/cropData";

interface RecommendationScreenProps {
  language: Language;
  soil: SoilType;
  features: any;
  season: string;
  onViewGuide: (cropKey: string) => void;
  onBack: () => void;
}

const RecommendationScreen = ({ language, soil, features, season, onViewGuide, onBack }: RecommendationScreenProps) => {
  const t = translations[language];
  const rec = getRecommendation(soil, season, features);
  const bestCrop = crops[rec.best];

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
          📊 {t.bestCrop}
        </h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8">
        {/* Best crop highlight */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-card rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-primary/20 animate-scale-in">
            <div className="relative h-56">
              <img src={bestCrop.image} alt={bestCrop.name[language]} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-black flex items-center gap-2 shadow-lg">
                <Star size={18} className="fill-current" />
                {t.bestCrop}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-4xl font-black mb-6 flex items-center gap-3">
                <span className="text-primary text-5xl">🌾</span> 
                {bestCrop.name[language]}
              </h3>

              {/* Reasons */}
              <div className="bg-muted/30 p-5 rounded-3xl space-y-4 mb-6">
                <p className="text-xl font-black flex items-center gap-3 text-foreground">
                  <span className="p-2 bg-white rounded-xl shadow-sm italic text-2xl font-serif leading-none">?</span> 
                  {t.why}
                </p>
                <div className="grid gap-3 ml-2">
                  {[
                    { icon: "🌧️", text: t.goodRainfall },
                    { icon: "🌱", text: t.suitableSoil },
                    { icon: "📅", text: t.rightSeason }
                  ].map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/50 p-3 rounded-2xl border border-white shadow-sm font-bold text-muted-foreground">
                      <span className="text-xl">{reason.icon}</span>
                      {reason.text}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onViewGuide(rec.best)}
                className="w-full py-6 bg-primary text-primary-foreground rounded-[2rem] text-2xl font-black flex items-center justify-center gap-4 shadow-xl hover:shadow-primary/40 active:scale-[0.95] transition-all border-b-8 border-primary/70"
              >
                {t.viewGuide} <ArrowRight size={32} />
              </button>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="space-y-4">
          <h4 className="text-xl font-black flex items-center gap-3 text-muted-foreground/80 lowercase italic tracking-tighter">
            <span className="w-8 h-px bg-muted-foreground/30"></span>
            {t.alternatives}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {rec.alternatives.map((key, i) => {
              const crop = crops[key];
              return (
                <button
                  key={key}
                  onClick={() => onViewGuide(key)}
                  className="group bg-card rounded-[2rem] overflow-hidden shadow-lg border-2 border-transparent hover:border-white active:scale-[0.95] transition-all animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="h-28 relative">
                    <img src={crop.image} alt={crop.name[language]} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-black text-lg group-hover:text-primary transition-colors">{crop.name[language]}</p>
                    <div className="mt-1 h-1 w-8 bg-primary/20 mx-auto rounded-full group-hover:w-16 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
