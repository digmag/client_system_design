import {
    TextInput,
    NumberInput,
    Button,
    Title,
    Select,
    Container,
    Paper,
    Stack,
    Loader,
    Alert,
  } from "@mantine/core";
import { useTransaction } from "../hooks";
  
  export default function Transaction() {
    const {
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
    } = useTransaction();
  
    return (
      <Container p="xl">
        <Container size={420}>
          <Title order={2} mb="lg">
            Перевод другому пользователю
          </Title>
  
          {error && <Alert color="red" mb="md">{error}</Alert>}
  
          <Paper p="md" withBorder shadow="md" radius="md">
            <Stack>
              <Select
                label="Счет списания"
                placeholder="Выберите ваш счет"
                data={accounts}
                value={fromAccount}
                onChange={(value) => {
                    if (value) setFromAccount(value);
                  }}
                required
                rightSection={isLoading ? <Loader size={16} /> : null}
                rightSectionWidth={40}
                disabled={isLoading || isError}
              />
  
              <TextInput
                label="Счет получателя"
                placeholder="Введите номер счета получателя"
                value={recipientAccount}
                onChange={(event) => setRecipientAccount(event.currentTarget.value)}
                required
              />
  
              <NumberInput
                label="Сумма перевода"
                placeholder="Введите сумму"
                value={amount}
                onChange={(value) => setAmount(Number(value))}
                min={0}
                required
              />
  
              <Button
                onClick={handleTransfer}
                fullWidth
                loading={isSending}
                disabled={isSending}
              >
                Перевести
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Container>
    );
  }
  