import type { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
  });

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

export const authController = {
  loginUser,
};
