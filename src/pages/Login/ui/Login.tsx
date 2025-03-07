import { useForm, Controller } from "react-hook-form";
import { TextInput, Select, Button, PasswordInput, Box, LoadingOverlay, Title, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLazyAutorizationQuery } from "../api/api";
import { AutorizationFormProps } from "../api/data";
import { useNavigate } from "react-router-dom"; 

export function Login() {

    const navigate = useNavigate();

    const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
        mode: 'onChange', // Устанавливаем режим валидации на 'onChange'
        defaultValues: {
            email : "",
            password: "",
        } 
    });
    const [trigger] = useLazyAutorizationQuery()
    const [visible, { toggle }] = useDisclosure(false);

    const onSubmit = (values: AutorizationFormProps) => {
        toggle();
        trigger(values).unwrap().then(data=>{
            localStorage.setItem("refresh", data.refreshToken)
            sessionStorage.setItem("access", data.accessToken)
            console.log("Успешно вошли")
            navigate('/loans');
        }).catch(error=>{
            console.log("Не удалось войти", values)
            
        })
    };
    

    

    return (
        <Paper shadow="xs" p="xl" style={{ width: '30vw' }}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
                // error={errors.username && errors.email.message}
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
                // error={errors.password && errors.password.message}
                />
            )}
            />

            <Button type="submit" disabled={!isValid} color="violet" mt="xl" fullWidth>Войти</Button>

            </form>
        </Paper>
        
    );
}