import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { extractFeatures } from "@/lib/FeatureExtraction";
import { analyzeWeather } from "@/utils/comparisonEngine";
import { translations } from "@/lib/translations";
import SeasonalPrediction from './SeasonalPrediction';

/**
 * WeatherModule v15.0 (NASA Intelligence Edition)
 * Compares live forecast against 10-year NASA historical data
 * to produce accurate, district-specific seasonal predictions.
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
     * Tries multiple search strategies to maximize hit rate for Indian districts.
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

            // If no coordinates, geocode the district/state name first
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

            // Process for Prediction Features
            const structuredArray = rawData.list.map(item => ({
                temp: item.main.temp,
                humidity: item.main.humidity,
                rainfall: item.rain?.["3h"] || 0,
                time: item.dt
            }));

            const features = extractFeatures(structuredArray);
            const currentMonth = new Date().getMonth() + 1; // 1-indexed

            // ── NEW: NASA-backed comparison analysis ──
            // Use the district name for historical lookup
            const districtName = dist || district || "";
            const analysis = analyzeWeather(districtName, features, currentMonth);

            const weatherResult = {
                season: analysis.condition,
                summary: analysis.summary,
                message: analysis.message,
                risks: analysis.risks,
                features: features,
                comparison: analysis.comparison,
                historical: analysis.historical,
                isHistoricalAvailable: analysis.isHistoricalAvailable,
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

    return (
        <div className="w-full flex flex-col items-center max-w-md mx-auto animate-in fade-in duration-1000 pb-20 px-2">
            
            {/* MAIN SEASONAL CARDS */}
            <div className="w-full mb-6">
                <SeasonalPrediction 
                    season={prediction.season}
                    summary={prediction.summary}
                    message={prediction.message}
                    language={language}
                    risks={prediction.risks}
                />
            </div>

            {/* NASA HISTORICAL BADGE */}
            {prediction.isHistoricalAvailable && prediction.comparison && (
                <div className="w-full mb-12 px-1">
                    <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-4 border border-white/80 shadow-sm">
                        <p className="text-[9px] font-black text-[#8B5E3C]/40 uppercase tracking-[0.2em] mb-3">
                            🛰️ Compared with 10-Year NASA Data
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="text-[10px] font-bold text-[#8B5E3C]/50 mb-1">Rain vs Avg</p>
                                <p className={`text-lg font-black ${prediction.comparison.rainRatio > 1.3 ? 'text-blue-600' : prediction.comparison.rainRatio < 0.7 ? 'text-orange-500' : 'text-emerald-600'}`}>
                                    {prediction.comparison.rainRatio > 1 ? '↑' : '↓'} {Math.abs((prediction.comparison.rainRatio - 1) * 100).toFixed(0)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#8B5E3C]/50 mb-1">Temp vs Avg</p>
                                <p className={`text-lg font-black ${prediction.comparison.tempDiff > 2 ? 'text-red-500' : prediction.comparison.tempDiff < -2 ? 'text-blue-500' : 'text-emerald-600'}`}>
                                    {prediction.comparison.tempDiff > 0 ? '+' : ''}{prediction.comparison.tempDiff}°C
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#8B5E3C]/50 mb-1">Humidity</p>
                                <p className={`text-lg font-black ${prediction.comparison.humDiff > 10 ? 'text-blue-600' : prediction.comparison.humDiff < -10 ? 'text-orange-500' : 'text-emerald-600'}`}>
                                    {prediction.comparison.humDiff > 0 ? '+' : ''}{prediction.comparison.humDiff}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MINIMAL FINAL CTA BUTTON */}
            <div className="w-full sticky bottom-6 z-30 transform hover:scale-[1.01] transition-transform duration-500">
                <div className="absolute inset-0 bg-[#2E7D32]/10 blur-2xl rounded-full" />
                <button 
                    onClick={() => onAnalysisComplete && onAnalysisComplete({ features: prediction.features, season: prediction.season, triggerNext: true })}
                    className="w-full py-5 bg-[#2E7D32] text-white rounded-[1.8rem] text-xl font-black shadow-xl flex items-center justify-center gap-4 group relative overflow-hidden"
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
