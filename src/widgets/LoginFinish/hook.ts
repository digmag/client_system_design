import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMyContext } from "../../shared/lib"
import { useLazyFinishLoginQuery } from "./api"

export const useLoginFinish = () => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const { isAuth , setIsAuth } = useMyContext();
    const [trigger] = useLazyFinishLoginQuery()
    const saveToken = async (token: string) => {
        try{
            await trigger({token}).unwrap().then(data => {
                console.log(data)
                localStorage.setItem('refresh', data.refreshToken)
                sessionStorage.setItem('access', data.accessToken)
                setIsAuth(true)
                navigate('/loans')
            })
            
        }
        catch{
            console.log("не удалсь войти")
        }
    }
    useEffect(()=>{
        if(params.get('code') !== null){
            const token = params.get("code")!
            console.log(token)
            saveToken(token)           
        }
    },[])
}