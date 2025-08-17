import type { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await authService.changePassword(req.user, req.body);

    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Password changed successfully!",
      data: result,
    });
  }
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Password reset link sent successfully, check your email",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.resetPassword(
    req.headers.authorization!,
    req.body
  );

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Password reset successfully!",
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
