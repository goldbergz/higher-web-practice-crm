import { DEAL_STATUS_LABELS } from "../utils/constants/dealConstants";

import type { SalesReportRow, DealsStageReportRow } from "../types/reports";

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

export const formatPdfAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US").format(amount);
};

export const formatSalesDisplayData = (
  rows: SalesReportRow[],
): (Omit<SalesReportRow, "amount"> & { amount: number })[] =>
  rows.map((row) => ({
    ...row,
    amount: formatAmount(row.amount) as unknown as number,
  }));

export const formatStagesDisplayData = (
  rows: DealsStageReportRow[],
): (Omit<DealsStageReportRow, "stage" | "totalAmount"> & {
  stage: DealsStageReportRow["stage"];
  totalAmount: number;
})[] =>
  rows.map((row) => ({
    ...row,
    stage: (DEAL_STATUS_LABELS[row.stage] ??
      row.stage) as unknown as typeof row.stage,
    totalAmount: formatAmount(row.totalAmount) as unknown as number,
  }));
