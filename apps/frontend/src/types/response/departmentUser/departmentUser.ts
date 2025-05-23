import { BaseResponse } from "../baseResponse";

interface DepartmentUser {
    id: string;
    email: string;
    name: string;
    description: string | null;
    phoneNo: string;
    role: string;
    assingedById: string | null;
    departmentId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IDepartmentUser extends BaseResponse {
    data: DepartmentUser;
}
