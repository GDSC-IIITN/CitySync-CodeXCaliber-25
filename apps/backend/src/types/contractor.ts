export interface IContractorCreation {
    name: string;
    email: string;
    phoneNo: string;
    GSTIN: string;
    password: string;
}

export interface IContractor {
    id: string;
    name: string;
    email: string;
    phoneNo: string;
    GSTIN: string;
    password: string;
    createdAt: Date;
}
