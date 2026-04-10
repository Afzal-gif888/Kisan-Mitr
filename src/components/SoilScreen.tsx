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

const soilTypes: { key: SoilType; labelKey: string; image: string; emoji: string; color: string; description: Record<string, string> }[] = [
  { 
    key: "sandy", 
    labelKey: "sandy", 
    image: soilSandy, 
    emoji: "🏜️",
    color: "#D4A373",
    description: { en: "Dry & light", hi: "सूखी और हल्की", te: "పొడి మరియు తేలికపాటి" }
  },
  { 
    key: "black", 
    labelKey: "black", 
    image: soilBlack, 
    emoji: "🌒",
    color: "#5C3A21",
    description: { en: "Moist & rich", hi: "नम और उपजाऊ", te: "తేమ మరియు సారవంతమైన" }
  },
  { 
    key: "red", 
    labelKey: "red", 
    image: soilRed, 
    emoji: "🍂",
    color: "#A0522D",
    description: { en: "Dry & airy", hi: "सूखी और हवादार", te: "పొడి మరియు గాలి" }
  },
  { 
    key: "loamy", 
    labelKey: "loamy", 
    image: soilLoamy, 
    emoji: "🌾",
    color: "#8B5E3C",
    description: { en: "Rich & perfect", hi: "उपजाऊ और उत्तम", te: "సారవంతమైన మరియు ఉత్తమమైన" }
  },
];

const SoilScreen = ({ language, onSelect, onBack }: SoilScreenProps) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden pb-10">
      {/* 1. TOP HEADER (DEEP SOIL) */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-10 px-6 rounded-b-[3rem] shadow-2xl flex items-center gap-6 relative">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner border border-white/10">
              <ArrowLeft size={28} />
          </button>
          <div className="flex-1">
              <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
                {t.selectSoil}
              </h2>
              <p className="text-[#C49A6C] text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">Intelligence Step 02</p>
          </div>
          <div className="absolute -bottom-5 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        {/* Pro Tip/Insight */}
        <div className="bg-white/60 backdrop-blur-md border-l-8 border-[#D4A373] p-6 rounded-[2rem] shadow-xl transform transition hover:scale-[1.01]">
            <div className="flex gap-4">
                <div className="text-3xl">💡</div>
                <p className="text-[#5C3A21] text-base font-black leading-tight tracking-tight">
                    {language === "te" ? "మీ నేల రకాన్ని బట్టి సరైన పంటను ఎంచుకోండి" : "Different soils need different care. Choose your soil to get better crop advice."}
                </p>
            </div>
        </div>

        {/* Soil Grid/List */}
        <div className="grid grid-cols-1 gap-6">
          {soilTypes.map((soil, i) => (
            <button
              key={soil.key}
              onClick={() => onSelect(soil.key)}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-[#8B5E3C] active:scale-[0.97] transition-all duration-500 flex items-stretch h-36"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Section */}
              <div className="w-1/3 relative overflow-hidden">
                <img 
                    src={soil.image} 
                    alt={t[soil.labelKey]} 
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5EFE6]/10 to-white" />
              </div>
              
              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-center text-left relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner bg-[#F5EFE6]"
                    style={{ border: `1px solid ${soil.color}33` }}
                  >
                    {soil.emoji}
                  </div>
                  <h3 className="font-black text-2xl text-[#5C3A21] group-hover:text-[#8B5E3C] transition-colors tracking-tighter">
                    {t[soil.labelKey]}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: soil.color }} />
                    <p className="text-[#8B5E3C]/60 font-black text-[10px] uppercase tracking-widest">
                        {soil.description[language]}
                    </p>
                </div>
              </div>

              {/* Selection Checkbox */}
              <div className="w-20 bg-[#F5EFE6]/30 group-hover:bg-[#8B5E3C]/5 flex items-center justify-center transition-colors">
                <div className="w-12 h-12 rounded-full border-4 border-[#F5EFE6] group-hover:border-white shadow-lg bg-white group-hover:bg-[#2E7D32] flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12">
                  <Check size={24} className="text-[#F5EFE6] group-hover:text-white" />
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
