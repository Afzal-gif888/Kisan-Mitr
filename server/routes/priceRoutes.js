import express from "express";
import { fetchCropPriceFromGov } from "../services/priceService.js";

const router = express.Router();

const priceCache = {};

router.get("/:crop", async (req, res) => {
  const crop = req.params.crop ? req.params.crop.toLowerCase().trim() : "";
  
  if (priceCache[crop]) {
    return res.json(priceCache[crop]);
  }

  try {
    const data = await fetchCropPriceFromGov(crop);
    priceCache[crop] = data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

export default router;
