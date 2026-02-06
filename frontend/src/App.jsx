import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Wallet from "./pages/WalletPage";
import Transactions from "./pages/Transactions";
import SettingPage from "./pages/SettingPage";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },

    // 🔥 Layout wrapper
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path : "wallet",
          element : <Wallet/>
        },
        {
          path : "transactions",
          element : <Transactions/>
        },
        {
          path : "settings",
          element : <SettingPage/>
        },
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
