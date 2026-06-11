import { getLastTasks } from "./tasksDashboard";

import type { Task } from "../../types";

describe("getLastTasks", () => {
  const tasks: Task[] = [
    {
      id: "t1",
      title: "Old task",
      assigneeId: "u1",
      status: "completed",
      createdAt: "2024-01-01T10:00:00Z",
      createdBy: "u1",
    },
    {
      id: "t2",
      title: "Recent task",
      assigneeId: "u1",
      status: "new",
      createdAt: "2024-06-01T10:00:00Z",
      createdBy: "u1",
    },
    {
      id: "t3",
      title: "Middle task",
      assigneeId: "u1",
      status: "in_progress",
      createdAt: "2024-03-01T10:00:00Z",
      createdBy: "u1",
    },
  ];

  it("returns tasks sorted by createdAt descending", () => {
    const result = getLastTasks(tasks);
    expect(result[0].title).toBe("Recent task");
    expect(result[1].title).toBe("Middle task");
    expect(result[2].title).toBe("Old task");
  });

  it("respects limit parameter", () => {
    const result = getLastTasks(tasks, 2);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Recent task");
    expect(result[1].title).toBe("Middle task");
  });

  it("returns all tasks when limit exceeds array length", () => {
    const result = getLastTasks(tasks, 100);
    expect(result).toHaveLength(3);
  });

  it("does not mutate original array", () => {
    const original = [...tasks];
    getLastTasks(tasks);
    expect(tasks).toEqual(original);
  });
});
