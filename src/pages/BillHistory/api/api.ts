import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { injectToApi } from "../../../shared/api/api";
import { Bill } from "../../BankAccounts/api/types"

const token = sessionStorage.getItem('access');

export interface Transaction{
    id:string
    from: Bill
    to: Bill
    amount: number
}
const ws = new WebSocket(`ws://localhost:8080/api/ws?token=${sessionStorage.getItem('access')}`)
ws.onopen = e => console.log("открылись", e)
ws.onclose = (e) => console.log("закрылись",e)
ws.onerror = e => console.log("закрылись",e)
const transactionAdapter = createEntityAdapter<Transaction>({})
const transactions = injectToApi({
    endpoints: builder=>({
        getAllTransactions: builder.query<EntityState<Transaction, string>, Bill["id"]>({
            query: (id)=> ({
                url: `/api/core/bill/transactions/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }),
            transformResponse(response: Array<Transaction>) {
                return transactionAdapter.addMany(transactionAdapter.getInitialState(),response)
            },
            providesTags: result => 
                result ? [...(result.ids as string[]).map(id => ({ type: 'Transactions' as const, id })), 'Transactions'] : ['Transactions'],
            async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }){
                try{
                    await cacheDataLoaded
                    const listner = (event: MessageEvent<any>) => {
                        const data = JSON.parse(event.data) as Transaction
                        if(data){
                            updateCachedData(draft => {
                                transactionAdapter.upsertOne(draft, {
                                    id: data.id, 
                                    from: data.from,
                                    to: data.to,
                                    amount: data.amount
                                })
                            })
                        }
                    }
                    ws.onmessage = listner
                }
                catch {}
                await cacheEntryRemoved
                ws.close()
            }
        })
    })
})

export const {useGetAllTransactionsQuery}=transactions