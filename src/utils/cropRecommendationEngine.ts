import cropsMaster from "../data/apCropsMaster.json";
import districtSoilMap from "../data/apDistrictSoilMap.json";

/**
 * PRODUCTION-GRADE CROP RECOMMENDATION ENGINE (v9.1)
 * Strictly following the 11-step Production Filter blueprint.
 */
export const getAPCropRecommendations = (weatherResult: any, selectedSoil: string, districtName: string, language = "en") => {
  if (!weatherResult || !districtName) return { recommendedCrops: [], disclaimer: "" };

  const { features } = weatherResult;
  const temp = parseFloat(features?.avgTemp || "28");
  const rain = parseFloat(features?.avgRain || "300");

  // --- STEP 2: SEASON DETECTION ---
  const month = new Date().getMonth() + 1;
  let season = "zaid";
  if (month >= 6 && month <= 10) season = "kharif";
  else if (month >= 11 || month <= 2) season = "rabi";
  else season = "zaid";

  // Optional NASA rainy trend (Step 2)
  if (rain > 600) season = "kharif";
  else if (temp < 20) season = "rabi";
  else if (temp > 35 && rain < 50) season = "zaid";

  // --- STEP 3: WEATHER CLASSIFICATION ---
  let weatherType = "normal";
  if (temp > 35) weatherType = "hot";
  else if (rain > 60) weatherType = "rainy";
  else if (temp < 20) weatherType = "cold";
  else weatherType = "normal";

  // --- NORMALIZE LOOKUP ---
  const formattedDistrict = districtName.trim().toLowerCase();
  const normalizedMap = Object.fromEntries(
    Object.entries(districtSoilMap).map(([k, v]) => [k.toLowerCase(), v])
  );
  const availableSoils = normalizedMap[formattedDistrict] || [];

  // --- STEP 4 & 5 & 7: STRICT FILTER & SCORING ---
  const filteredCrops = cropsMaster
    .map((crop: any) => {
      let score = 0;
      
      // A. SOIL MATCH (+40) - Step 5 Multi-Soil Support
      const districtSoilMatch = crop.soils.some((s: string) => availableSoils.includes(s));
      const userSoilMatch = selectedSoil && crop.soils.some((s: string) => s.toLowerCase().includes(selectedSoil.toLowerCase()));
      const soilMatch = districtSoilMatch || userSoilMatch;
      if (soilMatch) score += 40;

      // B. WEATHER MATCH (+30)
      const weatherMatch = crop.weather.includes(weatherType);
      if (weatherMatch) score += 30;

      // C. DISTRICT MATCH (+20)
      const districtMatch = crop.districts.some((d: string) => d.toLowerCase() === formattedDistrict);
      if (districtMatch) score += 20;

      // D. SEASON MATCH (+30)
      const seasonMatch = crop.seasons.includes(season);
      if (seasonMatch) score += 30;

      // --- STEP 4 & 6: STRICT FILTER (NO FALLBACK) ---
      if (!soilMatch || !weatherMatch || !districtMatch || !seasonMatch) {
          return null;
      }

      // STEP 10: UI LABELS
      const suitability = score >= 115 ? "🥇 Best Match" : score >= 100 ? "🥈 Good Match" : "🥉 Suitable";
      const teSuitability = score >= 115 ? "🥇 అత్యంత అనుకూలం" : score >= 100 ? "🥈 మంచి దిగుబడి" : "🥉 అనుకూలమైనది";

      return {
        id: crop.id,
        englishName: crop.name.en,
        teluguName: crop.name.te,
        image: crop.image,
        score,
        suitabilityLabel: language === "te" ? teSuitability : suitability,
        details: crop.details,
        reason: language === "te" ? `ఈ ప్రాంతంలోని ${season} కాలానికి తగినది` : `Strict match for ${season} season in ${districtName}`,
        waterNeed: crop.details.water,
        heatTolerance: weatherType
      };
    })
    .filter(c => c !== null)
    .sort((a, b) => b!.score - a!.score);

  // --- STEP 8: DEBUG LOG ---
  console.log("--- PRODUCTION ENGINE DEBUG ---", {
    district: districtName,
    soil: selectedSoil,
    weather: weatherType,
    season: season,
    results: filteredCrops.map(c => c!.englishName)
  });

  return {
    recommendedCrops: filteredCrops,
    disclaimer: language === "te" ? "శాస్త్రీయ డేటా ఆధారంగా." : "Production-level scientific analysis.",
    weatherTypeDetected: weatherType,
    seasonDetected: season,
    districtSoils: availableSoils,
    districtName
  };
};
