export type SortDirection = "asc" | "desc";

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  minWidth?: string;
  flex?: string;
  className?: string;
  align?: "left" | "right" | "center";
  renderCell?: (item: T) => React.ReactNode;
};

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
};
