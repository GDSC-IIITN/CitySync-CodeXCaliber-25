import { Router } from "express";
import {
    handleContractorLogout,
    handleDepartmentUserLogout,
} from "@be/controllers";
import {
    contractortAuthMiddleware,
    departmentAuthMiddleware,
} from "@be/middlewares";
import { handleAdminLogout } from "@be/controllers/auth.controller";
import { adminAuthMiddleware } from "@be/middlewares/admin.middleware";

export const logoutRouter: Router = Router();

logoutRouter.get("/admin", adminAuthMiddleware, handleAdminLogout);

logoutRouter.get(
    "/contractor",
    contractortAuthMiddleware,
    handleContractorLogout
);

logoutRouter.get(
    "/departmentUser",
    departmentAuthMiddleware,
    handleDepartmentUserLogout
);
