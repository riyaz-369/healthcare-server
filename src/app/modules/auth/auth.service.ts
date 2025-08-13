import generateToken from "../../../utils/generateToken.js";
import prisma from "../../../utils/prisma.js";
import bcrypt from "bcrypt";

const logInUser = async (payload: { email: string; password: string }) => {
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

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "5m"
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authService = {
  logInUser,
};
