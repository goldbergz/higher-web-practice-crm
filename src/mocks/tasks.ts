import type { Task } from "../types";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Встреча с клиентом",
    description: "Запуск нового проекта с расширением услуг",
    dealId: "deal-1",
    assigneeId: "user-1",
    status: "new",
    dueDate: "2024-20-05",
    createdAt: "2024-11-05",
    createdBy: "user-1",
  },
  {
    id: "task-2",
    title: "Проверка документов",
    description: "Проверить все документы",
    dealId: "deal-2",
    assigneeId: "user-1",
    status: "completed",
    dueDate: "2024-21-05",
    createdAt: "2024-10-01",
    createdBy: "user-1",
  },
];
