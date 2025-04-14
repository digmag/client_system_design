import { Flex, Title, Box, Group, Button, SimpleGrid } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { TransactionBlock } from "../../../entities/transaction/TransactionBlock"
import { useWsTransactions } from "../hook";

export default function BillHistory() {
    const {id}=useParams()
    const {data, isLoading} = useWsTransactions(id!);
    const nav = useNavigate()
    if(isLoading){
        return(<h1>Загрузка</h1>)
    }
    return (
        <Flex gap="xl"
        justify="flex-start"
        align="center"
        direction="column" 
        style={{width:"100%"}}>
            <Box style={{width:"80%"}}>
                <Group style={{justifyContent:"space-between"}}>
                    <Title> Список транзакций счета</Title>
                    <Button onClick={()=>nav(-1)}>Назад</Button>
                </Group>
            </Box>
            <SimpleGrid cols={1} style={{width:'80%'}}>
            {data?.map(transaction => {
                return (
                    <TransactionBlock 
                    id={transaction.id}
                    from={transaction.from}
                    to={transaction.to}
                    amount={transaction.amount}
                    key={transaction.id}
                    />
                )
            })}
            </SimpleGrid>
        </Flex>
    )
}