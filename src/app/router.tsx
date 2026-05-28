import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/MainLayout/MainLayout";
import ClientsPage from "../pages/ClientsPage/ClientsPage";
import DealsPage from "../pages/DealsPage/DealsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ReportsPage from "../pages/ReportsPage/ReportsPage";
import TasksPage from "../pages/TasksPage/TasksPage";

export const router = createBrowserRouter([
  { element: <LoginPage />, path: "/" },
  { element: <LoginPage />, path: "/login" },
  { element: <RegisterPage />, path: "/register" },
  {
    children: [
      { element: <MainPage />, path: "/main" },
      { element: <ClientsPage />, path: "/clients" },
      { element: <DealsPage />, path: "/deals" },
      { element: <ReportsPage />, path: "/reports" },
      { element: <TasksPage />, path: "/tasks" },
      { element: <ProfilePage />, path: "/profile" },
    ],
    element: <MainLayout />,
  },
]);
