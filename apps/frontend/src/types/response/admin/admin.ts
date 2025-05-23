import { BaseResponse } from "../baseResponse";

interface AdminUser {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

export interface IAdmin extends BaseResponse {
    data: AdminUser;
}
