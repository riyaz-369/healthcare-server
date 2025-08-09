import type { Request, Response } from "express";
import { userServices } from "./user.service.js";

const createAdmin = async (req: Request, res: Response) => {
  // console.log("Creating admin...", req.body);

  const result = await userServices.createAdmin(req.body);
  console.log("Admin created successfully", result);
  res.status(201).send(result);
};

export const userController = {
  createAdmin,
};
