import { crops } from './src/data/crops';
import { apDistrictSoils } from './src/data/apDistrictSoils';
import { normalizeSoil } from './src/utils/normalizeSoil';

let allPassed = true;
const failed = [];

for (const [district, soils] of Object.entries(apDistrictSoils)) {
  for (const soil of soils) {
    const normSoil = normalizeSoil(soil);

    // Get crops for this district
    const districtCrops = crops.filter(c => c.districts.includes(district));
    
    // Filter by soil
    const matchedCrops = districtCrops.filter(c => 
      c.soils.some(cs => normalizeSoil(cs) === normSoil)
    );

    if (matchedCrops.length === 0) {
      allPassed = false;
      failed.push(`${district} + ${soil} (${normSoil})`);
    }
  }
}

if (allPassed) {
  console.log("SUCCESS: All combinations return at least 1 crop!");
} else {
  console.log("FAILED COMBINATIONS:");
  console.log(failed);
}
