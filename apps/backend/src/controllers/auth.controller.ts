import { Request, Response } from "express";
import { compareVal, hashVal, signToken } from "@be/utils/security.utils";
import { IJWTPayload } from "@be/types/jwt.types";
import { ContractorService, DepartmentUserService } from "@be/service";
import { UniqueConstraintError } from "@be/utils/prismaError.utils";
import { AdminService } from "@be/service/admin.service";
import {
    departmentUserSignupAuth,
    departmentUserSigninAuth,
} from "@repo/schema/departmentUser";
import {
    contractorSigninAuth,
    contractorSignupAuth,
} from "@repo/schema/contractor";
import { adminSigninSchema, adminSignupSchema } from "@repo/schema/admin";

export const handleAdminSignup = async (req: Request, res: Response) => {
    const inputData = adminSignupSchema.safeParse(req.body);

    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, password, username } = inputData.data;

    try {
        //check whether  email is already registered
        const emailExists = await AdminService.getAdminByEmail(email);

        if (emailExists) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        //hash password
        const hashPassword = await hashVal(password);

        if (!hashPassword) {
            res.status(500).json({
                success: false,
                message: "Error hashing password",
            });
            return;
        }

        // create a contractor with provided data and hashed password
        const admin = await AdminService.createAdmin({
            username,
            email,
            password: hashPassword,
        });

        if (!admin) {
            res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: admin.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Admin created successfully",
        });
    } catch (e) {
        console.log("error", e);
        if (e instanceof UniqueConstraintError) {
            res.status(409).json({
                success: false,
                error: "UNIQUE_CONSTRAINT_VIOLATION",
                message: e.message,
            });
            return;
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
            return;
        }
    }
};

export const handleAdminSignin = async (req: Request, res: Response) => {
    const inputData = adminSigninSchema.safeParse(req.body);

    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, password } = inputData.data;

    try {
        const admin = await AdminService.getAdminByEmail(email);

        if (!admin) {
            res.status(404).json({
                success: false,
                message: "Admin not found!",
            });
            return;
        }

        const comparePass = await compareVal(password, admin.password);

        if (!comparePass) {
            res.status(401).json({
                success: false,
                message: "Incorrect Password!",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: admin.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Admin logged in successfully",
        });
        return;
    } catch (e) {
        console.log("error", e);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};

export const handleAdminLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("ssId").json({
            success: true,
            message: "Admin logged out successfully",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};

/*
 * contractor creation/registration/signup api
 * payload/body: {
 *   "email": string,
 *   "name": string,
 *   "GSTIN": string,
 *   "password": string,
 *   "phoneNo": string
 * }
 */
export const handleContractorSignup = async (req: Request, res: Response) => {
    const inputData = contractorSignupAuth.safeParse(req.body);

    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, name, GSTIN, password, phoneNo } = inputData.data;

    try {
        //check whether  email is already registered
        const emailExists = await ContractorService.getContractorByEmail(email);

        if (emailExists) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        //hash password
        const hashPassword = await hashVal(password);

        if (!hashPassword) {
            res.status(500).json({
                success: false,
                message: "Error hashing password",
            });
            return;
        }

        // create a contractor with provided data and hashed password
        const contractor = await ContractorService.createContractor({
            email,
            name,
            GSTIN,
            password: hashPassword,
            phoneNo,
        });

        if (!contractor) {
            res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: contractor.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Contractor created successfully",
        });
        return;
    } catch (e) {
        console.log("error", e);
        if (e instanceof UniqueConstraintError) {
            res.status(409).json({
                success: false,
                error: "UNIQUE_CONSTRAINT_VIOLATION",
                message: e.message,
            });
            return;
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
            return;
        }
    }
};

/*
 * contractor login/singin api
 * payload/body: {
 *   "email": string,
 *   "password": string,
 * }
 */
export const handleContractorSignin = async (req: Request, res: Response) => {
    const inputData = contractorSigninAuth.safeParse(req.body);

    //REVIEW:::
    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, password } = inputData.data;

    try {
        // check for contractor
        const contractorExist =
            await ContractorService.getContractorByEmail(email);

        if (!contractorExist) {
            res.status(404).json({
                success: false,
                message: "Contractor not found!",
            });
            return;
        }

        const comparePass = await compareVal(
            password,
            contractorExist.password
        );

        if (!comparePass) {
            res.status(401).json({
                success: false,
                message: "Incorrect Password!",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: contractorExist.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Contractor logged in successfully",
        });
        return;
    } catch (e) {
        console.log("error", e);
        return;
    }
};

/*
 * contractor logout api
 */
export const handleContractorLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("ssId").json({
            success: true,
            message: "Contractor logged out successfully",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};

/*
 * departmentUser creation/registration/signup api
 * payload/body: {
 *   "email": string,
 *   "name": string,
 *   "description": string, <optional>
 *   "password": string,
 *   "phoneNo": string
 * }
 */
export const handleDepartmentUserSignup = async (
    req: Request,
    res: Response
) => {
    const inputData = departmentUserSignupAuth.safeParse(req.body);

    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, name, description, password, phoneNo } = inputData.data;

    try {
        //check whether  email is already registered
        const emailExists =
            await DepartmentUserService.getDepartmentUserByEmail(email);

        if (emailExists) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        //hash password
        const hashPassword = await hashVal(password);

        if (!hashPassword) {
            res.status(500).json({
                success: false,
                message: "Error hashing password",
            });
            return;
        }

        // create a department user with provided data and hashed password
        const departmentUser = await DepartmentUserService.createDepartmentUser(
            {
                email,
                name,
                description: description || undefined,
                password: hashPassword,
                phoneNo,
            }
        );

        if (!departmentUser) {
            res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: departmentUser.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Department user created successfully",
        });
        return;
    } catch (e) {
        console.log("error", e);
        if (e instanceof UniqueConstraintError) {
            res.status(409).json({
                success: false,
                error: "UNIQUE_CONSTRAINT_VIOLATION",
                message: e.message,
            });
            return;
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
            return;
        }
    }
};

/*
 * departmentUser login/singin api
 * payload/body: {
 *   "email": string,
 *   "password": string,
 * }
 */
export const handleDepartmentUserSignin = async (
    req: Request,
    res: Response
) => {
    const inputData = departmentUserSigninAuth.safeParse(req.body);

    if (!inputData.success) {
        res.status(400).json({
            success: false,
            error: "Validation failed",
            details: inputData.error.format(),
        });
        return;
    }

    const { email, password } = inputData.data;

    try {
        const dpUserExist =
            await DepartmentUserService.getDepartmentUserByEmail(email);

        if (!dpUserExist) {
            res.status(404).json({
                success: false,
                message: "Department user not found!",
            });
            return;
        }

        const comparePass = await compareVal(password, dpUserExist.password);

        if (!comparePass) {
            res.status(409).json({
                success: false,
                message: "Incorrect Password!",
            });
            return;
        }

        // payload for JWT token
        const payload: IJWTPayload = {
            id: dpUserExist.id,
        };

        // sign the token with payload
        const token = signToken(payload);

        if (!token) {
            res.status(500).json({
                success: false,
                message: "Error signing token",
            });
            return;
        }

        // set the token in the cookie and send response
        res.status(200).cookie("ssId", token).json({
            success: true,
            message: "Department user logged in successfully",
        });
        return;
    } catch (e) {
        console.log("error", e);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};

/*
 * departmentUser logout api
 */
export const handleDepartmentUserLogout = async (
    req: Request,
    res: Response
) => {
    try {
        res.clearCookie("ssId").json({
            success: true,
            message: "Department user logged out successfully",
        });
        return;
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};
