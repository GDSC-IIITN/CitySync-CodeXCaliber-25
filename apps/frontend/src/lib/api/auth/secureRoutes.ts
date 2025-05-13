import { Axios } from "axios";

export class SecureRoutes {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async getContractorDetails() {
        const { data } = await this.axios.get("/api/secure/contractor");
        return data;
    }

    async getAdminDetails() {
        const { data } = await this.axios.get("/api/secure/admin");
        return data;
    }

    async getDepartmentUserDetails() {
        const { data } = await this.axios.get("/api/secure/departmentUser");
        return data;
    }
}
