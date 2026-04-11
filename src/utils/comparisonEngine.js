/**
 * ══════════════════════════════════════════════════════════════
 *  Weather Comparison & Risk Analysis Engine
 * ══════════════════════════════════════════════════════════════
 *
 *  Compares current 5-day forecast against 10-year NASA historical
 *  averages to identify conditions, detect risks, and generate
 *  farmer-friendly guidance.
 */

import apMonthlyAverages from '@/data/apMonthlyAverages.json';
import { weatherText } from '@/translations/weather';

// ─── STEP 1: LOAD HISTORICAL DATA ─────────────────────────────

function getHistorical(district, month) {
    const mk = String(month).padStart(2, '0');
    if (apMonthlyAverages[district]?.[mk]) return apMonthlyAverages[district][mk];

    const matchedKey = Object.keys(apMonthlyAverages).find(
        k => k.toLowerCase().includes(district.toLowerCase()) ||
             district.toLowerCase().includes(k.toLowerCase())
    );
    return (matchedKey && apMonthlyAverages[matchedKey]?.[mk]) ? apMonthlyAverages[matchedKey][mk] : null;
}

// ─── STEP 2: DETERMINE CONDITION ──────────────────────────────

function determineCondition(rainRatio, avgTemp) {
    if (rainRatio < 0.3)  return "Dry";
    if (rainRatio > 1.5)  return "Rainy";
    if (avgTemp > 36)     return "Hot";
    if (avgTemp < 20)     return "Cool / Dry";
    return "Normal";
}

// ─── STEP 3: DETECT RISKS ────────────────────────────────────

function detectRisks(rainRatio, tempDiff, humDiff, forecast, currentMonth, lang = "en") {
    const risks = [];
    const t = weatherText[lang] || weatherText.en;
    const avgTemp = parseFloat(forecast.avgTemp);
    const avgHum  = parseFloat(forecast.avgHumidity);
    const totalRain = parseFloat(forecast.totalRain);

    const isRainyMonths = currentMonth >= 6 && currentMonth <= 9;
    const isHotMonths   = currentMonth >= 3 && currentMonth <= 5;

    // Rain-based risks
    if (rainRatio < 0.3) risks.push(t.risk_drought_severe);
    else if (rainRatio < 0.5) risks.push(t.risk_drought_low);

    if (rainRatio > 2.0) risks.push(t.risk_rain_excess);
    else if (rainRatio > 1.5) risks.push(t.risk_rain_heavy);

    if (isHotMonths && totalRain > 15) risks.push(t.risk_unseasonal_rain);
    if (isRainyMonths && totalRain < 5) risks.push(t.risk_monsoon_dry);

    // Temperature risks
    if (avgTemp > 40) risks.push(t.risk_heat_extreme);
    else if (avgTemp > 38) risks.push(t.risk_heat_stress);
    else if (tempDiff > 3) risks.push(t.risk_temp_high);

    // Humidity risks
    if (avgHum > 85) risks.push(t.risk_hum_v_high);
    else if (avgHum > 80) risks.push(t.risk_hum_high);
    else if (avgHum < 35) risks.push(t.risk_hum_low);

    return risks.filter(Boolean);
}

// ─── STEP 5: GENERATE FARMER MESSAGE ─────────────────────────

function generateMessage(condition, risks, lang = "en") {
    const t = weatherText[lang] || weatherText.en;
    
    // Priority messages based on risk severity
    if (risks.includes(t.risk_heat_extreme)) return t.msg_heat_extreme;
    if (risks.includes(t.risk_drought_severe)) return t.msg_drought_severe;
    if (risks.includes(t.risk_rain_excess)) return t.msg_rain_excess;
    if (risks.includes(t.risk_unseasonal_rain)) return t.msg_unseasonal_rain;

    // Condition-based messages
    switch (condition) {
        case "Dry": return t.msg_dry;
        case "Rainy": return t.msg_rainy;
        case "Hot": return t.msg_hot;
        case "Cool / Dry": return t.msg_cool;
        default: return t.msg_stable;
    }
}

// ─── MAIN EXPORT ─────────────────────────────────────────────

export function analyzeWeather(district, forecast, month, lang = "en") {
    const monthNum = typeof month === 'string' ? parseInt(month, 10) : month;
    const mk = String(monthNum).padStart(2, '0');
    const avgTemp   = parseFloat(forecast.avgTemp) || 0;
    const totalRain = parseFloat(forecast.totalRain) || 0;
    const avgHum    = parseFloat(forecast.avgHumidity) || 0;

    const historical = getHistorical(district, mk);
    const t = weatherText[lang] || weatherText.en;

    // Numerical Comparisons
    const rainRatio = historical ? (historical.rain > 0 ? totalRain / historical.rain : (totalRain > 0 ? 2.0 : 0)) : 1.0;
    const tempDiff  = historical ? (avgTemp - historical.temp) : 0;
    const humDiff   = historical ? (avgHum - historical.humidity) : 0;

    const condition = determineCondition(rainRatio, avgTemp);
    const risks = detectRisks(rainRatio, tempDiff, humDiff, forecast, monthNum, lang);
    
    // Simplify for UI Labels
    const summary = {
        rain: totalRain === 0 ? t.veryLow : rainRatio < 0.7 ? t.low : rainRatio < 1.3 ? t.normal : t.high,
        heat: avgTemp > 38 ? t.veryHigh : avgTemp > 32 ? t.high : avgTemp > 24 ? t.normal : t.low,
        moisture: avgHum > 80 ? t.veryHigh : avgHum > 60 ? t.normal : t.low
    };

    const message = generateMessage(condition, risks, lang);

    return {
        condition,
        summary,
        risks,
        message,
        comparison: {
            rainRatio: parseFloat(rainRatio.toFixed(2)),
            tempDiff: parseFloat(tempDiff.toFixed(1)),
            humDiff: parseFloat(humDiff.toFixed(1)),
        },
        historical,
        isHistoricalAvailable: !!historical,
    };
}
