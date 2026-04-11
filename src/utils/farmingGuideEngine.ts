import { Language } from '@/lib/translations';
import cropsMaster from '../data/apCropsMaster.json';
import districtMapping from '../data/apDistrictCropMapping.json';

export interface WeatherData {
  temperature: number;
  rainfall: number; // monthly or daily average
  condition?: string;
}

export interface FarmingGuideOutput {
  crop: any;
  isDistrictSuitable: boolean;
  weatherAdjustments: string[];
  weatherWarnings: string[];
  status: 'optimal' | 'warning' | 'critical';
}

export const generateFarmingGuide = (
  cropId: string,
  district: string,
  weather: WeatherData,
  language: Language = 'te'
): FarmingGuideOutput => {
  const crop = cropsMaster.find((c: any) => c.id === cropId);
  if (!crop) throw new Error('Crop not found');

  const suitableCropsInDistrict = (districtMapping as any)[district] || [];
  const isDistrictSuitable = suitableCropsInDistrict.includes(cropId);

  const adjustments: string[] = [];
  const warnings: string[] = [];
  let status: 'optimal' | 'warning' | 'critical' = 'optimal';

  // Weather Logic
  
  // Rainfall logic
  if (weather.rainfall < 50) { // Very low rainfall
    if (language === 'te') adjustments.push('నీటి పారుదల పెంచండి (Increase Irrigation)');
    else if (language === 'hi') adjustments.push('सिंचाई बढ़ाएं (Increase Irrigation)');
    else adjustments.push('Increase Irrigation');

    if (crop.water.requirement === 'High' || crop.water.requirement === 'Very High') {
      if (language === 'te') warnings.push('జాగ్రత్త: నీటి ఎద్దడి పంట దిగుబడిని తగ్గిస్తుంది');
      else if (language === 'hi') warnings.push('सावधान: पानी की कमी से उपज कम हो सकती है');
      else warnings.push('Warning: Water stress will reduce yield');
      status = 'warning';
    }
  } else if (weather.rainfall > 200) { // Heavy rainfall
    if (language === 'te') adjustments.push('నీరు నిల్వ కాకుండా కాలువలు సిద్ధం చేయండి');
    else if (language === 'hi') adjustments.push('जल निकासी के लिए नालियां तैयार करें');
    else adjustments.push('Prepare drainage channels to prevent waterlogging');

    if (crop.soil.types.includes('Black Cotton') || crop.id === 'maize') {
      if (language === 'te') warnings.push('అధిక వర్షం వల్ల వేరు కుళ్ళు తెగులు వచ్చే అవకాశం ఉంది');
      else if (language === 'hi') warnings.push('भारी बारिश के कारण जड़ सड़न का खतरा');
      else warnings.push('Risk of root rot due to high rainfall');
      status = 'critical';
    }
  }

  // Temperature logic
  if (weather.temperature > 35) {
    if (language === 'te') adjustments.push('విత్తనాన్ని ఆలస్యం చేయండి లేదా ఉదయం వేళల్లో నీరు పెట్టండి');
    else if (language === 'hi') adjustments.push('बुवाई में देरी करें या सुबह जल्दी सिंचाई करें');
    else adjustments.push('Delay sowing or irrigate during early morning');

    if (crop.category === 'vegetables') {
      if (language === 'te') warnings.push('అధిక ఉష్ణోగ్రత వల్ల పూత రాలిపోయే అవకాశం ఉంది');
      else if (language === 'hi') warnings.push('उच्च तापमान के कारण फूल गिर सकते हैं');
      else warnings.push('High temperature may cause flower drop');
      status = 'warning';
    }
  } else if (weather.temperature < 15) {
     if (crop.id === 'paddy' || crop.id === 'maize') {
       if (language === 'te') warnings.push('తక్కువ ఉష్ణోగ్రత వల్ల ఎదుగుదల నెమ్మదిస్తుంది');
       else if (language === 'hi') warnings.push('कम तापमान के कारण विकास धीमा हो जाएगा');
       else warnings.push('Low temperature will slow down growth');
     }
  }

  return {
    crop,
    isDistrictSuitable,
    weatherAdjustments: adjustments,
    weatherWarnings: warnings,
    status
  };
};
