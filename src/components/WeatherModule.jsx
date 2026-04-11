import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { extractFeatures } from "@/lib/FeatureExtraction";
import { analyzeWeather } from "@/utils/comparisonEngine";
import { advancedSeasonPrediction } from "@/utils/seasonalEngine";
import { generateFarmerInsights } from "@/utils/farmerInsightEngine";
import { translations } from "@/lib/translations";
import SeasonalPrediction from './SeasonalPrediction';

/**
 * WeatherModule v16.0 (Advanced Seasonal Intelligence Edition)
 * Compares live forecast against 10-year NASA historical data
 * plus an advanced prediction engine for detailed farmer guidance.
 */
const WeatherModule = ({ lat, lon, state, district, language, onAnalysisComplete }) => {
    const t = translations[language] || translations.en;
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (lat && lon) {
            fetchWeather(lat, lon);
        } else if (district && state) {
            fetchWeather(null, null, district, state);
        }
    }, [lat, lon, district, state]);

    /**
     * Geocode a place name to lat/lon using OpenWeatherMap Geocoding API.
     */
    const geocodeLocation = async (dist, st, apiKey) => {
        const cleanName = (name) => name.replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
        const cleanDist = cleanName(dist);
        const cleanSt = cleanName(st);

        const queries = [
            `${cleanDist},${cleanSt},IN`,
            `${cleanDist},IN`,
            `${cleanSt},IN`,
        ];

        for (const q of queries) {
            try {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${apiKey}`;
                const geoRes = await fetch(geoUrl);
                if (!geoRes.ok) continue;
                const geoData = await geoRes.json();
                if (geoData && geoData.length > 0) {
                    return { lat: geoData[0].lat, lon: geoData[0].lon };
                }
            } catch { /* try next query */ }
        }
        return null;
    };

    const fetchWeather = async (latitude, longitude, dist, st) => {
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) {
            setError("API Key Missing");
            setLoading(false);
            return;
        }

        try {
            let finalLat = latitude;
            let finalLon = longitude;

            if (!finalLat || !finalLon) {
                const geo = await geocodeLocation(dist, st, apiKey);
                if (!geo) throw new Error("Location not found");
                finalLat = geo.lat;
                finalLon = geo.lon;
            }

            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${finalLat}&lon=${finalLon}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`${response.status}`);
            const rawData = await response.json();

            const structuredArray = rawData.list.map(item => ({
                temp: item.main.temp,
                humidity: item.main.humidity,
                rainfall: item.rain?.["3h"] || 0,
                time: item.dt
            }));

            const features = extractFeatures(structuredArray);
            const currentMonth = new Date().getMonth() + 1; 

            const districtName = dist || district || "";
            const analysis = analyzeWeather(districtName, features, currentMonth);

            // ── NEW: Advanced Seasonal Intelligence ──
            const advancedIntelligence = advancedSeasonPrediction(districtName, features, analysis, currentMonth);

            // ── NEW: Farmer-Friendly Insights ──
            const farmerInsights = analysis.isHistoricalAvailable ? generateFarmerInsights({
                rainDeviationPercent: (analysis.comparison.rainRatio - 1) * 100,
                tempDeviation: analysis.comparison.tempDiff,
                humidityDeviation: analysis.comparison.humDiff
            }) : null;

            // ── NEW: Extract 5-Day Simple Forecast ──
            const dailyData = {};
            rawData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                const temp = item.main.temp;
                const rain = item.rain?.["3h"] || 0;
                const desc = item.weather[0].description.toLowerCase();

                const getFarmerCondition = (t, r, d) => {
                    if (r > 0) return { text: language === "te" ? "వర్షం" : "Rainy", icon: "🌧️" };
                    if (t > 35) return { text: language === "te" ? "ఎండ ఎక్కువ" : "Extreme Heat", icon: "🔥" };
                    if (t >= 28) return { text: language === "te" ? "ఎండ" : "Sunny", icon: "☀️" };
                    if (d.includes("cloud") || d.includes("overcast")) return { text: language === "te" ? "మోస్తరు" : "Cloudy", icon: "🌥️" };
                    return { text: language === "te" ? "సాధారణం" : "Normal", icon: "🌤️" };
                };

                const condition = getFarmerCondition(temp, rain, desc);

                if (!dailyData[date]) {
                    dailyData[date] = { ...condition, dt: item.dt, isRainy: rain > 0, isHot: temp > 35 };
                }
                const hour = new Date(item.dt * 1000).getHours();
                if (hour >= 12 && hour <= 15) {
                    dailyData[date] = { ...condition, dt: item.dt, isRainy: rain > 0, isHot: temp > 35 };
                }
            });
            const fiveDayForecast = Object.values(dailyData).slice(0, 5);

            const weatherResult = {
                season: advancedIntelligence.season, 
                summary: analysis.summary,
                message: advancedIntelligence.insights.join(". "), 
                risks: [...analysis.risks, ...advancedIntelligence.anomalies],
                features: features,
                comparison: analysis.comparison,
                historical: analysis.historical,
                isHistoricalAvailable: analysis.isHistoricalAvailable,
                
                seasonalDetails: advancedIntelligence.details,
                seasonalTrends: advancedIntelligence.trends,
                confidence: advancedIntelligence.confidence,
                insights: advancedIntelligence.insights,
                farmerInsights: farmerInsights,
                fiveDayForecast: fiveDayForecast
            };

            setPrediction(weatherResult);

            if (onAnalysisComplete) {
                onAnalysisComplete({ features, season: analysis.condition });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="p-32 flex flex-col items-center justify-center space-y-8 min-h-[60vh]">
            <div className="relative">
                <div className="w-24 h-24 border-8 border-[#8B5E3C]/10 border-t-[#8B5E3C] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl animate-pulse">🌾</span>
                </div>
            </div>
            <p className="text-xs font-black text-[#8B5E3C]/40 uppercase tracking-[0.5em] animate-pulse">
                {language === "te" ? "వాతావరణ విశ్లేషణ..." : language === "hi" ? "विश्लेषण हो रहा है..." : "Analyzing Farm Conditions"}
            </p>
        </div>
    );

    if (error) return (
        <div className="p-10 text-center space-y-8 bg-white rounded-[2.5rem] shadow-xl border-4 border-[#F5EFE6]">
            <div className="text-6xl text-orange-200">⚠️</div>
            <div>
                <p className="text-2xl font-black text-[#5C3A21] tracking-tighter mb-2">Connection Issue</p>
                <p className="text-sm font-bold text-slate-400">Please check your internet and try again.</p>
            </div>
            <button onClick={() => window.location.reload()} className="w-full py-5 bg-[#F5EFE6] border-2 border-white rounded-[2rem] text-[10px] font-black uppercase text-[#8B5E3C] tracking-widest shadow-lg active:scale-95 transition-all">
                Retry Connection
            </button>
        </div>
    );

    if (!prediction) return null;

    const hasRainRisk = prediction.fiveDayForecast.some(d => d.isRainy);
    const hasHeatRisk = prediction.fiveDayForecast.some(d => d.isHot);

    return (
        <div className="w-full flex flex-col items-center max-w-lg mx-auto animate-in fade-in duration-1000 pb-20 px-4">
            
            {/* 🌾 SECTION 1: SEASONAL FORECAST (TOP PRIORITY) */}
            <div className="w-full mb-10">
                <div className="flex flex-col mb-6 px-2">
                    <h2 className="text-2xl font-black text-[#5C3A21] tracking-tighter">
                        🌾 {language === "te" ? "రాబోయే 3-4 నెలల వాతావరణం" : "Seasonal Forecast (3-4 Months)"}
                    </h2>
                    <p className="text-[10px] font-black text-[#8B5E3C]/40 uppercase tracking-[0.3em]">
                        {language === "te" ? "పంటలకు ముఖ్యమైన సమాచారం" : "Critical information for crops"}
                    </p>
                </div>
                
                <SeasonalPrediction 
                    season={prediction.season}
                    summary={prediction.summary}
                    message={prediction.message}
                    language={language}
                    risks={prediction.risks}
                    seasonalDetails={prediction.seasonalDetails}
                    seasonalTrends={prediction.seasonalTrends}
                    confidence={prediction.confidence}
                    insights={prediction.insights}
                    farmerInsights={prediction.farmerInsights} 
                />
            </div>

            {/* 📅 SECTION 2: DIVIDER & 5-DAY FORECAST */}
            <div className="w-full mb-12">
                <div className="flex flex-col gap-1 mb-8 px-2">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-black text-[#5C3A21] tracking-tighter whitespace-nowrap">
                            📅 {language === "te" ? "వచ్చే 5 రోజుల వాతావరణం" : "Next 5 Days Weather"}
                        </h2>
                        <div className="h-px w-full bg-[#8B5E3C]/10" />
                    </div>
                    {(hasRainRisk || hasHeatRisk) && (
                        <div className="animate-in slide-in-from-left duration-700">
                             <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                                {hasRainRisk ? (language === "te" ? "వర్షం వచ్చే అవకాశం" : "Rain Expectation") : 
                                 (language === "te" ? "ఎండ ఎక్కువ" : "High Heat Forecast")}
                             </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 px-1 no-scrollbar snap-x">
                    {prediction.fiveDayForecast.map((day, idx) => {
                        const dateObj = new Date(day.dt * 1000);
                        const dayName = dateObj.toLocaleDateString(language === "te" ? "te-IN" : "en-IN", { weekday: 'short' });
                        return (
                            <div 
                                key={idx} 
                                className="min-w-[120px] bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#F5EFE6] flex flex-col items-center justify-center snap-center hover:shadow-lg transition-all duration-300"
                            >
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-4">{dayName}</p>
                                <span className="text-4xl mb-4 drop-shadow-sm select-none">{day.icon}</span>
                                <p className="text-sm font-black text-[#5C3A21] leading-none">{day.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ➡️ FINAL CTA BUTTON (STICKY) */}
            <div className="w-full sticky bottom-6 z-30 transform hover:scale-[1.01] transition-transform duration-500">
                <div className="absolute inset-0 bg-[#2E7D32]/10 blur-2xl rounded-full" />
                <button 
                    onClick={() => onAnalysisComplete && onAnalysisComplete({ features: prediction.features, season: prediction.season, triggerNext: true })}
                    className="w-full py-5 bg-[#2E7D32] text-white rounded-[2.2rem] text-xl font-black shadow-xl flex items-center justify-center gap-4 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative drop-shadow-sm">{t.next}</span> 
                    <ArrowRight size={28} className="relative group-hover:translate-x-2 transition-transform duration-300 drop-shadow-sm" />
                </button>
            </div>

        </div>
    );
};

export default WeatherModule;
