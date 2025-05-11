import { NextFunction, Request, Response } from "express";
import { ContractorService } from "@be/service";
import { verifyToken } from "@be/utils/security.utils";

export const contractortAuthMiddleware = async (
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

    const contractor = await ContractorService.getContractorById(data.id);

    if (!contractor) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    req.contractorId = contractor.id;

    next();
};
