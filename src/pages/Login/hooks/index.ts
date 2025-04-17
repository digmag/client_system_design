import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../../shared/lib";
import { useForm } from "react-hook-form";
import { useLazyAutorizationQuery } from "../api/api";
import { useState } from "react";
import { AutorizationFormProps } from "../api/data";
import { toast } from "react-toastify";

export const useLogin = () => {
    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useMyContext();

    const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            email : "",
            password: "",
        } 
    });
    const [trigger] = useLazyAutorizationQuery()
    const [loading, setLoading] = useState(false);

    const onSubmit = (values: AutorizationFormProps) => {
        setLoading(true);
        trigger(values).unwrap().then(data => {
            localStorage.setItem("refresh", data.refreshToken);
            sessionStorage.setItem("access", data.accessToken);
            console.log("Успешно вошли");
            setIsAuth(true);
            navigate('/loans');
        }).catch(error => {
            console.log("Не удалось войти", values);
            toast.error("Не удалось войти");
        }).finally(() => {
            setLoading(false);
        });
    };

    return{
        loading, handleSubmit, onSubmit, control, isValid
    }
}