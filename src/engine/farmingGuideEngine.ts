import { Language } from '@/lib/translations';
import cropsMaster from '../data/apCropsMaster.json';
import districtMapping from '../data/apDistrictCropMapping.json';

export interface WeatherData {
  features?: {
    avgTemp: string;
    totalRain: string;
    avgHumidity: string;
  };
  temperature?: number; // fallback
  rainfall?: number;    // fallback
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
  weatherData: any,
  language: Language = 'te'
): FarmingGuideOutput => {
  const crop = cropsMaster.find((c: any) => c.id === cropId);
  if (!crop) throw new Error('Crop not found');

  const suitableCropsInDistrict = (districtMapping as any)[district] || [];
  const isDistrictSuitable = suitableCropsInDistrict.includes(cropId);

  const adjustments: string[] = [];
  const warnings: string[] = [];
  let status: 'optimal' | 'warning' | 'critical' = 'optimal';

  // Extract real weather features
  const temp = parseFloat(weatherData?.features?.avgTemp || weatherData?.temperature || "28");
  const rain = parseFloat(weatherData?.features?.totalRain || weatherData?.rainfall || "0");

  // --- LOGIC 1: RAINFALL ADJUSTMENTS ---
  if (rain < 30) { 
    if (language === 'te') adjustments.push('తక్కువ వర్షపాతం ఉంది: క్రమం తప్పకుండా నీరు పెట్టండి (Increase Irrigation)');
    else adjustments.push('Low rainfall detected: Ensure regular irrigation for healthy growth');

    if (crop.details.water === 'High' || crop.details.water === 'Very High') {
      if (language === 'te') warnings.push('జాగ్రత్త: నీటి ఎద్దడి వల్ల దిగుబడి తగ్గే అవకాశం ఉంది');
      else warnings.push('Critical Warning: High-water requirement crop may suffer from current low-rain trend');
      status = 'warning';
    }
  } else if (rain > 120) { 
    if (language === 'te') adjustments.push('అధిక వర్షపాతం: పొలంలో నీరు నిల్వ ఉండకుండా చూడండి');
    else adjustments.push('Heavy rainfall trend: Prepare drainage channels immediately');

    if (crop.soils.map((s: string) => s.toLowerCase()).includes('black cotton soil') || crop.id === 'maize') {
      if (language === 'te') warnings.push('అధిక తేమ వల్ల వేరు కుళ్ళు వచ్చే అవకాశం ఉంది');
      else warnings.push('Root Rot Risk: Excess moisture in this black cotton soil may cause fungal infections');
      status = 'critical';
    }
  }

  // --- LOGIC 2: TEMPERATURE ADJUSTMENTS ---
  if (temp > 35) {
    if (language === 'te') adjustments.push('తీవ్రమైన ఎండలు: మల్చింగ్ (Mulching) పద్ధతిని వాడండి');
    else adjustments.push('Heatwave trend: Use organic mulching to retain soil moisture');

    if (crop.name.en.toLowerCase().includes('tomato') || crop.name.en.toLowerCase().includes('chilli')) {
      if (language === 'te') warnings.push('అధిక వేడి వల్ల పూత మరియు పిందె రాలిపోయే అవకాశం ఉంది');
      else warnings.push('Heat Stress: May cause significant flower and fruit drop in this crop');
      status = 'warning';
    }
  } else if (temp < 18) {
     if (crop.id === 'paddy') {
       if (language === 'te') warnings.push('తక్కువ ఉష్ణోగ్రత వల్ల వరి ఎదుగుదల మందగిస్తుంది');
       else warnings.push('Cold Stress: Growth rate may be significantly slower than average');
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
