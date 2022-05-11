import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware.js";
import { findUser, validateUserBody, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", validateToken, findUser);
router.put("/", validateToken, validateUserBody, updateUser);

export default router;
