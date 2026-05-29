import type { ReportPeriod } from "../types/reports";

export const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const isThisWeek = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek && date <= today;
};

export const isThisMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
};

export const isThisQuarter = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const currentQuarter = Math.floor(today.getMonth() / 3);
  const dateQuarter = Math.floor(date.getMonth() / 3);
  return (
    date.getFullYear() === today.getFullYear() && dateQuarter === currentQuarter
  );
};

export const filterByPeriod = (
  dateStr: string | undefined,
  period: ReportPeriod,
): boolean => {
  if (!dateStr) return false;
  switch (period) {
    case "week":
      return isThisWeek(dateStr);
    case "month":
      return isThisMonth(dateStr);
    case "quarter":
      return isThisQuarter(dateStr);
    default:
      return false;
  }
};
