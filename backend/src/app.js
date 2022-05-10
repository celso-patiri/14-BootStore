import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Hello world"));

export default app;
