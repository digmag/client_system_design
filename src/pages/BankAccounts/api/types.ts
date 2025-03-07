export interface CreateBillRequest{
    name: string,
    type: string
}

export interface CreateBillResponse{
    id: string,
    userId: string,
    amount: number,
    type: string,
    status: string,
    name: string
}