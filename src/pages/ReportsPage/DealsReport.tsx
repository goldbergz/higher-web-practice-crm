import { useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import Dropdown from "../../components/Dropdown/Dropdown";
import FlexContainer from "../../components/FlexContainer/FlexContainer";
import MobileDataListRow from "../../components/MobileDataList/MobileDataListRow";
import Pagination from "../../components/Pagination/Pagination";
import {
  formatSalesDisplayData,
  formatStagesDisplayData,
} from "../../helpers/formaters";
import { getTotalPages, paginateData } from "../../helpers/pagination";
import {
  exportSalesReportPdf,
  exportSalesReportXlsx,
  exportStagesReportPdf,
  exportStagesReportXlsx,
} from "../../helpers/print";
import { useMediaQuery } from "../../helpers/useMediaQuery";
import { useAppSelector } from "../../store";
import { selectClients } from "../../store/clientsSlice";
import { selectDeals } from "../../store/dealsSlice";
import {
  DEAL_STATUS_LABELS,
  getDealRowStyleKey,
} from "../../utils/constants/dealConstants";
import {
  DEAL_STAGE_COLORS,
  DEAL_STAGES_COLUMNS,
  PERIOD_OPTIONS,
  REPORTS_PAGE_SIZE,
  SALES_REPORT_COLUMNS,
} from "../../utils/constants/reportConstants";
import {
  getCompletedDealsReport,
  getDealStagesReport,
  sortSalesReport,
  sortStagesReport,
} from "../../utils/reports/dealsReports";

import styles from "./ReportsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type {
  DealsStageReportRow,
  ReportPeriod,
  SalesReportRow,
} from "../../types/reports";
import type React from "react";

const DealsReport: React.FC = () => {
  const deals = useAppSelector(selectDeals);
  const clients = useAppSelector(selectClients);
  const isMobile = useMediaQuery("(max-width: 999px)");

  const [salesPeriod, setSalesPeriod] = useState<ReportPeriod>("week");
  const [stagesPeriod, setStagesPeriod] = useState<ReportPeriod>("week");
  const [salesPage, setSalesPage] = useState(1);
  const [stagesPage, setStagesPage] = useState(1);
  const [salesSort, setSalesSort] = useState<SortConfig<SalesReportRow> | null>(
    null,
  );
  const [stagesSort, setStagesSort] =
    useState<SortConfig<DealsStageReportRow> | null>(null);

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

  const getStageColor = (item: DealsStageReportRow): string => {
    const original = paginatedStagesData.find(
      (r) =>
        (DEAL_STATUS_LABELS[r.stage] ?? r.stage) ===
        (item.stage as unknown as string),
    );
    return DEAL_STAGE_COLORS[original?.stage ?? ""] ?? "#1F2937";
  };

  const renderSalesReport = (): React.ReactElement => (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Общий, продажи</h2>
      {isMobile ? (
        <>
          <Dropdown
            options={PERIOD_OPTIONS}
            value={salesPeriod}
            onChange={handleSalesPeriodChange}
          />
          {salesDisplayData.length > 0 ? (
            <FlexContainer gap="8px">
              {salesDisplayData.map((item) => (
                <MobileDataListRow key={item.dealId}>
                  <div className={styles.mobileSalesCard}>
                    <div className={styles.mobileSalesTopRow}>
                      <span className={styles.mobileSalesId}>
                        {item.dealId}
                      </span>
                      <span className={styles.mobileSalesClient}>
                        {item.clientName}
                      </span>
                      <span className={styles.mobileSalesTitle}>
                        {item.title}
                      </span>
                    </div>
                    <div className={styles.mobileSalesBottomRow}>
                      <span className={styles.mobileSalesAmount}>
                        {item.amount as unknown as string}
                      </span>
                      <span className={styles.mobileSalesDate}>
                        {item.completedAt}
                      </span>
                    </div>
                  </div>
                </MobileDataListRow>
              ))}
            </FlexContainer>
          ) : (
            <p className={styles.placeholder}>
              Нет завершённых сделок за выбранный период
            </p>
          )}
          <div className={styles.mobileExportButtons}>
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
          <Pagination
            currentPage={salesPage}
            totalPages={salesTotalPages}
            onPageChange={setSalesPage}
          />
        </>
      ) : (
        <>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <Dropdown
                options={PERIOD_OPTIONS}
                value={salesPeriod}
                onChange={handleSalesPeriodChange}
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
          <Pagination
            currentPage={salesPage}
            totalPages={salesTotalPages}
            onPageChange={setSalesPage}
          />
        </>
      )}
    </section>
  );

  const renderStagesReport = (): React.ReactElement => (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Этапы сделок</h2>
      {isMobile ? (
        <>
          <Dropdown
            options={PERIOD_OPTIONS}
            value={stagesPeriod}
            onChange={handleStagesPeriodChange}
          />
          {stagesDisplayData.length > 0 ? (
            <FlexContainer gap="8px">
              {stagesDisplayData.map((item) => (
                <MobileDataListRow key={item.stage as unknown as string}>
                  <div className={styles.mobileStagesCard}>
                    <div className={styles.mobileStagesRow}>
                      <span
                        className={styles.mobileStagesStage}
                        style={{ color: getStageColor(item) }}
                      >
                        {item.stage as unknown as string}
                      </span>
                      <span className={styles.mobileStagesAmount}>
                        {item.totalAmount as unknown as string} сумма
                      </span>
                      <span className={styles.mobileStagesCount}>
                        {item.dealsCount} сделок
                      </span>
                    </div>
                  </div>
                </MobileDataListRow>
              ))}
            </FlexContainer>
          ) : (
            <p className={styles.placeholder}>
              Нет данных по этапам за выбранный период
            </p>
          )}
          <div className={styles.mobileExportButtons}>
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
          <Pagination
            currentPage={stagesPage}
            totalPages={stagesTotalPages}
            onPageChange={setStagesPage}
          />
        </>
      ) : (
        <>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <Dropdown
                options={PERIOD_OPTIONS}
                value={stagesPeriod}
                onChange={handleStagesPeriodChange}
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
          <Pagination
            currentPage={stagesPage}
            totalPages={stagesTotalPages}
            onPageChange={setStagesPage}
          />
        </>
      )}
    </section>
  );

  return (
    <div className={styles.content}>
      {renderSalesReport()}
      {renderStagesReport()}
    </div>
  );
};

export default DealsReport;
