import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => (
  <div className={styles.layout}>
    <Sidebar avatarSrc="https://placehold.co/40x40" userName="Yaropolk" />
    <main className={styles.content}>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
