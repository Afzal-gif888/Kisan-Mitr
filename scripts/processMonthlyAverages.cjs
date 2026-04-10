/**
 * ══════════════════════════════════════════════════════════════
 *  Monthly Averages Processor Script
 * ══════════════════════════════════════════════════════════════
 *  Reads raw NASA data → processes monthly averages → saves output.
 *
 *  Input:  src/data/rawNasaAPData.json
 *  Output: src/data/apMonthlyAverages.json
 *
 *  Usage: node scripts/processMonthlyAverages.cjs
 * ══════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

const START_YEAR = 2014;
const END_YEAR   = 2023;

const INPUT_FILE  = path.join(__dirname, '..', 'src', 'data', 'rawNasaAPData.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'apMonthlyAverages.json');

function log(e, m) { console.log(`  [${new Date().toLocaleTimeString()}]  ${e}  ${m}`); }

// ─── PROCESSING FUNCTIONS (mirrors src/utils/monthlyAverages.js) ───

function safeAvg(arr, decimals = 1) {
    const clean = arr.filter(v => v !== null && v !== undefined && v !== -999 && !isNaN(v));
    if (clean.length === 0) return null;
    return parseFloat((clean.reduce((a, b) => a + b, 0) / clean.length).toFixed(decimals));
}

function processDistrictMonthly(params) {
    const T2M         = params.T2M || {};
    const PRECTOTCORR = params.PRECTOTCORR || {};
    const RH2M        = params.RH2M || {};

    const buckets = {};
    for (let m = 1; m <= 12; m++) {
        buckets[String(m).padStart(2, '0')] = { temps: [], rains: [], hums: [] };
    }

    for (let year = START_YEAR; year <= END_YEAR; year++) {
        for (let month = 1; month <= 12; month++) {
            const apiKey  = `${year}${String(month).padStart(2, '0')}`;
            const monthKey = String(month).padStart(2, '0');

            const t = T2M[apiKey];
            const r = PRECTOTCORR[apiKey];
            const h = RH2M[apiKey];

            if (t !== undefined) buckets[monthKey].temps.push(t);
            if (r !== undefined) buckets[monthKey].rains.push(r);
            if (h !== undefined) buckets[monthKey].hums.push(h);
        }
    }

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

// ─── MAIN ──────────────────────────────────────────────────────

function main() {
    console.log("\n  ╔══════════════════════════════════════════════════════╗");
    console.log("  ║  Monthly Averages Processing Engine                ║");
    console.log("  ╚══════════════════════════════════════════════════════╝\n");

    // Step 1: Read raw data
    if (!fs.existsSync(INPUT_FILE)) {
        log("❌", `Input file not found: ${INPUT_FILE}`);
        log("💡", "Run 'node scripts/fetchRawNasaData.cjs' first.");
        process.exit(1);
    }

    log("📂", `Reading: ${INPUT_FILE}`);
    const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    const districtNames = Object.keys(rawData);
    log("📍", `Found ${districtNames.length} districts`);
    console.log("  " + "─".repeat(56));

    // Step 2: Process each district
    const output = {};
    const warnings = [];
    let success = 0;
    let failed = 0;

    for (const name of districtNames) {
        try {
            const params = rawData[name];

            // Validate structure
            if (!params.T2M || !params.PRECTOTCORR || !params.RH2M) {
                warnings.push(`${name}: Missing parameter(s)`);
            }

            const monthly = processDistrictMonthly(params);

            // Validate all 12 months
            const months = Object.keys(monthly);
            if (months.length !== 12) {
                warnings.push(`${name}: Only ${months.length}/12 months`);
            }

            // Check for null values
            for (const [mk, vals] of Object.entries(monthly)) {
                if (vals.temp === null || vals.rain === null || vals.humidity === null) {
                    warnings.push(`${name} [${mk}]: has null values`);
                }
            }

            output[name] = monthly;
            success++;

            // Log sample preview
            const jan = monthly["01"];
            const jul = monthly["07"];
            log("✅", `${name.padEnd(30)} Jan: ${jan.temp}°C ${jan.rain}mm ${jan.humidity}% │ Jul: ${jul.temp}°C ${jul.rain}mm ${jul.humidity}%`);

        } catch (err) {
            log("❌", `${name}: ${err.message}`);
            failed++;
        }
    }

    // Step 3: Warnings
    console.log("\n  " + "─".repeat(56));
    if (warnings.length > 0) {
        log("⚠️", `${warnings.length} warning(s):`);
        warnings.forEach(w => log("  •", w));
    } else {
        log("✅", "No warnings — all data clean");
    }

    // Step 4: Save output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

    // Step 5: Final report
    console.log("\n  ╔══════════════════════════════════════════════════════╗");
    console.log("  ║            PROCESSING COMPLETE                     ║");
    console.log("  ╚══════════════════════════════════════════════════════╝");
    log("📊", `Processed: ${success}/${districtNames.length} districts`);
    if (failed > 0) log("❌", `Failed: ${failed}`);
    log("💾", `Output: ${OUTPUT_FILE}`);
    log("📦", `Size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
    log("📅", `Period: ${START_YEAR}–${END_YEAR} (${END_YEAR - START_YEAR + 1} years averaged)`);

    // Validate final district count
    const finalCount = Object.keys(output).length;
    if (finalCount === 26) {
        log("✅", `All 26 districts present — dataset complete`);
    } else {
        log("⚠️", `Only ${finalCount}/26 districts — run raw fetch again`);
    }

    console.log("");
}

main();
