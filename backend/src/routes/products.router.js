import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import {
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", validateToken, getAllProducts);
router.get("/categories", validateToken, getAllCategories);
router.get("/:productId", validateToken, getProductById);

//tem que pensar como as categorias vao ser classificadas e validadas
router.get("/category/:category", validateToken, getProductsByCategory);

export default router;
