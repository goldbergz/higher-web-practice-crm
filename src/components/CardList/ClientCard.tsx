import styles from "./CardList.module.css";

import type { Client } from "../../types";
import type React from "react";

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const t12dark = `${styles.text} ${styles.t12} ${styles.dark}`;

  return (
    <div className={`${styles.card} ${styles.cardClient}`}>
      <div className={styles.row}>
        <span
          className={`${styles.text} ${styles.t14} ${styles.bold} ${styles.dark} ${styles.flex1}`}
        >
          {client.name}
        </span>
        <span className={`${styles.text} ${styles.t12} ${styles.muted} ${styles.right}`}>
          {client.createdAt}
        </span>
      </div>

      <div className={`${styles.col} ${styles.gap4}`}>
        <div className={`${styles.row} ${styles.rowBaseline} ${styles.gap16}`}>
          <span className={`${t12dark} ${styles.flex1}`}>{client.phone}</span>
          <span className={`${styles.text} ${styles.t14} ${styles.dark}`}>
            {client.company}
          </span>
        </div>
        <div className={`${styles.row} ${styles.rowStart} ${styles.gap16}`}>
          <span className={`${styles.text} ${styles.t12} ${styles.blue} ${styles.flex1}`}>
            {client.email}
          </span>
          {client.website && <span className={t12dark}>{client.website}</span>}
        </div>
      </div>

      {client.comment && (
        <span className={`${styles.text} ${styles.t12} ${styles.muted}`}>
          {client.comment}
        </span>
      )}
    </div>
  );
};

export default ClientCard;
