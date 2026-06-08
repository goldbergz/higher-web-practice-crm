import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Sidebar.module.css";

interface SidebarItemProps {
  icon: React.ReactNode;
  isExpanded: boolean;
  label: string;
  path: string;
  onNavigate?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  isExpanded,
  label,
  path,
  onNavigate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(path);
    onNavigate?.();
  };

  return (
    <li className={styles.item}>
      <a
        className={`${styles.itemLink} ${isExpanded ? styles.itemLinkExpanded : styles.itemLinkCollapsed} ${isActive ? styles.itemLinkActive : ""}`}
        href={path}
        onClick={handleClick}
      >
        <span className={styles.itemIcon}>{icon}</span>
        {isExpanded && (
          <span
            className={`${styles.itemLabel} ${isActive ? styles.itemLabelActive : ""}`}
          >
            {label}
          </span>
        )}
      </a>
    </li>
  );
};

export default SidebarItem;
