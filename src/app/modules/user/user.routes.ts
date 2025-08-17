import express from "express";
import { userController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", auth("ADMIN, SUPER_ADMIN"), userController.createAdmin);

export const userRoutes = router;
