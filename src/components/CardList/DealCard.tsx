import styles from "./CardList.module.css";

import type { DealDisplay } from "../../types/deal";
import type React from "react";

interface DealCardProps {
  deal: DealDisplay;
  statusClassName?: string;
}

const DealCard: React.FC<DealCardProps> = ({ deal, statusClassName }) => {
  const t12faint = `${styles.text} ${styles.t12} ${styles.faint}`;
  const t12dark = `${styles.text} ${styles.t12} ${styles.dark}`;

  return (
    <div className={`${styles.card} ${styles.cardDeal}`}>
      <div className={styles.row}>
        <span className={`${styles.text} ${styles.t14} ${styles.dark} ${styles.flex1}`}>
          {deal.title}
        </span>
        <span className={`${styles.text} ${styles.t12} ${statusClassName ?? ""}`}>
          {deal.status}
        </span>
      </div>

      <div className={`${styles.row} ${styles.rowStart} ${styles.gap6}`}>
        <span className={`${styles.text} ${styles.t14} ${styles.dark} ${styles.flex1}`}>
          {deal.client}
        </span>
        <span
          className={`${styles.text} ${styles.t14} ${styles.bold} ${styles.dark} ${styles.right}`}
        >
          {deal.amount}
        </span>
      </div>

      {deal.description && (
        <div className={styles.row}>
          <span className={`${styles.text} ${styles.t12} ${styles.muted} ${styles.flex1}`}>
            {deal.description}
          </span>
        </div>
      )}

      <div className={`${styles.row} ${styles.rowStart} ${styles.gap12}`}>
        <div className={`${styles.col} ${styles.flex1} ${styles.gap2}`}>
          <span className={t12faint}>создана</span>
          <span className={t12dark}>{deal.createdAt}</span>
        </div>
        <div className={`${styles.col} ${styles.colAuto} ${styles.rowEnd} ${styles.gap2}`}>
          <span className={t12faint}>завершена</span>
          <span className={`${t12dark} ${styles.right}`}>{deal.completedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
