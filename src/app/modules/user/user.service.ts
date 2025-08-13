import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma.js";

const createAdmin = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const userServices = {
  createAdmin,
};
