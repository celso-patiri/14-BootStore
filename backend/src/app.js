import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.router.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Hello world"));
app.use("/auth", authRouter);

export default app;
