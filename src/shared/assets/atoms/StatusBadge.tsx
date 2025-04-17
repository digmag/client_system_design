import { Badge } from "@mantine/core"
import { Transaction } from "../../../entities/transaction/data"

const StatusBadge = ({status}:Pick<Transaction['from'], 'status'>) => {
    if(status === 'OPEN')
        return <Badge color='green'>Открыт</Badge>
    if(status === 'BLOCKED')
        return <Badge color='red'>Заблокирован</Badge>
    return <Badge color='red'>Закрыт</Badge>
}

export default StatusBadge;