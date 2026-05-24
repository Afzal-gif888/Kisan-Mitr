import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import priceRoutes from "./routes/priceRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/prices", priceRoutes);

// 🛠️ DEFINE PRODUCTION PATHS
const distPath = path.resolve(__dirname, "../dist");

// 🛠️ SERVE ASSETS EXPLICITLY FIRST
app.use("/assets", express.static(path.join(distPath, "assets"), {
  maxAge: "1y",
  immutable: true
}));

// 🛠️ SERVE REMAINING STATIC FILES
app.use(express.static(distPath));

// 🛠️ SPA CATCH-ALL
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`📡 Kisan-Mitr Production Server running on http://0.0.0.0:${PORT}`);
});


