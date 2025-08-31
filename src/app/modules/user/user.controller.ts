import type { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service.js";
import catchAsync from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { patientFilterableFields } from "./user.constant.js";

const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await userServices.createDoctor(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await userServices.createPatient(req);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

const getAllPatients = catchAsync(async (req, res) => {
  const searchableFields = pickSearchableFields(
    req.query,
    patientFilterableFields
  );

  const options = pickSearchableFields(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);

  const result = await userServices.getAllUsersFromDB({
    searchableFields,
    options,
  });

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Patient data retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllPatients,
};
