
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Transfer from "../pages/transfer";
import Deposit from "../pages/deposit";
import  PrivateRoute from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/transfer",
    element: (
      <PrivateRoute>
        <Transfer />
      </PrivateRoute>
    ),
  },
   {
    path: "/deposit",
    element: (
      <PrivateRoute>
        <Deposit />
      </PrivateRoute>
    ),
  },
  
]);