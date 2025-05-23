"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
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
            setContractorId(data.data.id);
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
            setAdminId(data.data.id);
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
            setDepartmentUserId(data.data.id);
        } else {
            setIsAuthenticated(false);
            setDepartmentUserId(null);
        }
    }, [data, isPending, isError]);

    return { isAuthenticated, departmentUserId, setIsAuthenticated };
};
