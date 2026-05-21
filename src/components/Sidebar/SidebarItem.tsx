import React from "react";

import styles from "./Sidebar.module.css";

interface SidebarItemProps {
  icon: React.ReactNode;
  isExpanded: boolean;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  isExpanded,
  label,
}) => (
  <li className={styles.item}>
    <a
      className={`${styles.itemLink} ${isExpanded ? styles.itemLinkExpanded : styles.itemLinkCollapsed}`}
      href="#"
    >
      <span className={styles.itemIcon}>{icon}</span>
      {isExpanded && <span className={styles.itemLabel}>{label}</span>}
    </a>
  </li>
);

export default SidebarItem;
