import {
    adminAuthMiddleware,
    contractorAuthMiddleware,
    departmentUserAuthMiddleware,
} from "@be/middlewares";
import { Router } from "express";
import { date } from "zod";

export const secureRoutes: Router = Router();

secureRoutes.get("/admin", adminAuthMiddleware, (req, res) => {
    const adminId = req.adminId;

    if (!adminId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    res.status(200).json({
        success: true,
        date: adminId,
        message: "Contractor authenticated",
    });
    return;
});

secureRoutes.get("/contractor", contractorAuthMiddleware, (req, res) => {
    const contractorId = req.contractorId;

    if (!contractorId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    res.status(200).json({
        success: true,
        date: contractorId,
        message: "Contractor authenticated",
    });
    return;
});

secureRoutes.get("/department", departmentUserAuthMiddleware, (req, res) => {
    const departmentUserId = req.departmentUserId;

    if (!departmentUserId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    res.status(200).json({
        success: true,
        date: departmentUserId,
        message: "Contractor authenticated",
    });
    return;
});
