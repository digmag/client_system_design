import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../shared/consts";
import { Login } from "../../pages/Login";
import { Main } from "../../pages/Main";
import { Layout } from "../layouts";
import { Loans } from "../../pages/Loans/ui/Loans";
import { BankAccounts } from "../../pages/BankAccounts/ui/BankAccounts";
import { BillHistory } from "../../pages/BillHistory/ui/BillHistory";

const router = createBrowserRouter([
    {
        path: ROUTES.MAIN,
        element: <Layout />,
        children: [
            {
              index: true,
              element: <Main />,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
              path: ROUTES.LOANS,
              element: <Loans />,
            },
            {
              path: ROUTES.BANKACCOUNTS,
              element: <BankAccounts />,
            },

            {
              path: ROUTES.BILLHISTORY,
              element: <BillHistory />,
            },

          ],
        
    }
])

export function AppRouter() {
    return <RouterProvider router={router} />
  }