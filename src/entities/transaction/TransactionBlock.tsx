import { Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

type BillType = "SAVING" | "NORMAL" | "CREDIT";
type BillStatus = "OPEN" | "CLOSED" | "BLOCKED";

interface Bill{
    id: string,
    userId: string,
    amount: number,
    type: BillType,
    status: BillStatus,
    name: string
}

export interface Transaction{
    id:string
    from: Bill
    to: Bill
    amount: number
}

const formatAmount=(amount: number)=>{
    const strAmount = String(amount).split(".")
    const left = strAmount[0] || '00'
    const right = strAmount[1] || '00'
    return Number(`${left}.${right.slice(0,2)}`)
}

export const TransactionBlock = ({id:transactionId, from, to, amount}:Transaction) => {
    const {id} = useParams()
    return (
        <Card withBorder>
            <SimpleGrid cols={3}>
                <Group>
                    <Text>{from === null || from.id===id?"Пополнение":"Списание"}</Text>
                </Group>
                {from ? <Bill {...from} />:<div></div>}
                <Group>
                    <Badge color={from === null || from.id===id?'green': 'red'} size='xl'>{formatAmount(amount)}₽</Badge>
                </Group>
            </SimpleGrid>
        </Card>
    )
}

export const Bill = ({
    name,
    type,
    status,
    ...rst
}: Transaction['from']) => {
    return (
        <Card>
            <Group>
                <Text>{name} <TypeBadge type={type} /> <StatusBadge status={status}/></Text>
            </Group>
        </Card>
    )
}

export const TypeBadge = ({type}:Pick<Transaction['from'], 'type'>)=>{
    if(type === 'NORMAL')
        return <Badge color='yellow'>Основной</Badge>
    if(type === 'CREDIT')
        return <Badge color='blue'>Кредитный</Badge>
    return <Badge color='lime'>Сберегательный</Badge>
}

export const StatusBadge = ({status}:Pick<Transaction['from'], 'status'>) => {
    if(status === 'OPEN')
        return <Badge color='green'>Открыт</Badge>
    if(status === 'BLOCKED')
        return <Badge color='red'>Заблокирован</Badge>
    return <Badge color='red'>Закрыт</Badge>
}