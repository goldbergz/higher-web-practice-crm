import type React from "react";

import type { ColumnConfig } from "./types";
import styles from "./DataList.module.css";

interface DataListRowProps<T> {
  columns: ColumnConfig<T>[];
  isDeleted?: boolean;
  item: T;
  onClick?: (item: T) => void;
}

function DataListRow<T>({
  columns,
  isDeleted = false,
  item,
  onClick,
}: DataListRowProps<T>): React.ReactElement {
  return (
    <div
      className={[styles.row, isDeleted ? styles.rowDeleted : ""]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onClick?.(item)}
      role="row"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(item);
        }
      }}
    >
      {columns.map((column) => {
        const value = item[column.key];
        const cellClasses = [
          styles.cell,
          column.className
            ? (styles as Record<string, string>)[column.className] ?? ""
            : "",
          isDeleted ? styles.cellDeleted : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            className={cellClasses}
            key={String(column.key)}
            role="cell"
            style={{
              flex: column.flex,
              width: column.width,
            }}
            title={String(value ?? "")}
          >
            {String(value ?? "")}
          </div>
        );
      })}
    </div>
  );
}

export default DataListRow;
