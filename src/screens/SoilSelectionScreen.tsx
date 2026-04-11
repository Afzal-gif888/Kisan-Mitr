import { useMemo, useEffect } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { SoilType } from "../lib/types";
import districtSoilMap from "../data/districtSoilMap.json";
import soilImageMap, { defaultSoilImg } from "../utils/soilImageMap";
import { useApp } from "../context/AppContext";
import SoilCard from "../components/SoilCard";

interface SoilSelectionScreenProps {
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

const SOIL_TEXT: Record<string, any> = {
  "Red Soil": { te: "ఎర్ర నేల" },
  "Red Sandy Loam": { te: "ఇసుక ఎర్ర నేల" },
  "Red Loamy Soil": { te: "లోమీ ఎర్ర నేల" },
  "Black Cotton Soil": { te: "నల్ల నేల" },
  "Black Clay Soil": { te: "నల్ల క్లే నేల" },
  "Alluvial Soil": { te: "సారవంతమైన నేల" },
  "Delta Alluvial Soil": { te: "డెల్టా నేల" },
  "Coastal Alluvial Soil": { te: "కోస్తా నేల" },
  "Laterite Soil": { te: "లేటరైట్ నేల" },
  "Coastal Sandy Soil": { te: "తీరప్రాంత ఇసుక నేల" },
  "Sandy Soil": { te: "ఇసుక నేల" },
  "Clay Soil": { te: "క్లే నేల" },
  "Saline Soil": { te: "చౌడు నేల" },
  "Alkaline Soil": { te: "క్షార నేల" }
};

const SoilSelectionScreen = ({ onSelect, onBack }: SoilSelectionScreenProps) => {
  const { language, district } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const availableSoils = useMemo(() => {
    const formattedDistrict = district?.trim().toLowerCase() || "";
    const normalizedMap = Object.fromEntries(
      Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
    );
    return normalizedMap[formattedDistrict] || [];
  }, [district]);

  return (
    <div className="min-h-screen bg-[#F5F1E9] flex flex-col max-w-md mx-auto animate-in fade-in duration-700 shadow-2xl overflow-hidden">
      
      <div className="pt-10 pb-4 px-8 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
              <button 
                  onClick={onBack} 
                  className="p-3 bg-white rounded-2xl text-[#1B5E20] shadow-sm active:scale-95 transition-all"
              >
                  <ArrowLeft size={24} />
              </button>
              <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10 shadow-sm">
                      <MapPin size={12} className="text-[#1B5E20]" />
                      <span className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest italic">{district}</span>
                  </div>
              </div>
          </div>

          <div className="space-y-1 text-center">
              <h1 className="text-3xl font-black text-[#1B5E20] tracking-tight leading-none uppercase italic">
                {language === "te" ? "నేల రకాన్ని ఎంచుకోండి" : "Different soils need different care."}
              </h1>
              <p className="text-sm font-bold text-[#1B5E20]/60 leading-tight italic uppercase mt-1">
                {language === "te" ? "మెరుగైన పంట సలహా కోసం మీ మట్టిని ఎంచుకోండి." : "Choose your soil type for expert advice."}
              </p>
          </div>
      </div>

      <div className="flex-1 px-6 pb-6 flex flex-col gap-4 overflow-y-auto pt-4">
        {availableSoils.map((soilName: string) => (
          <SoilCard 
            key={soilName}
            soilName={soilName}
            image={(soilImageMap as any)[soilName] || defaultSoilImg}
            translatedName={SOIL_TEXT[soilName]?.te || ""}
            language={language}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SoilSelectionScreen;
