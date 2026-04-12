const priceCache: Record<string, any> = {};

export const getCachedPrice = (key: string) => {
  return priceCache[key.toLowerCase().trim()];
};

export const setCachedPrice = (key: string, value: any) => {
  priceCache[key.toLowerCase().trim()] = value;
};
