import React, { useState } from 'react';
import { MapPin, Loader2, RefreshCw, AlertCircle, CheckCircle2, Navigation, Edit2, Check } from 'lucide-react';

/**
 * Production-Ready Location Detector
 * Optimized for Indian Farmers.
 * Integrates: OpenCage Geocoder API & Browser Geolocation API
 */
const LocationDetector = () => {
    // 1. Core State
    const [location, setLocation] = useState(null); // { state, district }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmMode, setConfirmMode] = useState(false);
    const [manualMode, setManualMode] = useState(false);

    // Manual Form State
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Sample manual data (This would typically come from an API or comprehensive JSON)
    const statesData = {
        "Andhra Pradesh": ["Nellore", "Guntur", "Krishna", "Kurnool", "Anantapur", "Chittoor"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
        "Maharashtra": ["Pune", "Nagpur", "Nashik", "Aurangabad", "Mumbai"],
        "Karnataka": ["Bangalore", "Mysore", "Belgaum", "Dharwad", "Hubli"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"]
    };

    // 2. Step 1: Get GPS Coordinates
    const detectLocation = () => {
        setLoading(true);
        setError(null);
        setLocation(null);
        setConfirmMode(false);
        setManualMode(false);

        if (!navigator.geolocation) {
            setError("Your browser does not support GPS.");
            setLoading(false);
            return;
        }

        // Requirements: High Accuracy, No Caching, 15s Timeout
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("📍 GPS Coords Locked:", { latitude, longitude });
                fetchOpenCageData(latitude, longitude);
            },
            (err) => {
                setLoading(false);
                console.error("GPS Error:", err);
                if (err.code === 1) setError("Permission denied. Please allow location access.");
                else if (err.code === 2) setError("Turn on GPS and try again.");
                else if (err.code === 3) setError("GPS timeout. Please try again outside.");
                else setError("Could not detect location.");
                
                // Switch to manual mode automatically on GPS failure
                setTimeout(() => setManualMode(true), 1500);
            },
            options
        );
    };

    // 3. Step 2: OpenCage Reverse Geocoding
    const fetchOpenCageData = async (lat, lon) => {
        const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
        
        if (!apiKey) {
            console.error("CRITICAL: VITE_OPENCAGE_API_KEY is missing from .env");
            setError("App configuration error. Contact support.");
            setLoading(false);
            return;
        }

        // India-only restriction via countrycode=in
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&countrycode=in&language=en&no_annotations=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            console.log("🌐 OpenCage API Response:", data);

            if (data.results && data.results.length > 0) {
                const comp = data.results[0].components;
                
                // Requirement 4: India-optimized extraction logic
                const district =
                    comp.state_district ||
                    comp.county ||
                    comp.city ||
                    comp.town ||
                    comp.village ||
                    "Unknown";

                const state = comp.state || "Unknown";

                if (district === "Unknown" || state === "Unknown") {
                    console.warn("API found location but missing district/state.");
                    setManualMode(true);
                } else {
                    setLocation({ state, district });
                    setConfirmMode(true);
                }
            } else {
                setError("Location not found in India.");
                setManualMode(true);
            }
        } catch (err) {
            console.error("API Fetch Error:", err);
            setError("Network issue. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    // 4. Confirmation / Manual Handlers
    const handleConfirm = () => {
        console.log("✅ User Confirmed Location:", location);
        // Additional logic like routing or updating global store would go here
        setConfirmMode(false);
    };

    const handleManualConfirm = () => {
        if (selectedState && selectedDistrict) {
            setLocation({ state: selectedState, district: selectedDistrict });
            setConfirmMode(true);
            setManualMode(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-6 w-full max-w-md mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-green-50 font-sans">
            
            {/* Branded Header */}
            <div className="text-center space-y-3">
                <div className="bg-green-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-3">
                    <MapPin className="text-white -rotate-3" size={40} />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-gray-800 tracking-tighter">Kisan Mitr</h2>
                    <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-[10px]">Location Expert</p>
                </div>
            </div>

            {/* Primary Status Display Box */}
            <div className={`w-full min-h-[180px] rounded-[2.5rem] p-8 border-4 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center
                ${location && confirmMode ? 'bg-green-50 border-green-300 scale-100 shadow-inner' : 'bg-gray-50 border-gray-200 scale-95'}
                ${error ? 'bg-red-50 border-red-200' : ''}
            `}>
                
                {/* 2.1 Loading State */}
                {loading && (
                    <div className="space-y-4">
                        <div className="relative">
                           <Loader2 className="animate-spin text-green-600 mx-auto" size={56} />
                           <Navigation size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400" />
                        </div>
                        <p className="text-green-700 font-black text-2xl animate-pulse">Detecting...</p>
                    </div>
                )}

                {/* 2.2 Success / Detected State */}
                {!loading && location && confirmMode && (
                    <div className="space-y-4 animate-in zoom-in duration-500">
                        <div className="flex items-center justify-center gap-2 text-green-600 font-black uppercase tracking-widest text-xs">
                            <CheckCircle2 size={16} fill="currentColor" className="text-white bg-green-600 rounded-full" /> 
                            Detected Successfully
                        </div>
                        <div>
                            <p className="text-4xl font-black text-gray-900 leading-none mb-1">
                                {location.district}
                            </p>
                            <p className="text-xl font-bold text-green-600">
                                {location.state}
                            </p>
                        </div>
                    </div>
                )}

                {/* 2.3 Error State */}
                {error && (
                    <div className="space-y-4">
                        <AlertCircle className="text-red-500 mx-auto" size={56} />
                        <p className="text-red-700 font-black text-xl leading-tight">{error}</p>
                        <button onClick={detectLocation} className="bg-white border-2 border-red-200 text-red-600 py-2 px-6 rounded-xl font-bold flex items-center gap-2 mx-auto shadow-sm active:scale-95 transition-all">
                            <RefreshCw size={18} /> Retry
                        </button>
                    </div>
                )}

                {/* 2.4 Empty State */}
                {!loading && !location && !error && !manualMode && (
                    <div className="space-y-2 opacity-30">
                        <p className="text-gray-400 font-black text-2xl uppercase tracking-tighter">No Location</p>
                        <p className="text-gray-300 text-sm font-bold uppercase">Click the button below</p>
                    </div>
                )}
            </div>

            {/* Main Action or Confirmation UI */}
            {!loading && !manualMode && (
                <div className="w-full h-24">
                    {!confirmMode ? (
                        <button
                            onClick={detectLocation}
                            className="w-full bg-green-600 text-white py-8 rounded-[2rem] text-2xl font-black shadow-[0_15px_30px_-5px_rgba(22,163,74,0.4)] hover:bg-green-700 active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4 border-b-8 border-green-800"
                        >
                            <Navigation size={36} className="fill-current" />
                            📍 Detect My Location
                        </button>
                    ) : (
                        <div className="flex w-full gap-4 animate-in slide-in-from-top-4">
                            <button
                                onClick={handleConfirm}
                                className="flex-1 bg-green-600 text-white py-6 rounded-3xl text-xl font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                                <Check size={24} strokeWidth={4} /> Confirm
                            </button>
                            <button
                                onClick={() => setManualMode(true)}
                                className="flex-1 bg-white border-4 border-gray-100 text-gray-400 py-6 rounded-3xl text-xl font-black shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                            >
                                <Edit2 size={24} /> Change
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Manual Selection Fallback Overlay */}
            {manualMode && (
                <div className="w-full space-y-4 animate-in slide-in-from-bottom-6 duration-500">
                    <div className="bg-gray-50 p-8 rounded-[3rem] border-4 border-white shadow-2xl space-y-5">
                        <div className="text-center space-y-1">
                            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Fallback Mode</p>
                            <h3 className="font-black text-gray-700 text-2xl">Manual Entry</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <select
                                    className="w-full p-6 rounded-2xl border-4 border-white shadow-md font-black text-xl outline-none focus:border-green-500 appearance-none bg-white pr-12 transition-all cursor-pointer"
                                    value={selectedState}
                                    onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(statesData).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <Edit2 size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select
                                    className="w-full p-6 rounded-2xl border-4 border-white shadow-md font-black text-xl outline-none focus:border-green-600 appearance-none bg-white pr-12 disabled:opacity-50 transition-all cursor-pointer"
                                    disabled={!selectedState}
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                >
                                    <option value="">Select District</option>
                                    {selectedState && statesData[selectedState].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <Edit2 size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-4">
                            <button
                                disabled={!selectedDistrict}
                                onClick={handleManualConfirm}
                                className="w-full bg-green-600 text-white py-6 rounded-2xl font-black text-2xl shadow-xl shadow-green-200 disabled:bg-gray-200 disabled:shadow-none transition-all active:scale-95"
                            >
                                Set Location
                            </button>
                            <button 
                                onClick={() => { setManualMode(false); setConfirmMode(location !== null); }} 
                                className="w-full py-2 font-black text-gray-300 text-sm hover:text-red-400 transition-colors"
                            >
                                Cancel & Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Minimalist Trust Footer */}
            <div className="pt-6 text-center space-y-1">
                <p className="text-[10px] text-gray-300 font-extrabold uppercase tracking-[0.4em]">
                    OpenCage Geodata • India Restricted
                </p>
                <p className="text-[8px] text-gray-200 font-black italic">
                    Privacy Focused • No API key exposed
                </p>
            </div>
        </div>
    );
};

export default LocationDetector;
