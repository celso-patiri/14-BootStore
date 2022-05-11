import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.router.js";
import productsRouter from "./routes/products.router.js";
import userRouter from "./routes/user.router.js";
import cartRouter from "./routes/cart.router.js";
import wishlistRouter from "./routes/wishlist.router.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Hello world"));
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

export default app;
