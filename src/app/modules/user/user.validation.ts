import z from "zod";

const CreateAdminSchema = z.object({
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

export const userValidation = {
  CreateAdminSchema,
};
