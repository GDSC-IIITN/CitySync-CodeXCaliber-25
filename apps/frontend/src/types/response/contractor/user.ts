import { BaseResponse } from "../baseResponse";

interface ContractorUser {
    id: string;
    email: string;
    name: string;
    phoneNo: string;
    GSTIN: string;
    createdAt: string; // ISO 8601 date string
}

export interface IContractor extends BaseResponse {
    data: ContractorUser;
}
