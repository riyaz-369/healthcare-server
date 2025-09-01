import type { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service.js";
import catchAsync from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import HttpStatus from "http-status";
import { pickSearchableFields } from "../../../utils/pickSearchableFields.js";
import { userFilterableFields } from "./user.constant.js";

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
  // console.log("req.query", req.query);

  const searchableFields = pickSearchableFields(
    req.query,
    userFilterableFields
  );

  const options = pickSearchableFields(req.query, [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
  ]);

  console.log("options:", options);

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

const changeProfileStatus = catchAsync(async (req, res) => {
  const result = await userServices.changeProfileStatus(
    req.params.id!,
    req.body
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Profile status changed successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.getMyProfile(req.user);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateMyProfile(req.user, req);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllPatients,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
