import { useMemo, useState } from "react";

import {
  useCreateClientMutation,
  useCreateDealMutation,
  useCreateTaskMutation,
  useGetClientsQuery,
  useGetDealsQuery,
  useGetTasksQuery,
  useGetUsersQuery,
} from "../../api";
import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import ClientForm from "../../components/Forms/ClientForm";
import DealForm from "../../components/Forms/DealForm";
import TaskForm from "../../components/Forms/TaskForm";
import MobileDataList from "../../components/MobileDataList/MobileDataList";
import MobileDataListRow from "../../components/MobileDataList/MobileDataListRow";
import Modal from "../../components/Modal/Modal";
import { formatDueDate } from "../../helpers/formaters";
import { useMediaQuery } from "../../helpers/useMediaQuery";
import { useAppSelector } from "../../store";
import { selectCurrentUser } from "../../store/userSlice";
import { TASK_STATUS_LABELS } from "../../utils/constants/taskConstants";
import { dealColumnsMain } from "../../utils/constants/сonstants";
import { getTopActiveClients } from "../../utils/dashboards/clientsDashboard";
import { calculateDashboardStats } from "../../utils/dashboards/dashboards";
import { getTopActiveDeals } from "../../utils/dashboards/dealsDashboard";
import { getLastTasks } from "../../utils/dashboards/tasksDashboard";

import styles from "./MainPage.module.css";

import type { ColumnConfig } from "../../components/DataList/types";
import type { Deal, Task } from "../../types";
import type { DealDisplay } from "../../types/deal";
import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import type { DealFormValues } from "../../utils/schemas/dealSchema";
import type { TaskFormValues } from "../../utils/schemas/taskSchema";
import type React from "react";

type StatsRow = {
  id: string;
  label: string;
  month: string;
  quarter: string;
  today: string;
  todayNew: string;
  total: string;
  week: string;
};

type ModalType = "client" | "deal" | "task" | null;

type MainTab = "home" | "clients" | "deals" | "tasks";

const MAIN_TABS: { label: string; value: MainTab }[] = [
  { label: "Главная", value: "home" },
  { label: "Клиенты", value: "clients" },
  { label: "Сделки", value: "deals" },
  { label: "Задачи", value: "tasks" },
];

const statsColumns: ColumnConfig<StatsRow>[] = [
  {
    key: "label",
    label: "",
    flex: "240 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#1F2937",
          fontSize: 14,
          fontWeight: 700,
          lineHeight: "20px",
        }}
      >
        {item.label}
      </span>
    ),
  },
  {
    key: "total",
    label: "на сегодня",
    flex: "203 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#3B82F6",
          fontSize: 24,
          fontWeight: 700,
          lineHeight: "32px",
        }}
      >
        {item.total}
      </span>
    ),
  },
  {
    key: "todayNew",
    label: "за сегодня",
    flex: "203 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#10B981",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: "28px",
        }}
      >
        {item.todayNew}
      </span>
    ),
  },
  {
    key: "week",
    label: "за неделю",
    flex: "203 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#10B981",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: "28px",
        }}
      >
        {item.week}
      </span>
    ),
  },
  {
    key: "month",
    label: "за месяц",
    flex: "203 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#10B981",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: "28px",
        }}
      >
        {item.month}
      </span>
    ),
  },
  {
    key: "quarter",
    label: "за квартал",
    flex: "203 1 0",
    renderCell: (item) => (
      <span
        style={{
          color: "#10B981",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: "28px",
        }}
      >
        {item.quarter}
      </span>
    ),
  },
];

const getDealStatusColor = (status: string): string => {
  switch (status) {
    case "new":
      return "#1F2937";
    case "in_progress":
      return "#3B82F6";
    case "completed":
      return "#10B981";
    case "cancelled":
      return "#F59E0B";
    default:
      return "#1F2937";
  }
};

