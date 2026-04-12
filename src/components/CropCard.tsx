import React, { memo } from 'react';
import { Droplets, Thermometer, ArrowRight, Check } from "lucide-react";
import { getAgmarknetName } from "../utils/getAgmarknetName";

interface CropCardProps {
  crop: any;
  language: string;
  suitabilityColor: string;
  onViewGuide: (id: string) => void;
  imgSource: string;
  farmHero: string;
  marketData?: { price: string | null; market: string | null } | null;
}

const METRIC_MAP: Record<string, string> = {
    'Low': 'తక్కువ',
    'Moderate': 'మధ్యస్థం',
    'High': 'ఎక్కువ',
    'Very High': 'చాలా ఎక్కువ',
    'Hot and Dry': 'వేడి - పొడిగాలి',
    'Warm and Dry': 'వెచ్చని - పొడిగాలి',
    'Warm and Humid': 'వెచ్చని - తేమ',
    'Mild': 'సాధారణం',
    'Cool and Humid': 'చల్లని - తేమ',
    'Cool and Dry': 'చల్లని - పొడిగాలి',
    'Warm': 'వెచ్చని',
    'Warm and Temperate': 'వెచ్చని ఉష్ణోగ్రత',
    'Warm and Sunny': 'వెచ్చని ఎండ',
    'Coastal Humid': 'తీరప్రాంత తేమ',
    'Hot': 'వేడి',
    'Hot and Humid': 'వేడి - తేమ'
};

const CROP_NAME_MAP: Record<string, string> = {
    'Paddy': 'వరి', 'Maize': 'మొక్కజొన్న', 'Jowar': 'జొన్న', 'Bajra': 'సజ్జలు', 'Ragi': 'రాగులు',
    'Red Gram': 'కందులు', 'Green Gram': 'పెసలు', 'Black Gram': 'మినుములు', 'Bengal Gram': 'శనగలు',
    'Horse Gram': 'ఉలవలు', 'Groundnut': 'వేరుశనగ', 'Sunflower': 'పొద్దుతిరుగుడు', 'Sesame': 'నువ్వులు',
    'Cotton': 'పత్తి', 'Sugarcane': 'చెరకు', 'Mango': 'మామిడి', 'Banana': 'అరటి', 'Coconut': 'కొబ్బరి',
    'Tomato': 'టమోటా', 'Chilli': 'మిరప', 'Onion': 'ఉల్లిపాయ', 'Turmeric': 'పసుపు', 'Cashew': 'జీడిమామిడి'
};

const SOIL_MAP: Record<string, string> = {
    "Red Loam Soil": "ఎర్ర గరుప నేలలు", "Red Soil": "ఎర్ర నేలలు", "Black Soil": "నల్లరేగడి నేలలు",
    "Black Cotton Soil": "నల్లరేగడి నేలలు", "Alluvial Soil": "ఒండ్రు నేలలు", "Sandy Soil": "ఇసుక నేలలు",
    "Loamy Soil": "గరుప నేలలు", "Laterite Soil": "ఎర్ర లాటరైట్ నేలలు", "Gravelly Soil": "రాతి నేలలు",
    "Delta Alluvial Soil": "డెల్టా ఒండ్రు నేలలు", "Coastal Sandy Soil": "తీరప్రాంత ఇసుక నేలలు",
    "Saline Soil": "చౌడు నేలలు", "Clay Soil": "బంకమట్టి నేలలు", "Red Sandy Soil": "ఎర్ర ఇసుక నేలలు"
};

const DISTRICT_MAP: Record<string, string> = {
    'Tirupati': 'తిరుపతి', 'Chittoor': 'చిత్తూరు', 'Anantapur': 'అనంతపురం', 'YSR Kadapa': 'వైఎస్ఆర్ కడప',
    'Kurnool': 'కర్నూలు', 'Nandyal': 'నంద్యాల', 'Prakasam': 'ప్రకాశం', 'Guntur': 'గుంటూరు',
    'Bapatla': 'బాపట్ల', 'Palnadu': 'పల్నాడు', 'Krishna': 'కృష్ణా', 'NTR': 'ఎన్టీఆర్', 
    'Eluru': 'ఏలూరు', 'West Godavari': 'పశ్చిమ గోదావరి', 'East Godavari': 'తూర్పు గోదావరి',
    'Kakinada': 'కాకినాడ', 'Konaseema': 'కోనసీమ', 'Visakhapatnam': 'విశాఖపట్నం', 
    'Anakapalli': 'అనకాపల్లి', 'Vizianagaram': 'విజయనగరం', 'Srikakulam': 'శ్రీకాకుళం',
    'Parvathipuram Manyam': 'పార్వతీపురం మన్యం', 'Alluri Sitharama Raju': 'అల్లూరి సీతారామరాజు',
    'Annamayya': 'అన్నమయ్య', 'Sri Sathya Sai': 'శ్రీ సత్యసాయి', 'Nellore': 'నెల్లూరు'
};

