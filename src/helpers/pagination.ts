export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number,
): T[] => {
  const start = (page - 1) * pageSize;
  return data.slice(start, start + pageSize);
};

export const getTotalPages = (totalItems: number, pageSize: number): number =>
  Math.max(1, Math.ceil(totalItems / pageSize));
