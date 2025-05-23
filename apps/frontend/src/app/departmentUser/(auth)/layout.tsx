import { ReactNode } from "react";
import ProtectedRoute from "@/components/providers/AuthProvider";
import { Role } from "@/types/userRole";

export default function DeapartmentUserLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <ProtectedRoute roleType={Role.DEPARTMENT_USER}>
            {children}
        </ProtectedRoute>
    );
}
