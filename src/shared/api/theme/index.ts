import { injectToApi } from "../api"

export interface Theme{
    theme: string
}

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
                url: '/api/theme',
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