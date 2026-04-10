import { ArrowLeft, Volume2, Droplets, Sprout, BarChart3, CalendarDays, RotateCcw } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { crops } from "@/lib/cropData";

interface GuidanceScreenProps {
  language: Language;
  cropKey: string;
  onBack: () => void;
  onStartOver: () => void;
}

const GuidanceScreen = ({ language, cropKey, onBack, onStartOver }: GuidanceScreenProps) => {
  const t = translations[language];
  const crop = crops[cropKey];
  const waterLabel = t[crop.water];

  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(
        `${crop.name[language]}. ${t.sowingTime}: ${crop.sowingTime[language]}. ${t.waterNeeded}: ${waterLabel}. ${crop.fertilizer[language]}.`
      );
      msg.lang = language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-US";
      speechSynthesis.speak(msg);
    }
  };

  const cards = [
    { icon: <CalendarDays size={32} className="text-primary" />, label: t.sowingTime, value: crop.sowingTime[language] },
    { icon: <Droplets size={32} className="text-primary" />, label: t.waterNeeded, value: `💧 ${waterLabel}` },
    { icon: <Sprout size={32} className="text-earth" />, label: t.fertilizer, value: crop.fertilizer[language] },
    { icon: <BarChart3 size={32} className="text-success" />, label: t.expectedYield, value: crop.yield[language] },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-primary-foreground p-2 rounded-xl hover:bg-primary/80">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary-foreground">📘 {t.growingGuide}</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-5">
        {/* Crop header */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-lg animate-scale-in">
          <img src={crop.image} alt={crop.name[language]} className="w-full h-40 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-2xl font-extrabold">🌾 {crop.name[language]}</h3>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 shadow-md flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0 mt-1">{card.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold">{card.label}</p>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice button */}
        <button
          onClick={handleVoice}
          className="w-full py-4 bg-earth text-earth-foreground rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          <Volume2 size={24} />
          🔊 {t.listenExplanation}
        </button>

        {/* Start over */}
        <button
          onClick={onStartOver}
          className="w-full py-4 bg-muted text-foreground rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-muted/80 active:scale-[0.98] transition-all"
        >
          <RotateCcw size={20} />
          {t.startOver}
        </button>
      </div>
    </div>
  );
};

export default GuidanceScreen;
