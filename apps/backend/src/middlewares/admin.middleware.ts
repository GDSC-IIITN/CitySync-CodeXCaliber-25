import { AdminService } from "@be/service/admin.service";
import { verifyToken } from "@be/utils/security.utils";
import { NextFunction, Request, Response } from "express";

export const adminAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.ssId;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    // Assuming you have a function to verify the token and get the admin ID
    const data = verifyToken(token);

    if (!data) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    const admin = await AdminService.getAdminById(data.id);

    if (!admin) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    req.adminId = data.id;

    next();
};
