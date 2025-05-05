import { useEffect } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { useMyContext } from "../../shared/lib"
import { useLazyFinishLoginQuery } from "./api"
import { Title } from "@mantine/core"
import { requestPermissions } from "../../shared/firebase/messaging"

function register() {
    if (navigator.serviceWorker.controller === null) {
        navigator.serviceWorker.register('../firebase-messaging-sw.js').then(() => {
            requestPermissions()
        }).catch(err => console.error(err))
    }
    else {
        requestPermissions()
    }

}

export const useLoginFinish = () => {
    const [params] = useSearchParams()
    const { setIsAuth } = useMyContext();
    const [trigger, {data, isError, isSuccess}] = useLazyFinishLoginQuery()
    useEffect(()=>{
        if(params.get('code') !== null){
            const token = params.get("code")!
            trigger({token})
        }
    },[params, trigger])

    useEffect(()=>{
        if(data){
            localStorage.setItem('refresh', data.refreshToken)
            sessionStorage.setItem('access', data.accessToken)
            register()
        }
    },[data])

    const Component = () => {
        if(isSuccess) {
            setIsAuth(true)
            return <Navigate to={'/loans'}/>
        }
        if(isError){
            return <Title order={1}>Не удалось войти</Title>
        }
    }
    return {
        Component
    }
}