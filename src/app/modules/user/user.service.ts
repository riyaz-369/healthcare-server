import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma.js";
import { fileUploader } from "../../../utils/fileUploader.js";
import type { SearchQuery } from "../admin/admin.service.js";
import { calculatePagination } from "../../../utils/paginationHelper.js";
import { userSearchableFields } from "./user.constant.js";

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

const createPatient = async (req: any) => {
  if (req.file) {
    const uploadToCloudinary = (await fileUploader.uploadToCloudinary(
      req.file
    )) as SecureURL;

    req.body.patient.profilePhoto = uploadToCloudinary.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdPatientData = await tx.patient.create({
      data: req.body.patient,
    });

    return createdPatientData;
  });

  return result;
};

const getAllUsersFromDB = async ({
  searchableFields,
  options,
}: SearchQuery) => {
  const { searchTerm, ...restParams } = searchableFields;
  const { take, skip, orderBy, page } = calculatePagination(options);

  const andConditions = [];

  if (searchableFields.searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchableFields.searchTerm as string,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(restParams).length > 0) {
    andConditions.push({
      AND: Object.keys(restParams).map((key) => ({
        [key]: {
          equals: restParams[key],
          mode: "insensitive",
        },
      })),
    });
  }

  //   console.dir(andConditions, { depth: "infinite" });

  const whereConditions: Record<string, unknown> = {
    AND: andConditions,
  };

  //   console.dir(whereConditions, { depth: "infinite" });

  try {
    const result = await prisma.user.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy,
    });

    const total = await prisma.user.count({
      where: whereConditions,
    });

    return {
      meta: {
        page,
        limit: skip,
        total,
      },
      data: result,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsersFromDB,
};
