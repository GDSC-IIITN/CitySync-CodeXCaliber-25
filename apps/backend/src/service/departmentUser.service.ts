import { prisma } from "@be/lib/db";
import { UniqueConstraintError } from "@be/utils/prismaError.utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IDepartmentUserCreation } from "@be/types/index";

export class DepartmentUserService {
    public static async getDepartmentUserById(id: string) {
        try {
            return await prisma.departmentUser.findUnique({
                where: { id },
                omit: { password: true },
            });
        } catch (e) {
            console.error("Error fetching department user by ID:", e);
            throw e;
        }
    }

    public static async getDepartmentUserByEmail(email: string) {
        try {
            return await prisma.departmentUser.findUnique({
                where: { email },
            });
        } catch (e) {
            console.error("Error fetching department user by email:", e);
            throw e;
        }
    }

    public static async createDepartmentUser(data: IDepartmentUserCreation) {
        try {
            return await prisma.departmentUser.create({
                data,
                omit: { password: true },
            });
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

    public static async assignToDepartment(
        dpuserId: string,
        assingedById: string,
        departmentId: string
    ) {
        try {
            return await prisma.departmentUser.update({
                where: { id: dpuserId },
                data: { assingedById, departmentId },
                omit: { password: true },
            });
        } catch (e) {
            console.error("Error assigning user to department:", e);
            throw e;
        }
    }

    public static async getDepartmentUserAllProject(id: string) {
        try {
            return await prisma.departmentUser.findMany({
                where: {
                    id,
                },
                include: {
                    projects: true,
                },
                omit: {
                    password: true,
                },
            });
        } catch (e) {
            console.error("Error fetching department user projects:", e);
            throw e;
        }
    }
}
