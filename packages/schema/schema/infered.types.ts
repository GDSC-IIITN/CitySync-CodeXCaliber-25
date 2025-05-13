import type { z } from "zod";
import type { adminSigninSchema, adminSignupSchema } from "./admin.schema.ts";

export type AdminSigninInput = z.infer<typeof adminSigninSchema>;
export type AdminSignupInput = z.infer<typeof adminSignupSchema>;