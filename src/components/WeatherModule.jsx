import React, { useState, useEffect } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { extractFeatures } from "@/lib/FeatureExtraction";
import { predictWeather } from "@/lib/PredictionEngine";
import { translations } from "@/lib/translations";
import SeasonalPrediction from './SeasonalPrediction';

/**
 * WeatherModule v14.0 (Extreme Simplicity Edition)
 * Zero-clutter container focused entirely on harvest intelligence for farmers.
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
            let url;
            if (latitude && longitude) {
                url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            } else {
                // Manual fallback: using district and state name for India
                url = `https://api.openweathermap.org/data/2.5/forecast?q=${dist},${st},IN&appid=${apiKey}&units=metric`;
            }

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
            const currentMonth = new Date().getMonth();
            const weatherResult = predictWeather(features, currentMonth);
            
            setPrediction(weatherResult);

            if (onAnalysisComplete) {
                onAnalysisComplete({ features, season: weatherResult.season });
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
                {language === "te" ? "వాతావరణ విశ్లేషణ..." : "Analyzing Farm Conditions"}
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
            <div className="w-full mb-16">
                <SeasonalPrediction 
                    season={prediction.season}
                    summary={prediction.summary}
                    message={prediction.message}
                    language={language}
                    risks={prediction.risks}
                />
            </div>

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
