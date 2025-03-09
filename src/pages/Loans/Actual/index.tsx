import { useGetActualQuery } from "../api"
import { Title } from "@mantine/core"

export const Actual = () => {
    const {data, isLoading} = useGetActualQuery()
    if(isLoading){
        return <h1>Загрузка</h1>
    }
    return (
        <>
            <Title order={2}>Актуальная ставка</Title>
            <h4>{data?.name}</h4>
            <h4>С процентом: {data?.percent}%</h4>
        </>
    )
}