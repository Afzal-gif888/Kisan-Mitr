/**
 * ══════════════════════════════════════════════════════════════
 *  Advanced Seasonal Prediction Engine v1.0
 * ══════════════════════════════════════════════════════════════
 * 
 *  Blends 10-year NASA historical norms with current forecasts
 *  to provide detailed, farmer-friendly seasonal intelligence.
 * 
 *  Usage: 
 *    import { advancedSeasonPrediction } from '@/utils/seasonalEngine';
 *    const results = advancedSeasonPrediction(district, forecast, comparison, "06");
 * ══════════════════════════════════════════════════════════════
 */

import apMonthlyAverages from '@/data/apMonthlyAverages.json';

/**
 * Main Seasonal Prediction Logic
 * 
 * @param {string} district - The district name
 * @param {Object} forecast - Current 5-7 day forecast data
 * @param {Object} comparison - Existing comparison engine output
 * @param {string|number} currentMonth - Month in "01"-"12" or 1-12 format
 */
export function advancedSeasonPrediction(district, forecast, comparison, currentMonth) {
    try {
        const monthNum = typeof currentMonth === 'string' ? parseInt(currentMonth, 10) : currentMonth;
        
        // --- STEP 1: SELECT FUTURE WINDOW (Next 3 Months) ---
        const nextThreeMonths = [];
        for (let i = 1; i <= 3; i++) {
            let m = monthNum + i;
            if (m > 12) m -= 12;
            nextThreeMonths.push(String(m).padStart(2, '0'));
        }

        // --- STEP 2: EXTRACT HISTORICAL PATTERN ---
        // Find district (with fuzzy match fallback)
        let districtKey = Object.keys(apMonthlyAverages).find(
            k => k.toLowerCase() === district?.toLowerCase()
        );
        if (!districtKey) {
            districtKey = Object.keys(apMonthlyAverages).find(
                k => k.toLowerCase().includes(district?.toLowerCase()) || 
                     district?.toLowerCase().includes(k.toLowerCase())
            );
        }

        const histData = districtKey ? apMonthlyAverages[districtKey] : null;
        
        // Compute averages for the 3-month window
        let avgSeasonTemp = 0;
        let avgSeasonRain = 0;
        let avgSeasonHumidity = 0;
        let availableMonths = 0;

        if (histData) {
            nextThreeMonths.forEach(m => {
                if (histData[m]) {
                    avgSeasonTemp += histData[m].temp;
                    avgSeasonRain += histData[m].rain;
                    avgSeasonHumidity += histData[m].humidity;
                    availableMonths++;
                }
            });
            
            if (availableMonths > 0) {
                avgSeasonTemp /= availableMonths;
                avgSeasonRain /= availableMonths;
                avgSeasonHumidity /= availableMonths;
            }
        }

        // Fallback to forecast if historical is missing
        if (availableMonths === 0) {
            avgSeasonTemp = forecast.avgTemp;
            avgSeasonRain = forecast.totalRain / 5 * 30; // Rough estimate for a month
            avgSeasonHumidity = forecast.avgHumidity;
        }

        // --- STEP 3: ANALYZE RAIN DISTRIBUTION ---
        // rainDays is assuming count in the forecast period (usually 5 days)
        const rainPattern = (forecast.rainDays < 3 && forecast.totalRain > 15) 
            ? "Uneven" 
            : "Well distributed";

        // --- STEP 4: FORECAST ADJUSTMENT (Blending) ---
        // Historical vs Forecast blending weights: 60/40
        // We normalize forecast to a monthly scale for comparison if needed, 
        // but here the USER wants a blended "adjusted" value.
        // Assuming forecastRain is also a monthly projection or direct comparison is intended.
        const adjustedRain = (0.6 * avgSeasonRain) + (0.4 * (forecast.totalRain || 0));
        const adjustedTemp = (0.6 * avgSeasonTemp) + (0.4 * (forecast.avgTemp || avgSeasonTemp));
        const adjustedHum  = (0.6 * avgSeasonHumidity) + (0.4 * (forecast.avgHumidity || avgSeasonHumidity));

        // --- STEP 5: DETERMINE SEASON TYPE ---
        const rainRatio = avgSeasonRain > 0 ? (adjustedRain / avgSeasonRain) : 1;
        let seasonType = "Normal";
        if (rainRatio < 0.6) seasonType = "Dry";
        else if (rainRatio > 1.4) seasonType = "Rainy";

        // --- STEP 6: HEAT STRESS ANALYSIS ---
        let heatLevel = "Moderate";
        if (adjustedTemp > 38) heatLevel = "Extreme";
        else if (adjustedTemp > 32) heatLevel = "High";

        // --- STEP 7: MOISTURE ANALYSIS ---
        let moistureLevel = "Normal";
        if (adjustedRain < (avgSeasonRain * 0.5) && adjustedHum < 50) {
            moistureLevel = "Dry";
        } else if (adjustedHum > 75 || adjustedRain > (avgSeasonRain * 1.2)) {
            moistureLevel = "Wet";
        }

        // --- STEP 8: ANOMALY DETECTION ---
        const anomalies = [];
        const isHistoricalDry = avgSeasonRain < 2; // Threshold for dry season
        const isHistoricalRainy = avgSeasonRain > 6; // Threshold for rainy season

        if (isHistoricalDry && forecast.totalRain > 20) {
            anomalies.push("Unseasonal rain possible");
        }
        if (isHistoricalRainy && forecast.totalRain < 5) {
            anomalies.push("Dry spell risk during monsoon");
        }
        if (forecast.avgTemp > (avgSeasonTemp + 4)) {
            anomalies.push("Heat wave risk");
        }

        // --- STEP 9: TREND ANALYSIS ---
        const tempTrend = forecast.tempTrend === "rising" ? "Increasing" : forecast.tempTrend === "falling" ? "Decreasing" : "Stable";
        const rainTrend = forecast.rainTrend === "increasing" ? "Increasing" : forecast.rainTrend === "decreasing" ? "Decreasing" : "Stable";

        // --- STEP 10: CONFIDENCE SCORE ---
        let confidence = 70;
        // Reduce
        if (anomalies.length > 0) confidence -= 10;
        const deviation = Math.abs(forecast.avgTemp - avgSeasonTemp);
        if (deviation > 5) confidence -= 10;
        // Increase
        if (deviation < 2 && Math.abs(rainRatio - 1) < 0.2) confidence += 10;
        
        // Clamp 60-90
        confidence = Math.max(60, Math.min(90, confidence));

        // --- STEP 11: FARMER INSIGHTS ---
        const insights = [];
        if (seasonType === "Dry") insights.push("Low rainfall expected");
        if (moistureLevel === "Dry") insights.push("Soil moisture may reduce");
        if (heatLevel === "Extreme") insights.push("Extreme heat likely - protect sensitive crops");
        if (anomalies.includes("Unseasonal rain possible")) insights.push("Warning: Cover harvested crops to avoid damage");
        
        // Default insights if list is short
        if (insights.length < 2) {
            if (seasonType === "Normal") insights.push("Weather likely stable for sowing");
            else insights.push("Monitor water levels closely");
        }

        // --- STEP 12: FINAL OUTPUT ---
        return {
            season: seasonType,
            details: {
                rainLevel: rainRatio < 0.7 ? "Low" : rainRatio > 1.3 ? "High" : "Normal",
                rainPattern: rainPattern,
                heatLevel: heatLevel,
                moistureLevel: moistureLevel
            },
            trends: {
                temperature: tempTrend,
                rainfall: rainTrend
            },
            anomalies: anomalies,
            confidence: `${confidence}%`,
            insights: insights.slice(0, 3)
        };

    } catch (error) {
        console.error("Seasonal Engine Error:", error);
        return {
            season: "Normal",
            details: { rainLevel: "Normal", rainPattern: "Stable", heatLevel: "Moderate", moistureLevel: "Normal" },
            trends: { temperature: "Stable", rainfall: "Stable" },
            anomalies: [],
            confidence: "60%",
            insights: ["Data unavailable - follow local traditional practices"]
        };
    }
}
