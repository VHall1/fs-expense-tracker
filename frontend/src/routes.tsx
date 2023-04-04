import { createBrowserRouter, redirect } from "react-router-dom";
import { Accounts } from "./pages/accounting/accounts";
import { Login } from "./pages/auth/login";
import { Layout } from "./shared-components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "accounting",
    element: <Layout />,
    children: [
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "accounts/:accountId",
        element: <div>Account details</div>,
      },
      {
        path: "accounts/:accountId/transactions",
        element: <div>Account transactions</div>,
      },
      {
        index: true,
        loader: () => redirect("accounts"),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        loader: () => redirect("login"),
      }
    ],
  },
]);
