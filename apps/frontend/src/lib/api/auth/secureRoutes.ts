import { IAdmin } from "@/types/response/admin/admin";
import { IContractor } from "@/types/response/contractor/user";
import { IDepartmentUser } from "@/types/response/departmentUser/departmentUser";
import { Axios } from "axios";

export class SecureRoutes {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async getContractorDetails(): Promise<IContractor> {
        const { data } = await this.axios.get("/api/secure/contractor");
        return data;
    }

    async getAdminDetails(): Promise<IAdmin> {
        const { data } = await this.axios.get("/api/secure/admin");
        return data;
    }

    async getDepartmentUserDetails(): Promise<IDepartmentUser> {
        const { data } = await this.axios.get("/api/secure/departmentUser");
        return data;
    }
}
