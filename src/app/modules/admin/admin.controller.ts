import type { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service.js";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { adminFilterableFields } from "./admin.constant.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync.js";

const getAllAdmins = catchAsync(async (req, res) => {
  const searchableFields = pickSearchableFields(
    req.query,
    adminFilterableFields
  );

  const options = pickSearchableFields(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);

  const result = await adminService.getAllAdminsFromDB({
    searchableFields,
    options,
  });

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admin data retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdminFromDB(id as string);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admin data retrieved successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await adminService.updateAdminIntoDB(id as string, data);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteAdminFromDB(id as string);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.softDeleteAdminFromDB(id as string);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Admin soft deleted successfully",
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
