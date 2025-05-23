import { useMutation } from "@tanstack/react-query";
import {
    useAdminAuth,
    useContractorAuth,
    useDepartmentUserAuth,
} from "../auth/useAuth";
import api from "@/lib/api";

/*
    logout the admin
*/
export const useAdminLogout = () => {
    const { setIsAuthenticated } = useAdminAuth();
    return useMutation({
        mutationKey: ["adminLogout"],
        mutationFn: () => api.adminAuthApi.logout(),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};

/*
    logout the department user
*/
export const useDepartmentUserLogout = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserLogout"],
        mutationFn: () => api.departmentUserAuthApi.logout(),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};

/*
    logout the contractor
*/
export const useContractorLogout = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorLogout"],
        mutationFn: () => api.contractorAuthApi.logout(),
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};
