import { useMemo } from "react";
import { ArrowLeft, Check, Sprout, MapPin } from "lucide-react";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";
import districtSoilMap from "../data/apDistrictSoilMap.json";
import soilImageMap, { defaultSoilImg } from "../utils/soilImageMap";

interface SoilScreenProps {
  language: Language;
  district?: string;
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

// Full metadata for Telugu translations
const SOIL_TEXT: Record<string, any> = {
  "Red Soil": { te: "ఎర్ర నేల" },
  "Red Sandy Loam": { te: "ఇసుక ఎర్ర నేల" },
  "Red Loamy Soil": { te: "లోమీ ఎర్ర నేల" },
  "Black Cotton Soil": { te: "మట్టి నేల / నల్ల నేల" },
  "Black Clay Soil": { te: "నల్ల క్లే నేల" },
  "Alluvial Soil": { te: "నది సారవంతమైన నేల" },
  "Delta Alluvial Soil": { te: "డెల్టా సారవంతమైన నేల" },
  "Coastal Alluvial Soil": { te: "కోస్తా అల్యూవియల్" },
  "Laterite Soil": { te: "గట్టి ఎర్ర నేల" },
  "Coastal Sandy Soil": { te: "తీరప్రాంత ఇసుక నేల" },
  "Sandy Soil": { te: "ఇసుక నేల" },
  "Clay Soil": { te: "క్లే నేల" },
  "Saline Soil": { te: "క్షిార నేల" },
  "Alkaline Soil": { te: "క్షార నేల" },
  "Marshy Soil": { te: "చిత్తడి నేల" },
  "Gravelly Soil": { te: "గ్రావెల్ నేల" },
  "Forest Soil": { te: "అటవీ నేల" }
};

const SoilScreen = ({ language, district, onSelect, onBack }: SoilScreenProps) => {
  const availableSoils = useMemo(() => {
    const formattedDistrict = district?.trim().toLowerCase() || "";
    const normalizedMap = Object.fromEntries(
      Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
    );
    return normalizedMap[formattedDistrict] || [];
  }, [district]);

  return (
    <div className="min-h-screen bg-[#F5F1E9] flex flex-col max-w-md mx-auto animate-in fade-in duration-700 pb-16 shadow-2xl">
      
      {/* 📍 HEADER SECTION (Increased padding and size) */}
      <div className="pt-12 pb-8 px-8 space-y-6">
          <div className="flex items-center justify-between">
              <button 
                  onClick={onBack} 
                  className="p-3.5 bg-white rounded-2xl text-[#1B5E20] shadow-sm active:scale-95 transition-all"
              >
                  <ArrowLeft size={28} />
              </button>
              <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10 shadow-sm">
                      <MapPin size={14} className="text-[#1B5E20]" />
                      <span className="text-[11px] font-black text-[#1B5E20] uppercase tracking-widest">{district}</span>
                  </div>
              </div>
          </div>

          <div className="space-y-2 text-center">
              <h1 className="text-3xl font-black text-[#1B5E20] tracking-tight leading-none">
                {language === "te" ? "నేల రకాన్ని ఎంచుకోండి" : "Different soils need different care."}
              </h1>
              <p className="text-base font-bold text-[#1B5E20]/60 leading-tight italic">
                {language === "te" ? "మెరుగైన పంట సలహా కోసం మీ మట్టిని ఎంచుకోండి." : "Choose your soil to get better crop advice."}
              </p>
          </div>
      </div>

      {/* 🪴 SOIL LIST (Increased gap) */}
      <div className="flex-1 px-6 space-y-6">
        {availableSoils.map((soilName: string) => {
          const image = soilImageMap[soilName] || defaultSoilImg;
          const translatedName = SOIL_TEXT[soilName]?.te || "";

          return (
            <button
              key={soilName}
              onClick={() => onSelect(soilName)}
              className="w-full group bg-white rounded-[3rem] p-6 flex items-center gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(27,94,32,0.15)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 border border-white hover:border-[#1B5E20]/5"
            >
              {/* Natural Soil Image Area (Increased Size) */}
              <div className="w-32 h-32 relative overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={soilName} 
                    data-pin-nopin="true"
                    data-pin-no-hover="true"
                    className="w-full h-full object-cover rounded-full shadow-md scale-125 transform group-hover:scale-[1.4] transition-transform duration-1000"
                    style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
                  />
              </div>
              
              {/* Text Content (Increased Typography) */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-1.5 opacity-90">
                    <h3 className="font-black text-2xl text-slate-800 leading-none tracking-tighter group-hover:text-[#1B5E20] transition-colors break-words">
                      {soilName}
                    </h3>
                </div>
                {language === "te" && (
                    <p className="text-[#1B5E20]/50 font-black text-[11px] uppercase tracking-[0.2em] mt-2 pl-1">
                        ● {translatedName}
                    </p>
                )}
              </div>

              {/* Selection Mark (Increased Size) */}
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner group-hover:bg-[#1B5E20] group-hover:text-white transition-all shrink-0">
                <Check size={24} />
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER NOTE (Filling the bottom) */}
      <div className="py-12 px-10 text-center opacity-30">
          <Sprout className="mx-auto mb-4 text-[#1B5E20]" size={32} />
          <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest leading-relaxed max-w-[200px] mx-auto">
            {language === "te" 
              ? "పై మట్టి రకాలను ఎంచుకోవడం ద్వారా మీరు ఖచ్చితమైన విశ్లేషణను పొందవచ్చు."
              : "Quality of soil determines the quality of your harvest."}
          </p>
      </div>

    </div>
  );
};

export default SoilScreen;
