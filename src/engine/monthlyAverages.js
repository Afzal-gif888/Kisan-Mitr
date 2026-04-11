/**
 * ══════════════════════════════════════════════════════════════
 *  Monthly Averages Processing Engine
 * ══════════════════════════════════════════════════════════════
 *
 *  Converts raw NASA POWER data (year-month keyed) into clean
 *  monthly averages (01–12) for each district.
 *
 *  Reusable both in:
 *    - Node.js scripts (import/require)
 *    - Frontend components (import)
 *
 *  Function: processMonthlyAverages(rawData)
 * ══════════════════════════════════════════════════════════════
 */

const START_YEAR = 2014;
const END_YEAR   = 2023;

/**
 * Safely compute the average of a numeric array.
 * Filters out nulls, undefined, and NASA's -999 sentinel values.
 * @param {number[]} arr 
 * @param {number} decimals - decimal places to round to
 * @returns {number|null}
 */
function safeAvg(arr, decimals = 1) {
    const clean = arr.filter(v => v !== null && v !== undefined && v !== -999 && !isNaN(v));
    if (clean.length === 0) return null;
    const sum = clean.reduce((a, b) => a + b, 0);
    return parseFloat((sum / clean.length).toFixed(decimals));
}

/**
 * Process a single district's raw NASA parameters into monthly averages.
 *
 * @param {{ T2M: Object, PRECTOTCORR: Object, RH2M: Object }} params
 * @returns {{ [month: string]: { temp: number, rain: number, humidity: number } }}
 */
function processDistrictMonthly(params) {
    const T2M         = params.T2M || {};
    const PRECTOTCORR = params.PRECTOTCORR || {};
    const RH2M        = params.RH2M || {};

    // Initialize buckets for each calendar month (01–12)
    const buckets = {};
    for (let m = 1; m <= 12; m++) {
        const key = String(m).padStart(2, '0');
        buckets[key] = { temps: [], rains: [], hums: [] };
    }

    // Iterate over every year-month combination
    for (let year = START_YEAR; year <= END_YEAR; year++) {
        for (let month = 1; month <= 12; month++) {
            const apiKey  = `${year}${String(month).padStart(2, '0')}`;
            const monthKey = String(month).padStart(2, '0');

            // Extract values (skip NASA's annual summary keys like "201413")
            const t = T2M[apiKey];
            const r = PRECTOTCORR[apiKey];
            const h = RH2M[apiKey];

            if (t !== undefined) buckets[monthKey].temps.push(t);
            if (r !== undefined) buckets[monthKey].rains.push(r);
            if (h !== undefined) buckets[monthKey].hums.push(h);
        }
    }

    // Compute averages
    const result = {};
    for (let m = 1; m <= 12; m++) {
        const key = String(m).padStart(2, '0');
        const b = buckets[key];

        result[key] = {
            temp:     safeAvg(b.temps, 1),
            rain:     safeAvg(b.rains, 2),
            humidity: safeAvg(b.hums, 1),
        };
    }

    return result;
}

/**
 * Process the entire raw dataset (all districts) into monthly averages.
 *
 * @param {Object} rawData - { districtName: { T2M: {...}, PRECTOTCORR: {...}, RH2M: {...} } }
 * @returns {{ data: Object, stats: { total: number, success: number, failed: string[], warnings: string[] } }}
 */
export function processMonthlyAverages(rawData) {
    const result = {};
    const stats = {
        total: 0,
        success: 0,
        failed: [],
        warnings: [],
    };

    const districtNames = Object.keys(rawData);
    stats.total = districtNames.length;

    for (const name of districtNames) {
        try {
            const params = rawData[name];

            // Validate that all 3 parameters exist
            if (!params.T2M || !params.PRECTOTCORR || !params.RH2M) {
                stats.warnings.push(`${name}: Missing one or more parameters`);
            }

            const monthly = processDistrictMonthly(params);

            // Validate: all 12 months should have data
            const months = Object.keys(monthly);
            if (months.length !== 12) {
                stats.warnings.push(`${name}: Only ${months.length}/12 months processed`);
            }

            // Check for null values
            for (const [mk, vals] of Object.entries(monthly)) {
                if (vals.temp === null) stats.warnings.push(`${name} month ${mk}: null temp`);
                if (vals.rain === null) stats.warnings.push(`${name} month ${mk}: null rain`);
                if (vals.humidity === null) stats.warnings.push(`${name} month ${mk}: null humidity`);
            }

            result[name] = monthly;
            stats.success++;

        } catch (err) {
            stats.failed.push(`${name}: ${err.message}`);
        }
    }

    return { data: result, stats };
}

/**
 * Get the monthly average for a specific district and month.
 * Useful for frontend lookups.
 *
 * @param {Object} processedData - The full processed dataset
 * @param {string} district - District name
 * @param {number} month - Month number (1–12)
 * @returns {{ temp: number, rain: number, humidity: number } | null}
 */
export function getMonthlyData(processedData, district, month) {
    const mk = String(month).padStart(2, '0');
    return processedData?.[district]?.[mk] || null;
}

/**
 * Get all 12 months of data for a specific district.
 *
 * @param {Object} processedData
 * @param {string} district
 * @returns {Object|null}
 */
export function getDistrictData(processedData, district) {
    return processedData?.[district] || null;
}

/**
 * Compare current weather features against historical averages.
 * Returns deviation percentages for each parameter.
 *
 * @param {Object} processedData - Processed monthly averages
 * @param {string} district - District name
 * @param {number} month - Current month (1–12)
 * @param {{ avgTemp: string, totalRain: string, avgHumidity: string }} currentFeatures
 * @returns {{ tempDev: number, rainDev: number, humDev: number, isAnomaly: boolean }}
 */
export function compareWithHistorical(processedData, district, month, currentFeatures) {
    const historical = getMonthlyData(processedData, district, month);
    if (!historical) return null;

    const currTemp = parseFloat(currentFeatures.avgTemp);
    const currRain = parseFloat(currentFeatures.totalRain);
    const currHum  = parseFloat(currentFeatures.avgHumidity);

    const deviation = (curr, hist) => {
        if (!hist || hist === 0) return 0;
        return parseFloat(((curr - hist) / hist * 100).toFixed(1));
    };

    const tempDev = deviation(currTemp, historical.temp);
    const rainDev = deviation(currRain, historical.rain);
    const humDev  = deviation(currHum, historical.humidity);

    // Flag as anomaly if any parameter deviates > 30%
    const isAnomaly = Math.abs(tempDev) > 30 || Math.abs(rainDev) > 50 || Math.abs(humDev) > 30;

    return { tempDev, rainDev, humDev, isAnomaly };
}
