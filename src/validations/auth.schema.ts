import { register } from "module";
import z from "zod";

export const accountInfoSchema = z.object({
  username: z.string().min(1, "Username at least 3 characters"),
  password: z.string().min(6, "password at least 6 characters"),
});

export const userInfoSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    gender: z.enum(["M", "F"], { message: "gender must be M or F" }),
    dob: z.coerce.date({ message: "Dob must be a date" }),
  }),
});
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    gender: z.enum(["M", "F"], { message: "gender must be M or F" }),
    dob: z.coerce.date({ message: "Dob must be a date" }),
    username: z.string().min(1, "Username at least 3 characters"),
    password: z.string().min(6, "password at least 6 characters"),
  }),
});
export const loginSchema = z.object({
  body: accountInfoSchema,
});

export type RegisterBody = z.infer<typeof registerSchema>["body"];
export type LoginBody = z.infer<typeof loginSchema>["body"];
