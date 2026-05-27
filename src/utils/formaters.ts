export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatAmount = (amount: number): string => {
  return amount.toLocaleString("ru-RU") + " \u20BD";
};

export const formatDueDate = (dateStr?: string): string => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return (
    "до " + date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
  );
};
