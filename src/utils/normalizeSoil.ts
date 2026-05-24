export const normalizeSoil = (soil: string): string => {
  const soilMap: Record<string, string[]> = {
    "Red Soil": ["Red Soil", "Red Sandy Soil", "Red Loamy Soil", "Deep Red Soil"],
    "Black Soil": ["Black Soil", "Black Cotton Soil", "Medium Black Soil", "Shallow Black Soil"],
    "Sandy Soil": ["Sandy Soil", "Coastal Sandy Soil"],
    "Alluvial Soil": ["Alluvial Soil", "Clay Soil", "Delta Alluvial Soil", "Silty Soil"],
    "Loamy Soil": ["Loamy Soil"],
    "Laterite Soil": ["Laterite Soil"],
    "Saline Soil": ["Saline Soil", "Alkaline Soil"],
    "Gravelly Soil": ["Gravelly Soil"]
  };

  for (const key in soilMap) {
    if (soilMap[key].some(s => s.toLowerCase() === soil.toLowerCase())) {
      return key;
    }
  }

  return soil;
};
