import { Router } from "express";
import {
    validateToken,
    validateUserBody,
    validateCredentials,
} from "../middleware/auth.middleware.js";
import { findUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/", validateToken, findUser);
router.put("/", validateToken, validateUserBody, updateUser);

export default router;
