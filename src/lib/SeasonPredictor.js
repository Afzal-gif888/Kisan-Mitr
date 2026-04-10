/**
 * SeasonPredictor Engine
 * Uses extracted weather features to predict the immediate agricultural season.
 * Focuses on Indian agricultural context: Kharif, Rabi, Zaid.
 */

export function predictSeason(features) {
    if (!features) {
        console.warn("⚠️ Season Predictor: No features provided.");
        return "Unknown";
    }

    const { avgTemp, totalRain, avgHumidity, rainFrequency } = features;
    
    // Numeric conversions (ensuring they are numbers)
    const temp = parseFloat(avgTemp);
    const rain = parseFloat(totalRain);
    const humidity = parseFloat(avgHumidity);

    console.log(`--- 🔮 PREDICTING SEASON ---`);
    console.log(`Inputs: Temp ${temp}°C, Rain ${rain}mm, Humidity ${humidity}%`);

    let season = "Normal";

    // KHARIF (RAINY/MONSOON)
    // High rainfall or very high humidity with moderate-to-high temperature
    if (rain > 15 || (humidity > 70 && rain > 5)) {
        season = "Kharif (Rainy)";
    } 
    // RABI (WINTER)
    // Low temperature (< 22°C) and low rainfall
    else if (temp < 22 && rain < 10) {
        season = "Rabi (Winter)";
    }
    // ZAID (SUMMER)
    // High temperature (> 32°C) and very low rainfall
    else if (temp > 32 && rain < 5) {
        season = "Zaid (Summer)";
    }
    // MODERATE / SPRING
    else if (temp >= 22 && temp <= 30 && rain < 10) {
        season = "Moderate (Spring)";
    }

    console.log("📅 PREDICTED SEASON:", season);
    return season;
}
