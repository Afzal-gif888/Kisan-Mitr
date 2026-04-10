/**
 * ══════════════════════════════════════════════════════════════
 *  Weather Comparison & Risk Analysis Engine
 * ══════════════════════════════════════════════════════════════
 *
 *  Compares current 5-day forecast against 10-year NASA historical
 *  averages to identify conditions, detect risks, and generate
 *  farmer-friendly guidance.
 *
 *  Usage:
 *    import { analyzeWeather } from '@/utils/comparisonEngine';
 *    const result = analyzeWeather("Tirupati", forecastData, "06");
 * ══════════════════════════════════════════════════════════════
 */

import apMonthlyAverages from '@/data/apMonthlyAverages.json';

// ─── STEP 1: LOAD HISTORICAL DATA ─────────────────────────────

/**
 * Get the historical baseline for a district and month.
 * @param {string} district 
 * @param {string} month - "01"–"12"
 * @returns {{ temp: number, rain: number, humidity: number } | null}
 */
function getHistorical(district, month) {
    const mk = String(month).padStart(2, '0');

    // Direct match
    if (apMonthlyAverages[district]?.[mk]) {
        return apMonthlyAverages[district][mk];
    }

    // Fuzzy match (handles slight naming differences)
    const matchedKey = Object.keys(apMonthlyAverages).find(
        k => k.toLowerCase().includes(district.toLowerCase()) ||
             district.toLowerCase().includes(k.toLowerCase())
    );

    if (matchedKey && apMonthlyAverages[matchedKey]?.[mk]) {
        return apMonthlyAverages[matchedKey][mk];
    }

    return null;
}

// ─── STEP 2: DETERMINE CONDITION ──────────────────────────────

/**
 * Classify the overall season condition based on rain ratio.
 * @param {number} rainRatio - forecast rain / historical rain
 * @param {number} avgTemp - current average temperature
 * @returns {string}
 */
function determineCondition(rainRatio, avgTemp) {
    if (rainRatio < 0.3)  return "Dry";
    if (rainRatio < 0.5)  return "Dry";
    if (rainRatio > 2.0)  return "Rainy";
    if (rainRatio > 1.5)  return "Rainy";
    if (avgTemp > 36)     return "Hot";
    if (avgTemp < 20)     return "Cool / Dry";
    return "Normal";
}

// ─── STEP 3: DETECT RISKS ────────────────────────────────────

/**
 * Detect agricultural risks by comparing forecast vs baseline.
 * @param {number} rainRatio
 * @param {number} tempDiff
 * @param {number} humDiff
 * @param {Object} forecast
 * @param {Object} historical
 * @param {number} currentMonth
 * @returns {string[]}
 */
function detectRisks(rainRatio, tempDiff, humDiff, forecast, historical, currentMonth) {
    const risks = [];
    const avgTemp = parseFloat(forecast.avgTemp);
    const avgHum  = parseFloat(forecast.avgHumidity);
    const totalRain = parseFloat(forecast.totalRain);

    const isRainyMonths = currentMonth >= 6 && currentMonth <= 9;
    const isHotMonths   = currentMonth >= 3 && currentMonth <= 5;

    // Rain-based risks
    if (rainRatio < 0.3) {
        risks.push("Severe drought risk — increase irrigation");
    } else if (rainRatio < 0.5) {
        risks.push("Low rainfall expected — plan for water shortage");
    }

    if (rainRatio > 2.0) {
        risks.push("Excess rainfall — risk of waterlogging and crop damage");
    } else if (rainRatio > 1.5) {
        risks.push("Heavy rainfall risk — ensure drainage");
    }

    // Unseasonal rain
    if (isHotMonths && totalRain > 15) {
        risks.push("Unseasonal rain possible — cover harvested crops");
    }

    // Dry spell during monsoon
    if (isRainyMonths && totalRain < 5) {
        risks.push("Dry spell during monsoon — increase irrigation");
    }

    // Temperature risks
    if (avgTemp > 40) {
        risks.push("Extreme heat wave — protect crops and livestock");
    } else if (avgTemp > 38) {
        risks.push("High heat stress — consider shade and mulching");
    } else if (tempDiff > 3) {
        risks.push("Temperature above normal — monitor crop stress");
    }

    // Humidity risks
    if (avgHum > 85) {
        risks.push("Very high humidity — fungal disease risk");
    } else if (avgHum > 80) {
        risks.push("High humidity — watch for pest activity");
    }

    // Low humidity during critical growth
    if (avgHum < 35) {
        risks.push("Very low humidity — wilting risk for sensitive crops");
    }

    return risks;
}

// ─── STEP 4: SIMPLIFY FOR UI ─────────────────────────────────

/**
 * Convert numeric values to simple labels for the UI.
 */
