import type { Request, Response } from "express";
import { userServices } from "./user.service.js";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.name : "Failed to create admin",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};

export const userController = {
  createAdmin,
};
