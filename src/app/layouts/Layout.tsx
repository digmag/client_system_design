import { AppShell } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Header } from "../../features/Header"

// import { Navigation } from "../../features/navigation"

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