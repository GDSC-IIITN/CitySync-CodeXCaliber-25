import { z } from "zod";

export const departmentUserSignupAuth = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email("Invalid email format"),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: z
        .string({
            invalid_type_error: "Description must be a string",
        })
        .optional(),
    phoneNo: z
        .string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 digits"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
    role: z
        .enum(["municipal"], {
            required_error: "Role is required",
            invalid_type_error: "Invalid role",
        })
        .default("municipal"),
});

export const departmentUserSigninAuth = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email("Invalid email format"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});
