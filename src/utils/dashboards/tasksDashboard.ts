import type { Task } from "../../types";

export const getLastTasks = (tasks: Task[], limit: number = 10): Task[] => {
  return [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
};
