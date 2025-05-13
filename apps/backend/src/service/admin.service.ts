import { prisma } from "@be/lib/db";
import { AdminSignupInput } from "@repo/schema/infered";

export class AdminService {
    static async getAdminById(id: string) {
        try {
            const admin = await prisma.admin.findUnique({
                where: { id },
                omit: { password: true },
            });
            return admin;
        } catch (error) {
            console.error("Error fetching admin by ID:", error);
            throw error;
        }
    }

    static async getAdminByEmail(email: string) {
        try {
            const admin = await prisma.admin.findUnique({
                where: { email },
            });
            return admin;
        } catch (error) {
            console.error("Error fetching admin by email:", error);
            throw error;
        }
    }

    static async createAdmin(data: AdminSignupInput) {
        try {
            const admin = await prisma.admin.create({ data });
            return admin;
        } catch (error) {
            console.error("Error creating admin:", error);
            throw error;
        }
    }

    static async updateAdmin(id: string, data: Partial<AdminSignupInput>) {
        try {
            const admin = await prisma.admin.update({
                where: { id },
                data,
            });
            return admin;
        } catch (error) {
            console.error("Error updating admin:", error);
            throw error;
        }
    }

    static async deleteAdmin(id: string) {
        try {
            const admin = await prisma.admin.delete({
                where: { id },
            });
            return admin;
        } catch (error) {
            console.error("Error deleting admin:", error);
            throw error;
        }
    }

    static async getAllAdmins() {
        try {
            const admins = await prisma.admin.findMany({
                select: {
                    id: true,
                    email: true,
                },
            });
            return admins;
        } catch (error) {
            console.error("Error fetching all admins:", error);
            throw error;
        }
    }

    static async getAdminDepartments(id: string) {
        try {
            const department = await prisma.admin.findUnique({
                where: { id },
                omit: { password: true },
                include: {
                    departments: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            return department;
        } catch (error) {
            console.error("Error fetching admin departments:", error);
            throw error;
        }
    }

    static async getAdminDepartmentUsers(id: string) {
        try {
            const departmentUsers = await prisma.admin.findUnique({
                where: { id },
                include: {
                    departments: {
                        include: {
                            departmentUsers: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    phoneNo: true,
                                },
                            },
                        },
                    },
                },
            });
            return departmentUsers;
        } catch (error) {
            console.error("Error fetching admin department users:", error);
            throw error;
        }
    }
}
