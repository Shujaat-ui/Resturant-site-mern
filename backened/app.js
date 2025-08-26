import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// ✅ abhi ke liye sab origins allow (Postman/curl test ke liye)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRoutes);

// DB connect
dbConnection();

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Express App!");
});

// Error handling
app.use(errorMiddleware);

export default app;
