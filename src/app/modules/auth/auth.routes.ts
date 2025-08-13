import express from "express";
import { authController } from "./auth.controller.js";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;
