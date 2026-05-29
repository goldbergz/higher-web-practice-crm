import type { Task } from "../types";

export const mockTasks: Task[] = [
  {
    id: "t2000000-0000-4000-8000-000000000001",
    title: "Позвонить клиенту",
    description: "Обсудить детали сделки",
    dealId: "d1000000-0000-4000-8000-000000000001",
    assigneeId: "2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001",
    status: "in_progress",
    dueDate: "2026-03-15T18:00:00Z",
    createdAt: "2026-03-10T10:00:00Z",
    createdBy: "2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001",
  },
  {
    id: "t2000000-0000-4000-8000-000000000002",
    title: "Подготовить коммерческое предложение",
    description: "Отправить PDF клиенту",
    dealId: "d1000000-0000-4000-8000-000000000003",
    assigneeId: "5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002",
    status: "new",
    dueDate: "2026-03-18T18:00:00Z",
    createdAt: "2026-03-11T09:00:00Z",
    createdBy: "2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001",
  },
  {
    id: "t2000000-0000-4000-8000-000000000003",
    title: "Закрыть сделку",
    description: "Подписать акт выполненных работ",
    dealId: "deal-7",
    assigneeId: "5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002",
    status: "overdue",
    dueDate: "2026-05-25T15:00:00Z",
    createdAt: "2026-05-20T11:00:00Z",
    createdBy: "5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002",
  },
];
