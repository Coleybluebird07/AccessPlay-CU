import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import 'dotenv/config';
import authRouter from "./auth.js";
import gamesRouter from "./games.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/games", gamesRouter);

app.use((req, res) => res.status(404).json({ ok: false, error: "Not found" }));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Auth server listening on http://localhost:${port}`);
  });
}

export default app;