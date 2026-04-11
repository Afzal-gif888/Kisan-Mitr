import React from 'react';
import { Check } from "lucide-react";
import { SoilType } from "@/lib/types";

interface SoilCardProps {
  soilName: string;
  image: string;
  translatedName: string;
  language: string;
  onSelect: (soil: SoilType) => void;
}

const SoilCard = ({ soilName, image, translatedName, language, onSelect }: SoilCardProps) => {
  return (
    <button
      onClick={() => onSelect(soilName as SoilType)}
      className="flex-1 min-h-[140px] w-full group bg-white rounded-[2.5rem] px-6 flex items-center gap-6 shadow-md transition-all duration-300 border border-white hover:border-[#1B5E20]/5 active:scale-[0.98]"
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden shrink-0 flex items-center justify-center">
          <img 
            src={image} 
            alt={soilName} 
            className="w-full h-full object-cover rounded-full shadow-md scale-125"
            style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
          />
      </div>
      
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-black text-2xl text-slate-800 leading-none tracking-tighter group-hover:text-[#1B5E20] transition-colors break-words uppercase italic">
          {soilName}
        </h3>
        {language === "te" && (
            <p className="text-[#1B5E20]/50 font-black text-[11px] uppercase tracking-[0.2em] mt-2 pl-1">
                ● {translatedName}
            </p>
        )}
      </div>

      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner group-hover:bg-[#1B5E20] group-hover:text-white transition-all shrink-0">
        <Check size={20} />
      </div>
    </button>
  );
};

export default SoilCard;
