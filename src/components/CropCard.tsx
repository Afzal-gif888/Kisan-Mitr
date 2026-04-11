import React from 'react';
import { Droplets, Thermometer, ArrowRight, Check } from "lucide-react";

interface CropCardProps {
  crop: any;
  language: string;
  suitabilityColor: string;
  onViewGuide: (id: string) => void;
  imgSource: string;
  farmHero: string;
}

const CropCard = ({ crop, language, suitabilityColor, onViewGuide, imgSource, farmHero }: CropCardProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all hover:scale-[1.02] active:scale-95">
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-200">
          <div className="relative w-full h-full">
              <img 
                  src={imgSource} 
                  alt={crop.englishName} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e: any) => { e.target.onerror = null; e.target.src = farmHero; }}
              />
              <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white tracking-tighter drop-shadow-lg uppercase leading-none">
             {language === 'te' ? crop.teluguName : crop.englishName}
          </h3>

          <div className={`absolute top-4 right-4 px-5 py-2 rounded-full bg-gradient-to-r ${suitabilityColor} text-white shadow-2xl border border-white/20`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{crop.suitabilityLabel}</span>
          </div>
      </div>

      <div className="p-6 space-y-6">
          <div>
              <div className="space-y-1.5">
                  <div className="flex items-start gap-2.5">
                      <div className={`rounded-full p-1 mt-0.5 shrink-0 bg-[#1B5E20]`}>
                          <Check size={10} className="text-white" />
                      </div>
                      <p className="text-sm font-black text-[#1B5E20] leading-none italic uppercase">{crop.reason}</p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-5 border-y border-[#F1F8E9]">
              <div className="text-center space-y-1.5 border-r border-[#F1F8E9]">
                  <div className="flex justify-center text-blue-500 mb-1"><Droplets size={20} /></div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{language === "te" ? "నీరు" : "Water Need"}</p>
                  <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{crop.waterNeed}</p>
              </div>
              <div className="text-center space-y-1.5">
                  <div className="flex justify-center text-orange-500 mb-1"><Thermometer size={20} /></div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{language === "te" ? "వాతావరణం" : "Temp"}</p>
                  <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{crop.heatTolerance}</p>
              </div>
          </div>

          <button
              onClick={() => onViewGuide(crop.id)}
              className="w-full py-5 bg-[#F1F8E9] border-2 border-transparent text-[#1B5E20] rounded-[1.8rem] text-sm font-black uppercase tracking-[0.1em] flex items-center justify-center gap-3 active:scale-95 group transition-all"
          >
              <span>{language === "te" ? "సాగు విధానం" : "Farming Guide"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default CropCard;
