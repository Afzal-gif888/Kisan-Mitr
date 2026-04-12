import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import priceRoutes from "./routes/priceRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/prices", priceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📡 Kisan-Mitr Pricing Server running on port ${PORT}`);
});