function simplifyForUI(forecast, rainRatio) {
    const avgTemp   = parseFloat(forecast.avgTemp);
    const avgHum    = parseFloat(forecast.avgHumidity);
    const totalRain = parseFloat(forecast.totalRain);

    // Rain label
    let rain;
    if (totalRain === 0)       rain = "No";
    else if (rainRatio < 0.3)  rain = "Very Low";
    else if (rainRatio < 0.7)  rain = "Low";
    else if (rainRatio < 1.3)  rain = "Normal";
    else if (rainRatio < 1.8)  rain = "High";
    else                       rain = "Very High";

    // Heat label
    let heat;
    if (avgTemp > 38)      heat = "Extreme";
    else if (avgTemp > 35) heat = "High";
    else if (avgTemp > 28) heat = "Moderate";
    else if (avgTemp > 22) heat = "Mild";
    else                   heat = "Cool";

    // Moisture label
    let moisture;
    if (avgHum > 80)       moisture = "Wet";
    else if (avgHum > 60)  moisture = "Normal";
    else if (avgHum > 40)  moisture = "Low";
    else                   moisture = "Dry";

    return { rain, heat, moisture };
}

// ─── STEP 5: GENERATE FARMER MESSAGE ─────────────────────────

/**
 * Generate a simple, actionable farming message.
 */
function generateMessage(condition, summary, risks) {
    // Priority messages based on risk severity
    if (risks.some(r => r.includes("Extreme heat"))) {
        return "Extreme heat — protect crops, irrigate frequently";
    }
    if (risks.some(r => r.includes("Severe drought"))) {
        return "Very dry conditions — only drought-resistant crops recommended";
    }
    if (risks.some(r => r.includes("Excess rainfall"))) {
        return "Heavy rains — ensure drainage, avoid field work";
    }
    if (risks.some(r => r.includes("Unseasonal rain"))) {
        return "Unexpected rain possible — cover harvested crops";
    }

    // Condition-based messages
    switch (condition) {
        case "Dry":
            return "Dry conditions — low water crops like groundnut, sunflower are safer";
        case "Rainy":
            return "Good moisture — rice, paddy, and water-loving crops are suitable";
        case "Hot":
            return "Hot weather — irrigate well, prefer heat-tolerant varieties";
        case "Cool / Dry":
            return "Cool season — ideal for wheat, gram, and winter vegetables";
        case "Normal":
        default:
            return "Weather is stable — suitable for most crops in your region";
    }
}

// ─── MAIN EXPORT ─────────────────────────────────────────────

/**
 * Analyze current forecast against historical data.
 *
 * @param {string} district - District name (e.g., "Tirupati")
 * @param {{ avgTemp: string|number, totalRain: string|number, avgHumidity: string|number }} forecast
 * @param {string|number} month - Current month (1–12 or "01"–"12")
 * @returns {{
 *   condition: string,
 *   summary: { rain: string, heat: string, moisture: string },
 *   risks: string[],
 *   message: string,
 *   comparison: { rainRatio: number, tempDiff: number, humDiff: number } | null,
 *   historical: { temp: number, rain: number, humidity: number } | null,
 *   isHistoricalAvailable: boolean
 * }}
 */
export function analyzeWeather(district, forecast, month) {
    const monthNum = typeof month === 'string' ? parseInt(month, 10) : month;
    const mk = String(monthNum).padStart(2, '0');

    const avgTemp   = parseFloat(forecast.avgTemp) || 0;
    const totalRain = parseFloat(forecast.totalRain) || 0;
    const avgHum    = parseFloat(forecast.avgHumidity) || 0;

    // Step 1: Get historical baseline
    const historical = getHistorical(district, mk);

    // If no historical data — use forecast-only analysis (fallback)
    if (!historical) {
        const fallbackCondition = determineCondition(
            totalRain > 20 ? 1.5 : totalRain > 5 ? 1.0 : 0.3,
            avgTemp
        );
        const fallbackSummary = simplifyForUI(forecast, 1.0);
        const fallbackRisks = detectRisks(1.0, 0, 0, forecast, { temp: avgTemp, rain: totalRain, humidity: avgHum }, monthNum);
        const fallbackMessage = generateMessage(fallbackCondition, fallbackSummary, fallbackRisks);

        return {
            condition: fallbackCondition,
            summary: fallbackSummary,
            risks: fallbackRisks,
            message: fallbackMessage,
            comparison: null,
            historical: null,
            isHistoricalAvailable: false,
        };
    }

    // Step 2: Compute comparisons (avoid division by zero)
    const rainRatio = historical.rain > 0 ? totalRain / historical.rain : (totalRain > 0 ? 2.0 : 0);
    const tempDiff  = avgTemp - historical.temp;
    const humDiff   = avgHum - historical.humidity;

    // Step 3: Determine condition
    const condition = determineCondition(rainRatio, avgTemp);

    // Step 4: Detect risks
    const risks = detectRisks(rainRatio, tempDiff, humDiff, forecast, historical, monthNum);

    // Step 5: Simplify for UI
    const summary = simplifyForUI(forecast, rainRatio);

    // Step 6: Generate message
    const message = generateMessage(condition, summary, risks);

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
        isHistoricalAvailable: true,
    };
}

/**
 * Get a list of all districts available in the historical dataset.
 * @returns {string[]}
 */
export function getAvailableDistricts() {
    return Object.keys(apMonthlyAverages);
}
