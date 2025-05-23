import { useMutation } from "@tanstack/react-query";
import {
    useAdminAuth,
    useContractorAuth,
    useDepartmentUserAuth,
} from "../auth/useAuth";
import {
    AdminSigninInput,
    ContractorSigninInput,
    DepartmentUserSigninInput,
} from "@repo/schema/infered";
import api from "@/lib/api";

/*
    login the admin
*/
export const useAdminSignin = () => {
    const { setIsAuthenticated } = useAdminAuth();
    return useMutation({
        mutationKey: ["adminSignin"],
        mutationFn: (inputData: AdminSigninInput) =>
            api.adminAuthApi.signin(inputData),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

/*
    login the department user
*/
export const useDepartmentUserSignin = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserSignin"],
        mutationFn: (inputData: DepartmentUserSigninInput) =>
            api.departmentUserAuthApi.signin(inputData),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

/*
    login the contractor
*/
export const useContractorSignin = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorSignin"],
        mutationFn: (inputData: ContractorSigninInput) =>
            api.contractorAuthApi.signin(inputData),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};
