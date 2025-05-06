export interface CreateBillRequest{
    name: string,
    type: string
}

export interface CreateBillRequestIK{
    bill: CreateBillRequest
    ik: string
}

export interface CreateBillResponse{
    id: string,
    userId: string,
    amount: number,
    type: string,
    status: string,
    name: string
}

type BillType = "SAVING" | "NORMAL" | "CREDIT";
type BillStatus = "OPEN" | "CLOSED" | "BLOCKED";

export interface Bill{
    id: string,
    userId: string,
    amount: number,
    type: BillType,
    status: BillStatus,
    name: string
}