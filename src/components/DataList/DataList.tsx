import type React from "react";

import type { ColumnConfig, SortConfig } from "./types";
import DataListHeader from "./DataListHeader";
import DataListRow from "./DataListRow";
import styles from "./DataList.module.css";

interface DataListProps<T> {
  columns: ColumnConfig<T>[];
  getItemId: (item: T) => string;
  isItemDeleted?: (item: T) => boolean;
  items: T[];
  onItemClick?: (item: T) => void;
  onSort: (key: keyof T) => void;
  sortConfig: SortConfig<T> | null;
}

function DataList<T>({
  columns,
  getItemId,
  isItemDeleted,
  items,
  onItemClick,
  onSort,
  sortConfig,
}: DataListProps<T>): React.ReactElement {
  return (
    <div role="table">
      <DataListHeader
        columns={columns}
        onSort={onSort}
        sortConfig={sortConfig}
      />
      <div className={styles.list} role="rowgroup">
        {items.map((item) => (
          <DataListRow
            columns={columns}
            isDeleted={isItemDeleted?.(item)}
            item={item}
            key={getItemId(item)}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default DataList;
