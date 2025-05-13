"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

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

export const useAdminSignin = () => {
    const { setIsAuthenticated } = useAdminAuth();
    return useMutation({
        mutationKey: ["adminSignin"],
        mutationFn: api.adminAuthApi.signin,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

export const useAdminLogout = () => {
    const { setIsAuthenticated } = useAdminAuth();
    return useMutation({
        mutationKey: ["adminLogout"],
        mutationFn: api.adminAuthApi.logout,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};

export const useDepartmentUserSignup = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserSignup"],
        mutationFn: api.departmentUserAuthApi.signup,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

export const useDepartmentUserSignin = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserSignin"],
        mutationFn: api.departmentUserAuthApi.signin,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

export const useDepartmentUserLogout = () => {
    const { setIsAuthenticated } = useDepartmentUserAuth();
    return useMutation({
        mutationKey: ["departmentUserLogout"],
        mutationFn: api.departmentUserAuthApi.logout,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};

export const useContractorSingup = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorSignup"],
        mutationFn: api.contractorAuthApi.signup,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

export const useContractorSignin = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorSignin"],
        mutationFn: api.contractorAuthApi.signin,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(true);
            }
        },
    });
};

export const useContractorLogout = () => {
    const { setIsAuthenticated } = useContractorAuth();
    return useMutation({
        mutationKey: ["contractorLogout"],
        mutationFn: api.contractorAuthApi.logout,
        onSuccess: (data) => {
            if (data.success === true) {
                setIsAuthenticated(false);
            }
        },
    });
};
