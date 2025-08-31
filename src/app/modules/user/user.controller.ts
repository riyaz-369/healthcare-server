import type { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service.js";
import catchAsync from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";

const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
};
