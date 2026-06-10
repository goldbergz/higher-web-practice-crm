import { dealSchema } from "./dealSchema";

describe("dealSchema", () => {
  const validData = {
    amount: "100000",
    clientId: "client-1",
    description: "A deal description",
    status: "new" as const,
    title: "Big Deal",
  };

  it("validates correct deal data", () => {
    const result = dealSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty amount", () => {
    const result = dealSchema.safeParse({ ...validData, amount: "" });
    expect(result.success).toBe(false);
  });

  it("rejects non-numeric amount", () => {
    const result = dealSchema.safeParse({ ...validData, amount: "abc" });
    expect(result.success).toBe(false);
  });

  it("rejects negative amount", () => {
    const result = dealSchema.safeParse({ ...validData, amount: "-100" });
    expect(result.success).toBe(false);
  });

  it("rejects zero amount", () => {
    const result = dealSchema.safeParse({ ...validData, amount: "0" });
    expect(result.success).toBe(false);
  });

  it("accepts amount with spaces", () => {
    const result = dealSchema.safeParse({ ...validData, amount: "100 000" });
    expect(result.success).toBe(true);
  });

  it("rejects empty clientId", () => {
    const result = dealSchema.safeParse({ ...validData, clientId: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const result = dealSchema.safeParse({ ...validData, status: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects empty title", () => {
    const result = dealSchema.safeParse({ ...validData, title: "" });
    expect(result.success).toBe(false);
  });
});
