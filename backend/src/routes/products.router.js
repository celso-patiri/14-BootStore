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
//tem que pensar como as categorias vao ser classificadas e validadas
router.get("/category/:category", getProductsByCategory);

export default router;
