import { injectToApi } from "../api"
import { Theme } from "./data"

const theme = injectToApi({
    endpoints: builder=>({
        getTheme: builder.query<Theme, void>({
            query: ()=> ({
                url: "/api/theme",
                method:"GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access')}` 
                }
            }),
            providesTags: ["THEME"]
        }),
        setTheme: builder.mutation<Theme, Theme>({
            query: body=>({
                url: `/api/theme/post?token=${sessionStorage.getItem('access')}`,
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access')}` 
                }
            }),
            invalidatesTags: ["THEME"]
        })
    })
})

export const {useLazyGetThemeQuery, useSetThemeMutation} = theme