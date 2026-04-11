import { useMemo } from "react";
import { ArrowLeft, Check, Sprout, Info } from "lucide-react";
import { Language } from "@/lib/translations";
import { SoilType } from "@/lib/cropData";
import districtSoilMap from "../data/apDistrictSoilMap.json";

import soilSandy from "@/assets/soil-sandy.jpg";
import soilBlack from "@/assets/soil-black.jpg";
import soilRed from "@/assets/soil-red.jpg";
import soilLoamy from "@/assets/soil-loamy.jpg";

interface SoilScreenProps {
  language: Language;
  district?: string;
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

// Full metadata for all soil types (DYNAMIC BINDING)
const SOIL_METADATA: Record<string, any> = {
  "Red Soil": { img: soilRed, icon: "🍂", color: "#A0522D", desc: { en: "Dry & airy", te: "పొడి మరియు గాలి" } },
  "Red Sandy Loam": { img: soilRed, icon: "🏜️", color: "#D4A373", desc: { en: "Sandy Red", te: "ఇసుక ఎర్ర నేల" } },
  "Red Loamy Soil": { img: soilRed, icon: "🌾", color: "#8B5E3C", desc: { en: "Loamy Red", te: "లోమీ ఎర్ర నేల" } },
  "Black Cotton Soil": { img: soilBlack, icon: "🌒", color: "#5C3A21", desc: { en: "Moist & rich", te: "తేమ మరియు సారవంతమైన" } },
  "Black Clay Soil": { img: soilBlack, icon: "🌑", color: "#333333", desc: { en: "Clay Black", te: "నల్ల క్లే నేల" } },
  "Alluvial Soil": { img: soilLoamy, icon: "🌊", color: "#8B5E3C", desc: { en: "River Fertile", te: "నది సారవంతమైన నేల" } },
  "Delta Alluvial Soil": { img: soilLoamy, icon: "🎋", color: "#2E7D32", desc: { en: "Delta Fertile", te: "డెల్టా సారవంతమైన నేల" } },
  "Coastal Alluvial Soil": { img: soilLoamy, icon: "🏖️", color: "#0288D1", desc: { en: "Coastal Alluvial", te: "కోస్తా అల్యూవియల్" } },
  "Laterite Soil": { img: soilRed, icon: "🧱", color: "#B71C1C", desc: { en: "Hard Red", te: "గట్టి ఎర్ర నేల" } },
  "Coastal Sandy Soil": { img: soilSandy, icon: "🏜️", color: "#FBC02D", desc: { en: "Beach Sand", te: "తీరప్రాంత ఇసుక" } },
  "Sandy Soil": { img: soilSandy, icon: "🏜️", color: "#D4A373", desc: { en: "Desert Sand", te: "ఇసుక నేల" } },
  "Clay Soil": { img: soilBlack, icon: "🥯", color: "#4E342E", desc: { en: "Sticky Clay", te: "క్లే నేల" } },
  "Saline Soil": { img: soilSandy, icon: "🧂", color: "#9E9E9E", desc: { en: "Salt Rich", te: "క్షిార నేల" } },
  "Alkaline Soil": { img: soilSandy, icon: "🧪", color: "#7B1FA2", desc: { en: "Alkaline Soil", te: "క్షార నేల" } },
  "Marshy Soil": { img: soilLoamy, icon: "🦠", color: "#1B5E20", desc: { en: "Wet Swamp", te: "చిత్తడి నేల" } },
  "Gravelly Soil": { img: soilSandy, icon: "🪨", color: "#616161", desc: { en: "Stone Mix", te: "గ్రావెల్ నేల" } },
  "Forest Soil": { img: soilLoamy, icon: "🌳", color: "#33691E", desc: { en: "Organic Rich", te: "అటవీ నేల" } }
};

const SoilScreen = ({ language, district, onSelect, onBack }: SoilScreenProps) => {
  
  const availableSoils = useMemo(() => {
      // STEP 3: NORMALIZE DISTRICT
      const formattedDistrict = district?.trim().toLowerCase() || "";
      const normalizedMap = Object.fromEntries(
        Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
      );
      
      // STEP 4: GET SOILS DYNAMICALLY
      const soils = normalizedMap[formattedDistrict] || [];

      // STEP 5: DEBUG (IMPORTANT)
      console.log("Selected District:", district);
      console.log("Mapped Soils:", soils);

      return soils;
  }, [district]);

  // STEP 7: HANDLE EMPTY CASE
  if (!availableSoils || availableSoils.length === 0) {
      return (
          <div className="min-h-screen bg-[#F5F1EB] flex flex-col items-center justify-center p-10 text-center space-y-6">
              <Info size={60} className="text-slate-300" />
              <div className="space-y-2">
                 <h2 className="text-2xl font-black text-slate-400 uppercase tracking-tighter leading-none">Soil Data Unavailable</h2>
                 <p className="text-sm font-bold text-slate-400/60 transition-all italic leading-relaxed">
                    We couldn't find soil profiling for the district: <b>{district || "Unknown"}</b>.
                 </p>
              </div>
              <button onClick={onBack} className="px-8 py-3 bg-[#8B5E3C] text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Change Location</button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden pb-10">
      
      {/* 1. TOP HEADER */}
      <div className="bg-gradient-to-br from-[#5C3A21] to-[#8B5E3C] pt-12 pb-10 px-6 rounded-b-[3rem] shadow-2xl flex items-center gap-6 relative">
          <button onClick={onBack} className="text-white p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all active:scale-90 shadow-inner border border-white/10">
              <ArrowLeft size={28} />
          </button>
          <div className="flex-1">
              <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
                {language === "te" ? "నేల రకాన్ని ఎంచుకోండి" : "Select Soil Type"}
              </h2>
              <p className="text-[#C49A6C] text-[10px] font-black uppercase tracking-widest opacity-80 leading-none italic">
                {district ? `📍 ${district}` : "No district selected"}
              </p>
          </div>
      </div>

      <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
        
        {/* DISTRICT INSIGHT */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-l-[10px] border-[#8B5E3C] relative overflow-hidden">
            <div className="flex gap-4 relative z-10">
                <div className="p-3 bg-[#F5F1EB] rounded-2xl"><Sprout className="text-[#8B5E3C]" /></div>
                <div>
                   <h4 className="text-sm font-black text-[#5C3A21] uppercase tracking-tighter">Region Intelligence</h4>
                   <p className="text-xs font-bold text-[#8B5E3C]/70 leading-relaxed mt-1 italic">
                     {language === "te" 
                        ? `${district} లోని నేలల వివరాలు ఇక్కడ ఉన్నాయి.`
                        : `We've identified the specific soil types present in ${district}. Please select yours below.`}
                   </p>
                </div>
            </div>
        </div>

        {/* STEP 6: RENDER DYNAMIC UI */}
        <div className="space-y-6">
            {availableSoils.map((soilName: string, i: number) => {
              const meta = SOIL_METADATA[soilName] || SOIL_METADATA["Red Soil"];
              return (
                <button
                  key={soilName}
                  onClick={() => onSelect(soilName)}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl active:scale-[0.97] transition-all duration-500 flex items-stretch h-36 border-2 border-transparent hover:border-[#8B5E3C]"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="w-1/3 relative overflow-hidden">
                    <img 
                        src={meta.img} 
                        alt={soilName} 
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-center text-left relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner bg-[#F5F1EB]"
                      >
                        {meta.icon}
                      </div>
                      <h3 className="font-black text-xl text-[#5C3A21] group-hover:text-[#8B5E3C] transition-colors tracking-tighter leading-tight">
                        {soilName}
                      </h3>
                    </div>
                    <p className="text-[#8B5E3C]/60 font-black text-[10px] uppercase tracking-widest">
                        {language === "te" ? meta.desc.te : meta.desc.en}
                    </p>
                  </div>
    
                  {/* Selection Checkbox */}
                  <div className="w-16 bg-[#F5F1EB]/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#2E7D32] flex items-center justify-center transition-all shadow-md group-hover:rotate-12">
                      <Check size={20} className="text-[#F5F1EB] group-hover:text-white" />
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
