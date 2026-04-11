/**
 * ══════════════════════════════════════════════════════════════
 *  Farmer-Friendly Insight Engine v1.0
 * ══════════════════════════════════════════════════════════════
 * 
 *  Transforms complex meteorological deviations (NASA comparison)
 *  into simple, actionable insights using icons, colors, and 
 *  local language based on user selection.
 */

import { weatherText } from '@/translations/weather';

export function generateFarmerInsights(comparisonData, lang = "en") {
    if (!comparisonData) return null;

    const t = weatherText[lang] || weatherText.en;
    const { rainDeviationPercent, tempDeviation, humidityDeviation } = comparisonData;

    // --- STEP 1: RAIN ANALYSIS ---
    let rainResult = { level: t.normal, text: t.normal, icon: "🌧️" };

    if (rainDeviationPercent < -30) {
        rainResult = { level: t.veryLow, text: t.risk_drought_low, icon: "🌧️❌" };
    } else if (rainDeviationPercent > 20) {
        rainResult = { level: t.high, text: t.risk_rain_heavy, icon: "🌧️🌊" };
    }

    // --- STEP 2: TEMPERATURE ANALYSIS ---
    let tempResult = { level: t.normal, text: t.normal, icon: "🌡️" };

    if (tempDeviation > 3) {
        tempResult = { level: t.high, text: t.risk_heat_stress, icon: "🌡️🔥" };
    } else if (tempDeviation < -2) {
        tempResult = { level: t.low, text: t.low, icon: "🌡️❄️" };
    }

    // --- STEP 3: HUMIDITY ANALYSIS ---
    let moistureResult = { level: t.normal, text: t.normal, icon: "💧" };

    if (humidityDeviation > 20) {
        moistureResult = { level: t.high, text: t.risk_hum_high, icon: "💧💦" };
    } else if (humidityDeviation < -15) {
        moistureResult = { level: t.low, text: t.risk_hum_low, icon: "💧❌" };
    }

    // --- STEP 4: FINAL FARMER SUMMARY ---
    const summaryParts = [];
    if (rainDeviationPercent < -30) summaryParts.push(t.risk_drought_low);
    else if (rainDeviationPercent > 20) summaryParts.push(t.risk_rain_heavy);
    
    if (tempDeviation > 3) summaryParts.push(t.risk_heat_stress);

    let summary = summaryParts.length > 0 
        ? summaryParts.join(" — ") 
        : t.msg_stable;

    return {
        rain: rainResult,
        temperature: tempResult,
        moisture: moistureResult,
        summary: summary
    };
}
