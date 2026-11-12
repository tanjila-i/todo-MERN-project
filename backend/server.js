import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";

const app = express();

const port = process.env.PORT;

// Middlewars

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// server running
app.listen(port, async () => {
  console.log(`server is running at http//localhost:${port}`);
});
