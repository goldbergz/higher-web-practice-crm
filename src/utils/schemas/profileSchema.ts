import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

export const profileSchema = z
  .object({
    accName: z.string().trim().min(1, "Введите имя аккаунта"),
    confirmPassword: z.string(),
    currentPassword: z.string(),
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),
    name: z.string().trim().min(1, "Введите имя"),
    newPassword: z.string(),
    surname: z.string().trim().min(1, "Введите фамилию"),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Введите текущий пароль",
      path: ["currentPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length < MIN_PASSWORD_LENGTH) {
        return false;
      }
      return true;
    },
    {
      message: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`,
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    },
  );

export type ProfileSchemaType = z.infer<typeof profileSchema>;
