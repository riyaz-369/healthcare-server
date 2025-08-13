import prisma from "../../../utils/prisma.js";
import bcrypt from "bcrypt";
import type { LoginPayload } from "./auth.interface.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { UserStatus } from "@prisma/client";

const logInUser = async (payload: LoginPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect email or password");
  }

  const jwtPayloadData = {
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelper.generateToken(jwtPayloadData, "abcdefg", "5m");
  const refreshToken = jwtHelper.generateToken(
    jwtPayloadData,
    "abcdefgh",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, "abcdefgh");
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData?.needPasswordChange,
  };
};

export const authService = {
  logInUser,
  refreshToken,
};
