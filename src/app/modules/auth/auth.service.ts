import prisma from "../../../utils/prisma.js";
import bcrypt from "bcrypt";
import type { LoginPayload } from "./auth.interface.js";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { UserStatus, type User } from "@prisma/client";
import config from "../../../config/index.js";
import emailSender from "./emailSender.js";
import ApiError from "../../errors/apiError.js";
import HttpStatus from "http-status";

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

const changePassword = async (user: User, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect old password");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_password_token,
    config.jwt.reset_password_token_expires_in
  );

  // console.log("resetPassToken", resetPassToken);

  const resetPasswordLink =
    config.reset_password_link +
    `?email=${userData.email}&token=${resetPassToken}`;
  // console.log("resetPasswordLink", resetPasswordLink);

  await emailSender(
    userData.email,
    `
      <div>
      <p>Dear User</p>
      <p>Click on the link below to reset your password</p>
      <a href="${resetPasswordLink}">
        <button>Reset Password</button>
      </a>
      </div>
    `
  );
};

const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt.reset_password_token
  );

  if (!isValidToken) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password reset successfully",
  };
};

export const authService = {
  logInUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
