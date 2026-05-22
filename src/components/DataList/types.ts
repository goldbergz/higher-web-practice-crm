export type SortDirection = "asc" | "desc";

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
  minWidth?: string;
  flex?: string;
  className?: string;
   align?: "left" | "right" | "center";
};

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
};
