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
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
      path: "/product/:id",
      element: <DetailProduct />,
    },
    {
      path: "/Checkout",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/History",
      element: (
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      ),
    },
    {
      path: "/DetailOrder",
      element: (
        <ProtectedRoute>
          <DetailOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Dashboard",
      element: <DashboardAdmin />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
