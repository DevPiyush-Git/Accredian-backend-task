/** @format */

import { Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";

const router = Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);

export default router;
