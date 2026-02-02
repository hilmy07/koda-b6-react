import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Product from "./pages/Product";
import HomeLayout from "./layouts/HomeLayout";
import DetailProduct from "./pages/DetailProduct";
import Checkout from "./pages/Checkout";
import History from "./pages/History";
import DetailOrder from "./pages/DetailOrder";
import Profile from "./pages/Profile";
import DashboardAdmin from "./pages/DashboardAdmin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/auth/new",
      element: <Register />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/auth/forgot",
      element: <ForgotPassword />,
    },
    {
      path: "/Product",
      element: <Product />,
    },
    {
      path: "/DetailProduct",
      element: <DetailProduct />,
    },
    {
      path: "/Checkout",
      element: <Checkout />,
    },
    {
      path: "/History",
      element: <History />,
    },
    {
      path: "/DetailOrder",
      element: <DetailOrder />,
    },
    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/Dashboard",
      element: <DashboardAdmin />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
