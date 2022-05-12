import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import { getCartByUserId, updateUserCart, validateCartBody } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", validateToken, getCartByUserId);
router.put("/", validateToken, validateCartBody, updateUserCart);

export default router;
