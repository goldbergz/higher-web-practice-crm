import React from "react";

import styles from "./Sidebar.module.css";

interface SidebarListProps {
  children: React.ReactNode;
}

const SidebarList: React.FC<SidebarListProps> = ({ children }) => (
  <nav aria-label="Основная навигация" className={styles.nav}>
    <ul className={styles.list}>{children}</ul>
  </nav>
);

export default SidebarList;
