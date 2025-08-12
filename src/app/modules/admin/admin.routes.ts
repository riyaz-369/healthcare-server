import { PrismaClient } from "@prisma/client";
import express, { type Request, type Response } from "express";
import { adminController } from "./admin.controller.js";

const router = express.Router();

router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getSingleAdmin);

export const adminRoutes = router;
