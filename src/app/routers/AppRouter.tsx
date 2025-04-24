import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../shared/consts";
import { Login } from "../../pages/Login";
import { Layout } from "../layouts";
import { lazy } from "react";

const Main = lazy(()=>import('../../pages/Main/ui/Main'))
const Loans = lazy(()=>import('../../pages/Loans/ui/Loans'))
const LoginFinish = lazy(()=>import('../../pages/LoginFinish/index'))
const BankAccounts = lazy(()=>import('../../pages/BankAccounts/ui/BankAccounts'))
const BillHistory = lazy(()=>import('../../pages/BillHistory/ui/BillHistory'))
const Transaction = lazy(()=>import('../../pages/Transaction/ui/Transaction'))

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
              path: ROUTES.LOGIN_FINISH,
              element: <LoginFinish />,
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

            {
              path: ROUTES.TRANSACTION,
              element: <Transaction />,
            },

          ],
        
    }
])

export function AppRouter() {
    return <RouterProvider router={router} />
  }