import { useNavigate } from "react-router-dom"
import { useGetMyBillsQuery } from "../../BankAccounts/api/api"
import { useCreateCreditBillMutation } from "../api"
import { CreateCreditFormProps } from "../Form/data"
import { useForm } from "react-hook-form"
import { ROUTES } from "../../../shared/consts"
import { toast } from "react-toastify"

export const useCreateForm = () => {
    const { data } = useGetMyBillsQuery()
    const [trigger] = useCreateCreditBillMutation()
    const navigate = useNavigate()
    const {control, formState:{isValid}, handleSubmit} = useForm<CreateCreditFormProps>()
    const onSubmit = (vals:CreateCreditFormProps) => {
        trigger(vals).unwrap().then(data => {
            navigate(ROUTES.BANKACCOUNTS)
            toast.success("Создан кредитный счет")
        }).catch(() => {
            toast.error('Не удалось создать кредитный счет')
        })
    }
    return{
        handleSubmit, onSubmit, control, data, isValid
    }
}