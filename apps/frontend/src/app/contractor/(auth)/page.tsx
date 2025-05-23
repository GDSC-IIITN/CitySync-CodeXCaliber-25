import { useContractorAuth } from "@/hooks/auth/useAuth";

export default function ContractorPage() {
    const { contractorId, isAuthenticated } = useContractorAuth();

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <p>You are not authorized to view this page.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Contractor Page</h1>
            {contractorId && <p>Contractor ID: {contractorId}</p>}
            <p>This is the Contractor page.</p>
        </div>
    );
}
