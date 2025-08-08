import type { Request, Response } from "express";
import { userServices } from "./user.service.js";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userServices.createAdmin();
  console.log("Admin created successfully", result);
  res.status(201).send(result);
};

export const userController = {
  createAdmin,
};
