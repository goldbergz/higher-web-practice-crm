import {
  formatAmount,
  formatDate,
  formatDueDate,
  formatPdfAmount,
  formatSalesDisplayData,
  formatStagesDisplayData,
} from "./formaters";

describe("formatDate", () => {
  it("formats a date string in ru-RU locale", () => {
    const result = formatDate("2024-03-15T10:00:00Z");
    expect(result).toContain("марта");
    expect(result).toContain("2024");
  });

  it("handles invalid date gracefully", () => {
    const result = formatDate("invalid");
    expect(result).toBe("Invalid Date");
  });
});

describe("formatAmount", () => {
  it("formats amount with RUB symbol", () => {
    const result = formatAmount(1500);
    expect(result).toContain("₽");
    expect(result).toContain("1");
  });

  it("formats zero", () => {
    const result = formatAmount(0);
    expect(result).toContain("0");
    expect(result).toContain("₽");
  });
});

describe("formatDueDate", () => {
  it('returns em dash for empty input', () => {
    expect(formatDueDate()).toBe("—");
    expect(formatDueDate("")).toBe("—");
  });

  it("formats a valid date with prefix 'до'", () => {
    const result = formatDueDate("2024-12-25T10:00:00Z");
    expect(result).toContain("до");
    expect(result).toContain("декабря");
  });
});

describe("formatPdfAmount", () => {
  it("formats amount in en-US format", () => {
    expect(formatPdfAmount(1234567.89)).toBe("1,234,567.89");
  });

  it("formats zero", () => {
    expect(formatPdfAmount(0)).toBe("0");
  });
});

describe("formatSalesDisplayData", () => {
  it("formats amount field in each row", () => {
    const rows = [
      { dealId: "1", title: "Deal", clientName: "Client", amount: 5000, completedAt: "2024-01-01" },
    ];
    const result = formatSalesDisplayData(rows);
    expect(result[0].amount).toContain("₽");
  });
});

describe("formatStagesDisplayData", () => {
  it("formats stage labels and amounts", () => {
    const rows = [
      { stage: "new" as const, dealsCount: 5, totalAmount: 10000 },
    ];
    const result = formatStagesDisplayData(rows);
    expect(result[0].stage).toBe("Новая");
    expect(result[0].totalAmount).toContain("₽");
  });
});
