import React from "react";

import styles from "./Logo.module.css";

const Logo: React.FC = () => (
  <div className={styles.wrapper}>
    <svg
      aria-hidden="true"
      className={styles.icon}
      fill="none"
      height="36"
      viewBox="0 0 36 36"
      width="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#1e293b" height="36" rx="8" width="36" />
      <path
        d="M10 10 L18 18 L10 26"
        stroke="#2563eb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      <path
        d="M18 10 L26 18 L18 26"
        stroke="#60a5fa"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
    </svg>
    <span className={styles.wordmark}>
      Ya<span className={styles.wordmarkAccent}>Plex</span>
    </span>
  </div>
);

export default Logo;