export type SortDirection = "asc" | "desc";

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  width?: string;
  flex?: string;
  className?: string;
};

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
};
