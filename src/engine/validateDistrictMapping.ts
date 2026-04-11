import cropsMaster from '../data/apCropsMaster.json';
import districtMapping from '../data/apDistrictCropMapping.json';

// Comprehensive list of all modern 26 AP districts
const ALL_AP_DISTRICTS = [
  "Anantapur", "Sri Sathya Sai", "Kurnool", "Nandyal", "Chittoor", "Tirupati", "YSR Kadapa", "Annamayya",
  "Nellore", "Prakasam", "Bapatla", "Palnadu", "Guntur", "NTR", "Krishna", "Eluru", "West Godavari",
  "East Godavari", "Kakinada", "Konaseema", "Alluri Sitharama Raju", "Anakapalli", "Visakhapatnam",
  "Vizianagaram", "Parvathipuram Manyam", "Srikakulam"
];

const MAJOR_DISTRICTS_ONLY = [
  "Anantapur", "Chittoor", "YSR Kadapa", "Kurnool",
  "Srikakulam", "Vizianagaram", "Visakhapatnam",
  "East Godavari", "West Godavari",
  "Krishna", "Guntur", "Prakasam", "Nellore"
];

export const validateDistrictMapping = () => {
  console.log("%c--- CROP MAPPING VALIDATION START ---", "color: #8B5E3C; font-weight: bold;");

  const results = {
    totalCrops: cropsMaster.length,
    mappedCrops: 0,
    unmappedCrops: [] as string[],
    unknownDistricts: [] as string[],
    emptyDistricts: [] as string[],
    duplicates: [] as { district: string, crop: string }[]
  };

  // 1. Check for Unmapped Crops
  const allMappedCrops = new Set<string>();
  Object.values(districtMapping).forEach((crops: string[]) => {
    crops.forEach(c => allMappedCrops.add(c));
  });

  cropsMaster.forEach(crop => {
    if (allMappedCrops.has(crop.id)) {
      results.mappedCrops++;
    } else {
      results.unmappedCrops.push(crop.id);
    }
  });

  // 2. Check for Unknown District Entries (Is it a real AP district?)
  const currentDistricts = Object.keys(districtMapping);
  currentDistricts.forEach(d => {
    if (!ALL_AP_DISTRICTS.includes(d)) {
      results.unknownDistricts.push(d);
    }
  });

  // 3. Check for Empty District Mappings
  currentDistricts.forEach(d => {
    if ((districtMapping as any)[d].length === 0) {
      results.emptyDistricts.push(d);
    }
  });

  // 4. Check for Duplicates
  currentDistricts.forEach(d => {
    const crops = (districtMapping as any)[d];
    const seen = new Set();
    crops.forEach((c: string) => {
      if (seen.has(c)) {
        results.duplicates.push({ district: d, crop: c });
      }
      seen.add(c);
    });
  });

  // Print Report
  console.log(`✔ Total crops: ${results.totalCrops}`);
  console.log(`✔ Mapped crops: ${results.mappedCrops}`);
  if (results.unmappedCrops.length > 0) {
    console.error(`❌ Unmapped crops: [${results.unmappedCrops.join(", ")}]`);
  } else {
    console.log("✔ No unmapped crops found.");
  }

  if (results.unknownDistricts.length > 0) {
    console.error(`❌ Unknown/Typos in districts: [${results.unknownDistricts.join(", ")}]`);
  } else {
    console.log("✔ All district keys are valid AP districts.");
  }

  if (results.emptyDistricts.length > 0) {
    console.warn(`⚠️ Empty districts found: [${results.emptyDistricts.join(", ")}]`);
  }

  if (results.duplicates.length > 0) {
      console.warn(`⚠️ Found ${results.duplicates.length} duplicate crop entries in districts.`);
  }

  console.log("%c--- VALIDATION END ---", "color: #8B5E3C; font-weight: bold;\n");

  return results;
};
