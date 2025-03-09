import { injectToApi } from "../../../shared/api/api";
import { Bill } from "../../BankAccounts/api/types"

const token = sessionStorage.getItem('access');

export interface Transaction{
    id:string
    from: Bill
    to: Bill
    amount: number
}

const transactions = injectToApi({
    endpoints: builder=>({
        getAllTransactions: builder.query<Array<Transaction>, Bill["id"]>({
            query: (id)=> ({
                url: `/api/core/bill/transactions/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` 
                },
                providesTags: ["Transactions"]
            }),
        })
    })
})

export const {useGetAllTransactionsQuery}=transactions