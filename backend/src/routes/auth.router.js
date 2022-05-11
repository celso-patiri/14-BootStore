import { Router } from "express";

import {
    validateCredentials,
    validateEmailAvailable,
    validateSignInBody,
    validateUserBody,
} from "../middleware/auth.middleware.js";
import { createSession } from "../controllers/session.controller.js";
import { createUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signin", validateSignInBody, validateCredentials, createSession);
router.post("/signup", validateUserBody, validateEmailAvailable, createUser, createSession);

export default router;
