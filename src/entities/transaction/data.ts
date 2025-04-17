type BillType = "SAVING" | "NORMAL" | "CREDIT";
type BillStatus = "OPEN" | "CLOSED" | "BLOCKED";

interface Bill{
    id: string,
    userId: string,
    amount: number,
    type: BillType,
    status: BillStatus,
    name: string
}

export interface Transaction{
    id:string
    from: Bill
    to: Bill
    amount: number
}