/**
 * FeatureExtraction Engine
 * Transforms raw weather data into structured features for predictive modeling.
 * Focuses on aggregations, intensity analysis, and trend detection.
 */

export function extractFeatures(weatherData) {
    if (!weatherData || weatherData.length === 0) {
        console.warn("⚠️ Feature Extraction: No data provided.");
        return null;
    }

    console.log(`--- 🧬 EXTRACTING FEATURES FROM ${weatherData.length} DATA POINTS ---`);

    // --- STEP 1: BASIC AGGREGATIONS ---
    const temps = weatherData.map(d => d.temp);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    // --- STEP 2: RAINFALL ANALYSIS ---
    const rainfalls = weatherData.map(d => d.rainfall);
    const totalRain = rainfalls.reduce((a, b) => a + b, 0);
    const rainFrequency = rainfalls.filter(r => r > 0).length;
    const rainIntensity = rainFrequency > 0 ? totalRain / rainFrequency : 0;

    // --- STEP 3: HUMIDITY ANALYSIS ---
    const humidities = weatherData.map(d => d.humidity);
    const avgHumidity = humidities.reduce((a, b) => a + b, 0) / humidities.length;
    const highHumidityCount = humidities.filter(h => h > 70).length;
    const lowHumidityCount = humidities.filter(h => h < 40).length;

    // --- STEP 4: TREND ANALYSIS ---
    const midPoint = Math.floor(weatherData.length / 2);
    const firstHalf = weatherData.slice(0, midPoint);
    const secondHalf = weatherData.slice(midPoint);

    const getTrend = (val1, val2) => {
        const diff = val1 - val2;
        if (Math.abs(diff) < 0.1) return "Stable"; // Buffer for minor fluctuations
        return diff > 0 ? "Increasing" : "Decreasing";
    };

    // A) Temperature Trend
    const firstHalfAvgTemp = firstHalf.reduce((a, b) => a + b.temp, 0) / firstHalf.length;
    const secondHalfAvgTemp = secondHalf.reduce((a, b) => a + b.temp, 0) / secondHalf.length;
    const tempTrend = getTrend(secondHalfAvgTemp, firstHalfAvgTemp);

    // B) Rainfall Trend
    const firstHalfRain = firstHalf.reduce((a, b) => a + b.rainfall, 0);
    const secondHalfRain = secondHalf.reduce((a, b) => a + b.rainfall, 0);
    const rainTrend = getTrend(secondHalfRain, firstHalfRain);

    // C) Humidity Trend
    const firstHalfAvgHum = firstHalf.reduce((a, b) => a + b.humidity, 0) / firstHalf.length;
    const secondHalfAvgHum = secondHalf.reduce((a, b) => a + b.humidity, 0) / secondHalf.length;
    const humidityTrend = getTrend(secondHalfAvgHum, firstHalfAvgHum);

    // --- STEP 5: STRUCTURED OUTPUT ---
    const features = {
        avgTemp: avgTemp.toFixed(1),
        maxTemp: maxTemp.toFixed(1),
        minTemp: minTemp.toFixed(1),

        totalRain: totalRain.toFixed(1),
        rainFrequency,
        rainIntensity: rainIntensity.toFixed(2),

        avgHumidity: avgHumidity.toFixed(0),
        highHumidityCount,
        lowHumidityCount,

        tempTrend,
        rainTrend,
        humidityTrend
    };

    console.log("📊 EXTRACTED FEATURES:", features);
    return features;
}
