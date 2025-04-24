import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Header } from "../../features/Header"
import { AuthProvider } from "../../shared/lib"

export function Layout() {
  return (
    <AuthProvider>
    <AppShell w={'100%'}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main w={'100%'} m={'xl'} style={{justifyContent:'center', display:'flex'}}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
    </AuthProvider>
  )
}