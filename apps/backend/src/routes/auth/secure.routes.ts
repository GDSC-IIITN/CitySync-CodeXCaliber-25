import {
    adminAuthMiddleware,
    contractorAuthMiddleware,
    departmentUserAuthMiddleware,
} from "@be/middlewares";
import { ContractorService, DepartmentUserService } from "@be/service";
import { AdminService } from "@be/service/admin.service";
import { Router } from "express";
import { date } from "zod";

export const secureRoutes: Router = Router();

secureRoutes.get("/admin", adminAuthMiddleware, async (req, res) => {
    const adminId = req.adminId;

    if (!adminId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    const admin = await AdminService.getAdminById(adminId);

    if (!adminId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Contractor authenticated",
        date: admin,
    });
    return;
});

secureRoutes.get("/contractor", contractorAuthMiddleware, async (req, res) => {
    const contractorId = req.contractorId;

    if (!contractorId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    const contractor = await ContractorService.getContractorById(contractorId);

    if (!contractorId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Contractor authenticated",
        date: contractor,
    });
    return;
});

secureRoutes.get(
    "/department-user",
    departmentUserAuthMiddleware,
    async (req, res) => {
        const departmentUserId = req.departmentUserId;

        if (!departmentUserId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const departmentUser =
            await DepartmentUserService.getDepartmentUserById(departmentUserId);

        res.status(200).json({
            success: true,
            message: "Contractor authenticated",
            date: departmentUser,
        });
        return;
    }
);
