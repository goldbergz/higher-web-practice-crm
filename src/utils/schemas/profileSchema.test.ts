import { profileSchema } from "./profileSchema";

describe("profileSchema", () => {
  const validData = {
    accName: "myaccount",
    confirmPassword: "",
    currentPassword: "",
    email: "test@example.com",
    name: "John",
    newPassword: "",
    surname: "Doe",
  };

  it("validates correct profile data without password change", () => {
    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty accName", () => {
    const result = profileSchema.safeParse({ ...validData, accName: "" });
    expect(result.success).toBe(false);
  });

  it("validates password change with correct current password", () => {
    const data = {
      ...validData,
      currentPassword: "oldpass",
      newPassword: "newpassword123",
      confirmPassword: "newpassword123",
    };
    const result = profileSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects newPassword without currentPassword", () => {
    const data = {
      ...validData,
      currentPassword: "",
      newPassword: "newpassword123",
      confirmPassword: "newpassword123",
    };
    const result = profileSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects short newPassword", () => {
    const data = {
      ...validData,
      currentPassword: "oldpass",
      newPassword: "short",
      confirmPassword: "short",
    };
    const result = profileSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects mismatched newPassword and confirmPassword", () => {
    const data = {
      ...validData,
      currentPassword: "oldpass",
      newPassword: "newpassword123",
      confirmPassword: "different",
    };
    const result = profileSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = profileSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = profileSchema.safeParse({ ...validData, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = profileSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });
});
