import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { userController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../utils/fileUploader.js";
import { userValidation } from "./user.validation.js";

const router = express.Router();

router.get("/", userController.getAllPatients);

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.CreateAdminSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctorSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientSchema.parse(
      JSON.parse(req.body.data)
    );
    return userController.createPatient(req, res, next);
  }
);

export const userRoutes = router;
