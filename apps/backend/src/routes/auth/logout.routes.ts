import { Router } from "express";
import {
    handleContractorLogout,
    handleDepartmentUserLogout,
} from "@be/controllers";
import {
    contractorAuthMiddleware,
    adminAuthMiddleware,
    departmentUserAuthMiddleware,
} from "@be/middlewares";
import { handleAdminLogout } from "@be/controllers/auth.controller";

export const logoutRouter: Router = Router();

logoutRouter.get("/admin", adminAuthMiddleware, handleAdminLogout);

logoutRouter.get(
    "/contractor",
    contractorAuthMiddleware,
    handleContractorLogout
);

logoutRouter.get(
    "/departmentUser",
    departmentUserAuthMiddleware,
    handleDepartmentUserLogout
);
