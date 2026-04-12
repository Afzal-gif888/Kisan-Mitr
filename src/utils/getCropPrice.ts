const priceCache: Record<string, any> = {};

export const getCropPrice = async (cropName: string) => {
  if (!cropName) return { price: null, market: null };
  
  const normalizedName = cropName.toLowerCase().trim();
  if (priceCache[normalizedName]) return priceCache[normalizedName];

  try {
    const res = await fetch(`http://localhost:5000/api/prices/${normalizedName}`);
    if (!res.ok) throw new Error("API failed");
    
    const data = await res.json();
    const result = {
      price: data?.price || null,
      market: data?.market || null,
      district: data?.district || null
    };

    priceCache[normalizedName] = result;
    return result;
  } catch (error) {
    return { price: null, market: null };
  }
};
