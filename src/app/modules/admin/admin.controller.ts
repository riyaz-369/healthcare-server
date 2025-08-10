import type { Request, Response } from "express";
import { adminService } from "./admin.service.js";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { adminFilterableFields } from "./admin.constant.js";

const getAllAdmin = async (req: Request, res: Response) => {
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

  console.log("paginationQuery:", options);

  try {
    const result = await adminService.getAllAdminsFromDB({
      searchableFields,
      options,
    });

    res.status(200).json({
      success: true,
      message: "Admin data retrieved successfully",
      data: result,
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

export const adminController = {
  getAllAdminsFromDB: getAllAdmin,
};
