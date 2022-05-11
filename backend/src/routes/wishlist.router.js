import { Router } from "express";
import { updateUserCart } from "../controllers/cart.controller.js";
import {
    clearUserWishlist,
    getWishlistByUserId,
    updateUserWishlist,
} from "../controllers/wishlist.controller.js";
import { validateToken, validateUserId } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", validateToken, validateUserId, getWishlistByUserId);
router.put("/", validateToken, validateUserId, updateUserWishlist);
router.post("/addToCart", validateToken, validateUserId, clearUserWishlist, updateUserCart);

export default router;
