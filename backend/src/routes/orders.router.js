import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import { postUserOrder, getOrdersFromUser } from "../controllers/orders.controller.js";
import { clearUserCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", validateToken, getOrdersFromUser);
router.post("/", validateToken, clearUserCart, postUserOrder);

export default router;
