import styles from "./DataList.module.css";

import type { ColumnConfig, SortConfig } from "./types";
import type React from "react";

interface DataListHeaderProps<T> {
  columns: ColumnConfig<T>[];
  onSort?: (key: keyof T) => void;
  sortConfig: SortConfig<T> | null;
}

const SortArrowDown = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 18 16"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.75 4L8.75 12L0.749998 4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const SortArrowUp = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 18 16"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.75 12L8.75 4L16.75 12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

function DataListHeader<T>({
  columns,
  onSort,
  sortConfig,
}: DataListHeaderProps<T>): React.ReactElement {
  return (
    <div className={styles.header} role="row">
      {columns.map((column) => {
        const isActive = sortConfig?.key === column.key;
        const isAsc = isActive && sortConfig?.direction === "asc";

        return (
          <div
            key={String(column.key)}
            aria-sort={
              isActive
                ? sortConfig?.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className={[
              styles.headerCell,
              isActive ? styles.headerCellActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="columnheader"
            style={{
              flex: column.flex,
              minWidth: column.minWidth,
              textAlign: column.align ?? "left",
              justifyContent:
                column.align === "right"
                  ? "flex-end"
                  : column.align === "center"
                    ? "center"
                    : "flex-start",
            }}
            onClick={() => onSort?.(column.key)}
          >
            <span>{column.label}</span>
            {onSort && (
              <span className={styles.sortIcon}>
                {isActive && isAsc ? <SortArrowUp /> : <SortArrowDown />}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DataListHeader;
