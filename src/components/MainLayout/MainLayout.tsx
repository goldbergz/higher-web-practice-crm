import React from "react";
import { Outlet } from "react-router-dom";

import {
  useGetClientsQuery,
  useGetDealsQuery,
  useGetTasksQuery,
  useGetUsersQuery,
} from "../../api";
import { useAppSelector } from "../../store";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../store/userSlice";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./MainLayout.module.css";

const DataLoader: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useGetClientsQuery(undefined, { skip: !isAuthenticated });
  useGetDealsQuery(undefined, { skip: !isAuthenticated });
  useGetTasksQuery(undefined, { skip: !isAuthenticated });
  useGetUsersQuery(undefined, { skip: !isAuthenticated });

  return null;
};

const MainLayout: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className={styles.layout}>
      <DataLoader />
      <Sidebar
        accName={currentUser?.accName ?? "User"}
        avatarSrc={currentUser?.avatar ?? "https://placehold.co/40x40"}
      />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
