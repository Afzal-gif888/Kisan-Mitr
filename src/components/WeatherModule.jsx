import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { extractFeatures } from "@/lib/FeatureExtraction";
import { analyzeWeather } from "@/utils/comparisonEngine";
import { advancedSeasonPrediction } from "@/utils/seasonalEngine";
import { generateFarmerInsights } from "@/utils/farmerInsightEngine";
import { weatherText } from "@/translations/weather";
import { HeroCard, SeasonalSummary, RiskAlert, FinalAdvice } from './SeasonalPrediction';

const WeatherModule = ({ lat, lon, state, district, language, onAnalysisComplete }) => {
    const t = weatherText[language] || weatherText.en;
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
            setError(t.insufficientData);
            setLoading(false);
            return;
        }

        try {
            let finalLat = latitude;
            let finalLon = longitude;

            if (!finalLat || !finalLon) {
                const geo = await geocodeLocation(dist, st, apiKey);
                if (!geo) throw new Error(t.insufficientData);
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

            const advancedIntelligence = advancedSeasonPrediction(districtName, features, analysis, currentMonth);

            const farmerInsights = analysis.isHistoricalAvailable ? generateFarmerInsights({
                rainDeviationPercent: (analysis.comparison.rainRatio - 1) * 100,
                tempDeviation: analysis.comparison.tempDiff,
                humidityDeviation: analysis.comparison.humDiff
            }) : null;

            const dailyData = {};
            rawData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                const temp = item.main.temp;
                const rain = item.rain?.["3h"] || 0;
                const desc = item.weather[0].description.toLowerCase();

                const getFarmerCondition = (tVal, rVal, dVal) => {
                    if (rVal > 0) return { text: t.rain, icon: "🌧️" };
                    if (tVal > 35) return { text: t.veryHot, icon: "🔥" };
                    if (tVal >= 28) return { text: t.sunny, icon: "☀️" };
                    if (dVal.includes("cloud") || dVal.includes("overcast")) return { text: t.cloudy, icon: "🌥️" };
                    return { text: t.normal, icon: "🌤️" };
                };

                const condition = getFarmerCondition(temp, rain, desc);

                if (!dailyData[date]) {
                    dailyData[date] = { ...condition, dt: item.dt };
                }
                const hour = new Date(item.dt * 1000).getHours();
                if (hour >= 12 && hour <= 15) {
                    dailyData[date] = { ...condition, dt: item.dt };
                }
            });
            const fiveDayForecast = Object.values(dailyData).slice(0, 5);

            const season = advancedIntelligence.season;
            const weatherResult = {
                condition: season,
                summary: {
                    rain: farmerInsights ? farmerInsights.rain.level : analysis.summary.rain,
                    heat: farmerInsights ? farmerInsights.temperature.level : analysis.summary.heat,
                    moisture: farmerInsights ? farmerInsights.moisture.level : analysis.summary.moisture
                },
                risks: [...analysis.risks, ...advancedIntelligence.anomalies],
                district: districtName,
                features,
                farmerInsights,
                fiveDayForecast
            };

            setPrediction(weatherResult);

            if (onAnalysisComplete) {
                onAnalysisComplete({ ...weatherResult, triggerNext: false });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="p-10 flex flex-col items-center justify-center space-y-4 min-h-[40vh] bg-[#F5F1EB]">
            <div className="w-12 h-12 border-4 border-[#8B5E3C]/20 border-t-[#8B5E3C] rounded-full animate-spin" />
            <p className="text-[10px] font-black text-[#8B5E3C]/60 uppercase tracking-widest">{t.analyzing}</p>
        </div>
    );

    if (error) return (
        <div className="p-8 text-center space-y-4 bg-white rounded-3xl border border-[#F5F1EB] max-w-xs mx-auto mt-20">
            <div className="text-4xl">⚠️</div>
            <p className="text-lg font-black text-[#5C3A21]">{t.connectionIssue}</p>
            <button onClick={() => window.location.reload()} className="w-full py-3 bg-[#F5F1EB] rounded-xl text-[10px] font-black uppercase text-[#8B5E3C]">
                {t.retry}
            </button>
        </div>
    );

    if (!prediction) return null;

    return (
        <div className="w-full flex flex-col max-w-sm mx-auto animate-in fade-in duration-700 pb-20 px-3 bg-[#F5F1EB] min-h-screen">
            
            {/* 1. HERO CARD */}
            <HeroCard season={prediction.condition} language={language} t={t} />

            {/* 2. SEASONAL SUMMARY */}
            <SeasonalSummary 
                rLevel={prediction.summary.rain} 
                tLevel={prediction.summary.heat} 
                mLevel={prediction.summary.moisture} 
                t={t} 
            />

            {/* 3. RISK ALERT */}
            <RiskAlert risks={prediction.risks} t={t} />

            {/* 4. 5-DAY FORECAST */}
            <div className="w-full mt-4">
                <div className="flex items-center gap-3 mb-3 px-1">
                    <h2 className="text-sm font-semibold text-[#8B5E3C]/60 uppercase tracking-widest">{t.next5days}</h2>
                    <div className="h-px w-full bg-[#8B5E3C]/10" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {prediction.fiveDayForecast.map((day, idx) => {
                        const dateObj = new Date(day.dt * 1000);
                        const dayName = dateObj.toLocaleDateString(language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN", { weekday: 'short' });
                        return (
                            <div key={idx} className="bg-white rounded-[1.8rem] p-4 shadow-sm border border-[#F5F1EB] flex flex-col items-center justify-center">
                                <p className="text-[10px] font-bold text-[#8B5E3C]/40 uppercase mb-2">{dayName}</p>
                                <span className="text-3xl mb-1">{day.icon}</span>
                                <p className="text-xs font-black text-[#5C3A21]">{day.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 5. FINAL ADVICE */}
            <FinalAdvice advice={prediction.farmerInsights?.summary} t={t} />

            {/* ➡️ FINAL CTA (TO SOIL SELECTION) */}
            <div className="mt-8">
                <button 
                    onClick={() => onAnalysisComplete && onAnalysisComplete({ ...prediction, triggerNext: true })}
                    className="w-full py-4 bg-[#2E7D32] text-white rounded-2xl text-lg font-black shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                    <span>{language === "te" ? "మట్టి ఎంపిక" : "Select Soil"}</span> 
                    <ArrowRight size={20} />
                </button>
            </div>

        </div>
    );
};

export default WeatherModule;
