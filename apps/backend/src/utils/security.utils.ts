import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { env } from "../lib/config/env";
import { IJWTPayload } from "../types/jwt.types";

const secretKey = env.JWT_SECRET || "super_secret_key";

export const hashVal = async (val: string): Promise<string> => {
    return await hash(val, 10);
};

export const compareVal = async (
    val: string,
    hashVal: string
): Promise<boolean> => {
    return await compare(val, hashVal);
};

export const signToken = (payload: IJWTPayload): string => {
    return sign(payload, secretKey);
};

export const verifyToken = (token: string): IJWTPayload | null => {
    try {
        return verify(token, secretKey) as IJWTPayload;
    } catch (error) {
        return null;
    }
};
