import { useMemo } from "react";

import { formatDate, formatDueDate } from "../../helpers/formaters";

import styles from "./MobileList.module.css";

import type { Client } from "../../types/client";
import type { Deal, DealDisplay } from "../../types/deal";
import type { Task, TaskDisplay } from "../../types/task";
import type React from "react";

interface MobileCardListProps {
  type: "client" | "deal" | "task";
  clients?: Client[];
  deals?: DealDisplay[];
  rawDeals?: Deal[];
  tasks?: TaskDisplay[];
  rawTasks?: Task[];
  onItemClick?: (item: Client | DealDisplay | TaskDisplay) => void;
}

function getDealStatusClass(status: string): string {
  switch (status) {
    case "new":
      return styles.statusTextNew;
    case "in_progress":
      return styles.statusTextInProgress;
    case "completed":
      return styles.statusTextCompleted;
    case "cancelled":
      return styles.statusTextCancelled;
    default:
      return styles.statusTextNew;
  }
}

function getTaskStatusClass(status: string): string {
  switch (status) {
    case "new":
      return styles.taskStatusNew;
    case "in_progress":
      return styles.taskStatusInProgress;
    case "completed":
      return styles.taskStatusCompleted;
    case "overdue":
      return styles.taskStatusOverdue;
    default:
      return styles.taskStatusNew;
  }
}

function getDealRowClass(status: string): string {
  switch (status) {
    case "new":
      return styles.cardNew;
    case "completed":
      return styles.cardCompleted;
    case "cancelled":
      return styles.cardCancelled;
    default:
      return "";
  }
}

function getTaskRowClass(status: string): string {
  switch (status) {
    case "new":
      return styles.cardNew;
    case "completed":
      return styles.cardCompleted;
    default:
      return "";
  }
}

interface ClientCardProps {
  client: Client;
  onClick?: (client: Client) => void;
}

function getClientCardClass(client: Client): string {
  if (client.deleted) return styles.cardCancelled;
  return "";
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => (
  <div
    key={client.id}
    className={`${styles.card} ${styles.clientCard} ${getClientCardClass(client)}`}
    role="button"
    tabIndex={0}
    onClick={() => onClick?.(client)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick?.(client);
    }}
  >
    <div className={styles.clientNameRow}>
      <div className={styles.clientName}>{client.name}</div>
      <div className={styles.clientDate}>{formatDate(client.createdAt)}</div>
    </div>
    <div className={styles.clientInfoCol}>
      <div className={styles.clientInfoRow}>
        <div className={styles.clientPhone}>{client.phone}</div>
        <div className={styles.clientCompany}>{client.company}</div>
      </div>
      <div className={styles.clientInfoRow}>
        <div className={styles.clientEmail}>{client.email}</div>
        <div className={styles.clientWebsite}>{client.website || ""}</div>
      </div>
    </div>
    <div className={styles.clientComment}>{client.comment || ""}</div>
  </div>
);

interface DealCardProps {
  deal: DealDisplay;
  rawDeal?: Deal;
  onClick?: (deal: DealDisplay) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, rawDeal, onClick }) => {
  const statusClass =
    rawDeal?.status && getDealStatusClass(rawDeal.status)
      ? getDealStatusClass(rawDeal.status)
      : styles.statusTextInProgress;

  const rowClass = rawDeal?.status ? getDealRowClass(rawDeal.status) : "";

  return (
    <div
      key={deal.id}
      className={`${styles.card} ${styles.dealCard} ${rowClass}`}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(deal)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(deal);
      }}
    >
      <div className={styles.dealTitleRow}>
        <div className={styles.dealTitle}>{deal.title}</div>
        <div className={`${styles.dealStatus} ${statusClass}`}>
          {deal.status}
        </div>
      </div>
      <div className={styles.dealClientRow}>
        <div className={styles.dealClient}>{deal.client}</div>
        <div className={styles.dealAmount}>{deal.amount}</div>
      </div>
      <div className={styles.dealDescRow}>
        <div className={styles.dealDesc}>{deal.description}</div>
      </div>
      <div className={styles.dealDatesRow}>
        <div className={styles.dealDateCol}>
          <div className={styles.dealDateLabel}>создана</div>
          <div className={styles.dealDateValue}>{deal.createdAt}</div>
        </div>
        <div className={styles.dealDateColEnd}>
          <div className={styles.dealDateLabel}>завершена</div>
          <div className={styles.dealDateValue}>{deal.completedAt}</div>
        </div>
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: TaskDisplay;
  rawTask?: Task;
  onClick?: (task: TaskDisplay) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, rawTask, onClick }) => {
  const statusClass =
    rawTask?.status && getTaskStatusClass(rawTask.status)
      ? getTaskStatusClass(rawTask.status)
      : styles.taskStatusNew;

  const rowClass = rawTask?.status ? getTaskRowClass(rawTask.status) : "";

  return (
    <div
      key={task.id}
      className={`${styles.card} ${styles.taskCard} ${rowClass}`}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(task);
      }}
    >
      <div className={styles.taskTitleRow}>
        <div className={styles.taskTitleCol}>
          <div className={styles.taskTitle}>{task.title}</div>
          <div className={styles.taskProject}>Проект «{task.deal}»</div>
        </div>
        <div className={`${styles.taskStatusChip} ${statusClass}`}>
          {task.status}
        </div>
      </div>
      <div className={styles.taskDescRow}>
        <div className={styles.taskDesc}>{task.description}</div>
      </div>
      <div className={styles.taskDueRow}>
        <div className={styles.taskDue}>
          {rawTask?.dueDate ? formatDueDate(rawTask.dueDate) : "выполнить до —"}
        </div>
      </div>
      <div className={styles.taskBottomRow}>
        <div className={styles.taskAssigneeCol}>
          <div className={styles.taskAssigneeName}>{task.assignee}</div>
          <div className={styles.taskAssigneeRole}>Исполнитель</div>
        </div>
        <div className={styles.taskDate}>{task.createdAt}</div>
      </div>
    </div>
  );
};

const MobileList: React.FC<MobileCardListProps> = ({
  type,
  clients,
  deals,
  rawDeals,
  tasks,
  rawTasks,
  onItemClick,
}) => {
  const rawDealMap = useMemo(() => {
    if (!rawDeals) return new Map<string, Deal>();
    const map = new Map<string, Deal>();
    for (const d of rawDeals) {
      map.set(d.id, d);
    }
    return map;
  }, [rawDeals]);

  const rawTaskMap = useMemo(() => {
    if (!rawTasks) return new Map<string, Task>();
    const map = new Map<string, Task>();
    for (const t of rawTasks) {
      map.set(t.id, t);
    }
    return map;
  }, [rawTasks]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {type === "client" &&
          clients?.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onClick={onItemClick as ((item: Client) => void) | undefined}
            />
          ))}
        {type === "deal" &&
          deals?.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              rawDeal={rawDealMap.get(deal.id)}
              onClick={onItemClick as ((item: DealDisplay) => void) | undefined}
            />
          ))}
        {type === "task" &&
          tasks?.map((task) => (
            <TaskCard
              key={task.id}
              rawTask={rawTaskMap.get(task.id)}
              task={task}
              onClick={onItemClick as ((item: TaskDisplay) => void) | undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default MobileList;
