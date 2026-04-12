import { useMemo, useEffect } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { SoilType } from "../lib/types";
import { apDistrictSoils } from "../data/apDistrictSoils";
import { getSoilImage } from "../utils/getSoilImage";
import { useApp } from "../context/AppContext";
import SoilCard from "../components/SoilCard";

const SOIL_TEXT_INTERNAL: Record<string, any> = {
    "Red Sandy Soil": { te: "ఇసుక ఎర్ర నేల" },
    "Red Loam Soil": { te: "లోమీ ఎర్ర నేల" },
    "Deep Red Soil": { te: "ముదురు ఎర్ర నేల" },
    "Black Cotton Soil": { te: "నల్ల నేల" },
    "Medium Black Soil": { te: "మధ్యస్థ నల్ల నేల" },
    "Shallow Black Soil": { te: "తేలికపాటి నల్ల నేల" },
    "Alluvial Soil": { te: "ఒండ్రు నేల" },
    "Delta Alluvial Soil": { te: "డెల్టా ఒండ్రు నేల" },
    "Coastal Sandy Soil": { te: "తీరప్రాంత ఇసుక నేల" },
    "Laterite Soil": { te: "లేటరైట్ నేల" },
    "Saline Soil": { te: "చౌడు నేల" },
    "Alkaline Soil": { te: "క్షార నేల" },
    "Gravelly Soil": { te: "కంకర నేల" },
    "Clay Soil": { te: "క్లే నేల" },
    "Silty Soil": { te: "సిల్టీ నేల" },
    "Loamy Soil": { te: "గోధుమ నేల" },
    "Red Soil": { te: "ఎర్ర నేల" },
    "Black Soil": { te: "నల్ల నేల" }
};

const translateDistrict = (district: string, lang: string) => {
    if (lang !== 'te' || !district) return district;
    const map: Record<string, string> = {
        'Tirupati': 'తిరుపతి', 'Chittoor': 'చిత్తూరు', 'Anantapur': 'అనంతపురం', 'YSR Kadapa': 'వైఎస్ఆర్ కడప',
        'Kurnool': 'కర్నూలు', 'Nandyal': 'నంద్యాల', 'Prakasam': 'ప్రకాశం', 'Guntur': 'గుంటూరు',
        'Bapatla': 'బాపట్ల', 'Palnadu': 'పల్నాడు', 'Krishna': 'కృష్ణా', 'NTR': 'ఎన్టీఆర్', 
        'Eluru': 'ఏలూరు', 'West Godavari': 'పశ్చిమ గోదావరి', 'East Godavari': 'తూర్పు గోదావరి',
        'Kakinada': 'కాకినాడ', 'Konaseema': 'కోనసీమ', 'Visakhapatnam': 'విశాఖపట్నం', 
        'Anakapalli': 'అనకాపల్లి', 'Vizianagaram': 'విజయనగరం', 'Srikakulam': 'శ్రీకాకుళం',
        'Parvathipuram Manyam': 'పార్వతీపురం మన్యం', 'Alluri Sitharama Raju': 'అల్లూరి సీతారామరాజు',
        'Annamayya': 'అన్నమయ్య', 'Sri Sathya Sai': 'శ్రీ సత్యసాయి', 'Nellore': 'నెల్లూరు'
    };
    return map[district] || district;
};

const SoilSelectionScreen = ({ onSelect, onBack }: SoilSelectionScreenProps) => {
  const { language, district } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const districtSoils = useMemo(() => {
    const selectedDist = district || "Tirupati";
    const soils = apDistrictSoils[selectedDist] || apDistrictSoils["Tirupati"];
    
    // 🚨 STEP 7: DEBUG VALIDATION
    if (soils.length > 0) {
        console.log("SOIL:", soils[0]);
        console.log("IMAGE USED:", getSoilImage(soils[0]));
    }
    
    return soils;
  }, [district]);

  return (
    <div className="w-full min-h-screen bg-[#F5F1E9] flex flex-col sm:max-w-md sm:mx-auto sm:shadow-2xl sm:my-4 sm:rounded-[3rem] animate-in fade-in duration-700 overflow-hidden pb-10 safe-area-inset">
      
      <div className="pt-10 pb-6 px-8 space-y-6 shrink-0">
          <div className="flex items-center justify-between">
              <button onClick={onBack} className="p-3 bg-white rounded-2xl text-[#1B5E20] shadow-sm active:scale-95 transition-all">
                  <ArrowLeft size={24} />
              </button>
              <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1B5E20]/5 rounded-full border border-[#1B5E20]/10 shadow-sm">
                      <MapPin size={12} className="text-[#1B5E20]" />
                      <span className="text-[10px] font-black text-[#1B5E20] uppercase tracking-[0.2em] italic">{district ? translateDistrict(district, language) : ''}</span>
                  </div>
              </div>
          </div>

          <div className="space-y-2 text-center">
              <h1 className="text-2xl font-black text-[#1B5E20] tracking-tight leading-none uppercase italic">
                {language === "te" ? "నేల రకాన్ని ఎంచుకోండి" : "Select Your Soil"}
              </h1>
              <p className="text-[10px] font-black text-[#1B5E20]/60 leading-tight uppercase tracking-widest italic mt-1 px-4">
                {language === "te" ? "మెరుగైన పంట సలహా కోసం మీ మట్టిని ఎంచుకోండి" : "Different soils need different care. Choose wisely."}
              </p>
          </div>
      </div>

      <div className="flex-1 px-6 pb-6 flex flex-col gap-6 overflow-y-auto pt-2">
        {districtSoils.map((soilName: string) => (
          <SoilCard 
            key={soilName}
            soilName={soilName}
            image={
                getSoilImage(soilName) || 
                `https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?auto=format&fit=crop&q=80&w=400&sig=${soilName.replace(/\s+/g, '-').toLowerCase()}&q=${soilName.toLowerCase()}+soil`
            }
            translatedName={SOIL_TEXT_INTERNAL[soilName]?.te || ""}
            language={language}
            onSelect={onSelect}
          />
        ))}

        <div className="pt-4 flex items-center justify-center gap-3 opacity-20">
            <div className="h-px w-6 bg-[#1B5E20]" />
            <p className="text-[8px] font-black text-[#1B5E20] uppercase tracking-[0.3em] italic">Validated Local Assets</p>
            <div className="h-px w-6 bg-[#1B5E20]" />
        </div>
      </div>
    </div>
  );
};

interface SoilSelectionScreenProps {
  onSelect: (soil: SoilType) => void;
  onBack: () => void;
}

export default SoilSelectionScreen;
