import prisma from "../../../utils/prisma.js";
import bcrypt from "bcrypt";
import type { LoginPayload } from "./auth.interface.js";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { UserStatus } from "@prisma/client";
import config from "../../../config/index.js";

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

  const accessToken = jwtHelper.generateToken(
    jwtPayloadData,
    config.jwt.jwt_secret,
    config.jwt.expires_in
  );
  const refreshToken = jwtHelper.generateToken(
    jwtPayloadData,
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in
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
    decodedData = jwtHelper.verifyToken(token, config.jwt.refresh_token_secret);
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
    config.jwt.jwt_secret,
    config.jwt.expires_in
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
