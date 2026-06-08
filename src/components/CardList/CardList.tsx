import styles from "./CardList.module.css";

import type React from "react";

interface CardListProps<T> {
  getItemId: (item: T) => string;
  items: T[];
  onItemClick?: (item: T) => void;
  renderCard: (item: T) => React.ReactNode;
}

function CardList<T>({
  getItemId,
  items,
  onItemClick,
  renderCard,
}: CardListProps<T>): React.ReactElement {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          key={getItemId(item)}
          className={styles.cardWrapper}
          role="button"
          tabIndex={0}
          onClick={() => onItemClick?.(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onItemClick?.(item);
            }
          }}
        >
          {renderCard(item)}
        </div>
      ))}
    </div>
  );
}

export default CardList;
