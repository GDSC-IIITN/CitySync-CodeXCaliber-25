import axios, { Axios, AxiosError } from "axios";
import { env } from "../config/env";
// import { redirect } from 'next/navigation';
import { SecureRoutes } from "./auth/secureRoutes";
import {
    AdminAuthApi,
    ContractorAuthApi,
    DepartmentUserAuthApi,
} from "./auth/auth";

class ApiSdk {
    private readonly mainInstance: Axios;
    secureRoutes: SecureRoutes;
    contractorAuthApi: ContractorAuthApi;
    adminAuthApi: AdminAuthApi;
    departmentUserAuthApi: DepartmentUserAuthApi;

    constructor() {
        this.mainInstance = this.createAxios(env.NEXT_PUBLIC_API_URL);
        console.log("API URL: ", env.NEXT_PUBLIC_API_URL);
        this.secureRoutes = new SecureRoutes(this.mainInstance);
        this.contractorAuthApi = new ContractorAuthApi(this.mainInstance);
        this.adminAuthApi = new AdminAuthApi(this.mainInstance);
        this.departmentUserAuthApi = new DepartmentUserAuthApi(
            this.mainInstance
        );
    }

    private createAxios(baseURL: string): Axios {
        const ax = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            adapter: "fetch",
            fetchOptions: { cache: "no-store" },
        });

        ax.interceptors.response.use(
            (res) => res,
            async (error: AxiosError) => {
                // if (error.response?.status === 401) {
                //     const session = authClient.getSession()
                //     if (!session) {
                //         authClient.signOut()
                //         return redirect('/auth/login')
                //     }
                //     return Promise.reject(error)
                // }
                return Promise.reject(error);
            }
        );
        return ax;
    }

    getInstances() {
        return { main: this.mainInstance };
    }
}

const api = new ApiSdk();
export default api;
