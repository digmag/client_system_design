import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Header } from "../../features/Header"
import { AuthProvider } from "../../shared/lib"

// import { Navigation } from "../../features/navigation"

export function Layout() {
  return (
    <AuthProvider>
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main m="xl">
        <Outlet />
      </AppShell.Main>
    </AppShell>
    </AuthProvider>
  )
}