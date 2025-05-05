import { useState } from "react";
import { useCloseBillMutation, useCreateBillMutation, useGetMyBillsQuery, useTopDownBillMutation, useTopUpBillMutation } from "../api/api";
import { CreateBillRequest } from "../api/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { keyGen } from "../../../shared/lib/KeyGen";

export const useBankAccount = () => {
    const { data: bills, isLoading, isError, isSuccess } = useGetMyBillsQuery();
    
        const [createBill] = useCreateBillMutation();
        console.log(keyGen.currentKey)
    
        const [topUpBill] = useTopUpBillMutation();
        const [topDownBill] = useTopDownBillMutation();
        const [closeBill] = useCloseBillMutation();
    
        const [billName, setBillName] = useState(""); 
    
        const [amounts, setAmounts] = useState<{ [key: string]: number }>({});
    
        function handleCreateBill(values: CreateBillRequest) {   
            const response = createBill(values).unwrap().then(data => {
                console.log(response)
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
                topUpBill({ id: billId, amount}).unwrap().then(() => {
                    toast.success("Счет успешно пополнен");
                }).catch(error => {
                    console.error("Ошибка при пополнении счета:", error);
                    toast.error("Не удалось пополнить счет");
                });
            } else if (actionType === 'topdown') {
                topDownBill({ id: billId, amount}).unwrap().then(() => {
                    toast.success("Счет успешно снят");
                }).catch(error => {
                    console.error("Ошибка при снятии со счета:", error);
                    toast.error("Не удалось снять со счета");
                });
            } else if (actionType === 'close') {
                closeBill({ id: billId}).unwrap().then(() => {
                    toast.success("Счет успешно закрыт");
                }).catch(error => {
                    console.error("Ошибка при закрытии счета:", error);
                    toast.error("Не удалось закрыть счет");
                });
            }
        };
    
        const navigate = useNavigate();
        return{
            billName, setBillName, handleCreateBill, isLoading, bills, navigate, amounts, setAmounts, handleAction, isError
        }
}