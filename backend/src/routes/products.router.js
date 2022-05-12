import { Router } from "express";
import {
    getProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/categories", getAllCategories);
router.get("/:productId", getProductById);
router.get("/category/:category", getProductsByCategory);

export default router;
