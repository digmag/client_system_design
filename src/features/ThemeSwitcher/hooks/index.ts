import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { useLazyGetThemeQuery, useSetThemeMutation } from "../../../shared/api/theme";
import { useMyContext } from "../../../shared/lib";
import { useEffect, useState } from "react";

export const useThemeSwitcher = () => {
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
        //const theme = checked?'dark':'light'
        // setThemeTrigger({theme:theme})
        // console.log(checked)
    }, [checked])

    useEffect(() =>{
        if(isAuth){
            trigger().unwrap().then(data => {
                setColorScheme(data.theme as MantineColorScheme)
                setChecked(data.theme==='dark'?true:false)
            })
        }
        else{
            localStorage.clear()
            sessionStorage.clear()
        }
    }, [isAuth])

    useEffect(() => {
        const handleBeforeUnload = () => {
            const theme = localStorage.getItem('mantine-color-scheme-value');
            if (theme) {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/theme", false); // ← false делает запрос синхронным
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({ theme }));
            }
    
            localStorage.clear();
            sessionStorage.clear();
            setChecked(false);
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return{
        checked, setChecked
    }
}