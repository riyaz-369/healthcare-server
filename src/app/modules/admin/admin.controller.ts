import type { Request, Response } from "express";
import { adminService } from "./admin.service.js";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllAdminsFromDB(req.query);

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
