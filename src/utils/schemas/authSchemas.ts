import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const MIN_PASSWORD_LENGTH = 8;

export const registerSchema = z
  .object({
    accName: z.string().trim().min(1, "Введите имя аккаунта"),
    confirmPassword: z.string().min(1, "Повторите пароль"),
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),
    name: z.string().trim().min(1, "Введите имя"),
    password: z
      .string()
      .min(1, "Введите пароль")
      .min(
        MIN_PASSWORD_LENGTH,
        `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`,
      ),
    surname: z.string().trim().min(1, "Введите фамилию"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
