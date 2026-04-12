export const getCropPrice = async (cropName: string) => {
  try {
    // Calling our local Node.js backend to fetch secure market data
    const res = await fetch(`http://localhost:5000/api/prices/${cropName}`);
    const data = await res.json();

    return {
      price: data?.price || null,
      market: data?.market || null,
      district: data?.district || null
    };
  } catch (error) {
    console.warn(`[PRICING] Fetch failed for ${cropName}. Backend active?`);
    return {
      price: null,
      market: null
    };
  }
};
