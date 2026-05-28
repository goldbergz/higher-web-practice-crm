import { DEAL_STATUS_LABELS } from "./constants/dealConstants";
import { formatAmount, formatDate, formatPdfAmount } from "./formaters";

import type { Client } from "../types/client";
import type { DashboardStats } from "../types/dashboard";
import type { Deal, DealDisplay, DealStatus } from "../types/deal";
import type {
  DealsStageReportRow,
  ReportPeriod,
  SalesReportRow,
} from "../types/reports";
import type { Task } from "../types/task";
import type { SortConfig } from "../components";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const isThisWeek = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek && date <= today;
};

const isThisMonth = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
};

const isThisQuarter = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const currentQuarter = Math.floor(today.getMonth() / 3);
  const dateQuarter = Math.floor(date.getMonth() / 3);
  return (
    date.getFullYear() === today.getFullYear() && dateQuarter === currentQuarter
  );
};

export const calculateDashboardStats = (
  clients: Client[],
  deals: Deal[],
  userId: string,
): DashboardStats => {
  const userClients = clients.filter(
    (c) => c.createdBy === userId && !c.deleted,
  );
  const userDeals = deals.filter((d) => d.createdBy === userId);
  const activeDeals = userDeals.filter(
    (d) => d.status === "new" || d.status === "in_progress",
  );
  const completedDeals = userDeals.filter((d) => d.status === "completed");

  return {
    clients: {
      total: userClients.length,
      today: userClients.filter((c) => isToday(c.createdAt)).length,
      week: userClients.filter((c) => isThisWeek(c.createdAt)).length,
      month: userClients.filter((c) => isThisMonth(c.createdAt)).length,
      quarter: userClients.filter((c) => isThisQuarter(c.createdAt)).length,
    },
    activeDeals: {
      total: activeDeals.length,
      today: activeDeals.filter((d) => isToday(d.createdAt)).length,
      week: activeDeals.filter((d) => isThisWeek(d.createdAt)).length,
      month: activeDeals.filter((d) => isThisMonth(d.createdAt)).length,
      quarter: activeDeals.filter((d) => isThisQuarter(d.createdAt)).length,
    },
    completedDeals: {
      total: completedDeals.length,
      today: completedDeals.filter((d) =>
        d.completedAt ? isToday(d.completedAt) : false,
      ).length,
      week: completedDeals.filter((d) =>
        d.completedAt ? isThisWeek(d.completedAt) : false,
      ).length,
      month: completedDeals.filter((d) =>
        d.completedAt ? isThisMonth(d.completedAt) : false,
      ).length,
      quarter: completedDeals.filter((d) =>
        d.completedAt ? isThisQuarter(d.completedAt) : false,
      ).length,
    },
  };
};

export type TopClient = {
  id: string;
  name: string;
  company: string;
  dealsCount: number;
};

export const getTopActiveClients = (
  clients: Client[],
  deals: Deal[],
  userId: string,
  limit: number = 10,
): TopClient[] => {
  const userDeals = deals.filter((d) => d.createdBy === userId);

  const clientDealCounts = new Map<string, number>();
  userDeals.forEach((deal) => {
    const count = clientDealCounts.get(deal.clientId) || 0;
    clientDealCounts.set(deal.clientId, count + 1);
  });

  const clientsWithDeals: TopClient[] = clients
    .filter((c) => !c.deleted && clientDealCounts.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      company: c.company,
      dealsCount: clientDealCounts.get(c.id) || 0,
    }));

  return clientsWithDeals
    .sort((a, b) => b.dealsCount - a.dealsCount)
    .slice(0, limit);
};

export const getTopActiveDeals = (
  activeDeals: Deal[],
  clients: Client[],
  limit: number = 10,
): DealDisplay[] => {
  const getClientName = (clientId: string): string => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name ?? "";
  };

  return activeDeals.slice(0, limit).map((deal) => ({
    amount: formatAmount(deal.amount),
    client: getClientName(deal.clientId),
    completedAt: deal.completedAt ? formatDate(deal.completedAt) : "\u2014",
    createdAt: formatDate(deal.createdAt),
    description: deal.description ?? "",
    id: deal.id,
    status: DEAL_STATUS_LABELS[deal.status] ?? deal.status,
    title: deal.title,
  }));
};

