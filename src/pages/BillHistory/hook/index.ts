import { useEffect, useState } from "react"
import { Transaction, useGetAllTransactionsQuery } from "../api/api"

const ws = new WebSocket(`ws://localhost:8080/api/ws?token=${sessionStorage.getItem('access')}`)

export const useWsTransactions = (id: string) => {
    const [state, setState] = useState<Array<Transaction>>([])
    const {data, isLoading} = useGetAllTransactionsQuery(id!)
    useEffect(() => {
        if(data){
            setState([...data])
        }
    },[data])

    useEffect(()=>{
        ws.onopen = () => {
            console.log("соединение установлено")
        }
        ws.onmessage = event => {
            console.log(event.data)
            setState([...state, event.data as Transaction])
        }
    },[])

    return {
        isLoading,
        data: state
    }
}