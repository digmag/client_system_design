import { Badge } from "@mantine/core"
import { Transaction } from "../../../entities/transaction/data"

const TypeBadge = ({type}:Pick<Transaction['from'], 'type'>)=>{
    if(type === 'NORMAL')
        return <Badge color='yellow'>Основной</Badge>
    if(type === 'CREDIT')
        return <Badge color='blue'>Кредитный</Badge>
    return <Badge color='lime'>Сберегательный</Badge>
}

export default TypeBadge;