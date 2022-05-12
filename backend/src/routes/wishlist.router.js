import { Router } from "express";
import { updateUserCart } from "../controllers/cart.controller.js";
import {
    validateWishlistBody,
    getWishlistByUserId,
    updateUserWishlist,
} from "../controllers/wishlist.controller.js";
import { validateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.put("/", validateToken, validateWishlistBody, updateUserWishlist); // OK
router.get("/", validateToken, getWishlistByUserId); // OK
router.post("/addToCart", validateToken, updateUserCart);

export default router;
