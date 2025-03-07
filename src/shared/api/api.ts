import {createApi, EndpointDefinitions, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://185.103.70.190:8080';
export const api = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: ()=>({}),
    tagTypes: []
})

export const injectToApi = <T extends EndpointDefinitions>(injection: Parameters<typeof api.injectEndpoints<T>>[0])=>{
    return api.injectEndpoints<T>(injection);
}