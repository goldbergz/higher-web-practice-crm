import styles from "./DataList.module.css";

import type { ColumnConfig } from "./types";
import type React from "react";

interface DataListRowProps<T> {
  columns: ColumnConfig<T>[];
  getCellClassName?: (item: T, key: keyof T) => string | undefined;
  isDeleted?: boolean;
  item: T;
  onClick?: (item: T) => void;
  rowClassName?: string;
}

function DataListRow<T>({
  columns,
  getCellClassName,
  isDeleted = false,
  item,
  onClick,
  rowClassName,
}: DataListRowProps<T>): React.ReactElement {
  const rowClasses = [
    styles.row,
    isDeleted ? styles.rowDeleted : "",
    rowClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rowClasses}
      role="row"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(item);
        }
      }}
    >
      {columns.map((column) => {
        const value = item[column.key];
        const customCellClass = getCellClassName?.(item, column.key) ?? "";
        const cellClasses = [
          styles.cell,
          column.className
            ? ((styles as Record<string, string>)[column.className] ?? "")
            : "",
          isDeleted ? styles.cellDeleted : "",
          customCellClass,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={String(column.key)}
            className={cellClasses}
            role="cell"
            style={{
              flex: column.flex,
              justifyContent:
                column.align === "right"
                  ? "flex-end"
                  : column.align === "center"
                    ? "center"
                    : "flex-start",
              maxWidth: column.maxWidth,
              textAlign: column.align ?? "left",
            }}
            title={String(value ?? "")}
          >
            {column.renderCell ? column.renderCell(item) : String(value ?? "")}
          </div>
        );
      })}
    </div>
  );
}

export default DataListRow;
