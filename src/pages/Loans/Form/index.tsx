import { Controller } from "react-hook-form"
import { Button, Flex, Select, TextInput, Title } from "@mantine/core"
import { useCreateForm } from "../hooks"

export const CreditCreateForm = () => {
    const {handleSubmit, onSubmit, control, data, isValid} = useCreateForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='column' gap='sm'>
                <Title order={2}>Создать кредитный счет</Title>
                <Controller 
                control={control}
                name='name'
                rules={{required:'true'}}
                render={({field: {value, ...rst}})=>{
                    return(
                        <TextInput placeholder="Название счета" defaultValue={value} label='Название кредитного счета' {...rst}/>
                    )
                }}
                />
                <Controller 
                control={control}
                name='amount'
                rules={{required:true}}
                render={({field :{value, ...rst}})=>{
                    return (
                        <TextInput placeholder='Сумма кредита' defaultValue={value} {...rst} label='Сумма кредита'  type='number'/>
                    )
                }}
                />
                <Controller 
                control={control}
                name='linkedBill'
                rules={{required: true}}
                render={({field:{value, ...rst}})=>{
                    return (
                        <Select defaultValue={value} placeholder='Выберете счет' label='Привязанный счет' {...rst}
                        data={data?.filter(bill => bill.type === 'NORMAL').map(bill => {
                            return {value: bill.id, label: bill.name}
                        })}
                        />
                    )
                }}
                />
                <Controller 
                control={control}
                name='to'
                rules={{required: true}}
                render={({field:{value, ...rst}})=>{
                    return (
                        <TextInput defaultValue={value} placeholder='Введите дату' label='Дата погашения кредита' {...rst} type='date'/>
                    )
                }}
                />
                <Button type='submit' disabled={!isValid}>Создать</Button>
            </Flex>
        </form>
    )
}