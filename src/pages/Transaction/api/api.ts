import { injectToApi } from "../../../shared/api/api";

const token = sessionStorage.getItem('access');
console.log("aaaa", token)

const createTransaction = injectToApi({
   
    endpoints: builder => ({

        createTransaction: builder.mutation<any, {id: string, amount: number, otherId: string, ik: string}>({
            query: ({ id, amount, otherId, ik}) => ({
                url: `/api/core/bill/transaction/${id}/${otherId}`,
                method: 'POST',
                body: { amount },
                headers: {
                    Authorization: `Bearer ${token}`,
                    ik: ik
                }
            }),
            invalidatesTags: ["Bills"] 
        }),

    })
});



export const { 
    useCreateTransactionMutation, 
} = createTransaction;