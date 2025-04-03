import { MantineColorScheme, Switch, useMantineColorScheme } from "@mantine/core"
import { useEffect, useState } from "react"

export const ThemeSwitcher = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const [checked, setChecked] = useState<boolean>(false)
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        setColorScheme(theme as MantineColorScheme)
        if((theme as MantineColorScheme) === 'dark'){
            setChecked(true)
        }
    },[])
    useEffect(()=>{
        setColorScheme(checked?'dark':'light')
        localStorage.setItem('theme', colorScheme)
    }, [checked])
    return (
        <Switch
            label='Сменить тему'
            defaultChecked={checked}
            onChange={e => setChecked(e.currentTarget.checked)}
        />
    )
}