import { getOverdueTasksReport, sortOverdueTasksReport } from "./tasksReports";
import type { Task, User } from "../../types";

describe("getOverdueTasksReport", () => {
  const users: User[] = [
    { id: "u1", email: "alice@test.com", name: "Alice", createdAt: "" },
  ];

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 2);
  const pastDateStr = pastDate.toISOString();

  const tasks: Task[] = [
    { id: "t1", title: "Overdue", assigneeId: "u1", status: "new", dueDate: pastDateStr, createdAt: "", createdBy: "u1" },
    { id: "t2", title: "Completed on time", assigneeId: "u1", status: "completed", dueDate: pastDateStr, createdAt: "", createdBy: "u1" },
    { id: "t3", title: "No due date", assigneeId: "u1", status: "new", createdAt: "", createdBy: "u1" },
  ];

  it("returns overdue tasks with assignee name", () => {
    const result = getOverdueTasksReport(tasks, users, "quarter");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Overdue");
    expect(result[0].assigneeName).toBe("Alice");
    expect(result[0].status).toBe("overdue");
  });

  it("handles empty result", () => {
    const result = getOverdueTasksReport([], [], "month");
    expect(result).toHaveLength(0);
  });
});

describe("sortOverdueTasksReport", () => {
  const data = [
    { taskId: "1", title: "Beta", assigneeName: "B", dueDate: "2024-02-01", status: "overdue" as const },
    { taskId: "2", title: "Alpha", assigneeName: "A", dueDate: "2024-01-01", status: "overdue" as const },
  ];

  it("sorts by title ascending", () => {
    const sorted = sortOverdueTasksReport(data, { key: "title", direction: "asc" });
    expect(sorted[0].title).toBe("Alpha");
    expect(sorted[1].title).toBe("Beta");
  });

  it("returns original when no sort", () => {
    expect(sortOverdueTasksReport(data, null)).toEqual(data);
  });
});
