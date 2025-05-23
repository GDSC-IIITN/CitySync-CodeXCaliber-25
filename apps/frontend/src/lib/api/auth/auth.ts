import { Axios } from "axios";
import {
    ContractorSigninInput,
    ContractorSignupInput,
    AdminSigninInput,
    DepartmentUserSigninInput,
    DepartmentUserSignupInput,
} from "@repo/schema/infered";
import { BaseResponse } from "@/types/response/baseResponse";

export class ContractorAuthApi {
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async signup(
        contractorSignupSchema: ContractorSignupInput
    ): Promise<BaseResponse> {
        console.log("req::: ", contractorSignupSchema);
        const res = await this.axios.post(
            "/api/auth/signup/contractor",
            contractorSignupSchema
        );
        console.log("res ", res);
        return res.data;
    }

    async signin(
        contractorSigninSchema: ContractorSigninInput
    ): Promise<BaseResponse> {
        const { data } = await this.axios.post(
            "/api/auth/signin/contractor",
            contractorSigninSchema
        );
        return data;
    }

    async logout(): Promise<BaseResponse> {
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

    async signin(adminSigninSchema: AdminSigninInput): Promise<BaseResponse> {
        const { data } = await this.axios.post(
            "/api/auth/signin/admin",
            adminSigninSchema
        );
        return data;
    }

    async logout(): Promise<BaseResponse> {
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

    async signup(
        departmentUserSignupSchema: DepartmentUserSignupInput
    ): Promise<BaseResponse> {
        const { data } = await this.axios.post(
            "/api/auth/signup/departmentUser",
            departmentUserSignupSchema
        );
        return data;
    }

    async signin(
        departmentUserSigninSchema: DepartmentUserSigninInput
    ): Promise<BaseResponse> {
        const { data } = await this.axios.post(
            "/api/auth/signin/departmentUser",
            departmentUserSigninSchema
        );
        return data;
    }

    async logout(): Promise<BaseResponse> {
        const { data } = await this.axios.get(
            "/api/auth/logout/departmentUser",
            { withCredentials: true }
        );
        return data;
    }
}
