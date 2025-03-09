import { Container, Paper } from "@mantine/core";
import { CreditCreateForm } from "../Form";
import { Actual } from "../Actual";

export function Loans() {
    return (
        <Paper shadow="xs" p="xl" style={{ width: '66vw' }}>
            <Container>
                <Actual />
                <CreditCreateForm />
            </Container>
        </Paper>
        
    )
}