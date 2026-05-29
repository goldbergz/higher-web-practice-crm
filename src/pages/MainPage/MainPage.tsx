import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import ClientForm from "../../components/Forms/ClientForm";
import DealForm from "../../components/Forms/DealForm";
import TaskForm from "../../components/Forms/TaskForm";
import Modal from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addClient,
  loadClients,
  selectClients,
} from "../../store/clientsSlice";
import {
  addDeal,
  loadDeals,
  selectActiveDeals,
  selectDeals,
} from "../../store/dealsSlice";
import { addTask, loadTasks, selectTasks } from "../../store/tasksSlice";
import {
  loadUsers,
  selectCurrentUser,
  selectUsers,
} from "../../store/userSlice";
import { formatDueDate } from "../../helpers/formaters";

import styles from "./MainPage.module.css";

import type { ColumnConfig } from "../../components/DataList/types";
import type { Client } from "../../types/client";
import type { Deal, DealDisplay } from "../../types/deal";
import type { Task } from "../../types/task";
import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import type { DealFormValues } from "../../utils/schemas/dealSchema";
import type { TaskFormValues } from "../../utils/schemas/taskSchema";
import type React from "react";
import { dealColumnsMain } from "../../utils/constants/сonstants";
import { getTopActiveClients } from "../../utils/dashboards/clientsDashboard";
import { calculateDashboardStats } from "../../utils/dashboards/dashboards";
import { getTopActiveDeals } from "../../utils/dashboards/dealsDashboard";
import { getLastTasks } from "../../utils/dashboards/tasksDashboard";
import { TASK_STATUS_LABELS } from "../../utils/constants/taskConstants";

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

const statsColumns: ColumnConfig<StatsRow>[] = [
  {
    key: "label",
    label: "",
    flex: "0 0 240px",
    minWidth: "240px",
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
    flex: "1 1 0",
    minWidth: "80px",
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
    flex: "1 1 0",
    minWidth: "80px",
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
    flex: "1 1 0",
    minWidth: "80px",
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
    flex: "1 1 0",
    minWidth: "80px",
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
    flex: "1 1 0",
    minWidth: "80px",
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

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const clients = useAppSelector(selectClients);
  const deals = useAppSelector(selectDeals);
  const activeDeals = useAppSelector(selectActiveDeals);
  const tasks = useAppSelector(selectTasks);
  const users = useAppSelector(selectUsers);

  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
    dispatch(loadClients());
    dispatch(loadDeals());
    dispatch(loadTasks());
    dispatch(loadUsers());
  }, [dispatch]);

  const userId = currentUser?.id ?? "user-1";

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

  const handleCreateClient = (data: ClientFormValues) => {
    const newClient: Client = {
      id: uuidv4(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      website: data.website || undefined,
      comment: data.comment || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: userId,
      deleted: false,
    };
    dispatch(addClient(newClient));
    handleCloseModal();
  };

  const handleCreateDeal = (data: DealFormValues) => {
    const newDeal: Deal = {
      id: uuidv4(),
      title: data.title,
      description: data.description || undefined,
      clientId: data.clientId,
      amount: Number(data.amount.replace(/\s/g, "")),
      status: data.status,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: userId,
    };
    dispatch(addDeal(newDeal));
    handleCloseModal();
  };

  const handleCreateTask = (data: TaskFormValues) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description || undefined,
      dealId: data.dealId || undefined,
      assigneeId: data.assigneeId,
      status: data.status,
      dueDate: data.dueDate || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: userId,
    };
    dispatch(addTask(newTask));
    handleCloseModal();
  };

  const activeClients = useMemo(
    () => clients.filter((c) => !c.deleted),
    [clients],
  );

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
