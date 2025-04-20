import { useGetAllTransactionsQuery } from "../api/api"
import { useNavigate, useParams } from "react-router-dom"

export const useWsTransactions = (id: string) => {
    const {data, isLoading} = useGetAllTransactionsQuery(id!)

    return {
        isLoading,
        data: data
    }
}

export const useBillHistory = () => {
    const {id}=useParams();
    const {data, isLoading} = useWsTransactions(id!);
    const nav = useNavigate()
    return{
        nav, isLoading, data
    }
}