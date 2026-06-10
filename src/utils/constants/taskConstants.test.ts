import { TASK_STATUS_LABELS } from "./taskConstants";

describe("TASK_STATUS_LABELS", () => {
  it("contains labels for all task statuses", () => {
    expect(TASK_STATUS_LABELS).toEqual({
      completed: "Выполнена",
      in_progress: "В работе",
      new: "Новая",
      overdue: "Просрочена",
    });
  });
});
