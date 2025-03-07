import { injectToApi } from "../../../shared/api/api";
import { AutorizationFormProps, AutorizationResponse } from "./data"

const autorization = injectToApi({
    endpoints: builder=>({
        autorization: builder.query<AutorizationResponse,AutorizationFormProps>({
            query: body=>({
                url: '/api/employee/client/login',
                method: 'POST',
                body: body
            })
        })
    })
})

export const {useLazyAutorizationQuery}=autorization;