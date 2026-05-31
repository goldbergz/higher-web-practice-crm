import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { DEAL_STATUS_LABELS } from "../utils/constants/dealConstants";
import { TASK_STATUS_LABELS } from "../utils/constants/taskConstants";

import { formatPdfAmount } from "./formaters";

import type {
  ClientActivityReportRow,
  DealsStageReportRow,
  NewClientReportRow,
  OverdueTaskReportRow,
  SalesReportRow,
} from "../types/reports";

const DEAL_STATUS_LABELS_EN: Record<string, string> = {
  NEW: "New",
  CANCELLED: "Cancelled",
  IN_PROGRESS: "In Progress",
};

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

export const exportNewClientsReportPdf = (data: NewClientReportRow[]): void => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("New Clients Report", 14, 16);

  autoTable(doc, {
    startY: 24,
    head: [["Client ID", "Client Name", "Company", "Date Added"]],
    body: data.map((row) => [
      row.clientId,
      transliterate(row.clientName),
      transliterate(row.company),
      transliterate(row.createdAt),
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("new-clients-report.pdf");
};

export const exportNewClientsReportXlsx = (
  data: NewClientReportRow[],
): void => {
  const rows = data.map((row) => ({
    "Client ID": row.clientId,
    "Client Name": row.clientName,
    Company: row.company,
    "Date Added": row.createdAt,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "New Clients");
  XLSX.writeFile(wb, "new-clients-report.xlsx");
};

export const exportClientActivityReportPdf = (
  data: ClientActivityReportRow[],
): void => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Client Activity Report", 14, 16);

  autoTable(doc, {
    startY: 24,
    head: [["Client ID", "Client Name", "Deals Count", "Completed Tasks"]],
    body: data.map((row) => [
      row.clientId,
      transliterate(row.clientName),
      row.dealsCount,
      row.completedTasks,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("client-activity-report.pdf");
};

export const exportClientActivityReportXlsx = (
  data: ClientActivityReportRow[],
): void => {
  const rows = data.map((row) => ({
    "Client ID": row.clientId,
    "Client Name": row.clientName,
    "Deals Count": row.dealsCount,
    "Completed Tasks": row.completedTasks,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Client Activity");
  XLSX.writeFile(wb, "client-activity-report.xlsx");
};

export const exportOverdueTasksReportPdf = (
  data: OverdueTaskReportRow[],
): void => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Overdue Tasks Report", 14, 16);

  autoTable(doc, {
    startY: 24,
    head: [["Task ID", "Title", "Assignee", "Due Date", "Status"]],
    body: data.map((row) => [
      row.taskId,
      transliterate(row.title),
      transliterate(row.assigneeName),
      transliterate(row.dueDate),
      TASK_STATUS_LABELS[row.status] ?? row.status,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("overdue-tasks-report.pdf");
};

export const exportOverdueTasksReportXlsx = (
  data: OverdueTaskReportRow[],
): void => {
  const rows = data.map((row) => ({
    "Task ID": row.taskId,
    Title: row.title,
    Assignee: row.assigneeName,
    "Due Date": row.dueDate,
    Status: TASK_STATUS_LABELS[row.status] ?? row.status,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Overdue Tasks");
  XLSX.writeFile(wb, "overdue-tasks-report.xlsx");
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
