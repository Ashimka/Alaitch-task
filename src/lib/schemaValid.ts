import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Enter password")
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }
    ),
});

export type FormData = z.infer<typeof schema>;
