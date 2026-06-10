import { DEAL_STATUS_LABELS, getDealRowStyleKey } from "./dealConstants";

describe("DEAL_STATUS_LABELS", () => {
  it("contains labels for all deal statuses", () => {
    expect(DEAL_STATUS_LABELS).toEqual({
      cancelled: "Отменена",
      completed: "Завершена",
      in_progress: "В работе",
      new: "Новая",
    });
  });
});

describe("getDealRowStyleKey", () => {
  it("returns correct key for each status", () => {
    expect(getDealRowStyleKey("new")).toBe("new");
    expect(getDealRowStyleKey("completed")).toBe("completed");
    expect(getDealRowStyleKey("cancelled")).toBe("cancelled");
    expect(getDealRowStyleKey("in_progress")).toBe("in_progress");
  });

  it("returns null for unknown status", () => {
    expect(getDealRowStyleKey("unknown" as never)).toBeNull();
  });
});
