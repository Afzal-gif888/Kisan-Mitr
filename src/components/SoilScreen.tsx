import { useMemo } from "react";
import { ArrowLeft, Check, Sprout, Info } from "lucide-react";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";
import districtSoilMap from "../data/apDistrictSoilMap.json";

// REALISTIC SOIL ASSETS (Natural Photography)
const SOIL_SANDY = "https://images.unsplash.com/photo-1590487395312-e3f1663d1ed8?auto=format&fit=crop&q=80&w=1000";
const SOIL_BLACK = "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000";
const SOIL_RED = "https://images.unsplash.com/photo-1589135398302-383bcdd04cd3?auto=format&fit=crop&q=80&w=1000";
const SOIL_LOAMY = "https://images.unsplash.com/photo-1585121401362-7162615f5c5d?auto=format&fit=crop&q=80&w=1000";

interface SoilScreenProps {
  language: Language;
  district?: string;
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

// Full metadata for all soil types (DYNAMIC BINDING)
const SOIL_METADATA: Record<string, any> = {
  "Red Soil": { img: SOIL_RED, icon: "🍂", color: "#1B5E20", desc: { en: "Dry & airy", te: "పొడి మరియు గాలి" } },
  "Red Sandy Loam": { img: SOIL_RED, icon: "🏜️", color: "#2E7D32", desc: { en: "Sandy Red", te: "ఇసుక ఎర్ర నేల" } },
  "Red Loamy Soil": { img: SOIL_RED, icon: "🌾", color: "#1B5E20", desc: { en: "Loamy Red", te: "లోమీ ఎర్ర నేల" } },
  "Black Cotton Soil": { img: SOIL_BLACK, icon: "🌒", color: "#1B5E20", desc: { en: "Moist & rich", te: "తేమ మరియు సారవంతమైన" } },
  "Black Clay Soil": { img: SOIL_BLACK, icon: "🌑", color: "#333333", desc: { en: "Clay Black", te: "నల్ల క్లే నేల" } },
  "Alluvial Soil": { img: SOIL_LOAMY, icon: "🌊", color: "#1B5E20", desc: { en: "River Fertile", te: "నది సారవంతమైన నేల" } },
  "Delta Alluvial Soil": { img: SOIL_LOAMY, icon: "🎋", color: "#2E7D32", desc: { en: "Delta Fertile", te: "డెల్టా సారవంతమైన నేల" } },
  "Coastal Alluvial Soil": { img: SOIL_LOAMY, icon: "🏖️", color: "#0288D1", desc: { en: "Coastal Alluvial", te: "కోస్తా అల్యూవియల్" } },
  "Laterite Soil": { img: SOIL_RED, icon: "🧱", color: "#B71C1C", desc: { en: "Hard Red", te: "గట్టి ఎర్ర నేల" } },
  "Coastal Sandy Soil": { img: SOIL_SANDY, icon: "🏜️", color: "#FBC02D", desc: { en: "Beach Sand", te: "తీరప్రాంత ఇసుక" } },
  "Sandy Soil": { img: SOIL_SANDY, icon: "🏜️", color: "#2E7D32", desc: { en: "Desert Sand", te: "ఇసుక నేల" } },
  "Clay Soil": { img: SOIL_BLACK, icon: "🥯", color: "#4E342E", desc: { en: "Sticky Clay", te: "క్లే నేల" } },
  "Saline Soil": { img: SOIL_SANDY, icon: "🧂", color: "#9E9E9E", desc: { en: "Salt Rich", te: "క్షిార నేల" } },
  "Alkaline Soil": { img: SOIL_SANDY, icon: "🧪", color: "#7B1FA2", desc: { en: "Alkaline Soil", te: "క్షార నేల" } },
  "Marshy Soil": { img: SOIL_LOAMY, icon: "🦠", color: "#1B5E20", desc: { en: "Wet Swamp", te: "చిత్తడి నేల" } },
  "Gravelly Soil": { img: SOIL_SANDY, icon: "🪨", color: "#616161", desc: { en: "Stone Mix", te: "గ్రావెల్ నేల" } },
  "Forest Soil": { img: SOIL_LOAMY, icon: "🌳", color: "#1B5E20", desc: { en: "Organic Rich", te: "అటవీ నేల" } }
};

const SoilScreen = ({ language, district, onSelect, onBack }: SoilScreenProps) => {
  
  const availableSoils = useMemo(() => {
      const formattedDistrict = district?.trim().toLowerCase() || "";
      const normalizedMap = Object.fromEntries(
        Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
      );
      const soils = normalizedMap[formattedDistrict] || [];
      return soils;
  }, [district]);

  if (!availableSoils || availableSoils.length === 0) {
      return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center space-y-6">
              <Info size={60} className="text-[#1B5E20]/20" />
              <div className="space-y-2">
                 <h2 className="text-2xl font-black text-[#1B5E20]/40 uppercase tracking-tighter leading-none">Soil Data Unavailable</h2>
                 <p className="text-sm font-bold text-slate-400 transition-all italic leading-relaxed">
                    We couldn't find soil profiling for the district: <b>{district || "Unknown"}</b>.
                 </p>
              </div>
              <button onClick={onBack} className="px-8 py-3 bg-[#1B5E20] text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Change Location</button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-12 pb-10 px-6 rounded-b-[3rem] shadow-2xl flex items-center gap-6 relative">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner border border-white/10">
              <ArrowLeft size={28} />
          </button>
          <div className="flex-1">
              <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
                {language === "te" ? "నేల రకాన్ని ఎంచుకోండి" : "Select Soil Type"}
              </h2>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-widest opacity-80 leading-none italic">
                {district ? `📍 ${district}` : "No district selected"}
              </p>
          </div>
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        
        {/* DISTRICT INSIGHT */}
        <div className="bg-[#E8F5E9] rounded-[2.5rem] p-6 shadow-md border-l-[10px] border-[#1B5E20] relative overflow-hidden">
            <div className="flex gap-4 relative z-10">
                <div className="p-3 bg-white rounded-2xl shadow-sm"><Sprout className="text-[#1B5E20]" /></div>
                <div>
                   <h4 className="text-sm font-black text-[#1B5E20] uppercase tracking-tighter">Region Intelligence</h4>
                   <p className="text-xs font-bold text-[#1B5E20]/70 leading-relaxed mt-1 italic">
                     {language === "te" 
                        ? `${district} లోని నేలల వివరాలు ఇక్కడ ఉన్నాయి.`
                        : `We've identified the specific soil types present in ${district}. Please select yours below.`}
                   </p>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            {availableSoils.map((soilName: string, i: number) => {
              const meta = SOIL_METADATA[soilName] || SOIL_METADATA["Red Soil"];
              return (
                <button
                  key={soilName}
                  onClick={() => onSelect(soilName)}
                  className="group relative bg-[#F1F8E9] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl active:scale-[0.97] transition-all duration-500 flex items-stretch h-36 border-2 border-transparent hover:border-[#1B5E20]"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="w-1/3 relative overflow-hidden">
                    <img 
                        src={meta.img} 
                        alt={soilName} 
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F1F8E9]" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-center text-left relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner bg-white"
                      >
                        {meta.icon}
                      </div>
                      <h3 className="font-black text-xl text-[#1B5E20] group-hover:text-[#2E7D32] transition-colors tracking-tighter leading-tight">
                        {soilName}
                      </h3>
                    </div>
                    <p className="text-[#1B5E20]/60 font-black text-[10px] uppercase tracking-widest">
                        {language === "te" ? meta.desc.te : meta.desc.en}
                    </p>
                  </div>
    
                  {/* Selection Checkbox */}
                  <div className="w-16 bg-[#E8F5E9] flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#1B5E20] flex items-center justify-center transition-all shadow-md group-hover:rotate-12">
                      <Check size={20} className="text-[#1B5E20] group-hover:text-white" />
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SoilScreen;
