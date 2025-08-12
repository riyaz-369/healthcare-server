import type { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service.js";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { adminFilterableFields } from "./admin.constant.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";

const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  // console.log("paginationQuery:", options);

  try {
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
  } catch (error) {
    next(error);
  }
};

const getSingleAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.getSingleAdminFromDB(id as string);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in getSingleAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await adminService.updateAdminIntoDB(id as string, data);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteAdminFromDB(id as string);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.softDeleteAdminFromDB(id as string);
    sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Admin soft deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
