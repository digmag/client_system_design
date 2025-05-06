import { injectToApi } from "../../../shared/api/api";
import { keyGen } from "../../../shared/lib/KeyGen";
import { CreateBillRequest, CreateBillResponse, Bill, CreateBillRequestIK } from "./types";

const token = sessionStorage.getItem('access');

const createBill = injectToApi({
   
    endpoints: builder => ({

        createBill: builder.mutation<CreateBillResponse, CreateBillRequest>({
            query: body => ({
                url: '/api/core/bill/create',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}`,
                    ik : keyGen.currentKey
                }
            }),
            invalidatesTags: ["Bills"] 
        }),

        getMyBills: builder.query<Bill[], void>({
            query: () => ({
                url: '/api/core/bill/my',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }),
            providesTags: ["Bills"] 
        }),

        topUpBill: builder.mutation<void, { id: string; amount: number }>({
            query: ({ id, amount }) => ({
                url: `/api/core/bill/${id}/topup`,
                method: 'POST',
                body: { amount },
                headers: {
                    Authorization: `Bearer ${token}`,
                    ik: keyGen.currentKey
                }
            }),
            invalidatesTags: ["Bills"]
        }),

        topDownBill: builder.mutation<void, { id: string; amount: number }>({
            query: ({ id, amount }) => ({
                url: `/api/core/bill/${id}/topdown`,
                method: 'POST',
                body: { amount },
                headers: {
                    Authorization: `Bearer ${token}`,
                    ik: keyGen.currentKey
                }
            }),
            invalidatesTags: ["Bills"]
        }),

        closeBill: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/api/core/bill/${id}/close`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    ik: keyGen.currentKey
                }
            }),
            invalidatesTags: ["Bills"]
        })
    })
});



export const { 
    useCreateBillMutation, 
    useGetMyBillsQuery, 
    useTopUpBillMutation, 
    useTopDownBillMutation, 
    useCloseBillMutation 
} = createBill;