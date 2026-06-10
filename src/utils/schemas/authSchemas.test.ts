import { loginSchema, registerSchema } from "./authSchemas";

describe("loginSchema", () => {
  it("validates correct login data", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "secret" });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = loginSchema.safeParse({ email: "", password: "secret" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("email");
    }
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-email", password: "secret" });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("пароль");
    }
  });
});

describe("registerSchema", () => {
  const validData = {
    accName: "myaccount",
    confirmPassword: "password123",
    email: "test@example.com",
    name: "John",
    password: "password123",
    surname: "Doe",
  };

  it("validates correct register data", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty accName", () => {
    const result = registerSchema.safeParse({ ...validData, accName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = registerSchema.safeParse({ ...validData, password: "short", confirmPassword: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({ ...validData, confirmPassword: "different" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("confirmPassword");
    }
  });

  it("rejects empty email", () => {
    const result = registerSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });
});
