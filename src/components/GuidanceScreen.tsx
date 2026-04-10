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
    { icon: <CalendarDays size={28} className="text-[#8B5E3C]" />, label: t.sowingTime, value: crop.sowingTime[language], color: "bg-white" },
    { icon: <Droplets size={28} className="text-blue-500" />, label: t.waterNeeded, value: waterLabel, color: "bg-white" },
    { icon: <Sprout size={28} className="text-[#2E7D32]" />, label: t.fertilizer, value: crop.fertilizer[language], color: "bg-white" },
    { icon: <BarChart3 size={28} className="text-orange-500" />, label: t.expectedYield, value: crop.yield[language], color: "bg-white" },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden pb-10">
      {/* 1. TOP HEADER (DEEP SOIL) */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-lg flex items-center gap-4 relative">
          <button onClick={onBack} className="text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner">
              <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
              <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1">
                {t.growingGuide}
              </h2>
              <p className="text-[#C49A6C] text-[9px] font-black uppercase tracking-widest opacity-80 leading-none">Intelligence Step 04</p>
          </div>
          <button onClick={onStartOver} className="text-white/40 hover:text-white transition-colors">
              <RotateCcw size={24} />
          </button>
      </div>

      <div className="flex-1 p-6 space-y-6 mt-4 overflow-y-auto">
        {/* Crop Hero (Minimal) */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl animate-scale-in border-4 border-white relative">
          <div className="h-48 relative">
            <img src={crop.image} alt={crop.name[language]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between">
              <h3 className="text-3xl font-black text-white tracking-tighter">
                {crop.name[language]}
              </h3>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">
                🌾
              </div>
            </div>
          </div>
        </div>

        {/* Voice button - Premium & Minimal */}
        <button
          onClick={handleVoice}
          className="w-full py-5 bg-[#8B5E3C] text-white rounded-[1.8rem] text-xl font-black flex items-center justify-center gap-4 shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <Volume2 size={24} className="group-hover:rotate-12 transition-transform" />
          <span>{t.listenExplanation}</span>
        </button>

        {/* Info grid (Clean minimalist cards) */}
        <div className="grid grid-cols-1 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${card.color} rounded-[2rem] p-5 shadow-sm flex items-center gap-5 animate-fade-in-up border border-white hover:shadow-md transition-shadow`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-3 bg-[#F5EFE6] rounded-xl shadow-inner shrink-0">{card.icon}</div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-[#8B5E3C]/40 uppercase tracking-[0.2em] mb-1 leading-none">{card.label}</p>
                <p className="text-lg font-black text-[#5C3A21] leading-tight tracking-tight">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Start over - Clean link */}
        <button
          onClick={onStartOver}
          className="w-full py-4 text-[#8B5E3C]/40 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:text-[#8B5E3C] transition-all"
        >
          <RotateCcw size={18} />
          {t.startOver}
        </button>
      </div>
    </div>
  );
};

export default GuidanceScreen;
