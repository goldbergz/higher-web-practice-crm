import React from "react";
import { Outlet } from "react-router-dom";

import { useAppSelector } from "../../store";
import { selectCurrentUser } from "../../store/userSlice";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className={styles.layout}>
      <Sidebar
        accName={currentUser?.accName ?? "User"}
        avatarSrc="https://placehold.co/40x40"
      />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
