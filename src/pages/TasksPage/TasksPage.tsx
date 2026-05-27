import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import TaskForm from "../../components/Forms/TaskForm";
import Modal from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadDeals, selectDeals } from "../../store/dealsSlice";
import {
  addTask,
  completeTask,
  loadTasks,
  selectTasks,
  updateTask,
} from "../../store/tasksSlice";
import { formatDate } from "../../utils/formaters";
import { taskColumns } from "../../utils/constants/сonstants";

import styles from "./TasksPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type { Task, TaskDisplay } from "../../types/task";
import type { TaskFormValues } from "../../utils/schemas/taskSchema";
import type React from "react";
import { loadUsers, selectUsers } from "../../store/userSlice";
import { TASK_STATUS_LABELS } from "../../utils/constants/taskConstants";

type ModalMode = "create" | "edit" | null;

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const deals = useAppSelector(selectDeals);
  const users = useAppSelector(selectUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<TaskDisplay> | null>(
    null,
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  useEffect(() => {
    dispatch(loadTasks());
    dispatch(loadDeals());
    dispatch(loadUsers());
  }, [dispatch]);

  const getDealTitle = (dealId?: string): string => {
    if (!dealId) return "—";
    const deal = deals.find((d) => d.id === dealId);
    return deal?.title ?? "—";
  };

  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId);
    return user?.name ?? userId;
  };

  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return tasks;
    return tasks.filter((task) => {
      const dealTitle = getDealTitle(task.dealId).toLowerCase();
      const assigneeName = getUserName(task.assigneeId).toLowerCase();
      const statusLabel = (TASK_STATUS_LABELS[task.status] ?? "").toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description ?? "").toLowerCase().includes(query) ||
        dealTitle.includes(query) ||
        assigneeName.includes(query) ||
        statusLabel.includes(query) ||
        (task.dueDate ?? "").includes(query) ||
        task.createdAt.includes(query)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, searchQuery, deals]);

  const sortedTasks = useMemo(() => {
    if (!sortConfig) return filteredTasks;
    const { direction, key } = sortConfig;
    return [...filteredTasks]
      .map((task) => ({
        task,
        display: {
          id: task.id,
          title: task.title,
          deal: getDealTitle(task.dealId),
          description: task.description ?? "",
          assignee: getUserName(task.assigneeId),
          status: TASK_STATUS_LABELS[task.status] ?? task.status,
          dueDate: task.dueDate ? formatDate(task.dueDate) : "—",
          createdAt: formatDate(task.createdAt),
        } as TaskDisplay,
      }))
      .sort((a, b) => {
        const aVal = a.display[key] ?? "";
        const bVal = b.display[key] ?? "";
        const comparison = String(aVal).localeCompare(String(bVal), "ru");
        return direction === "asc" ? comparison : -comparison;
      })
      .map((item) => item.task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTasks, sortConfig, deals]);

  const displayTasks: TaskDisplay[] = useMemo(
    () =>
      sortedTasks.map((task) => ({
        id: task.id,
        title: task.title,
        deal: getDealTitle(task.dealId),
        description: task.description ?? "",
        assignee: getUserName(task.assigneeId),
        status: TASK_STATUS_LABELS[task.status] ?? task.status,
        dueDate: task.dueDate ? formatDate(task.dueDate) : "—",
        createdAt: formatDate(task.createdAt),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortedTasks, deals],
  );

  const getRowClassName = (item: TaskDisplay): string | undefined => {
    const task = tasks.find((t) => t.id === item.id);
    if (!task) return undefined;
    switch (task.status) {
      case "new":
        return styles.rowNew;
      case "completed":
        return styles.rowCompleted;
      default:
        return undefined;
    }
  };

  const getCellClassName = (
    item: TaskDisplay,
    key: keyof TaskDisplay,
  ): string | undefined => {
    if (key !== "status") return undefined;
    const task = tasks.find((t) => t.id === item.id);
    if (!task) return undefined;
    switch (task.status) {
      case "new":
        return styles.statusNew;
      case "in_progress":
        return styles.statusInProgress;
      case "completed":
        return styles.statusCompleted;
      default:
        return undefined;
    }
  };

  const handleSort = (key: keyof TaskDisplay) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowClick = (item: TaskDisplay) => {
    const original = tasks.find((t) => t.id === item.id);
    if (original) {
      setSelectedTask(original);
      setModalMode("edit");
    }
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setModalMode("create");
  };

  const handleModalClose = () => {
    setModalMode(null);
    setSelectedTask(null);
  };

  const handleCreate = (data: TaskFormValues) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description || undefined,
      dealId: data.dealId || undefined,
      assigneeId: data.assigneeId,
      status: data.status,
      dueDate: data.dueDate || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "user-1",
    };
    dispatch(addTask(newTask));
    handleModalClose();
  };

  const handleEdit = (data: TaskFormValues) => {
    if (selectedTask) {
      dispatch(
        updateTask({
          id: selectedTask.id,
          changes: {
            title: data.title,
            description: data.description || undefined,
            dealId: data.dealId || undefined,
            assigneeId: data.assigneeId,
            status: data.status,
            dueDate: data.dueDate || undefined,
          },
        }),
      );
      handleModalClose();
    }
  };

  const handleComplete = () => {
    if (selectedTask) {
      dispatch(completeTask(selectedTask.id));
      handleModalClose();
    }
  };

  const modalTitle =
    modalMode === "create" ? "Новая задача" : "Карточка задачи";

  const editDefaultValues: TaskFormValues | undefined = selectedTask
    ? {
        title: selectedTask.title,
        dealId: selectedTask.dealId ?? "",
        description: selectedTask.description ?? "",
        dueDate: selectedTask.dueDate ?? "",
        assigneeId: selectedTask.assigneeId,
        status: selectedTask.status,
      }
    : undefined;

  const showCompleteButton =
    selectedTask && selectedTask.status !== "completed";

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Задачи</h1>
      </div>
      <div className={styles.listSection}>
        <div className={styles.toolbar}>
          <Button size="md" variant="primary" onClick={handleNewTask}>
            Новая задача
          </Button>
          <div className={styles.searchInput}>
            <input
              className={styles.searchField}
              placeholder="Искать"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.listContainer}>
          <DataList
            columns={taskColumns}
            getCellClassName={getCellClassName}
            getItemId={(item) => item.id}
            getRowClassName={getRowClassName}
            items={displayTasks}
            sortConfig={sortConfig}
            onItemClick={handleRowClick}
            onSort={handleSort}
          />
        </div>
      </div>
      <Modal
        headerRight={
          modalMode === "edit" && selectedTask
            ? `создана ${formatDate(selectedTask.createdAt)}`
            : undefined
        }
        isOpen={modalMode !== null}
        title={modalTitle}
        onClose={handleModalClose}
      >
        {modalMode === "create" && (
          <TaskForm
            deals={deals}
            submitLabel="Создать задачу"
            users={users}
            onCancel={handleModalClose}
            onSubmit={handleCreate}
          />
        )}
        {modalMode === "edit" && selectedTask && (
          <TaskForm
            deals={deals}
            defaultValues={editDefaultValues}
            submitLabel="Сохранить"
            users={users}
            onCancel={handleModalClose}
            onComplete={showCompleteButton ? handleComplete : undefined}
            onSubmit={handleEdit}
          />
        )}
      </Modal>
    </div>
  );
};

export default TasksPage;
