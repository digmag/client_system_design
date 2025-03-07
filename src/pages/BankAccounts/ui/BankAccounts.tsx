import { useForm, Controller } from "react-hook-form";
import { TextInput, Select, Button, PasswordInput, Box, LoadingOverlay, Title, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCreateBillMutation } from "../api/createBill";
import { CreateBillRequest } from "../api/types";


export function BankAccounts() {

    const [createBill] = useCreateBillMutation();

    function handleCreateBill(values: CreateBillRequest) {
        console.log("creaaaate");
        toggle(); // Показываем загрузку
        try {
            const response = createBill(values).unwrap();
            console.log("Счет создан:", response);
        } catch (err) {
            console.error("Ошибка при создании счета:", err);
        } finally {
            toggle(); // Скрываем загрузку
        }
    }

    const [visible, { toggle }] = useDisclosure(false);

    return (
        <Paper shadow="xs" p="xl" style={{ width: '66vw' }}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Title order={2}>Мои счета</Title>
            <Button onClick={() => handleCreateBill({name:"Тестовый счет2",type:"NORMAL"})}>Создать счет</Button>
            
        </Paper>
    )
}