import { useEffect, useState } from "react"
import { Transaction, useGetAllTransactionsQuery } from "../api/api"
import { useGetMyBillsQuery } from "../../BankAccounts/api/api"

const ws = new WebSocket(`ws://localhost:8080/api/ws?token=${sessionStorage.getItem('access')}`)

export const useWsTransactions = (id: string) => {
    const [state, setState] = useState<Array<Transaction>>([])
    const {data, isLoading, refetch} = useGetAllTransactionsQuery(id!)
    const {refetch:billRefetch} = useGetMyBillsQuery()
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
            refetch()
            billRefetch()
            setState((prew) => [...prew, JSON.parse(event.data) as Transaction])
            
        }
    },[data])

    return {
        isLoading,
        data: state
    }
}