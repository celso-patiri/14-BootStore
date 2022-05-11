import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/categories", getAllCategories);
router.get("/:productId", getProductById);
//tem que pensar como as categorias vao ser classificadas e validadas
router.get("/category/:category", getProductsByCategory);

export default router;
