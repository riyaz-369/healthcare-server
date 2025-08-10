import { PrismaClient } from "@prisma/client";
import express, { type Request, type Response } from "express";
import { adminController } from "./admin.controller.js";

const router = express.Router();

router.get("/", adminController.getAllAdminsFromDB);

export const adminRoutes = router;
