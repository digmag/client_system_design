import { Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { Transaction } from "./data";
import Bill from "../../shared/assets/atoms/BillCard";
import { formatAmount } from "../../shared/lib/js";

export const TransactionBlock = ({id:transactionId, from, to, amount}:Transaction) => {
    const {id} = useParams();
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