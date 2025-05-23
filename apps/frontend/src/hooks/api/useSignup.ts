import { useMutation } from "@tanstack/react-query";
import { useContractorAuth, useDepartmentUserAuth } from "../auth/useAuth";
import {
    ContractorSignupInput,
    DepartmentUserSignupInput,
} from "@repo/schema/infered";
import api from "@/lib/api";

/*
    register the department user
*/
export const useDepartmentUserSignup = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserSignup"],
        mutationFn: (inputData: DepartmentUserSignupInput) =>
            api.departmentUserAuthApi.signup(inputData),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

/*
    register the contractor
*/
export const useContractorSingup = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorSignup"],
        mutationFn: (inputData: ContractorSignupInput) =>
            api.contractorAuthApi.signup(inputData),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
                console.log("Contractor signed up successfully");
            }
        },
        throwOnError(error) {
            console.error("Error signing up contractor:", error);
            return false; // Don't throw the error after logging it
        },
    });
};
