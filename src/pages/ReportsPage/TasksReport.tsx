import { useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import Dropdown from "../../components/Dropdown/Dropdown";
import Pagination from "../../components/Pagination/Pagination";
import { getTotalPages, paginateData } from "../../helpers/pagination";
import {
  exportOverdueTasksReportPdf,
  exportOverdueTasksReportXlsx,
} from "../../helpers/print";
import { useAppSelector } from "../../store";
import { selectTasks } from "../../store/tasksSlice";
import { selectUsers } from "../../store/userSlice";
import {
  OVERDUE_TASKS_REPORT_COLUMNS,
  PERIOD_OPTIONS,
  REPORTS_PAGE_SIZE,
  VIEW_OPTIONS,
} from "../../utils/constants/reportConstants";
import { TASK_STATUS_LABELS } from "../../utils/constants/taskConstants";
import {
  getOverdueTasksReport,
  sortOverdueTasksReport,
} from "../../utils/reports/tasksReports";

import styles from "./ReportsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type { OverdueTaskReportRow, ReportPeriod } from "../../types/reports";
import type React from "react";

const TasksReport: React.FC = () => {
  const tasks = useAppSelector(selectTasks);
  const users = useAppSelector(selectUsers);

  const [overduePeriod, setOverduePeriod] = useState<ReportPeriod>("week");
  const [overdueView, setOverdueView] = useState("list");
  const [overduePage, setOverduePage] = useState(1);
  const [overdueSort, setOverdueSort] =
    useState<SortConfig<OverdueTaskReportRow> | null>(null);

  const handleOverduePeriodChange = (val: string) => {
    setOverduePeriod(val as ReportPeriod);
    setOverduePage(1);
  };

  const overdueTasksReportData = useMemo(
    () => getOverdueTasksReport(tasks, users, overduePeriod),
    [tasks, users, overduePeriod],
  );

  const sortedOverdueTasksData = useMemo(
    () => sortOverdueTasksReport(overdueTasksReportData, overdueSort),
    [overdueTasksReportData, overdueSort],
  );

  const paginatedOverdueTasksData = useMemo(
    () => paginateData(sortedOverdueTasksData, overduePage, REPORTS_PAGE_SIZE),
    [sortedOverdueTasksData, overduePage],
  );

  const overdueTotalPages = getTotalPages(
    sortedOverdueTasksData.length,
    REPORTS_PAGE_SIZE,
  );

  const overdueColumnsWithRender = useMemo(
    () =>
      OVERDUE_TASKS_REPORT_COLUMNS.map((col) => {
        if (col.key === "status") {
          return {
            ...col,
            renderCell: (item: OverdueTaskReportRow) => (
              <span className={styles.statusOverdue}>
                {TASK_STATUS_LABELS[item.status] ?? item.status}
              </span>
            ),
          };
        }
        return col;
      }),
    [],
  );

  const handleOverdueSort = (key: keyof OverdueTaskReportRow) => {
    setOverdueSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleOverdueExportPdf = () =>
    exportOverdueTasksReportPdf(sortedOverdueTasksData);
  const handleOverdueExportXlsx = () =>
    exportOverdueTasksReportXlsx(sortedOverdueTasksData);

  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Просроченные задачи</h2>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <Dropdown
              options={PERIOD_OPTIONS}
              value={overduePeriod}
              onChange={handleOverduePeriodChange}
            />
            <Dropdown
              options={VIEW_OPTIONS}
              value={overdueView}
              onChange={setOverdueView}
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button
              size="md"
              variant="secondary"
              onClick={handleOverdueExportPdf}
            >
              Экспорт в PDF
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={handleOverdueExportXlsx}
            >
              Экспорт в XLSX
            </Button>
          </div>
        </div>
        {paginatedOverdueTasksData.length > 0 ? (
          <DataList
            columns={overdueColumnsWithRender}
            getItemId={(item) => item.taskId}
            getRowClassName={() => styles.rowOverdue}
            items={paginatedOverdueTasksData}
            sortConfig={overdueSort}
            onSort={handleOverdueSort}
          />
        ) : (
          <p className={styles.placeholder}>
            Нет просроченных задач за выбранный период
          </p>
        )}
        <Pagination
          currentPage={overduePage}
          totalPages={overdueTotalPages}
          onPageChange={setOverduePage}
        />
      </section>
    </div>
  );
};

export default TasksReport;