const getDealCardBackground = (status: string): string => {
  switch (status) {
    case "new":
      return "#EFF6FF";
    case "completed":
      return "#F0FDF4";
    case "cancelled":
      return "#FFF7ED";
    default:
      return "#FFFFFF";
  }
};

const getTaskCardBackground = (status: string): string => {
  switch (status) {
    case "new":
      return "#EFF6FF";
    case "completed":
      return "#F0FDF4";
    default:
      return "#FFFFFF";
  }
};

const getTaskStatusColor = (status: string): string => {
  switch (status) {
    case "new":
      return "#1F2937";
    case "in_progress":
      return "#3B82F6";
    case "completed":
      return "#10B981";
    default:
      return "#1F2937";
  }
};

const MainPage: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: clients = [] } = useGetClientsQuery();
  const { data: deals = [] } = useGetDealsQuery();
  const { data: tasks = [] } = useGetTasksQuery();
  const { data: users = [] } = useGetUsersQuery();
  const [createClient] = useCreateClientMutation();
  const [createDeal] = useCreateDealMutation();
  const [createTask] = useCreateTaskMutation();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [activeTab, setActiveTab] = useState<MainTab>("home");

  const isMobile = useMediaQuery("(max-width: 999px)");

  const userId = currentUser?.id ?? "";
  const activeDeals = useMemo(
    () => deals.filter((d) => d.status === "new" || d.status === "in_progress"),
    [deals],
  );

  const stats = useMemo(
    () => calculateDashboardStats(clients, deals, userId),
    [clients, deals, userId],
  );

  const topClients = useMemo(
    () => getTopActiveClients(clients, deals, userId),
    [clients, deals, userId],
  );

  const getDealTitle = (dealId?: string): string => {
    if (!dealId) return "—";
    const deal = deals.find((d) => d.id === dealId);
    return deal?.title ?? "—";
  };

  const topActiveDeals: DealDisplay[] = useMemo(
    () => getTopActiveDeals(activeDeals, clients),
    [activeDeals, clients],
  );

  const lastTasks = useMemo(() => getLastTasks(tasks), [tasks]);

  const getRowClassName = (item: DealDisplay): string | undefined => {
    const deal = deals.find((d) => d.id === item.id);
    if (!deal) return undefined;

    switch (deal.status) {
      case "new":
        return styles.rowNew;
      case "completed":
        return styles.rowCompleted;
      case "cancelled":
        return styles.rowCancelled;
      default:
        return undefined;
    }
  };

  const getCellClassName = (
    item: DealDisplay,
    key: keyof DealDisplay,
  ): string | undefined => {
    if (key !== "status") return undefined;

    const deal = deals.find((d) => d.id === item.id);
    if (!deal) return undefined;

    switch (deal.status) {
      case "new":
        return styles.statusNew;
      case "in_progress":
        return styles.statusInProgress;
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return undefined;
    }
  };

  const getTaskCardClassName = (task: Task): string => {
    switch (task.status) {
      case "new":
        return `${styles.taskCard} ${styles.taskCardNew}`;
      case "completed":
        return `${styles.taskCard} ${styles.taskCardCompleted}`;
      default:
        return styles.taskCard;
    }
  };

  const getTaskStatusClassName = (status: string): string => {
    switch (status) {
      case "new":
        return styles.taskCardStatusNew;
      case "in_progress":
        return styles.taskCardStatusInProgress;
      case "completed":
        return styles.taskCardStatusCompleted;
      default:
        return styles.taskCardStatusNew;
    }
  };

  const formatIncrement = (value: number): string => {
    return value > 0 ? `+${value}` : String(value);
  };

  const statsItems: StatsRow[] = useMemo(
    () => [
      {
        id: "clients",
        label: "Клиенты",
        month: formatIncrement(stats.clients.month),
        quarter: formatIncrement(stats.clients.quarter),
        today: String(stats.clients.total),
        todayNew: formatIncrement(stats.clients.today),
        total: String(stats.clients.total),
        week: formatIncrement(stats.clients.week),
      },
      {
        id: "active-deals",
        label: "Активные сделки",
        month: formatIncrement(stats.activeDeals.month),
        quarter: formatIncrement(stats.activeDeals.quarter),
        today: String(stats.activeDeals.total),
        todayNew: formatIncrement(stats.activeDeals.today),
        total: String(stats.activeDeals.total),
        week: formatIncrement(stats.activeDeals.week),
      },
      {
        id: "completed-deals",
        label: "Завершённые сделки",
        month: formatIncrement(stats.completedDeals.month),
        quarter: formatIncrement(stats.completedDeals.quarter),
        today: String(stats.completedDeals.total),
        todayNew: formatIncrement(stats.completedDeals.today),
        total: String(stats.completedDeals.total),
        week: formatIncrement(stats.completedDeals.week),
      },
    ],
    [stats],
  );

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleCreateClient = async (data: ClientFormValues) => {
    if (!currentUser) return;

    await createClient({
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      website: data.website || undefined,
      comment: data.comment || undefined,
      createdBy: currentUser.id,
    });
    handleCloseModal();
  };

  const handleCreateDeal = async (data: DealFormValues) => {
    if (!currentUser) return;

    await createDeal({
      title: data.title,
      description: data.description || undefined,
      clientId: data.clientId,
      amount: Number(data.amount.replace(/\s/g, "")),
      createdBy: currentUser.id,
    });
    handleCloseModal();
  };

  const handleCreateTask = async (data: TaskFormValues) => {
    if (!currentUser) return;

    await createTask({
      title: data.title,
      description: data.description || undefined,
      dealId: data.dealId || undefined,
      assigneeId: data.assigneeId,
      dueDate: data.dueDate || undefined,
      createdBy: currentUser.id,
    });
    handleCloseModal();
  };

  const activeClients = useMemo(
    () => clients.filter((c) => !c.deleted),
    [clients],
  );

  const renderDesktopContent = (): React.ReactElement => (
    <>
      <div className={styles.statsSection}>
        <DataList
          columns={statsColumns}
          getItemId={(item) => item.id}
          items={statsItems}
        />
      </div>

      <div className={styles.topClientsSection}>
        <h2 className={styles.topClientsTitle}>топ 10 активных клиентов</h2>
        <div className={styles.topClientsGrid}>
          {topClients.map((client) => (
            <article key={client.id} className={styles.topClientCard}>
              <div className={styles.topClientInfo}>
                <span className={styles.topClientName}>{client.name}</span>
                <span className={styles.topClientCompany}>
                  &laquo;{client.company}&raquo;
                </span>
              </div>
              <div className={styles.topClientDeals}>
                <span className={styles.topClientDealsCount}>
                  {client.dealsCount}
                </span>
                <span className={styles.topClientDealsLabel}>сделок</span>
              </div>
            </article>
          ))}
        </div>
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("client")}
        >
          Новый клиент
        </Button>
      </div>

      <div className={styles.topDealsSection}>
        <h2 className={styles.topClientsTitle}>Топ 10 активных сделок</h2>
        <DataList
          columns={dealColumnsMain}
          getCellClassName={getCellClassName}
          getItemId={(item) => item.id}
          getRowClassName={getRowClassName}
          items={topActiveDeals}
        />
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("deal")}
        >
          Новая сделка
        </Button>
      </div>

      <div className={styles.tasksSection}>
        <h2 className={styles.topClientsTitle}>Последние 10 задач</h2>
        <div className={styles.tasksGrid}>
          {lastTasks.map((task) => (
            <article key={task.id} className={getTaskCardClassName(task)}>
              <div className={styles.taskCardInfo}>
                <span className={styles.taskCardTitle}>{task.title}</span>
                <div className={styles.taskCardDeal}>
                  <span className={styles.taskCardDealLabel}>сделка</span>
                  <span className={styles.taskCardDealTitle}>
                    {getDealTitle(task.dealId)}
                  </span>
                </div>
              </div>
              <div className={styles.taskCardFooter}>
                <span className={styles.taskCardDueDate}>
                  {formatDueDate(task.dueDate)}
                </span>
                <span className={getTaskStatusClassName(task.status)}>
                  {TASK_STATUS_LABELS[task.status] ?? task.status}
                </span>
              </div>
            </article>
          ))}
        </div>
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("task")}
        >
          Новая задача
        </Button>
      </div>
    </>
  );

  const renderMobileHomeTab = (): React.ReactElement => (
    <div className={styles.mobileTabContent}>
      <MobileDataList
        getItemId={(item: StatsRow) => item.id}
        items={statsItems}
        renderItem={(item) => (
          <div className={styles.mobileStatsCard}>
            <div className={styles.mobileStatsTitle}>{item.label}</div>
            <div className={styles.mobileStatsBody}>
              <div className={styles.mobileStatsTotal}>
                <span className={styles.mobileStatsTotalValue}>
                  {item.total}
                </span>
                <span className={styles.mobileStatsTotalLabel}>на сегодня</span>
              </div>
              <div className={styles.mobileStatsIncrements}>
                <div className={styles.mobileStatsIncrement}>
                  <span className={styles.mobileStatsIncrementLabel}>
                    за сегодня
                  </span>
                  <span className={styles.mobileStatsIncrementValue}>
                    {item.todayNew}
                  </span>
                </div>
                <div className={styles.mobileStatsIncrement}>
                  <span className={styles.mobileStatsIncrementLabel}>
                    за неделю
                  </span>
                  <span className={styles.mobileStatsIncrementValue}>
                    {item.week}
                  </span>
                </div>
              </div>
              <div className={styles.mobileStatsIncrements}>
                <div className={styles.mobileStatsIncrement}>
                  <span className={styles.mobileStatsIncrementLabel}>
                    за месяц
                  </span>
                  <span className={styles.mobileStatsIncrementValue}>
                    {item.month}
                  </span>
                </div>
                <div className={styles.mobileStatsIncrement}>
                  <span className={styles.mobileStatsIncrementLabel}>
                    за квартал
                  </span>
                  <span className={styles.mobileStatsIncrementValue}>
                    {item.quarter}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );

  const renderMobileClientsTab = (): React.ReactElement => (
    <div className={styles.mobileTabContent}>
      <MobileDataList
        getItemId={(item) => item.id}
        items={topClients}
        renderItem={(client) => (
          <div className={styles.mobileClientCard}>
            <div className={styles.topClientInfo}>
              <span className={styles.topClientName}>{client.name}</span>
              <span className={styles.topClientCompany}>
                &laquo;{client.company}&raquo;
              </span>
            </div>
            <div className={styles.topClientDeals}>
              <span className={styles.topClientDealsCount}>
                {client.dealsCount}
              </span>
              <span className={styles.topClientDealsLabel}>сделок</span>
            </div>
          </div>
        )}
      />
      <div className={styles.mobileTabButton}>
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("client")}
        >
          Новый клиент
        </Button>
      </div>
    </div>
  );

  const renderMobileDealsTab = (): React.ReactElement => (
    <div className={styles.mobileTabContent}>
      <MobileDataList
        getItemId={(item) => item.id}
        items={topActiveDeals}
        renderItem={(dealDisplay) => {
          const deal: Deal | undefined = deals.find(
            (d) => d.id === dealDisplay.id,
          );
          const status = deal?.status ?? "new";
          const bg = getDealCardBackground(status);
          return (
            <MobileDataListRow>
              <div style={{ padding: "8px 12px", background: bg }}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span className={styles.mobileDealTitle}>
                    {dealDisplay.title}
                  </span>
                  <span className={styles.mobileDealClient}>
                    {dealDisplay.client}
                  </span>
                  <span className={styles.mobileDealAmount}>
                    {dealDisplay.amount}
                  </span>
                  <div className={styles.mobileDealFooter}>
                    <span style={{ color: getDealStatusColor(status) }}>
                      {dealDisplay.status}
                    </span>
                    <span className={styles.mobileDealDate}>
                      {dealDisplay.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </MobileDataListRow>
          );
        }}
      />
      <div className={styles.mobileTabButton}>
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("deal")}
        >
          Новая сделка
        </Button>
      </div>
    </div>
  );

  const renderMobileTasksTab = (): React.ReactElement => (
    <div className={styles.mobileTabContent}>
      <MobileDataList
        getItemId={(item) => item.id}
        items={lastTasks}
        renderItem={(task) => {
          const bg = getTaskCardBackground(task.status);
          return (
            <MobileDataListRow>
              <div style={{ padding: "12px 16px", background: bg }}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div className={styles.taskCardInfo}>
                    <span className={styles.taskCardTitle}>{task.title}</span>
                    <div className={styles.taskCardDeal}>
                      <span className={styles.taskCardDealLabel}>сделка</span>
                      <span className={styles.taskCardDealTitle}>
                        {getDealTitle(task.dealId)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.taskCardFooter}>
                    <span className={styles.taskCardDueDate}>
                      {formatDueDate(task.dueDate)}
                    </span>
                    <span style={{ color: getTaskStatusColor(task.status) }}>
                      {TASK_STATUS_LABELS[task.status] ?? task.status}
                    </span>
                  </div>
                </div>
              </div>
            </MobileDataListRow>
          );
        }}
      />
      <div className={styles.mobileTabButton}>
        <Button
          size="md"
          variant="primary"
          onClick={() => handleOpenModal("task")}
        >
          Новая задача
        </Button>
      </div>
    </div>
  );

  const renderMobileContent = (): React.ReactElement => {
    switch (activeTab) {
      case "home":
        return renderMobileHomeTab();
      case "clients":
        return renderMobileClientsTab();
      case "deals":
        return renderMobileDealsTab();
      case "tasks":
        return renderMobileTasksTab();
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.greeting}>
        <h1 className={styles.greetingTitle}>
          Добро пожаловать, {currentUser?.name ?? "Пользователь"}!
        </h1>
        <p className={styles.greetingSubtitle}>
          Посмотрите сводную информацию по вашим клиентам, сделкам и задачам
        </p>
      </header>

      {isMobile ? (
        <>
          <nav className={styles.mobileTabs}>
            {MAIN_TABS.map((tab) => (
              <button
                key={tab.value}
                className={styles.mobileTab}
                type="button"
                onClick={() => setActiveTab(tab.value)}
              >
                <span
                  className={[
                    styles.mobileTabLabel,
                    activeTab === tab.value ? styles.mobileTabLabelActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {tab.label}
                </span>
                <div
                  className={[
                    styles.mobileTabIndicator,
                    activeTab === tab.value
                      ? styles.mobileTabIndicatorActive
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </button>
            ))}
          </nav>
          {renderMobileContent()}
        </>
      ) : (
        renderDesktopContent()
      )}

      <Modal
        isOpen={modalType === "client"}
        title="Новый клиент"
        onClose={handleCloseModal}
      >
        <ClientForm
          submitLabel="Создать"
          onCancel={handleCloseModal}
          onSubmit={handleCreateClient}
        />
      </Modal>

      <Modal
        isOpen={modalType === "deal"}
        title="Новая сделка"
        onClose={handleCloseModal}
      >
        <DealForm
          clients={activeClients}
          submitLabel="Создать сделку"
          onCancel={handleCloseModal}
          onSubmit={handleCreateDeal}
        />
      </Modal>

      <Modal
        isOpen={modalType === "task"}
        title="Новая задача"
        onClose={handleCloseModal}
      >
        <TaskForm
          deals={deals}
          submitLabel="Создать задачу"
          users={users}
          onCancel={handleCloseModal}
          onSubmit={handleCreateTask}
        />
      </Modal>
    </section>
  );
};

export default MainPage;
