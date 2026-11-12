import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoute from "./src/routes/userRoute.js";
import todoRoute from "./src/routes/todoRoutes.js";

const app = express();

const port = process.env.PORT;

// Middlewars
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

// server running
app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});

// server error handel
app.use((err, res, req, next) => {
  const statusCode = err.stuatusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