export const getLastTasks = (tasks: Task[], limit: number = 10): Task[] => {
  return [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
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

export const getCompletedDealsReport = (
  deals: Deal[],
  clients: Client[],
  period: ReportPeriod,
): SalesReportRow[] => {
  const completedDeals = deals.filter(
    (deal) =>
      deal.status === "completed" &&
      deal.completedAt &&
      filterByPeriod(deal.completedAt, period),
  );

  return completedDeals.map((deal) => {
    const client = clients.find((c) => c.id === deal.clientId);
    return {
      dealId: deal.id,
      title: deal.title,
      clientName: client?.name ?? "",
      amount: deal.amount,
      completedAt: deal.completedAt ? formatDate(deal.completedAt) : "",
    };
  });
};

export const getDealStagesReport = (
  deals: Deal[],
  period: ReportPeriod,
): DealsStageReportRow[] => {
  const stages: DealStatus[] = ["in_progress", "new", "cancelled", "completed"];

  const filteredDeals = deals.filter((deal) =>
    filterByPeriod(deal.createdAt, period),
  );

  return stages
    .map((stage) => {
      const stageDeals = filteredDeals.filter((deal) => deal.status === stage);
      return {
        stage,
        dealsCount: stageDeals.length,
        totalAmount: stageDeals.reduce((sum, deal) => sum + deal.amount, 0),
      };
    })
    .filter((row) => row.dealsCount > 0);
};

export const getDealRowStyleKey = (
  status: DealStatus,
): "new" | "completed" | "cancelled" | "in_progress" | null => {
  switch (status) {
    case "new":
      return "new";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "in_progress":
      return "in_progress";
    default:
      return null;
  }
};

export const sortSalesReport = (
  data: SalesReportRow[],
  sort: SortConfig<SalesReportRow> | null,
): SalesReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    if (key === "amount") {
      return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};

export const sortStagesReport = (
  data: DealsStageReportRow[],
  sort: SortConfig<DealsStageReportRow> | null,
): DealsStageReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    if (key === "dealsCount") {
      return direction === "asc"
        ? a.dealsCount - b.dealsCount
        : b.dealsCount - a.dealsCount;
    }
    if (key === "totalAmount") {
      return direction === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};

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

export const exportSalesReportPdf = (data: SalesReportRow[]): void => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Sales Report", 14, 16);

  autoTable(doc, {
    startY: 24,
    head: [["Deal ID", "Title", "Client", "Amount", "Completed At"]],
    body: data.map((row) => [
      row.dealId,
      transliterate(row.title),
      transliterate(row.clientName),
      formatPdfAmount(row.amount),
      transliterate(row.completedAt),
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("sales-report.pdf");
};

const transliterate = (text: string): string => {
  const map: Record<string, string> = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Ё: "Yo",
    ё: "yo",
    Ж: "Zh",
    ж: "zh",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Й: "Y",
    й: "y",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "Kh",
    х: "kh",
    Ц: "Ts",
    ц: "ts",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Sch",
    щ: "sch",
    Ъ: "",
    ъ: "",
    Ы: "Y",
    ы: "y",
    Ь: "",
    ь: "",
    Э: "E",
    э: "e",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
  };

  return text
    .split("")
    .map((char) => map[char] ?? char)
    .join("");
};

const DEAL_STATUS_LABELS_EN: Record<string, string> = {
  NEW: "New",
  CANCELLED: "Cancelled",
  IN_PROGRESS: "In Progress",
  WON: "Won",
  LOST: "Lost",
};

export const exportStagesReportPdf = (data: DealsStageReportRow[]): void => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Deal Stages Report", 14, 16);

  autoTable(doc, {
    startY: 24,
    head: [["Stage", "Deals Count", "Total Amount"]],
    body: data.map((row) => [
      DEAL_STATUS_LABELS_EN[row.stage] ?? row.stage,
      row.dealsCount,
      formatPdfAmount(row.totalAmount),
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("stages-report.pdf");
};

export const exportSalesReportXlsx = (data: SalesReportRow[]): void => {
  const rows = data.map((row) => ({
    "Deal ID": row.dealId,
    Title: row.title,
    Client: row.clientName,
    Amount: row.amount,
    "Completed At": row.completedAt,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sales");
  XLSX.writeFile(wb, "sales-report.xlsx");
};

export const exportStagesReportXlsx = (data: DealsStageReportRow[]): void => {
  const rows = data.map((row) => ({
    Stage: DEAL_STATUS_LABELS[row.stage] ?? row.stage,
    "Deals Count": row.dealsCount,
    "Total Amount": row.totalAmount,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Stages");
  XLSX.writeFile(wb, "stages-report.xlsx");
};
