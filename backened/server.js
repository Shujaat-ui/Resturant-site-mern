import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes import
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Middlewares
app.use(express.json());

// Debug middleware (for checking requests)
app.use((req, res, next) => {
  console.log("👉 Incoming Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// API routes
app.use("/api/v1/reservation", reservationRoutes);

// ===== Serve React frontend =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));

// ✅ Fixed fallback route (no more error)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
