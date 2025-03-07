export interface AutorizationFormProps{
    email: string
    password: string
}

export interface AutorizationResponse{
    refreshToken: string
    accessToken: string
}