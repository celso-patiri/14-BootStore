import { Router } from "express";
import { validateToken, validateUserId } from "../middleware/auth.middleware.js";
import { postUserOrder, getOrdersFromUser } from "../controllers/orders.controller.js";
import { clearUserCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", validateToken, validateUserId, getOrdersFromUser);
router.post("/", validateToken, validateUserId, clearUserCart, postUserOrder);

export default router;
