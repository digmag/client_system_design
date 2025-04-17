import { AutorizationResponse } from "../../pages/Login/api/data"
import { injectToApi } from "../../shared/api/api"

const loginFinish = injectToApi({
    endpoints: builder => ({
        finishLogin : builder.query<AutorizationResponse, {token: string}>({
            query: params => ({
                url: `/api/employee/client/login?code=${params.token}`,
                method: 'POST'
            })
        })
    })
})

export const {useLazyFinishLoginQuery} = loginFinish