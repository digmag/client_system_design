import { Controller } from "react-hook-form";
import { TextInput, Button, PasswordInput, LoadingOverlay, Title, Paper } from "@mantine/core";
import { useLogin } from "../hooks";

export function Login() {
    const {loading, handleSubmit, onSubmit, control, isValid} = useLogin();
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