import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            departmentUserId?: string;
            contractorId?: string;
            adminId?: string;
        }
    }
}
