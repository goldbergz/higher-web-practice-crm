import styles from "./DataList.module.css";
import DataListHeader from "./DataListHeader";
import DataListRow from "./DataListRow";

import type { ColumnConfig, SortConfig } from "./types";
import type React from "react";


interface DataListProps<T> {
  columns: ColumnConfig<T>[];
  getCellClassName?: (item: T, key: keyof T) => string | undefined;
  getItemId: (item: T) => string;
  getRowClassName?: (item: T) => string | undefined;
  isItemDeleted?: (item: T) => boolean;
  items: T[];
  onItemClick?: (item: T) => void;
  onSort: (key: keyof T) => void;
  sortConfig: SortConfig<T> | null;
}

function DataList<T>({
  columns,
  getCellClassName,
  getItemId,
  getRowClassName,
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
        sortConfig={sortConfig}
        onSort={onSort}
      />
      <div className={styles.list} role="rowgroup">
        {items.map((item) => (
          <DataListRow
            key={getItemId(item)}
            columns={columns}
            getCellClassName={getCellClassName}
            isDeleted={isItemDeleted?.(item)}
            item={item}
            rowClassName={getRowClassName?.(item)}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default DataList;
