"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    useAdminAuth,
    useContractorAuth,
    useDepartmentUserAuth,
} from "@/hooks/useAuth";
import { Role } from "@/types/userRole";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roleType: Role;w
}

export default function ProtectedRoute({
    children,
    roleType,
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
            console.log(
                `User ${userId || "unknown"} not authenticated, redirecting`
            );
        }
    }, [isLoading, isAuthenticated, router, userId]);
    const contractorAuth = useContractorAuth();
    const adminAuth = useAdminAuth();
    const departmentUserAuth = useDepartmentUserAuth();

    useEffect(() => {
        if (isAuthenticated === false && localStorage.getItem("sessionId")) {
            return;
        }

        if (roleType === Role.CONTRACTOR) {
            setIsAuthenticated(contractorAuth.isAuthenticated);
            setUserId(contractorAuth.contractorId);
        } else if (roleType === Role.ADMIN) {
            setIsAuthenticated(adminAuth.isAuthenticated);
            setUserId(adminAuth.adminId);
        } else if (roleType === Role.DEPARTMENT_USER) {
            setIsAuthenticated(departmentUserAuth.isAuthenticated);
            setUserId(departmentUserAuth.departmentUserId);
        }
        setIsLoading(false);
    }, [
        roleType,
        contractorAuth,
        adminAuth,
        departmentUserAuth,
        isAuthenticated,
    ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <div>Redirecting to login...</div>
    );
}
