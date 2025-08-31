import { Gender } from "@prisma/client";
import z from "zod";

const createAdminSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  admin: z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be at most 100 characters long" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    contactNumber: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

const createDoctorSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  doctor: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z
      .string()
      .min(1, { message: "Registration number is required" }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointFee: z
      .number()
      .positive({ message: "Appointment fee must be positive" }),
    qualification: z.string().min(1, { message: "Qualification is required" }),
    currentWorkingPlace: z
      .string()
      .min(1, { message: "Current working place is required" }),
    designation: z.string().min(1, { message: "Designation is required" }),
  }),
});

const createPatientSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
  patient: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  CreateAdminSchema: createAdminSchema,
  createDoctorSchema,
  createPatientSchema,
};
