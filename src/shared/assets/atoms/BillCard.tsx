import { Card, Group, Text } from "@mantine/core"
import { Transaction } from "../../../entities/transaction/data"
import TypeBadge from "./TypeBadge"
import StatusBadge from "./StatusBadge"

const Bill = ({ name, type, status, ...rst }: Transaction['from']) => {
    return (
        <Card>
            <Group>
                <Text>{name} <TypeBadge type={type} /> <StatusBadge status={status}/></Text>
            </Group>
        </Card>
    )
}

export default Bill;