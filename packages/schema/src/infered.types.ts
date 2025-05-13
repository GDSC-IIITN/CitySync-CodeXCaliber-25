import type { z } from "zod";
import type { adminSigninSchema, adminSignupSchema } from "./admin.schema.ts";
import type {
    contractorSigninAuth,
    contractorSignupAuth,
} from "./contractor.schema.ts";
import type {
    departmentUserSigninAuth,
    departmentUserSignupAuth,
} from "./departmentUser.schema.ts";

export type AdminSigninInput = z.infer<typeof adminSigninSchema>;
export type AdminSignupInput = z.infer<typeof adminSignupSchema>;

export type ContractorSignupInput = z.infer<typeof contractorSignupAuth>;
export type ContractorSigninInput = z.infer<typeof contractorSigninAuth>;

export type DepartmentUserSignupInput = z.infer<
    typeof departmentUserSignupAuth
>;
export type DepartmentUserSigninInput = z.infer<
    typeof departmentUserSigninAuth
>;
