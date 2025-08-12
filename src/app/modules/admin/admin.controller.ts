import type { Request, Response } from "express";
import { adminService } from "./admin.service.js";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { adminFilterableFields } from "./admin.constant.js";

const getAllAdmins = async (req: Request, res: Response) => {
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

    res.status(200).json({
      success: true,
      message: "Admin data retrieved successfully",
      meta: result?.meta,
      data: result?.data,
    });
  } catch (error) {
    console.error("Error in getAllAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getSingleAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.getSingleAdminFromDB(id as string);
    res.status(200).json({
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

const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await adminService.updateAdminIntoDB(id as string, data);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in updateAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update admin",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteAdminFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in deleteAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const softDeleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.softDeleteAdminFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in deleteAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
