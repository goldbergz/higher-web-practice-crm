import { formatDueDate } from "../../helpers/formaters";
import { filterByPeriod } from "../../helpers/period";

import type { SortConfig } from "../../components";
import type { Task, User } from "../../types";
import type { ReportPeriod, OverdueTaskReportRow } from "../../types/reports";

export const getOverdueTasksReport = (
  tasks: Task[],
  users: User[],
  period: ReportPeriod,
): OverdueTaskReportRow[] => {
  const now = new Date();
  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < now &&
      t.status !== "completed" &&
      filterByPeriod(t.dueDate, period),
  );

  return overdueTasks.map((task) => {
    const assignee = users.find((u) => u.id === task.assigneeId);
    return {
      taskId: task.id,
      title: task.title,
      assigneeName: assignee?.name ?? "",
      dueDate: formatDueDate(task.dueDate),
      status: "overdue" as const,
    };
  });
};

export const sortOverdueTasksReport = (
  data: OverdueTaskReportRow[],
  sort: SortConfig<OverdueTaskReportRow> | null,
): OverdueTaskReportRow[] => {
  if (!sort) return data;
  const { key, direction } = sort;
  return [...data].sort((a, b) => {
    const aVal = String(a[key] ?? "");
    const bVal = String(b[key] ?? "");
    const cmp = aVal.localeCompare(bVal, "ru");
    return direction === "asc" ? cmp : -cmp;
  });
};
