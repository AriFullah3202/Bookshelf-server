import { z } from "zod";
const createUserZodSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  role: z.string().default("user"),
  password: z.string({
    required_error: "Password is required",
  }),
  needsPasswordChange: z.boolean().default(true),
  name: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }),
    lastName: z.string({
      required_error: "Last name is required",
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
};
