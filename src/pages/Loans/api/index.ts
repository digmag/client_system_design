import { injectToApi } from "../../../shared/api/api"
import { Bill } from "../../BankAccounts/api/types"
import { CreateCreditFormProps } from "../Form/data"

const token = sessionStorage.getItem('access');
const createCredit = injectToApi({
    endpoints: builder => ({
        
        createCreditBill: builder.mutation<Bill, CreateCreditFormProps>({
            query: body => ({
                url: '/api/loan/bill',
                method:'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }),
            invalidatesTags: ['Bills']
        }),
        getActual: builder.query<{id: String, name: String, percent: number, isActual: boolean}, void>({
            query: () => ({
                url:'/api/loan/actual',
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
        })
    })
})

export const {useCreateCreditBillMutation, useGetActualQuery} = createCredit