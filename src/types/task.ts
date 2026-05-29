export type TaskStatus = "new" | "in_progress" | "completed" | "overdue";

export type Task = {
  id: string;

  title: string;
  description?: string;

  dealId?: string;

  assigneeId: string; // userId

  status: TaskStatus;

  dueDate?: string;

  createdAt: string;
  createdBy: string;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  dealId?: string;
  assigneeId: string;
  dueDate?: string;
};

export type UpdateTaskPayload = {
  title?: string;
  description?: string;
  dealId?: string;
  status?: TaskStatus;
  dueDate?: string;
  assigneeId?: string;
};

export type TaskDisplay = {
  id: string;
  title: string;
  deal: string;
  description: string;
  dueDate: string;
  assignee: string;
  status: string;
  createdAt: string;
};
