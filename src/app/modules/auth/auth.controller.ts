import type { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUser(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
};
