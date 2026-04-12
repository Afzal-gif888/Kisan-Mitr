import { cropNameMapping } from "../data/cropNameMapping";

export const getAgmarknetName = (cropId: string, cropName: string) => {
  const normalizedId = cropId?.toLowerCase() || "";
  const normalizedName = cropName?.toLowerCase() || "";
  
  return cropNameMapping[normalizedId] || cropNameMapping[normalizedName] || cropName;
};
