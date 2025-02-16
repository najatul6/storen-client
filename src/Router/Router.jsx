import AuthLayout from "@/Layout/AuthLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
import RootLayout from "@/Layout/RootLayout";
import LogIn from "@/pages/Common/Auth/LogIn";
import Register from "@/pages/Common/Auth/Register";
import Error from "@/pages/Common/Error/Error";
import UserAccount from "@/pages/Common/UserAccount/UserAccount";
import Overview from "@/pages/DashboardView/Overview/Overview";
import UserControls from "@/pages/DashboardView/AdminView/UserControls/UserControls";
import About from "@/pages/RootView/About/About";
import Home from "@/pages/RootView/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import UnAuthorization from "@/pages/Common/UnAuthorization/UnAuthorization";
import PrivateRoute from "./PrivateRoute";
import Shop from "@/pages/RootView/Shop/Shop";
import GiftCard from "@/pages/RootView/GiftCard/GiftCard";
import Subscription from "@/pages/RootView/Subscription/Subscription";
import PrivacyPolicy from "@/components/RootView/PrivacyPolicy/PrivacyPolicy";
import CheckOut from "@/components/RootView/CheckOut/CheckOut";
import MyOrders from "@/pages/DashboardView/UserView/MyOrders";
import NewOrders from "@/pages/DashboardView/AdminView/NewOrders/NewOrders";
import ProcessingOrders from "@/pages/DashboardView/AdminView/ProcessingOrders/ProcessingOrders";
import CompletedOrders from "@/pages/DashboardView/AdminView/CompletedOrders/CompletedOrders";
import CategoriesControl from "@/pages/DashboardView/AdminView/CategoriesControl/CategoriesControl";
import ProductsControl from "@/pages/DashboardView/AdminView/ProductsControl/ProductsControl";
import ForgetPassword from "@/pages/Common/ForgetPassword/FogetPassword";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
      },
      {
        path: "gift-card",
        element: <GiftCard />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <UserAccount />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "users-control",
        element: (
          <AdminRoute>
            <UserControls />
          </AdminRoute>
        ),
      },
      {
        path: "categories-control",
        element: (
          <AdminRoute>
            <CategoriesControl />
          </AdminRoute>
        ),
      },
      {
        path: "products-control",
        element: (
          <AdminRoute>
            <ProductsControl />
          </AdminRoute>
        ),
      },
      {
        path: "process-orders",
        element: (
          <AdminRoute>
            <ProcessingOrders />
          </AdminRoute>
        ),
      },
      {
        path: "complete-orders",
        element: (
          <AdminRoute>
            <CompletedOrders />
          </AdminRoute>
        ),
      },
      {
        path: "new-orders",
        element: (
          <AdminRoute>
            <NewOrders />
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        element: <UserAccount />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/un-auth",
    element: <UnAuthorization />,
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <CheckOut />
      </PrivateRoute>
    ),
  },
  {
    path:"/forget-password",
    element: <ForgetPassword />
  }
]);

export default Router;
