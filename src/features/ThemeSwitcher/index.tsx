import { MantineColorScheme, Switch, useMantineColorScheme, Box, Flex } from "@mantine/core"
import { useEffect, useState } from "react"
import { SunHigh, Moon } from 'tabler-icons-react';
import { useThemeProvider } from "../../shared/lib/ThemeProvider";
import { useMyContext } from "../../shared/lib";
import { useLazyGetThemeQuery, useSetThemeMutation } from "../../shared/api/theme";

export const ThemeSwitcher = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [setThemeTrigger] = useSetThemeMutation();
    const [trigger] = useLazyGetThemeQuery();
    const { isAuth, setIsAuth } = useMyContext();  
    
    const [checked, setChecked] = useState<boolean>(false)
    useEffect(() => {
        const theme = localStorage.getItem('mantine-color-scheme-value')
        setColorScheme(theme as MantineColorScheme)
        if((theme) === 'dark'){
            setChecked(true)
        }
    },[])

    useEffect(()=>{
        setColorScheme(checked?'dark':'light')
        const theme = checked?'dark':'light'
        setThemeTrigger({theme:theme})
        console.log(checked)
    }, [checked])

    useEffect(() =>{
        if(isAuth){
            trigger().unwrap().then(data => {
                console.log(data)
                setColorScheme(data.theme as MantineColorScheme)
                setChecked(data.theme==='dark'?true:false)
            })
        }
        else{
            localStorage.clear()
            sessionStorage.clear()
            setChecked(false)
        }
    }, [isAuth])

    useEffect(()=>{
        const handleBeforeUnload = () => {
            localStorage.clear()
            sessionStorage.clear()
            setChecked(false)
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return() => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    },[])

    return (
        <Box>
                <Flex align="center" style={{justifyContent:'center'}}>
                <SunHigh
                    size={26}
                    strokeWidth={1.5}
                    color={!checked ? 'black' : 'white'}
                    fill={!checked ? 'black' : 'none'}
                    style={{ marginRight: '0.5rem' }}
                />
                <Switch
                    size="md"
                    color="indigo"
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                />
                <Moon
                    size={26}
                    strokeWidth={1.5}
                    color={checked ? 'white' : 'black'}
                    fill={checked ? 'white' : 'none'}
                    style={{ marginLeft: '0.5rem' }}
                />
                </Flex>
            </Box>
    )
}