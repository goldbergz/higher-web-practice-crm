import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/MainLayout/MainLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
  { element: <LoginPage />, path: "/" },
  { element: <LoginPage />, path: "/login" },
  { element: <RegisterPage />, path: "/register" },
  {
    children: [{ element: <ProfilePage />, path: "/profile" }],
    element: <MainLayout />,
  },
]);
