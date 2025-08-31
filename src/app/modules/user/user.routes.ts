import express from "express";
import { userController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../utils/fileUploader.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  fileUploader.uploadToCloudinary,
  userController.createAdmin
);

export const userRoutes = router;
