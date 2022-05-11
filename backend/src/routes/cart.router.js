import { Router } from "express";
import { validateToken, validateUserId } from "../middleware/auth.middleware.js";
import { getCartByUserId, updateUserCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", validateToken, validateUserId, getCartByUserId);
router.put("/", validateToken, validateUserId, updateUserCart);

export default router;
