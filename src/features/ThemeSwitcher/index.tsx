import { Switch, Box, Flex } from "@mantine/core"
import { SunHigh, Moon } from 'tabler-icons-react';
import { useThemeProvider } from "../../shared/lib/ThemeProvider";
import { useMyContext } from "../../shared/lib";
import { useLazyGetThemeQuery, useSetThemeMutation } from "../../shared/api/theme";
import { useThemeSwitcher } from "./hooks";

export const ThemeSwitcher = () => {
    const {checked, setChecked} = useThemeSwitcher();

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