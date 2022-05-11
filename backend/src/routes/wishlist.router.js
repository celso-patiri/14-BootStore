import { Router } from "express";
import { updateUserCart } from "../controllers/cart.controller.js";
import {
    clearUserWishlist,
    getWishlistByUserId,
    updateUserWishlist,
} from "../controllers/wishlist.controller.js";
import { validateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", validateToken, getWishlistByUserId);
router.put("/", validateToken, updateUserWishlist);
router.post("/addToCart", validateToken, clearUserWishlist, updateUserCart);

export default router;
