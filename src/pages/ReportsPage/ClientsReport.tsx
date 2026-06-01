import { useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import Dropdown from "../../components/Dropdown/Dropdown";
import Pagination from "../../components/Pagination/Pagination";
import { getTotalPages, paginateData } from "../../helpers/pagination";
import {
  exportClientActivityReportPdf,
  exportClientActivityReportXlsx,
  exportNewClientsReportPdf,
  exportNewClientsReportXlsx,
} from "../../helpers/print";
import { useAppSelector } from "../../store";
import { selectClients } from "../../store/clientsSlice";
import { selectDeals } from "../../store/dealsSlice";
import { selectTasks } from "../../store/tasksSlice";
import {
  CLIENT_ACTIVITY_REPORT_COLUMNS,
  NEW_CLIENTS_REPORT_COLUMNS,
  PERIOD_OPTIONS,
  REPORTS_PAGE_SIZE,
  VIEW_OPTIONS,
} from "../../utils/constants/reportConstants";
import {
  getClientActivityReport,
  getNewClientsReport,
  sortClientActivityReport,
  sortNewClientsReport,
} from "../../utils/reports/clientsReports";

import styles from "./ReportsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type {
  ClientActivityReportRow,
  NewClientReportRow,
  ReportPeriod,
} from "../../types/reports";
import type React from "react";

const ClientsReport: React.FC = () => {
  const clients = useAppSelector(selectClients);
  const deals = useAppSelector(selectDeals);
  const tasks = useAppSelector(selectTasks);

  const [newClientsPeriod, setNewClientsPeriod] =
    useState<ReportPeriod>("week");
  const [activeClientsPeriod, setActiveClientsPeriod] =
    useState<ReportPeriod>("week");
  const [newClientsView, setNewClientsView] = useState("list");
  const [activityView, setActivityView] = useState("list");
  const [newClientsPage, setNewClientsPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [newClientsSort, setNewClientsSort] =
    useState<SortConfig<NewClientReportRow> | null>(null);
  const [activitySort, setActivitySort] =
    useState<SortConfig<ClientActivityReportRow> | null>(null);

  const handleNewClientsPeriodChange = (val: string) => {
    setNewClientsPeriod(val as ReportPeriod);
    setNewClientsPage(1);
  };

  const handleActivityClientsPeriodChange = (val: string) => {
    setActiveClientsPeriod(val as ReportPeriod);
    setActivityPage(1);
  };

  const newClientsReportData = useMemo(
    () => getNewClientsReport(clients, newClientsPeriod),
    [clients, newClientsPeriod],
  );

  const sortedNewClientsData = useMemo(
    () => sortNewClientsReport(newClientsReportData, newClientsSort),
    [newClientsReportData, newClientsSort],
  );

  const paginatedNewClientsData = useMemo(
    () => paginateData(sortedNewClientsData, newClientsPage, REPORTS_PAGE_SIZE),
    [sortedNewClientsData, newClientsPage],
  );

  const newClientsTotalPages = getTotalPages(
    sortedNewClientsData.length,
    REPORTS_PAGE_SIZE,
  );

  const clientActivityReportData = useMemo(
    () => getClientActivityReport(clients, deals, tasks),
    [clients, deals, tasks],
  );

  const sortedClientActivityData = useMemo(
    () => sortClientActivityReport(clientActivityReportData, activitySort),
    [clientActivityReportData, activitySort],
  );

  const paginatedClientActivityData = useMemo(
    () =>
      paginateData(sortedClientActivityData, activityPage, REPORTS_PAGE_SIZE),
    [sortedClientActivityData, activityPage],
  );

  const clientActivityTotalPages = getTotalPages(
    sortedClientActivityData.length,
    REPORTS_PAGE_SIZE,
  );

  const handleNewClientsSort = (key: keyof NewClientReportRow) => {
    setNewClientsSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleActivitySort = (key: keyof ClientActivityReportRow) => {
    setActivitySort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleNewClientsExportPdf = () =>
    exportNewClientsReportPdf(sortedNewClientsData);
  const handleNewClientsExportXlsx = () =>
    exportNewClientsReportXlsx(sortedNewClientsData);
  const handleActivityExportPdf = () =>
    exportClientActivityReportPdf(sortedClientActivityData);
  const handleActivityExportXlsx = () =>
    exportClientActivityReportXlsx(sortedClientActivityData);

  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Новые клиенты</h2>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <Dropdown
              options={PERIOD_OPTIONS}
              value={newClientsPeriod}
              onChange={handleNewClientsPeriodChange}
            />
            <Dropdown
              options={VIEW_OPTIONS}
              value={newClientsView}
              onChange={setNewClientsView}
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button
              size="md"
              variant="secondary"
              onClick={handleNewClientsExportPdf}
            >
              Экспорт в PDF
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={handleNewClientsExportXlsx}
            >
              Экспорт в XLSX
            </Button>
          </div>
        </div>
        {paginatedNewClientsData.length > 0 ? (
          <DataList
            columns={NEW_CLIENTS_REPORT_COLUMNS}
            getItemId={(item) => item.clientId}
            items={paginatedNewClientsData}
            sortConfig={newClientsSort}
            onSort={handleNewClientsSort}
          />
        ) : (
          <p className={styles.placeholder}>
            Нет новых клиентов за выбранный период
          </p>
        )}
        <Pagination
          currentPage={newClientsPage}
          totalPages={newClientsTotalPages}
          onPageChange={setNewClientsPage}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Активность клиентов</h2>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <Dropdown
              options={PERIOD_OPTIONS}
              value={activeClientsPeriod}
              onChange={handleActivityClientsPeriodChange}
            />
            <Dropdown
              options={VIEW_OPTIONS}
              value={activityView}
              onChange={setActivityView}
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button
              size="md"
              variant="secondary"
              onClick={handleActivityExportPdf}
            >
              Экспорт в PDF
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={handleActivityExportXlsx}
            >
              Экспорт в XLSX
            </Button>
          </div>
        </div>
        {paginatedClientActivityData.length > 0 ? (
          <DataList
            columns={CLIENT_ACTIVITY_REPORT_COLUMNS}
            getItemId={(item) => item.clientId}
            items={paginatedClientActivityData}
            sortConfig={activitySort}
            onSort={handleActivitySort}
          />
        ) : (
          <p className={styles.placeholder}>
            Нет данных по активности клиентов
          </p>
        )}
        <Pagination
          currentPage={activityPage}
          totalPages={clientActivityTotalPages}
          onPageChange={setActivityPage}
        />
      </section>
    </div>
  );
};

export default ClientsReport;
