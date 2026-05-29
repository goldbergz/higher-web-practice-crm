import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Введите название задачи"),
  dealId: z.string().optional(),
  description: z.string().trim(),
  dueDate: z.string().optional(),
  assigneeId: z.string().trim().min(1, "Выберите исполнителя"),
  status: z.enum(["new", "in_progress", "completed", "overdue"]),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
