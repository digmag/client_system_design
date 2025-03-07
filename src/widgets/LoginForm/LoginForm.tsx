import { useForm, Controller } from "react-hook-form";
import { TextInput, Select, Button, PasswordInput, Box, LoadingOverlay, Title, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function LoginForm() {
    const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({
        mode: 'onChange' // Устанавливаем режим валидации на 'onChange'
    });

    const onSubmit = (data: any) => console.log(data);
    const [visible, { toggle }] = useDisclosure(false);

    return (
        <Paper shadow="xs" p="xl" >
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Title order={2}>Вход</Title>
            <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Логин обязателен' }}
            render={({ field }) => (
                <TextInput
                {...field}
                label="Логин"
                placeholder="Введите ваш логин"
                mt="xs"
                // error={errors.username && errors.username.message}
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