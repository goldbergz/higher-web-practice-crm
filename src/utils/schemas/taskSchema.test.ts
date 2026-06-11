import { taskSchema } from "./taskSchema";

describe("taskSchema", () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const validData = {
    title: "Finish report",
    description: "Need to finish by EOD",
    dueDate: tomorrowStr,
    assigneeId: "user-1",
    status: "new" as const,
  };

  it("validates correct task data", () => {
    const result = taskSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = taskSchema.safeParse({ ...validData, title: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty assigneeId", () => {
    const result = taskSchema.safeParse({ ...validData, assigneeId: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const result = taskSchema.safeParse({ ...validData, status: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects past dueDate", () => {
    const pastDate = "2020-01-01";
    const result = taskSchema.safeParse({ ...validData, dueDate: pastDate });
    expect(result.success).toBe(false);
  });

  it("accepts task without dueDate", () => {
    const { dueDate: _, ...data } = validData;
    const result = taskSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts task with empty description", () => {
    const result = taskSchema.safeParse({ ...validData, description: "" });
    expect(result.success).toBe(true);
  });
});
