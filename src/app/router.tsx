import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
  { element: <LoginPage />, path: "/" },
  { element: <LoginPage />, path: "/login" },
  { element: <ProfilePage />, path: "/profile" },
  { element: <RegisterPage />, path: "/register" },
]);
