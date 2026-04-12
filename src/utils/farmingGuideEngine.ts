import { Language } from '../lib/translations';
import { crops as cropsMaster } from '../data/crops';
import farmingGuides from '../data/farmingGuides';

export const getFarmingGuide = (cropId: string) => {
  return farmingGuides[cropId];
};
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

/**
 * 🚜 Farming Guide Architecture v2.6
 * Core scoring engine for delivering expert agricultural advice based on 
 * live NASA weather trends and verified AP district mappings.
 */
export const generateFarmingGuide = (
  cropId: string,
  district: string,
  weatherData: any,
  language: Language = 'te'
): FarmingGuideOutput => {
  // 🛡️ Data Safety Guards
  const crop: any = cropsMaster.find((c: any) => c.id === cropId);
  if (!crop) throw new Error(`Crop registry mismatch for ID: ${cropId}`);

  const normalizedDistrict = district?.trim().toLowerCase();
  
  const isDistrictSuitable = crop.districts.some((d: string) => d.toLowerCase() === normalizedDistrict);

  const adjustments: Set<string> = new Set();
  const warnings: Set<string> = new Set();
  let status: 'optimal' | 'warning' | 'critical' = 'optimal';

  // Extract real weather features with high-precision fallback
  const temp = parseFloat(weatherData?.features?.avgTemp || weatherData?.temperature || "28");
  const rain = parseFloat(weatherData?.features?.totalRain || weatherData?.rainfall || "0");

  // --- LOGIC 1: PRECIPITATION DYNAMICS ---
  if (rain < 30) { 
    if (language === 'te') adjustments.add('తక్కువ వర్షపాతం ఉంది: క్రమం తప్పకుండా నీరు పెట్టండి (Increase Irrigation)');
    else adjustments.add('Low rainfall detected: Ensure regular irrigation for healthy growth');

    if (crop.waterNeed === 'high' || crop.water?.requirement === 'High') {
      if (language === 'te') warnings.add('జాగ్రత్త: నీటి ఎద్దడి వల్ల దిగుబడి తగ్గే అవకాశం ఉంది');
      else warnings.add('Critical Warning: High-water requirement crop may suffer from current low-rain trend');
      status = 'warning';
    }
  } else if (rain > 120) { 
    if (language === 'te') adjustments.add('అధిక వర్షపాతం: పొలంలో నీరు నిల్వ ఉండకుండా చూడండి');
    else adjustments.add('Heavy rainfall trend: Prepare drainage channels immediately');

    if (crop.soils?.some((s: string) => s.toLowerCase().includes('clay') || s.toLowerCase().includes('black'))) {
      if (language === 'te') warnings.add('అధిక తేమ వల్ల వేరు కుళ్ళు వచ్చే అవకాశం ఉంది');
      else warnings.add('Root Rot Risk: Excess moisture in dense soil may cause fungal infections');
      status = 'critical';
    }
  }

  // --- LOGIC 2: THERMAL STRESS ANALYSIS ---
  if (temp > 35) {
    if (language === 'te') adjustments.add('తీవ్రమైన ఎండలు: మల్చింగ్ (Mulching) పద్ధతిని వాడండి');
    else adjustments.add('Heatwave trend: Use organic mulching to retain soil moisture');

    const heatSensitive = ['tomato', 'chilli', 'brinjal', 'okra'];
    const cropNameEn = crop.name?.en || crop.name || "";
    if (heatSensitive.some(name => cropNameEn.toLowerCase().includes(name))) {
      if (language === 'te') warnings.add('అధిక వేడి వల్ల పూత మరియు పిందె రాలిపోయే అవకాశం ఉంది');
      else warnings.add('Heat Stress: Significant flower and fruit drop likely in current temperatures');
      status = 'warning';
    }
  } else if (temp < 18) {
     if (crop.id === 'paddy' || crop.id === 'sugarcane') {
       if (language === 'te') warnings.add('తక్కువ ఉష్ణోగ్రత వల్ల పంట ఎదుగుదల మందగిస్తుంది');
       else warnings.add('Thermal Lag: Growth rate may be significantly slower due to cold currents');
       status = 'warning';
     }
  }

  return {
    crop,
    isDistrictSuitable,
    weatherAdjustments: Array.from(adjustments),
    weatherWarnings: Array.from(warnings),
    status
  };
};
