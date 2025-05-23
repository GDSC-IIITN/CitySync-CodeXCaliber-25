import { NextFunction, Request, Response } from "express";
import { DepartmentUserService } from "@be/service";
import { verifyToken } from "@be/utils/security.utils";

export const departmentUserAuthMiddleware = async (
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

    const data = verifyToken(token);

    if (!data) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    const department = await DepartmentUserService.getDepartmentUserById(
        data.id
    );

    if (!department) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    req.departmentUserId = department.id;

    next();
};
