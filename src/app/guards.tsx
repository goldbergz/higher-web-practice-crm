import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../store";
import { selectIsAuthenticated } from "../store/userSlice";

import type React from "react";

export const RequireAuth: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return <Outlet />;
};

export const RedirectIfAuth: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (isAuthenticated) return <Navigate replace to="/main" />;
  return <Outlet />;
};
