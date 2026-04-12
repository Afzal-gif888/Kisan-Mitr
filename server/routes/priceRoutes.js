import express from "express";
import { fetchCropPriceFromGov } from "../services/priceService.js";

const router = express.Router();

router.get("/:crop", async (req, res) => {
  const crop = req.params.crop;

  const data = await fetchCropPriceFromGov(crop);

  res.json(data);
});

export default router;
