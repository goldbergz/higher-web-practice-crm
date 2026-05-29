import { useEffect, useState } from "react";

import { useAppDispatch } from "../../store";
import { loadClients } from "../../store/clientsSlice";
import { loadDeals } from "../../store/dealsSlice";
import { loadTasks } from "../../store/tasksSlice";
import { loadUsers } from "../../store/userSlice";
import { REPORT_TABS } from "../../utils/constants/reportConstants";

import ClientsReport from "./ClientsReport";
import DealsReport from "./DealsReport";
import TasksReport from "./TasksReport";

import styles from "./ReportsPage.module.css";

import type { ReportTab } from "../../utils/constants/reportConstants";
import type React from "react";

const ReportsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<ReportTab>("sales");

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadClients());
    dispatch(loadTasks());
    dispatch(loadUsers());
  }, [dispatch]);

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
      {activeTab === "sales" && <DealsReport />}
      {activeTab === "clients" && <ClientsReport />}
      {activeTab === "tasks" && <TasksReport />}
    </div>
  );
};

export default ReportsPage;
