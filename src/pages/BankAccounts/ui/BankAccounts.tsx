import { TextInput, NumberInput, Button, Title, Paper, Table, Group } from "@mantine/core";
import { useCloseBillMutation, useCreateBillMutation, useGetMyBillsQuery, useTopDownBillMutation, useTopUpBillMutation } from "../api/api";
import { CreateBillRequest } from "../api/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function BankAccounts() {

    const { data: bills, isLoading, isError } = useGetMyBillsQuery();

    const [createBill] = useCreateBillMutation();

    const [topUpBill] = useTopUpBillMutation();
    const [topDownBill] = useTopDownBillMutation();
    const [closeBill] = useCloseBillMutation();

    const [billName, setBillName] = useState(""); 

    const [amounts, setAmounts] = useState<{ [key: string]: number }>({});

    function handleCreateBill(values: CreateBillRequest) {
        console.log("creaaaate");
        
        
            const response = createBill(values).unwrap().then(data => {
                toast.success("Счет успешно создан");
                console.log("Счет создан:", response);
                setBillName("");
            }).catch(error => {
                console.error("Ошибка при создании счета:", error);
                toast.error("Не удалось создать счет");
            });
       
    }

    const handleAction = (billId: any, actionType: any) => {
        const amount = amounts[billId] || 0; // Получаем сумму для конкретного счета
        if (actionType === 'topup') {
            topUpBill({ id: billId, amount }).unwrap().then(() => {
                toast.success("Счет успешно пополнен");
            }).catch(error => {
                console.error("Ошибка при пополнении счета:", error);
                toast.error("Не удалось пополнить счет");
            });
        } else if (actionType === 'topdown') {
            topDownBill({ id: billId, amount }).unwrap().then(() => {
                toast.success("Счет успешно снят");
            }).catch(error => {
                console.error("Ошибка при снятии со счета:", error);
                toast.error("Не удалось снять со счета");
            });
        } else if (actionType === 'close') {
            closeBill({ id: billId }).unwrap().then(() => {
                toast.success("Счет успешно закрыт");
            }).catch(error => {
                console.error("Ошибка при закрытии счета:", error);
                toast.error("Не удалось закрыть счет");
            });
        }
    };

    const navigate = useNavigate();


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