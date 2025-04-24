import { injectToApi } from "../../../shared/api/api";

const token = sessionStorage.getItem('access');
console.log("aaaa", token)

const createTransaction = injectToApi({
   
    endpoints: builder => ({

        createTransaction: builder.mutation<any, {id: string, amount: number, otherId: string}>({
            query: ({ id, amount, otherId}) => ({
                url: `/api/core/bill/transaction/${id}/${otherId}`,
                method: 'POST',
                body: { amount },
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }),
            invalidatesTags: ["Bills"] 
        }),

    })
});



export const { 
    useCreateTransactionMutation, 
} = createTransaction;