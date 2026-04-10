import React, { useState, useEffect } from 'react';
import { Cloud, CheckCircle2, AlertCircle, Loader2, Gauge, Thermometer, Droplets, CloudRain, Calendar, Sun } from 'lucide-react';
import { extractFeatures } from "@/lib/FeatureExtraction";
import { predictSeason } from "@/lib/SeasonPredictor";

/**
 * WeatherModule
 * Responsible for fetching, cleaning, and structuring weather forecast data.
 * Now includes Feature Extraction and Seasonal Prediction.
 */
const WeatherModule = ({ lat, lon, onAnalysisComplete }) => {
    const [processedData, setProcessedData] = useState([]);
    const [features, setFeatures] = useState(null);
    const [season, setSeason] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (lat && lon) {
            fetchWeather(lat, lon);
        }
    }, [lat, lon]);

    const fetchWeather = async (latitude, longitude) => {
        setLoading(true);
        setError(null);
        
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        
        if (!apiKey || apiKey === "YOUR_OPENWEATHERMAP_API_KEY_HERE") {
            setError("OpenWeatherMap API Key is missing.");
            setLoading(false);
            return;
        }

        try {
            console.log("--- 🚀 FETCHING RAW WEATHER DATA ---");
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 401) throw new Error("Unauthorized: Invalid API Key.");
                throw new Error(`Service error: ${response.status}`);
            }
            
            const rawData = await response.json();
            console.log("📦 FULL API RESPONSE:", rawData);

            if (!rawData.list || rawData.list.length === 0) {
                throw new Error("No forecast data available for this location.");
            }

            // CLEAN AND STRUCTURE DATA
            const structuredArray = rawData.list.map(item => ({
                temp: item.main.temp,
                humidity: item.main.humidity,
                rainfall: item.rain?.["3h"] || 0,
                time: item.dt
            }));

            setProcessedData(structuredArray);

            // EXTRACT FEATURES
            const extracted = extractFeatures(structuredArray);
            setFeatures(extracted);

            // PREDICT SEASON
            const predicted = predictSeason(extracted);
            setSeason(predicted);

            // Emit results to parent
            if (onAnalysisComplete) {
                onAnalysisComplete({ features: extracted, season: predicted });
            }

        } catch (err) {
            console.error("❌ WEATHER FETCH FAILED:", err);
            setError(err.message || "Failed to load weather data");
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIC GATED UI ---

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-8 bg-card rounded-[2rem] border-4 border-primary/5 space-y-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-xl font-black text-muted-foreground animate-pulse">Fetching weather...</p>
        </div>
    );

    if (error) return (
        <div className="p-8 bg-red-50 rounded-[2rem] border-4 border-red-100 space-y-3 text-center">
            <AlertCircle className="mx-auto text-red-500" size={40} />
            <p className="text-red-700 font-black text-lg leading-tight uppercase tracking-tight">Failed to load weather data</p>
            <p className="text-red-500 font-bold text-sm bg-white/50 py-2 rounded-xl">{error}</p>
        </div>
    );

    if (!features) return null;

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-primary/5 space-y-8 animate-in zoom-in duration-500">
            {/* Status Header */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-3xl border-2 border-green-100">
                <CheckCircle2 className="text-green-500" size={32} />
                <p className="text-green-800 font-black text-lg tracking-tight">
                    Prediction Engine Online
                </p>
            </div>

            {/* Seasonal Prediction Box - PROMINENT */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-[2rem] p-8 shadow-xl relative overflow-hidden ring-4 ring-indigo-50">
                <Sun className="absolute -top-6 -right-6 text-white/10" size={140} />
                <div className="relative z-10 space-y-4 text-center">
                    <span className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-sm">
                        Calculated Season
                    </span>
                    <h3 className="text-4xl font-black text-white leading-none tracking-tight flex items-center justify-center gap-3">
                        <Calendar size={36} /> {season}
                    </h3>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-3xl border-2 border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                            <Thermometer size={28} />
                        </div>
                        <span className="font-black text-muted-foreground uppercase text-xs tracking-widest">Avg Temp</span>
                    </div>
                    <span className="text-2xl font-black text-foreground">{features.avgTemp}°C</span>
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-3xl border-2 border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                            <CloudRain size={28} />
                        </div>
                        <span className="font-black text-muted-foreground uppercase text-xs tracking-widest">Total Rainfall</span>
                    </div>
                    <span className="text-2xl font-black text-foreground">{features.totalRain} mm</span>
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-3xl border-2 border-transparent">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-2xl text-teal-600">
                            <Droplets size={28} />
                        </div>
                        <span className="font-black text-muted-foreground uppercase text-xs tracking-widest">Avg Humidity</span>
                    </div>
                    <span className="text-2xl font-black text-foreground">{features.avgHumidity}%</span>
                </div>
            </div>

            {/* Trend Analysis Section */}
            <div className="bg-primary/5 rounded-[2rem] p-6 space-y-4 border-2 border-primary/10">
                <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Gauge size={16} /> Atmospheric Trends
                </h4>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-primary/5">
                        <span className="font-bold text-gray-500">Temperature</span>
                        <span className={`font-black px-4 py-1 rounded-full text-xs uppercase ${
                            features.tempTrend === "Increasing" ? "bg-orange-500 text-white" : 
                            features.tempTrend === "Decreasing" ? "bg-blue-500 text-white" : "bg-gray-400 text-white"
                        }`}>
                            {features.tempTrend}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-primary/5">
                        <span className="font-bold text-gray-500">Rainfall</span>
                        <span className={`font-black px-4 py-1 rounded-full text-xs uppercase ${
                            features.rainTrend === "Increasing" ? "bg-blue-600 text-white" : 
                            features.rainTrend === "Decreasing" ? "bg-orange-400 text-white" : "bg-gray-400 text-white"
                        }`}>
                            {features.rainTrend}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="font-bold text-gray-500">Humidity</span>
                        <span className={`font-black px-4 py-1 rounded-full text-xs uppercase ${
                            features.humidityTrend === "Increasing" ? "bg-teal-600 text-white" : 
                            features.humidityTrend === "Decreasing" ? "bg-teal-200 text-teal-800" : "bg-gray-400 text-white"
                        }`}>
                            {features.humidityTrend}
                        </span>
                    </div>
                </div>
            </div>

            {/* Technical Metadata Footer */}
            <div className="pt-2 text-center">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                    {processedData.length} Points Analyzed • Engine: SeasonPredictor v1.2
                </p>
            </div>
        </div>
    );
};

export default WeatherModule;
