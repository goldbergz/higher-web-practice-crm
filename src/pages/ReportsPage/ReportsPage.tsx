import { useState } from "react";

import { useMediaQuery } from "../../helpers/useMediaQuery";
import { REPORT_TABS } from "../../utils/constants/reportConstants";

import ClientsReport from "./ClientsReport";
import DealsReport from "./DealsReport";
import styles from "./ReportsPage.module.css";
import TasksReport from "./TasksReport";

import type { ReportTab } from "../../utils/constants/reportConstants";
import type React from "react";

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>("sales");
  const isMobile = useMediaQuery("(max-width: 999px)");

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
              {isMobile ? tab.mobileLabel : tab.label}
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
      {activeTab === "sales" && <DealsReport />}
      {activeTab === "clients" && <ClientsReport />}
      {activeTab === "tasks" && <TasksReport />}
    </div>
  );
};

export default ReportsPage;
