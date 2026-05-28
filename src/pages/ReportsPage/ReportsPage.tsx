import { useEffect, useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadClients, selectClients } from "../../store/clientsSlice";
import { loadDeals, selectDeals } from "../../store/dealsSlice";
import { DEAL_STATUS_LABELS } from "../../utils/constants/dealConstants";
import {
  DEAL_STAGE_COLORS,
  DEAL_STAGES_COLUMNS,
  PERIOD_OPTIONS,
  REPORT_TABS,
  REPORTS_PAGE_SIZE,
  SALES_REPORT_COLUMNS,
  VIEW_OPTIONS,
} from "../../utils/constants/reportConstants";
import {
  exportSalesReportPdf,
  exportSalesReportXlsx,
  exportStagesReportPdf,
  exportStagesReportXlsx,
  getCompletedDealsReport,
  getDealRowStyleKey,
  getDealStagesReport,
  getTotalPages,
  paginateData,
  sortSalesReport,
  sortStagesReport,
} from "../../utils/helpers";

import styles from "./ReportsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type {
  DealsStageReportRow,
  SalesReportRow,
  ReportPeriod,
} from "../../types/reports";
import type { ReportTab } from "../../utils/constants/reportConstants";
import type React from "react";
import { formatSalesDisplayData, formatStagesDisplayData } from "../../utils/formaters";

const ReportsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const deals = useAppSelector(selectDeals);
  const clients = useAppSelector(selectClients);

  const [activeTab, setActiveTab] = useState<ReportTab>("sales");
  const [salesPeriod, setSalesPeriod] = useState<ReportPeriod>("week");
  const [stagesPeriod, setStagesPeriod] = useState<ReportPeriod>("week");
  const [salesView, setSalesView] = useState("list");
  const [stagesView, setStagesView] = useState("list");
  const [salesPage, setSalesPage] = useState(1);
  const [stagesPage, setStagesPage] = useState(1);
  const [salesSort, setSalesSort] = useState<SortConfig<SalesReportRow> | null>(
    null,
  );
  const [stagesSort, setStagesSort] =
    useState<SortConfig<DealsStageReportRow> | null>(null);

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadClients());
  }, [dispatch]);

  const handleSalesPeriodChange = (val: string) => {
    setSalesPeriod(val as ReportPeriod);
    setSalesPage(1);
  };

  const handleStagesPeriodChange = (val: string) => {
    setStagesPeriod(val as ReportPeriod);
    setStagesPage(1);
  };

  const salesReportData = useMemo(
    () => getCompletedDealsReport(deals, clients, salesPeriod),
    [deals, clients, salesPeriod],
  );

  const sortedSalesData = useMemo(
    () => sortSalesReport(salesReportData, salesSort),
    [salesReportData, salesSort],
  );

  const paginatedSalesData = useMemo(
    () => paginateData(sortedSalesData, salesPage, REPORTS_PAGE_SIZE),
    [sortedSalesData, salesPage],
  );

  const salesTotalPages = getTotalPages(
    sortedSalesData.length,
    REPORTS_PAGE_SIZE,
  );

  const stagesReportData = useMemo(
    () => getDealStagesReport(deals, stagesPeriod),
    [deals, stagesPeriod],
  );

  const sortedStagesData = useMemo(
    () => sortStagesReport(stagesReportData, stagesSort),
    [stagesReportData, stagesSort],
  );

  const paginatedStagesData = useMemo(
    () => paginateData(sortedStagesData, stagesPage, REPORTS_PAGE_SIZE),
    [sortedStagesData, stagesPage],
  );

  const salesDisplayData = useMemo(
    () => formatSalesDisplayData(paginatedSalesData),
    [paginatedSalesData],
  );

  const stagesTotalPages = getTotalPages(
    sortedStagesData.length,
    REPORTS_PAGE_SIZE,
  );

  const stagesDisplayData = useMemo(
    () => formatStagesDisplayData(paginatedStagesData),
    [paginatedStagesData],
  );

  const handleSalesSort = (key: keyof SalesReportRow) => {
    setSalesSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleStagesSort = (key: keyof DealsStageReportRow) => {
    setStagesSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleSalesExportPdf = () => exportSalesReportPdf(sortedSalesData);
  const handleSalesExportXlsx = () => exportSalesReportXlsx(sortedSalesData);
  const handleStagesExportPdf = () => exportStagesReportPdf(sortedStagesData);
  const handleStagesExportXlsx = () => exportStagesReportXlsx(sortedStagesData);

  const getStageRowClassName = (
    item: DealsStageReportRow,
  ): string | undefined => {
    const original = paginatedStagesData.find(
      (r) =>
        (DEAL_STATUS_LABELS[r.stage] ?? r.stage) ===
        (item.stage as unknown as string),
    );
    if (!original) return undefined;
    const key = getDealRowStyleKey(original.stage);
    const map = {
      new: styles.rowNew,
      completed: styles.rowCompleted,
      cancelled: styles.rowCancelled,
      in_progress: styles.rowInProgress,
    } as const;
    return key ? map[key] : undefined;
  };

  const stagesColumnsWithRender = useMemo(
    () =>
      DEAL_STAGES_COLUMNS.map((col) => {
        if (col.key === "stage") {
          return {
            ...col,
            renderCell: (item: DealsStageReportRow) => {
              const color =
                DEAL_STAGE_COLORS[
                  paginatedStagesData.find(
                    (r) =>
                      (DEAL_STATUS_LABELS[r.stage] ?? r.stage) ===
                      (item.stage as unknown as string),
                  )?.stage ?? ""
                ] ?? "#1F2937";
              return (
                <span style={{ color }}>{item.stage as unknown as string}</span>
              );
            },
          };
        }
        return col;
      }),
    [paginatedStagesData],
  );

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
  ) => (
    <div className={styles.pagination}>
      <button
        aria-label="Предыдущая страница"
        className={styles.paginationButton}
        disabled={currentPage <= 1}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span className={styles.paginationButtonIcon}>
          <svg
            fill="none"
            height="8"
            viewBox="0 0 16 8"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7L8 1L1 7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>
      <span className={styles.pageNumber}>{currentPage}</span>
      <button
        aria-label="Следующая страница"
        className={styles.paginationButton}
        disabled={currentPage >= totalPages}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span
          className={`${styles.paginationButtonIcon} ${styles.paginationButtonIconRight}`}
        >
          <svg
            fill="none"
            height="8"
            viewBox="0 0 16 8"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7L8 1L1 7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>
    </div>
  );

  const renderSalesReport = () => (
    <div className={styles.content}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Общий, продажи</h2>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <Dropdown
              options={PERIOD_OPTIONS}
              value={salesPeriod}
              onChange={handleSalesPeriodChange}
            />
            <Dropdown
              options={VIEW_OPTIONS}
              value={salesView}
              onChange={setSalesView}
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button
              size="md"
              variant="secondary"
              onClick={handleSalesExportPdf}
            >
              Экспорт в PDF
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={handleSalesExportXlsx}
            >
              Экспорт в XLSX
            </Button>
          </div>
        </div>
        {salesDisplayData.length > 0 ? (
          <DataList
            columns={SALES_REPORT_COLUMNS}
            getItemId={(item) => item.dealId}
            items={salesDisplayData}
            sortConfig={salesSort}
            onSort={handleSalesSort}
          />
        ) : (
          <p className={styles.placeholder}>
            Нет завершённых сделок за выбранный период
          </p>
        )}
        {renderPagination(salesPage, salesTotalPages, setSalesPage)}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Этапы сделок</h2>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <Dropdown
              options={PERIOD_OPTIONS}
              value={stagesPeriod}
              onChange={handleStagesPeriodChange}
            />
            <Dropdown
              options={VIEW_OPTIONS}
              value={stagesView}
              onChange={setStagesView}
            />
          </div>
          <div className={styles.toolbarRight}>
            <Button
              size="md"
              variant="secondary"
              onClick={handleStagesExportPdf}
            >
              Экспорт в PDF
            </Button>
            <Button
              size="md"
              variant="secondary"
              onClick={handleStagesExportXlsx}
            >
              Экспорт в XLSX
            </Button>
          </div>
        </div>
        {stagesDisplayData.length > 0 ? (
          <DataList
            columns={stagesColumnsWithRender}
            getItemId={(item) => item.stage as unknown as string}
            getRowClassName={getStageRowClassName}
            items={stagesDisplayData}
            sortConfig={stagesSort}
            onSort={handleStagesSort}
          />
        ) : (
          <p className={styles.placeholder}>
            Нет данных по этапам за выбранный период
          </p>
        )}
        {renderPagination(stagesPage, stagesTotalPages, setStagesPage)}
      </section>
    </div>
  );

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Отчёты</h1>
      </div>
      <nav className={styles.tabs}>
        {REPORT_TABS.map((tab) => (
          <button
            key={tab.value}
            className={styles.tab}
            type="button"
            onClick={() => setActiveTab(tab.value)}
          >
            <span
              className={[
                styles.tabLabel,
                activeTab === tab.value ? styles.tabLabelActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab.label}
            </span>
            <div
              className={[
                styles.tabIndicator,
                activeTab === tab.value ? styles.tabIndicatorActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </button>
        ))}
      </nav>
      {activeTab === "sales" && renderSalesReport()}
      {activeTab === "clients" && (
        <p className={styles.placeholder}>Раздел в разработке</p>
      )}
      {activeTab === "tasks" && (
        <p className={styles.placeholder}>Раздел в разработке</p>
      )}
    </div>
  );
};

export default ReportsPage;
