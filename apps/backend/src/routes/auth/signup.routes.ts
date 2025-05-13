import {
    handleContractorSignup,
    handleDepartmentUserSignup,
} from "@be/controllers";
import { handleAdminSignup } from "@be/controllers/auth.controller";
import { Router } from "express";

export const signupRouter: Router = Router();

signupRouter.post("/admin", handleAdminSignup);
signupRouter.post("/contractor", handleContractorSignup);
signupRouter.post("/departmentUser", handleDepartmentUserSignup);
