import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMyContext } from "../../shared/lib"

export const useLoginFinish = () => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const { isAuth , setIsAuth } = useMyContext();
    useEffect(()=>{
        if(params.get('token') !== null){
            sessionStorage.setItem('access', params.get('token')!)
            setIsAuth(true)
            navigate('/loans')
        }
    },[])
}