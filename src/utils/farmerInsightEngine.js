/**
 * ══════════════════════════════════════════════════════════════
 *  Farmer-Friendly Insight Engine v1.0
 * ══════════════════════════════════════════════════════════════
 * 
 *  Transforms complex meteorological deviations (NASA comparison)
 *  into simple, actionable insights for farmers using icons,
 *  colors, and local language (Telugu).
 * 
 *  Rule: Never show raw percentages or degrees to the user.
 * ══════════════════════════════════════════════════════════════
 */

export function generateFarmerInsights(comparisonData) {
    if (!comparisonData) return null;

    const { rainDeviationPercent, tempDeviation, humidityDeviation } = comparisonData;

    // --- STEP 1: RAIN ANALYSIS ---
    let rainResult = {
        level: "Normal",
        label: "Good",
        text: "సాధారణ వర్షపాతం",
        icon: "🌧️",
        color: "emerald"
    };

    if (rainDeviationPercent < -30) {
        rainResult = {
            level: "Very Low",
            label: "Dry Risk",
            text: "వర్షం తక్కువగా ఉంటుంది",
            icon: "🌧️❌",
            color: "orange"
        };
    } else if (rainDeviationPercent > 20) {
        rainResult = {
            level: "High",
            label: "Flood Risk",
            text: "వర్షం ఎక్కువగా ఉంటుంది",
            icon: "🌧️🌊",
            color: "blue"
        };
    }

    // --- STEP 2: TEMPERATURE ANALYSIS ---
    let tempResult = {
        level: "Normal",
        text: "సాధారణ ఉష్ణోగ్రత",
        icon: "🌡️",
        color: "emerald"
    };

    if (tempDeviation > 3) {
        tempResult = {
            level: "Hot",
            text: "ఎక్కువ వేడి ఉంటుంది",
            icon: "🌡️🔥",
            color: "red"
        };
    } else if (tempDeviation < -2) {
        tempResult = {
            level: "Cool",
            text: "చల్లగా ఉంటుంది",
            icon: "🌡️❄️",
            color: "blue"
        };
    }

    // --- STEP 3: HUMIDITY ANALYSIS ---
    let moistureResult = {
        level: "Normal",
        text: "సాధారణ తేమ",
        icon: "💧",
        color: "emerald"
    };

    if (humidityDeviation > 20) {
        moistureResult = {
            level: "High Moisture",
            text: "తేమ ఎక్కువగా ఉంటుంది",
            icon: "💧💦",
            color: "blue"
        };
    } else if (humidityDeviation < -15) {
        moistureResult = {
            level: "Dry",
            text: "తేమ తక్కువగా ఉంటుంది",
            icon: "💧❌",
            color: "yellow"
        };
    }

    // --- STEP 4: FINAL FARMER SUMMARY ---
    // Create a natural sounding summary by combining insights
    const summaryParts = [];
    
    if (rainResult.level !== "Normal") {
        summaryParts.push(rainResult.text);
    }
    
    if (tempResult.level !== "Normal") {
        summaryParts.push(tempResult.text);
    }

    let summary = summaryParts.length > 0 
        ? summaryParts.join(", ") 
        : "సాధారణ వాతావరణం — పంటలకు అనుకూలం";

    // --- STEP 5: STRUCTURED OUTPUT ---
    return {
        rain: rainResult,
        temperature: tempResult,
        moisture: moistureResult,
        summary: summary
    };
}
