import React, { useState, useEffect, memo } from 'react';
import { ArrowRight, ArrowLeft, CalendarDays, Sprout, CloudRain, Thermometer, Droplets, AlertTriangle } from 'lucide-react';
import { extractFeatures } from "../utils/FeatureExtraction";
import { analyzeWeather } from "../utils/comparisonEngine";
import { advancedSeasonPrediction } from "../utils/seasonalEngine";
import { generateFarmerInsights } from "../utils/farmerInsightEngine";
import { weatherText } from "../translations/weather";
import { useApp } from "../context/AppContext";

const LABEL_MAP_BASE: Record<string, string> = { "Very Low": "veryLow", "Low": "low", "Normal": "normal", "High": "high", "Very High": "veryHigh", "Extreme": "veryHigh", "Moderate": "normal", "Mild": "low", "Dry": "low", "Wet": "high" };
const DOT_COUNT_MAP: Record<string, number> = { "Very Low": 1, "Low": 1, "Mild": 1, "Cool": 1, "Dry": 1, "Normal": 3, "Moderate": 3, "High": 4, "Extreme": 5, "Very High": 5, "Wet": 5 };

const getLabel = (l: string, t: any) => {
    return t[LABEL_MAP_BASE[l]] || l;
};

const getFarmerCondition = (tVal: number, rVal: number, dVal: string, t: any) => {
    if (rVal > 0) return { text: t.rain, icon: "🌧️" };
    if (tVal > 35) return { text: t.veryHot, icon: "🔥" };
    if (tVal >= 28) return { text: t.sunny, icon: "☀️" };
    if (dVal.includes("cloud") || dVal.includes("overcast")) return { text: t.cloudy, icon: "🌥️" };
    return { text: t.normal, icon: "🌤️" };
};

