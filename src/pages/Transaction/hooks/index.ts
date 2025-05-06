import { useState } from "react";
import { toast } from "react-toastify";
import { useGetMyBillsQuery } from "../../BankAccounts/api/api";
import { useCreateTransactionMutation } from "../api/api";
import { v4 as uuid } from 'uuid';

export const useTransaction = () => {
  const [fromAccount, setFromAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { data: bills, isLoading, isError } = useGetMyBillsQuery();
  const [createTransaction, { isLoading: isSending }] = useCreateTransactionMutation();

  const accounts = bills?.map((bill) => ({
    value: bill.id,
    label: `${bill.id} - ${bill.amount}₽`,
  })) || [];

  const handleTransfer = async () => {
    if (!fromAccount || !recipientAccount || amount <= 0) {
      setError("Введите сумму больше 0 и заполните все поля.");
      return;
    }

    try {
      setError(null);

      await createTransaction({
        id: fromAccount,
        otherId: recipientAccount,
        amount,
        ik: uuid()
      }).unwrap();

      toast.success("Перевод выполнен успешно!");

      setFromAccount("");
      setRecipientAccount("");
      setAmount(0);
    } catch (e) {
      toast.error("Ошибка при выполнении перевода. Попробуйте снова.");
    }
  };

  return {
    fromAccount,
    setFromAccount,
    recipientAccount,
    setRecipientAccount,
    amount,
    setAmount,
    accounts,
    isLoading,
    isError,
    isSending,
    handleTransfer,
    error,
  };
};
