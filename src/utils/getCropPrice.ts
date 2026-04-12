import { getCachedPrice, setCachedPrice } from "./priceCache";

export const getCropPrice = async (cropName: string) => {
  if (!cropName) return { price: null, market: null };
  const normalizedName = cropName.toLowerCase().trim();
  
  const cached = getCachedPrice(normalizedName);
  if (cached) return cached;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`http://localhost:5000/api/prices/${normalizedName}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("API failed");
    
    const data = await res.json();
    const result = {
      price: data?.price || null,
      market: data?.market || null,
      district: data?.district || null
    };

    setCachedPrice(normalizedName, result);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    return { price: null, market: null };
  }
};
