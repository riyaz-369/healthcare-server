import generateToken from "../../../utils/generateToken.js";
import prisma from "../../../utils/prisma.js";
import bcrypt from "bcrypt";
import type { LoginPayload } from "./auth.interface.js";
import jwt from "jsonwebtoken";

const logInUser = async (payload: LoginPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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

  const accessToken = generateToken(jwtPayloadData, "abcdefg", "5m");
  const refreshToken = generateToken(jwtPayloadData, "abcdefgh", "30d");

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, "abcdefgh");
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = generateToken(
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
