/**
 * ══════════════════════════════════════════════════════════════
 *  NASA POWER — Raw Data Fetcher (Saves unprocessed API data)
 * ══════════════════════════════════════════════════════════════
 *  Fetches raw monthly parameter data (T2M, PRECTOTCORR, RH2M)
 *  for all 26 AP districts and saves it without any processing.
 *
 *  Output: src/data/rawNasaAPData.json
 *  Usage:  node scripts/fetchRawNasaData.cjs
 * ══════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

const AP_DISTRICTS = {
    "Alluri Sitharama Raju": { lat: 18.327, lon: 82.880 },
    "Anakapalli":            { lat: 17.691, lon: 83.003 },
    "Anantapur":             { lat: 14.6819, lon: 77.6006 },
    "Annamayya":             { lat: 14.4673, lon: 78.8242 },
    "Bapatla":               { lat: 15.904, lon: 80.467 },
    "Chittoor":              { lat: 13.2172, lon: 79.1003 },
    "East Godavari":         { lat: 16.9891, lon: 81.7787 },
    "Eluru":                 { lat: 16.7107, lon: 81.0952 },
    "Guntur":                { lat: 16.3067, lon: 80.4365 },
    "Kakinada":              { lat: 16.9891, lon: 82.2475 },
    "Konaseema":             { lat: 16.435, lon: 82.013 },
    "Krishna":               { lat: 16.5062, lon: 80.6480 },
    "Kurnool":               { lat: 15.8281, lon: 78.0373 },
    "Nandyal":               { lat: 15.478, lon: 78.483 },
    "NTR":                   { lat: 16.5062, lon: 80.6480 },
    "Palnadu":               { lat: 16.213, lon: 79.999 },
    "Parvathipuram Manyam":  { lat: 18.783, lon: 83.425 },
    "Prakasam":              { lat: 15.5057, lon: 80.0499 },
    "Sri Potti Sriramulu Nellore": { lat: 14.4426, lon: 79.9865 },
    "Sri Sathya Sai":        { lat: 14.165, lon: 77.807 },
    "Srikakulam":            { lat: 18.2949, lon: 83.8938 },
    "Tirupati":              { lat: 13.6288, lon: 79.4192 },
    "Visakhapatnam":         { lat: 17.6868, lon: 83.2185 },
    "Vizianagaram":          { lat: 18.1067, lon: 83.3956 },
    "West Godavari":         { lat: 16.7107, lon: 81.0952 },
    "YSR Kadapa":            { lat: 14.4673, lon: 78.8242 },
};

const BASE_URL   = "https://power.larc.nasa.gov/api/temporal/monthly/point";
const PARAMETERS = "T2M,PRECTOTCORR,RH2M";
const START_YEAR = 2014;
const END_YEAR   = 2023;

const OUTPUT_DIR  = path.join(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'rawNasaAPData.json');

const MAX_RETRIES    = 3;
const RETRY_DELAY_MS = 4000;
const BATCH_SIZE     = 4;
const BATCH_DELAY_MS = 3000;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function log(e, m) { console.log(`  [${new Date().toLocaleTimeString()}]  ${e}  ${m}`); }

async function fetchDistrict(name, lat, lon, attempt = 1) {
    const url = `${BASE_URL}?parameters=${PARAMETERS}&community=AG&longitude=${lon}&latitude=${lat}&start=${START_YEAR}&end=${END_YEAR}&format=JSON`;
    log("🛰️", `[${attempt}/${MAX_RETRIES}] ${name}`);

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json.properties?.parameter) throw new Error("Bad structure");
        log("✅", `${name} — OK`);
        return json.properties.parameter;
    } catch (err) {
        log("⚠️", `${name} — ${err.message}`);
        if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY_MS);
            return fetchDistrict(name, lat, lon, attempt + 1);
        }
        log("❌", `${name} — FAILED`);
        return null;
    }
}

async function main() {
    console.log("\n  ╔══════════════════════════════════════════════════════╗");
    console.log("  ║  NASA POWER — Raw Data Extraction (26 Districts)   ║");
    console.log("  ╚══════════════════════════════════════════════════════╝\n");

    const entries = Object.entries(AP_DISTRICTS);
    const rawData = {};
    let ok = 0, fail = 0;

    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
        const batch = entries.slice(i, i + BATCH_SIZE);
        log("📦", `Batch ${Math.floor(i / BATCH_SIZE) + 1} — ${batch.map(b => b[0]).join(", ")}`);

        const results = await Promise.all(
            batch.map(async ([name, { lat, lon }]) => {
                const raw = await fetchDistrict(name, lat, lon);
                return { name, raw };
            })
        );

        for (const { name, raw } of results) {
            if (raw) { rawData[name] = raw; ok++; }
            else fail++;
        }

        if (i + BATCH_SIZE < entries.length) {
            log("⏳", `Cooling ${BATCH_DELAY_MS / 1000}s...`);
            await sleep(BATCH_DELAY_MS);
        }
    }

    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rawData, null, 2), 'utf-8');

    console.log("\n  ╔══════════════════════════════════════════════════════╗");
    console.log("  ║              RAW DATA SAVED                        ║");
    console.log("  ╚══════════════════════════════════════════════════════╝");
    log("✅", `Success: ${ok}/${entries.length}`);
    if (fail) log("❌", `Failed: ${fail}`);
    log("💾", `File: ${OUTPUT_FILE}`);
    log("📦", `Size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
    console.log("");
}

main().catch(e => { log("💥", e.message); process.exit(1); });