const translateMetric = (text: string, lang: string) => {
    if (lang !== 'te' || !text) return text;
    return METRIC_MAP[String(text)] || text;
};

const translateCropName = (name: string, lang: string) => {
    if (lang !== 'te' || !name) return name;
    return CROP_NAME_MAP[name] || name;
};

const translateReason = (reason: string, lang: string) => {
    if (lang !== 'te' || !reason) return reason;
    let teReason = reason;
    Object.keys(SOIL_MAP).forEach(k => { teReason = teReason.replace(k, SOIL_MAP[k]); });
    Object.keys(DISTRICT_MAP).forEach(k => { teReason = teReason.replace(k, DISTRICT_MAP[k]); });
    return teReason;
};

const CropCard = React.memo(({ crop, language, suitabilityColor, onViewGuide, imgSource, farmHero, marketData }: CropCardProps) => {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all hover:scale-[1.02] active:scale-95">
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-200">
          <div className="relative w-full h-full">
              <img 
                  src={imgSource} 
                  alt={crop?.englishName || "Crop"} 
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e: any) => { e.target.onerror = null; e.target.src = farmHero; }}
              />
              <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex flex-col items-start">
            <h3 className="text-2xl font-black text-white tracking-tighter drop-shadow-lg uppercase leading-none">
              {language === 'te' ? translateCropName((crop?.teluguName || crop?.name?.te || crop?.name || ""), language) : (crop?.englishName || crop?.name?.en || crop?.name || "")}
            </h3>
            {getAgmarknetName(crop?.id, (crop?.englishName || crop?.name || "")) !== (crop?.englishName || crop?.name || "") && (
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-1.5 drop-shadow-md">
                {getAgmarknetName(crop?.id, (crop?.englishName || crop?.name || ""))}
              </span>
            )}
          </div>

          <div className={`absolute top-4 right-4 px-5 py-2 rounded-full bg-gradient-to-r ${suitabilityColor || 'from-slate-500 to-slate-400'} text-white shadow-2xl border border-white/20`}>
              <span className="text-[10px] font-black uppercase tracking-widest">{crop?.suitabilityLabel || "N/A"}</span>
          </div>
      </div>

      <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2 pb-5 border-b border-[#F1F8E9]">
              <div className="text-center space-y-1.5 border-r border-[#F1F8E9]">
                  <div className="flex justify-center text-blue-500 mb-1"><Droplets size={20} /></div>
                  <p className="text-[8px] font-black text-[#1B5E20] uppercase tracking-widest">{language === "te" ? "నీరు" : "Water Need"}</p>
                  <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{translateMetric(crop?.waterNeed, language) || "Normal"}</p>
              </div>
              <div className="text-center space-y-1.5">
                  <div className="flex justify-center text-orange-500 mb-1"><Thermometer size={20} /></div>
                  <p className="text-[8px] font-black text-[#1B5E20] uppercase tracking-widest">{language === "te" ? "వాతావరణం" : "Temp"}</p>
                  <p className="text-xs font-black text-[#1B5E20] uppercase mt-1">{translateMetric(crop?.climate || crop?.heatTolerance, language) || "Normal"}</p>
              </div>
          </div>

          <div className="bg-[#F1F8E9]/50 p-4 rounded-2xl border border-[#1B5E20]/5 space-y-1 group hover:bg-[#F1F8E9] transition-all">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-widest leading-none">
                    {language === "te" ? "మార్కెట్ ధర" : "Market Price"}
                </p>
                {!marketData && <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />}
              </div>
              
              <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-[#1B5E20] italic">
                    {marketData ? (
                        marketData.price ? `₹${marketData.price}` : (language === "te" ? "అందుబాటులో లేదు" : "Not Available")
                    ) : (
                        language === "te" ? "వెతుకుతుంది..." : "Fetching..."
                    )}
                  </span>
                  {marketData?.price && <span className="text-[10px] font-bold text-[#1B5E20]/60 uppercase tracking-tighter italic">/ {language === "te" ? "క్వింటాల్" : "quintal"}</span>}
              </div>

              {marketData?.market && (
                  <div className="flex items-center gap-1.5 pt-1">
                      <div className="w-1.5 h-1.5 bg-[#1B5E20]/20 rounded-full" />
                      <p className="text-[10px] font-bold text-[#1B5E20]/60 uppercase tracking-tight italic truncate">
                          📍 {marketData.market} {language === "te" ? "మార్కెట్" : "Market"}
                      </p>
                  </div>
              )}
          </div>

          <button
              onClick={() => onViewGuide(crop?.id || "")}
              className="w-full py-5 bg-[#F1F8E9] border-2 border-transparent text-[#1B5E20] rounded-[1.8rem] text-sm font-black uppercase tracking-[0.1em] flex items-center justify-center gap-3 active:scale-95 group transition-all"
          >
              <span>{language === "te" ? "సాగు విధానం" : "Farming Guide"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
      </div>
    </div>
  );
});

export default CropCard;
