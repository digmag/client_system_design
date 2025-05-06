import {createApi, EndpointDefinitions, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryRefreshToken } from './baseQuery';

const baseUrl = 'http://localhost:8080';
export const api = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQueryRefreshToken,
    endpoints: ()=>({}),
    tagTypes: ["Bills", "Transactions", "THEME"]
})

export const injectToApi = <T extends EndpointDefinitions>(injection: Parameters<typeof api.injectEndpoints<T>>[0])=>{
    return api.injectEndpoints<T>(injection);
}