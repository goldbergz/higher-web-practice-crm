import { clientSchema } from "./clientSchema";

describe("clientSchema", () => {
  const validData = {
    comment: "",
    company: "ACME Corp",
    email: "contact@acme.com",
    name: "John",
    phone: "+7 123 456 78 90",
    website: "",
  };

  it("validates correct client data", () => {
    const result = clientSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty company", () => {
    const result = clientSchema.safeParse({ ...validData, company: "" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = clientSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = clientSchema.safeParse({ ...validData, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = clientSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects phone without +", () => {
    const result = clientSchema.safeParse({ ...validData, phone: "1234567890" });
    expect(result.success).toBe(false);
  });

  it("rejects phone that is too short", () => {
    const result = clientSchema.safeParse({ ...validData, phone: "+123" });
    expect(result.success).toBe(false);
  });

  it("accepts empty optional fields", () => {
    const data = { ...validData, comment: "", website: "" };
    const result = clientSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
