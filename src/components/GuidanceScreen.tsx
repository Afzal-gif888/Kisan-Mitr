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
      speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(
        `${crop.name[language]}. ${t.sowingTime}: ${crop.sowingTime[language]}. ${t.waterNeeded}: ${waterLabel}. ${crop.fertilizer[language]}. ${t.expectedYield}: ${crop.yield[language]}.`
      );
      msg.lang = language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-US";
      msg.rate = 0.9;
      speechSynthesis.speak(msg);
    }
  };

  const cards = [
    { icon: <CalendarDays size={36} className="text-primary" />, label: t.sowingTime, value: crop.sowingTime[language], color: "bg-primary/5" },
    { icon: <Droplets size={36} className="text-secondary" />, label: t.waterNeeded, value: waterLabel, color: "bg-secondary/5" },
    { icon: <Sprout size={36} className="text-success" />, label: t.fertilizer, value: crop.fertilizer[language], color: "bg-success/5" },
    { icon: <BarChart3 size={36} className="text-accent" />, label: t.expectedYield, value: crop.yield[language], color: "bg-accent/5" },
  ];

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
          📕 {t.growingGuide}
        </h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Crop header */}
        <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in border-4 border-white">
          <div className="h-48 relative">
            <img src={crop.image} alt={crop.name[language]} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
              <h3 className="text-4xl font-black text-white flex items-center gap-3">
                <span className="text-5xl">🌾</span> 
                {crop.name[language]}
              </h3>
            </div>
          </div>
        </div>

        {/* Voice button - Very prominent for farmers */}
        <button
          onClick={handleVoice}
          className="w-full py-6 bg-secondary text-white rounded-[2rem] text-2xl font-black flex items-center justify-center gap-4 shadow-xl hover:shadow-secondary/40 active:scale-[0.95] transition-all border-b-8 border-secondary/70 animate-pulse hover:animate-none group"
        >
          <div className="p-2 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform">
            <Volume2 size={32} />
          </div>
          <span>🔊 {t.listenExplanation}</span>
        </button>

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-4 text-left">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${card.color} rounded-[2rem] p-6 shadow-sm flex items-start gap-5 animate-fade-in-up border-2 border-white`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-3 bg-white rounded-2xl shadow-md shrink-0">{card.icon}</div>
              <div className="flex-1">
                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{card.label}</p>
                <p className="text-xl font-black text-foreground leading-tight">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Start over - bottom fixed-ish */}
        <button
          onClick={onStartOver}
          className="w-full py-5 text-muted-foreground rounded-2xl text-lg font-black flex items-center justify-center gap-3 hover:bg-muted/50 active:scale-[0.98] transition-all opacity-60 hover:opacity-100"
        >
          <RotateCcw size={24} />
          {t.startOver}
        </button>
      </div>
    </div>
  );
};

export default GuidanceScreen;
