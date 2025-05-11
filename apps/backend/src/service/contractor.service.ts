import { prisma } from "@be/lib/db";
import { IContractorCreation } from "@be/types";
import { IContractor } from "@be/types/contractor";
import { UniqueConstraintError } from "@be/utils/prismaError.utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class ContractorService {
    public static async getContractorByEmail(
        email: string
    ): Promise<IContractor | null> {
        try {
            const user = await prisma.contractor.findUnique({
                where: { email },
            });
            return user;
        } catch (e) {
            console.error("Error fetching contractor by email:", e);
            return null;
        }
    }

    public static async getContractorById(
        id: string
    ): Promise<Omit<IContractor, "password"> | null> {
        try {
            return await prisma.contractor.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phoneNo: true,
                    GSTIN: true,
                    createdAt: true,
                    password: false,
                },
            });
        } catch (e) {
            console.error("Error fetching contractor by ID:", e);
            return null;
        }
    }

    public static async createContractor(
        data: IContractorCreation
    ): Promise<Omit<IContractor, "password"> | null> {
        try {
            const contractor = await prisma.contractor.create({
                data,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phoneNo: true,
                    GSTIN: true,
                    createdAt: true,
                    password: false,
                },
            });
            return contractor;
        } catch (e) {
            console.error("Error creating contractor:", e);
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    const field = (e.meta?.target as string[])[0] || "unknown";
                    throw new UniqueConstraintError(field);
                }
            }
            console.error("Error creating contractor:", e);
            throw e;
        }
    }

    public static async updateContractor(
        id: string,
        data: Partial<IContractorCreation>
    ): Promise<Omit<IContractor, "password"> | null> {
        try {
            return await prisma.contractor.update({
                where: { id },
                data,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phoneNo: true,
                    GSTIN: true,
                    createdAt: true,
                    password: false,
                },
            });
        } catch (e) {
            console.error("Error updating contractor:", e);
            throw e;
        }
    }

    public static async deleteContractor(id: string) {
        try {
            return await prisma.contractor.delete({
                where: { id },
            });
        } catch (e) {
            console.error("Error deleting contractor:", e);
            return null;
        }
    }
    public static async getAllContractors(): Promise<
        Omit<IContractor, "password">[] | null
    > {
        try {
            return await prisma.contractor.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phoneNo: true,
                    GSTIN: true,
                    createdAt: true,
                    password: false,
                },
            });
        } catch (e) {
            console.error("Error fetching all contractors:", e);
            return null;
        }
    }
    public static async getContractorProjects(id: string) {
        try {
            return await prisma.contractor.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phoneNo: true,
                    GSTIN: true,
                    createdAt: true,
                    projects: true,
                    password: false,
                },
            });
        } catch (e) {
            console.error("Error fetching contractor projects:", e);
            return null;
        }
    }
}
