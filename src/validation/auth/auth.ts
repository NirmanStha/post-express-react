import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters long",
  }),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters long",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters long",
    }),
    role: z.enum(["user", "admin"]),
    profilePic: z.string().url({
      message: "Please enter a valid URL",
    }),
    gender: z.enum(["male", "female", "other"]),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    age: z.number().int().positive(),

    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
