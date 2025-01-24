import { z } from "zod";

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(30, { message: "Name must be at most 30 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginFormValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const TransactionAmountValidation = z.object({
  amount: z
    .string()
    .min(1, { message: "Please enter an amount" })
    .refine(
      (val) =>
        /^\d{1,3}(\.\d{3})*(,\d{1,2})?$/.test(val), // Match thousands separated by dots and optional decimals with a comma
      { message: "Invalid amount format" }
    )
    .refine((val) => parseFloat(val.replace(/\./g, "").replace(",", ".")) >= 1, {
      message: "Amount cannot be less than 1",
    }),
});

export const UpdateProfileFormValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, { message: "Name must be at most 30 characters" }),
});

export const GraphRangeValidation = z
  .object({
    startDate: z.date({ invalid_type_error: "Start date is required" }),
    endDate: z.date({ invalid_type_error: "End date is required" }),
  })
  .refine(({ startDate, endDate }) => startDate < endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    ({ startDate, endDate }) => {
      const diffInMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      return (
        diffInMonths < 1 ||
        (diffInMonths === 1 && endDate.getDate() < startDate.getDate())
      );
    },
    {
      message: "Dates must be at most 1 month apart",
      path: ["endDate"],
    }
  )
  .refine(({ endDate }) => endDate <= new Date(), {
    message: "End date cannot be in the future",
    path: ["endDate"],
  });