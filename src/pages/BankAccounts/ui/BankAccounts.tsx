import { TextInput, NumberInput, Button, Title, Paper, Table, Group } from "@mantine/core";
import { useBankAccount } from "../hooks";


export default function BankAccounts() {
    const {billName, setBillName, handleCreateBill, isLoading, bills, navigate, amounts, setAmounts, handleAction, isError} = useBankAccount();
    return (
        <Paper shadow="xs" p="xl" style={{ width: '66vw' }}>
           
            <Title order={2}>Мои счета</Title>
            <div>
                <Group align="flex-end" m="xl">
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Название счета</label>
                        <TextInput
                            value={billName}
                            onChange={(event) => setBillName(event.currentTarget.value)}
                            placeholder="Введите название счета"
                        />
                    </div>
                    <Button onClick={() => handleCreateBill({ name: billName, type: "NORMAL" })}>Создать счет</Button>
                </Group>
            </div>

            <div>
            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка при загрузке счетов.</p>}

            {bills && (
                <Table striped highlightOnHover mt="xl">
                    <thead>
                        <tr>
                            <th>Название счета</th>
                            <th>Тип</th>
                            <th>Статус</th>
                            <th>Баланс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.id}>
                                <td onClick={() => navigate(`/bill-history/${bill.id}`)} style={{ cursor: 'pointer', color: 'blue' }}>
                                        {bill.name}
                                    </td>
                                <td>{bill.type}</td>
                                <td>{bill.status}</td>
                                <td>{bill.amount}</td>
                                <td >
                                    <Group align="flex-end" m="xs">
                                    {bill.status !== 'CLOSED' && (
                                        <>
                                                <NumberInput
                                            value={amounts[bill.id] || 0}
                                            onChange={(value) => setAmounts(prev => ({ ...prev, [bill.id]: value !== undefined ? Number(value) : 0 }))} // Преобразуем значение в число
                                            placeholder="Сумма"
                                            min={0}
                                        />
                                        <Button onClick={() => handleAction(bill.id, 'topup')} color="teal">Пополнить</Button>
                                        <Button onClick={() => handleAction(bill.id, 'topdown')} color="violet">Снять</Button>
                                        <Button onClick={() => handleAction(bill.id, 'close')} color="gray">Закрыть</Button>
                                        </>
                                    )}
                                    </Group>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </div> 
        </Paper>
    )
}