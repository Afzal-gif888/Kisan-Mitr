/**
 * PredictionEngine.js
 * Sophisticated Agricultural Intelligence Engine
 * Predicts local seasons and detects unusual weather risks (Anomalies).
 */

export function predictWeather(features, currentMonth) {
    if (!features) return null;

    const {
        avgTemp,
        totalRain,
        avgHumidity,
        tempTrend,
        rainTrend
    } = features;

    // 1. Seasonal Baseline (Standard Indian Patterns)
    const isRainyMonths = currentMonth >= 5 && currentMonth <= 8; // June - Sept (0-indexed: 5-8)
    const isHotMonths = currentMonth >= 2 && currentMonth <= 4;   // March - May (2-4)
    const isCoolMonths = currentMonth >= 9 || currentMonth <= 1;   // Oct - Feb

    // 2. Season Prediction (Forecast + Baseline)
    let season = "Normal";
    if (parseFloat(totalRain) > 30 && parseFloat(avgHumidity) > 70) {
        season = "Rainy";
    } else if (parseFloat(avgTemp) > 35 && parseFloat(totalRain) < 5) {
        season = "Dry";
    } else if (isCoolMonths && parseFloat(avgTemp) < 25) {
        season = "Cool / Dry";
    }

    // 3. Simple Status Summaries
    const summary = {
        rain: parseFloat(totalRain) === 0 ? "No" : parseFloat(totalRain) < 20 ? "Low" : "High",
        heat: parseFloat(avgTemp) > 35 ? "High" : parseFloat(avgTemp) < 25 ? "Cool" : "Moderate",
        moisture: parseFloat(avgHumidity) > 70 ? "High" : parseFloat(avgHumidity) < 40 ? "Low" : "Normal"
    };

    // 4. Risk Detection (Anomaly Detection)
    const risks = [];
    
    // A) Unseasonal Rain (Dry months + Rain)
    if (isHotMonths && parseFloat(totalRain) > 10) {
        risks.push("Unseasonal Rain Possible");
    }

    // B) Dry Spell (Rainy months + No Rain)
    if (isRainyMonths && parseFloat(totalRain) < 10) {
        risks.push("Dry Spell Risk");
    }

    // C) Heat Wave
    if (parseFloat(avgTemp) > 38) {
        risks.push("High Heat Expected");
    }

    // D) High Moisture (Fungal Risk)
    if (parseFloat(avgHumidity) > 85) {
        risks.push("High Humidity Risk");
    }

    // 5. Farmer-Friendly Message
    let message = "Weather is stable for farming.";
    if (season === "Dry") message = "Dry conditions expected. Suitable for low water crops.";
    if (season === "Rainy") message = "Rainy conditions. Ensure proper drainage.";
    if (risks.length > 0) {
        if (risks.includes("Unseasonal Rain Possible")) message = "Prepare for unexpected rain. Cover harvested crops.";
        if (risks.includes("Dry Spell Risk")) message = "Dry spell during monsoon. Increase irrigation.";
    }

    return {
        season,
        summary,
        risks,
        message
    };
}
