import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Header } from "../../features/Header"

export function Layout() {
  return (
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main m="xl">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}