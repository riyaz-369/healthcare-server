import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma.js";
import { fileUploader } from "../../../utils/fileUploader.js";

type SecureURL = {
  secure_url: string;
};

const createAdmin = async (req: any) => {
  if (req.file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      req.file
    )) as SecureURL;

    req.body.admin.profilePhoto = uploadToCloudinary.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: any) => {
  if (req.file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      req.file
    )) as SecureURL;

    req.body.doctor.profilePhoto = uploadToCloudinary.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdDoctorData = await tx.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};
export const userServices = {
  createAdmin,
  createDoctor,
};
