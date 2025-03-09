import { useForm, Controller } from "react-hook-form";
import { TextInput, Select, Button, PasswordInput, Box, LoadingOverlay, Title, Paper } from "@mantine/core";
import { useLazyAutorizationQuery } from "../api/api";
import { AutorizationFormProps } from "../api/data";
import { useNavigate } from "react-router-dom"; 
import { useMyContext } from "../../../app/contexts";
import { toast } from "react-toastify"
import { useState } from "react";

export function Login() {

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
    

    return (
        <Paper shadow="xs" p="xl" style={{ width: '30vw' }}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Title order={2}>Вход</Title>
            <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Логин обязателен' }}
            render={({ field }) => (
                <TextInput
                {...field}
                label="Логин"
                placeholder="Введите ваш логин"
                mt="xs"
                />
            )}
            />

            <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Пароль обязателен' }}
            render={({ field }) => (
                <PasswordInput
                {...field}
                label="Пароль"
                placeholder="Введите ваш пароль"
                mt="xs"
                />
            )}
            />

            <Button type="submit" disabled={!isValid} color="violet" mt="xl" fullWidth>Войти</Button>

            </form>
        </Paper>
        
    );
}