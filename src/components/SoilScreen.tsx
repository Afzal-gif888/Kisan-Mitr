import { useMemo } from "react";
import { ArrowLeft, Check, Sprout, MapPin } from "lucide-react";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";
import districtSoilMap from "../data/apDistrictSoilMap.json";

// HIGH-TRUST NATURAL SOIL ASSETS (Locally Generated)
const RED_SOIL = "/red_loamy_soil_ap_1775917625949.png";
const BLACK_SOIL = "/black_cotton_soil_ap_1775917641779.png";
const ALLUVIAL_SOIL = "/alluvial_soil_ap_1775917658397.png";
const SANDY_SOIL = "/coastal_sandy_soil_ap_1775917674666.png";

interface SoilScreenProps {
  language: Language;
  district?: string;
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

const SOIL_METADATA: Record<string, any> = {
  "Red Soil": { img: RED_SOIL, icon: "🍂", desc: { en: "Dry & airy", te: "పొడి మరియు గాలి" } },
  "Red Sandy Loam": { img: RED_SOIL, icon: "🏜️", desc: { en: "Sandy Red", te: "ఇసుక ఎర్ర నేల" } },
  "Red Loamy Soil": { img: RED_SOIL, icon: "🌾", desc: { en: "Loamy Red", te: "లోమీ ఎర్ర నేల" } },
  "Black Cotton Soil": { img: BLACK_SOIL, icon: "🌒", desc: { en: "Moist & rich", te: "తేమ మరియు సారవంతమైన" } },
  "Black Clay Soil": { img: BLACK_SOIL, icon: "🌑", desc: { en: "Clay Black", te: "నల్ల క్లే నేల" } },
  "Alluvial Soil": { img: ALLUVIAL_SOIL, icon: "🌊", desc: { en: "River Fertile", te: "నది సారవంతమైన నేల" } },
  "Delta Alluvial Soil": { img: ALLUVIAL_SOIL, icon: "🎋", desc: { en: "Delta Fertile", te: "డెల్టా సారవంతమైన నేల" } },
  "Coastal Alluvial Soil": { img: ALLUVIAL_SOIL, icon: "🏖️", desc: { en: "Coastal Alluvial", te: "కోస్తా అల్యూవియల్" } },
  "Laterite Soil": { img: RED_SOIL, icon: "🧱", desc: { en: "Hard Red", te: "గట్టి ఎర్ర నేల" } },
  "Coastal Sandy Soil": { img: SANDY_SOIL, icon: "🏜️", desc: { en: "Beach Sand", te: "తీరప్రాంత ఇసుక" } },
  "Sandy Soil": { img: SANDY_SOIL, icon: "🏜️", desc: { en: "Desert Sand", te: "ఇసుక నేల" } },
  "Clay Soil": { img: BLACK_SOIL, icon: "🥯", desc: { en: "Sticky Clay", te: "క్లే నేల" } },
  "Saline Soil": { img: SANDY_SOIL, icon: "🧂", desc: { en: "Salt Rich", te: "క్షిార నేల" } },
  "Alkaline Soil": { img: SANDY_SOIL, icon: "🧪", desc: { en: "Alkaline Soil", te: "క్షార నేల" } },
  "Marshy Soil": { img: ALLUVIAL_SOIL, icon: "🦠", desc: { en: "Wet Swamp", te: "చిత్తడి నేల" } },
  "Gravelly Soil": { img: BLACK_SOIL, icon: "🪨", desc: { en: "Stone Mix", te: "గ్రావెల్ నేల" } },
  "Forest Soil": { img: BLACK_SOIL, icon: "🌳", desc: { en: "Organic Rich", te: "అటవీ నేల" } }
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
    <div className="min-h-screen bg-[#F5F1E9] flex flex-col max-w-sm mx-auto animate-in fade-in duration-700 pb-10">
      
      {/* 📍 HEADER SECTION */}
      <div className="pt-10 pb-6 px-6 space-y-4">
          <div className="flex items-center justify-between">
              <button onClick={onBack} className="p-3 bg-white rounded-2xl text-[#1B5E20] shadow-sm active:scale-95 transition-all">
                  <ArrowLeft size={24} />
              </button>
              <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10">
                      <MapPin size={12} className="text-[#1B5E20]" />
                      <span className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest">{district}</span>
                  </div>
              </div>
          </div>

          <div className="space-y-1">
              <h1 className="text-2xl font-black text-[#1B5E20] tracking-tight leading-tight">
                {language === "te" ? "మట్టి రకం ఎంపిక" : "Different soils need different care."}
              </h1>
              <p className="text-sm font-bold text-[#1B5E20]/60 leading-tight italic">
                {language === "te" ? "మెరుగైన పంట సలహా కోసం మీ మట్టిని ఎంచుకోండి." : "Choose your soil to get better crop advice."}
              </p>
          </div>
      </div>

      <div className="flex-1 px-4 space-y-4">
        {availableSoils.map((soilName: string, i: number) => {
          const meta = SOIL_METADATA[soilName] || { img: RED_SOIL, icon: "🌱", desc: { en: "Natural Earth", te: "ప్రకృతి మట్టి" } };
          return (
            <button
              key={soilName}
              onClick={() => onSelect(soilName)}
              className="w-full group bg-white rounded-[2.5rem] p-4 pr-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(27,94,32,0.12)] transition-all flex items-center gap-4 active:scale-[0.98]"
            >
              {/* Natural Soil Image Area */}
              <div className="w-28 h-28 relative overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    src={meta.img} 
                    alt={soilName} 
                    className="w-full h-full object-cover rounded-full shadow-inner scale-110"
                    style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
                  />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg opacity-70">{meta.icon}</span>
                    <h3 className="font-black text-xl text-slate-800 leading-tight tracking-tight group-hover:text-[#1B5E20] transition-colors truncate">
                      {soilName}
                    </h3>
                </div>
                <p className="text-[#1B5E20]/40 font-black text-[10px] uppercase tracking-[0.2em] mt-1 pl-1">
                    ● {language === "te" ? meta.desc.te : meta.desc.en}
                </p>
              </div>

              {/* Selection Mark */}
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner group-hover:bg-[#1B5E20] group-hover:text-white transition-all shrink-0">
                <Check size={20} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SoilScreen;