const RenderDots = memo(({ level }: { level: string }) => {
    const count = DOT_COUNT_MAP[level] || 2;
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < count ? "bg-[#1B5E20]" : "bg-[#1B5E20]/15"}`} />
            ))}
        </div>
    );
});

const WeatherModule = React.memo(({ lat = null, lon = null, state = null, district, language, onAnalysisComplete, onBack }: any) => {
    const t = weatherText[language] || weatherText.en;
    const [prediction, setPrediction] = useState(null);
    const [rawWeatherResponse, setRawWeatherResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const initFetch = async () => {
            if (lat && lon) {
                await fetchWeather(lat, lon, null, null, isMounted);
            } else if (district && state) {
                await fetchWeather(null, null, district, state, isMounted);
            } else if (district) {
                await fetchWeather(null, null, district, "Andhra Pradesh", isMounted);
            }
        };
        initFetch();
        return () => { isMounted = false; };
    }, [lat, lon, district, state]);

    useEffect(() => {
        if (rawWeatherResponse) {
            processWeatherData(rawWeatherResponse.rawData, rawWeatherResponse.dist);
        }
    }, [rawWeatherResponse, language]);

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

    const fetchWeather = async (latitude, longitude, dist, st, isMounted) => {
        if (!isMounted) return;
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) {
            setError(t.insufficientData);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s for weather

        try {
            let finalLat = latitude;
            let finalLon = longitude;

            if (!finalLat || !finalLon) {
                const geo = await geocodeLocation(dist, st, apiKey);
                if (!geo) throw new Error(t.insufficientData);
                finalLat = geo.lat;
                finalLon = geo.lon;
            }

            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${finalLat}&lat=${finalLat}&lon=${finalLon}&appid=${apiKey}&units=metric`;
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`${response.status}`);
            const rawData = await response.json();

            if (isMounted) setRawWeatherResponse({ rawData, dist: dist || district || "" });
        } catch (err) {
            clearTimeout(timeoutId);
            if (isMounted) setError(err.message);
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    const processWeatherData = (rawData, dist) => {
        try {
            const structuredArray = rawData.list.map(item => ({
                temp: item.main.temp,
                humidity: item.main.humidity,
                rainfall: item.rain?.["3h"] || 0,
                time: item.dt
            }));

            const features = extractFeatures(structuredArray);
            const currentMonth = new Date().getMonth() + 1; 

            const districtName = dist || district || "";
            const analysis = analyzeWeather(districtName, features, currentMonth, language);

            const advancedIntelligence = advancedSeasonPrediction(districtName, features, analysis, currentMonth);

            const farmerInsights = analysis.isHistoricalAvailable ? generateFarmerInsights({
                rainDeviationPercent: (analysis.comparison.rainRatio - 1) * 100,
                tempDeviation: analysis.comparison.tempDiff,
                humidityDeviation: analysis.comparison.humDiff
            }, language) : { summary: analysis.message };

            const dailyData = {};
            rawData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                const temp = item.main.temp;
                const rain = item.rain?.["3h"] || 0;
                const desc = item.weather[0].description.toLowerCase();

                const condition = getFarmerCondition(temp, rain, desc, t);

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
                summary: analysis.summary,
                risks: analysis.risks,
                district: districtName,
                features,
                farmerInsights,
                fiveDayForecast,
                weatherType: analysis.classification?.weatherType || "Normal"
            };

            setPrediction(weatherResult);

            if (onAnalysisComplete) {
                onAnalysisComplete({ ...weatherResult, triggerNext: false });
            }
        } catch (err) {
            console.error("Data processing failed", err);
        }
    };

    const { userName } = useApp();

    if (loading) return (
        <div className="p-10 flex flex-col items-center justify-center space-y-4 min-h-[40vh] bg-white text-center">
            <div className="w-10 h-10 border-4 border-[#1B5E20]/10 border-t-[#1B5E20] rounded-full animate-spin mx-auto" />
            <p className="text-[10px] font-black text-[#1B5E20]/40 uppercase tracking-[0.3em] italic">{t.analyzing}</p>
        </div>
    );

    if (error) return (
        <div className="p-8 text-center space-y-6 bg-white rounded-[2rem] border border-[#F1F8E9] max-w-xs mx-auto mt-20 shadow-xl italic tracking-tighter">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-2xl">⚠️</div>
            <div className="space-y-2">
               <p className="text-lg font-black text-slate-800 tracking-tight uppercase">Connection Issue</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Please check your internet and try again.</p>
            </div>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-[#F1F8E9] rounded-2xl text-[10px] font-black uppercase text-[#1B5E20] tracking-widest active:scale-95 transition-all">
                {t.retry}
            </button>
        </div>
    );

    if (!prediction) return null;

    return (
        <div className="w-full min-h-screen bg-white flex flex-col sm:max-w-md sm:mx-auto sm:shadow-2xl sm:my-4 sm:rounded-[3rem] animate-in fade-in duration-700 pb-6 px-4 space-y-4 overflow-y-auto relative">
            
            <div className="pt-8 pb-0 flex flex-col items-center justify-center w-full px-2 relative space-y-4">
                <button onClick={onBack} className="absolute left-2 top-8 p-3 bg-slate-50 rounded-2xl text-[#1B5E20] shadow-sm active:scale-95 transition-all z-10">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-xl font-black text-[#1B5E20] tracking-tight uppercase italic drop-shadow-sm bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-transparent bg-clip-text pb-1 pr-2">
                        {language === 'te' ? 'వాతావరణ నివేదిక' : 'Weather Report'}
                    </h1>
                    
                    <div className="mt-2 flex items-center justify-center bg-[#F1F8E9] px-6 py-2.5 rounded-full border border-[#1B5E20]/20 shadow-inner">
                        <h2 className="text-lg font-black text-[#1B5E20] tracking-tighter uppercase italic leading-none flex items-center gap-2">
                           <span>{language === 'te' ? '🙏' : '👋'}</span> 
                           {language === 'te' ? `నమస్తే, ${userName} గారు!` : `HI, ${userName}!`}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex justify-center -mt-4 mb-2">
                <div className="w-16 h-1 bg-[#1B5E20]/10 rounded-full" />
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4 overflow-hidden">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sprout size={18} className="text-[#1B5E20]" />
                        <h2 className="text-sm font-black text-[#1B5E20] uppercase tracking-[0.15em] italic">{t.seasonalTitleBrief}</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shadow-sm"><CloudRain size={18} /></div>
                                <span className="text-xs font-black text-[#1B5E20] uppercase tracking-widest leading-none">{t.rain}</span>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-base font-black text-[#1B5E20] uppercase italic leading-none">{getLabel(prediction?.summary?.rain, t)}</p>
                                <RenderDots level={prediction?.summary?.rain} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shadow-sm"><Thermometer size={18} /></div>
                                <span className="text-xs font-black text-[#1B5E20] uppercase tracking-widest leading-none">{t.heat}</span>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-base font-black text-[#1B5E20] uppercase italic leading-none">{getLabel(prediction?.summary?.heat, t)}</p>
                                <RenderDots level={prediction?.summary?.heat} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1B5E20] shadow-sm"><Droplets size={18} /></div>
                                <span className="text-xs font-black text-[#1B5E20] uppercase tracking-widest leading-none">{t.moisture}</span>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-base font-black text-[#1B5E20] uppercase italic leading-none">{getLabel(prediction?.summary?.moisture, t)}</p>
                                <RenderDots level={prediction?.summary?.moisture} />
                            </div>
                        </div>
                    </div>
                </div>

                {prediction.risks && prediction.risks.length > 0 && (
                    <div className="bg-white -mx-6 -mb-6 p-5 border-t border-[#1B5E20]/20 flex items-start gap-4 italic uppercase shadow-inner">
                        <div className="w-10 h-10 bg-[#F1F8E9] rounded-xl flex items-center justify-center text-[#1B5E20] shadow-sm border border-[#1B5E20]/10 shrink-0">
                            <AlertTriangle size={20} className="animate-pulse" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-[#1B5E20]/60 uppercase tracking-[0.2em]">
                                {language === 'te' ? 'ప్రాంతీయ హెచ్చరిక' : 'SITUATIONAL RISK'}
                            </p>
                            <p className="text-sm font-black text-[#1B5E20] leading-relaxed">{prediction.risks[0]}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F8E9] rounded-xl flex items-center justify-center text-[#1B5E20] shadow-sm">
                            <CalendarDays size={22} className="opacity-80" />
                        </div>
                        <h2 className="text-sm font-black text-[#1B5E20] uppercase tracking-[0.2em] italic">{t.next5days}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {prediction.fiveDayForecast.map((day, idx) => {
                            const dateObj = new Date((day?.dt || 0) * 1000);
                            const dayName = dateObj.toLocaleDateString(language === "te" ? "te-IN" : "en-IN", { weekday: 'short' });
                            return (
                                <div key={idx} className="bg-[#F1F8E9]/30 rounded-3xl py-3 px-4 shadow-inner border border-[#1B5E20]/5 transition-all active:scale-95 text-center flex flex-col items-center justify-center italic">
                                    <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-widest mb-1">{dayName}</p>
                                    <div className="text-2xl mb-1">{day?.icon || "🌤️"}</div>
                                    <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-tighter line-clamp-1">{day?.text || "Normal"}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white -mx-6 -mb-6 p-6 border-t border-[#1B5E20]/10 flex flex-col items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1B5E20] mb-3 shadow-sm border border-[#1B5E20]/10">
                        <Sprout size={20} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-[0.2em] mb-2">{t.adviceTitle}</p>
                        <p className="text-base font-black text-[#1B5E20] leading-tight italic tracking-tight opacity-90 uppercase">
                            "{prediction.farmerInsights?.summary}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="pb-4 pt-2">
                <button 
                    onClick={() => onAnalysisComplete && onAnalysisComplete({ ...prediction, triggerNext: true })}
                    className="w-full py-5 bg-[#1B5E20] text-white rounded-[2rem] text-xl font-black shadow-[0_15px_30px_rgba(27,94,32,0.3)] flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02] transition-all italic uppercase tracking-tighter"
                >
                    <span>{language === "te" ? "మట్టి ఎంపిక" : "Select Soil"}</span> 
                    <ArrowRight size={24} />
                </button>
            </div>

        </div>
    );
});

export default WeatherModule;
