import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { keyGen } from "../../lib/KeyGen";

const baseUrl = 'http://185.103.70.190:8080';

export const fetchBaseQueryRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithHeaders(args, api, extraOptions)

  if (result.meta?.response?.status === 200) {
    keyGen.gen();
  }

  return result
}

export const baseQueryWithHeaders = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders(headers){
        if(sessionStorage.getItem("access")&&!headers.has("Authorization")){
            headers.set("Authorization", `Bearer ${sessionStorage.getItem("access")}`)
        }
        headers.set("ik", keyGen.currentKey)
        return headers
    }
})