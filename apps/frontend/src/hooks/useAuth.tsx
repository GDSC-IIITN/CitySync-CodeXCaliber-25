"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import {
    AdminSigninInput,
    ContractorSigninInput,
    ContractorSignupInput,
    DepartmentUserSigninInput,
    DepartmentUserSignupInput,
} from "@repo/schema/infered";

/*  
    hook for contractor authentication 
    it check if contractor is authenticated or not
    if authenticated it returns contractorId and isAuthenticated is true
    if not authenticated it returns isAuthenticated is false and contractorId is null
*/
export const useContractorAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [contractorId, setContractorId] = useState<string | null>(null);

    const { data, isPending, isError } = useQuery({
        queryKey: ["contractorAuth"],
        queryFn: () => api.secureRoutes.getContractorDetails(),
    });

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (isError) {
            setIsAuthenticated(false);
            setContractorId(null);
            return;
        }

        if (data?.success) {
            setIsAuthenticated(true);
            setContractorId(data.data);
        } else {
            setIsAuthenticated(false);
            setContractorId(null);
        }
    }, [data, isPending, isError]);

    return { isAuthenticated, contractorId, setIsAuthenticated };
};

/*  
    hook for admin authentication 
    it check if admin is authenticated or not
    if authenticated it returns adminId and isAuthenticated is true
    if not authenticated it returns isAuthenticated is false and adminId is null
*/
export const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminId, setAdminId] = useState<string | null>(null);

    const { data, isPending, isError } = useQuery({
        queryKey: ["adminAuth"],
        queryFn: () => api.secureRoutes.getAdminDetails(),
    });

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (isError) {
            setIsAuthenticated(false);
            setAdminId(null);
            return;
        }

        if (data?.success) {
            setIsAuthenticated(true);
            setAdminId(data.data);
        } else {
            setIsAuthenticated(false);
            setAdminId(null);
        }
    }, [data, isPending, isError]);

    return { isAuthenticated, adminId, setIsAuthenticated };
};

/*  
    hook for department authentication 
    it check if department is authenticated or not
    if authenticated it returns departmentId and isAuthenticated is true
    if not authenticated it returns isAuthenticated is false and departmentId is null
*/
export const useDepartmentUserAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [departmentUserId, setDepartmentUserId] = useState<string | null>(
        null
    );

    const { data, isPending, isError } = useQuery({
        queryKey: ["departmentUserAuth"],
        queryFn: () => api.secureRoutes.getDepartmentUserDetails(),
    });

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (isError) {
            setIsAuthenticated(false);
            setDepartmentUserId(null);
            return;
        }

        if (data?.success) {
            setIsAuthenticated(true);
            setDepartmentUserId(data.data);
        } else {
            setIsAuthenticated(false);
            setDepartmentUserId(null);
        }
    }, [data, isPending, isError]);

    return { isAuthenticated, departmentUserId, setIsAuthenticated };
};

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
