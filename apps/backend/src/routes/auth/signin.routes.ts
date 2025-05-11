import { handleContractorSignin, handleDepartmentUserSignin } from "@be/controllers";
import { handleAdminSignin } from "@be/controllers/auth.controller";
import { Router } from "express";

export const signinRouter: Router = Router();

signinRouter.post("/admin", handleAdminSignin);
signinRouter.post("/contractor", handleContractorSignin);
signinRouter.post("/departmentUser", handleDepartmentUserSignin);