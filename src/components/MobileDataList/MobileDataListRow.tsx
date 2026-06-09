import styles from "./MobileDataList.module.css";

import type React from "react";

interface MobileDataListRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function MobileDataListRow({
  children,
  className,
  onClick,
}: MobileDataListRowProps): React.ReactElement {
  return (
    <div
      className={[styles.card, className ?? ""].filter(Boolean).join(" ")}
      role="button"
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default MobileDataListRow;
