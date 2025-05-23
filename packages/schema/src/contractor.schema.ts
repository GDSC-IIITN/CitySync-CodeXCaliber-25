import { z } from "zod";

export const contractorSignupAuth = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(1, "Name is required"),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address")
        .min(1, "Email is required"),
    phoneNo: z
        .string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 digits"),
    GSTIN: z
        .string({ required_error: "GSTIN is required" })
        .length(15, "GSTIN must be exactly 15 characters"),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
});

export const contractorSigninAuth = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
});
