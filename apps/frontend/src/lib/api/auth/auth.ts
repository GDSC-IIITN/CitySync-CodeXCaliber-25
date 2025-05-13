import { Axios } from "axios";
import {
    ContractorSigninInput,
    ContractorSignupInput,
    AdminSigninInput,
    DepartmentUserSigninInput,
    DepartmentUserSignupInput,
} from "@repo/schema/infered";

export class ContractorAuthApi {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signup(contractorSignupSchema: ContractorSignupInput) {
        const { data } = await this.axios.post(
            "/api/auth/signup/contractor",
            contractorSignupSchema
        );
        return data;
    }

    async signin(contractorSigninSchema: ContractorSigninInput) {
        const { data } = await this.axios.post(
            "/api/auth/signin/contractor",
            contractorSigninSchema
        );
        return data;
    }

    async logout() {
        const { data } = await this.axios.get("/api/auth/logout/contractor", {
            withCredentials: true,
        });
        return data;
    }
}

export class AdminAuthApi {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signin(adminSigninSchema: AdminSigninInput) {
        const { data } = await this.axios.post(
            "/api/auth/signin/admin",
            adminSigninSchema
        );
        return data;
    }

    async logout() {
        const { data } = await this.axios.get("/api/auth/logout/admin", {
            withCredentials: true,
        });
        return data;
    }
}

export class DepartmentUserAuthApi {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signup(departmentUserSignupSchema: DepartmentUserSignupInput) {
        const { data } = await this.axios.post(
            "/api/auth/signup/departmentUser",
            departmentUserSignupSchema
        );
        return data;
    }

    async signin(departmentUserSigninSchema: DepartmentUserSigninInput) {
        const { data } = await this.axios.post(
            "/api/auth/signin/departmentUser",
            departmentUserSigninSchema
        );
        return data;
    }

    async logout() {
        const { data } = await this.axios.get(
            "/api/auth/logout/departmentUser",
            { withCredentials: true }
        );
        return data;
    }
}
