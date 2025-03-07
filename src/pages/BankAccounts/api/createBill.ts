import { injectToApi } from "../../../shared/api/api";
import { CreateBillRequest, CreateBillResponse } from "./types";

const token = sessionStorage.getItem('access');
console.log("aaaa", token)

const createBill = injectToApi({
    endpoints: builder=>({
        createBill: builder.mutation<CreateBillResponse,CreateBillRequest>({
            query: body=>({
                url: '/api/core/bill/create',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                }
            })
        })
    })
})

export const {useCreateBillMutation} = createBill;