import { useDisclosure } from "@mantine/hooks";
import { useMyContext } from "../../../shared/lib";
import { useSetThemeMutation } from "../../../shared/api/theme";

export const useHeader = () =>{
    const { isAuth, setIsAuth } = useMyContext();  
    const [opened, { toggle }] = useDisclosure(false);

    const [setThemeTrigger] = useSetThemeMutation();

    const handleLogout = () => {
        setThemeTrigger({theme:localStorage.getItem('mantine-color-scheme-value')!})
        localStorage.clear(); 
        sessionStorage.clear(); 
        setIsAuth(false);
    };
    return{
        isAuth, opened, toggle, handleLogout
    }
}