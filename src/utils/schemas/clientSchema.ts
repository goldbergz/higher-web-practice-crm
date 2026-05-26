import { z } from "zod";

const PHONE_REGEX = /^\+\d[\d\s\-()]{9,}\d$/;

export const clientSchema = z.object({
  comment: z.string(),
  company: z.string().trim().min(1, "Введите название компании"),
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Введите корректный email"),
  name: z.string().trim().min(1, "Введите имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Введите телефон")
    .regex(
      PHONE_REGEX,
      "Телефон должен начинаться с + и содержать не менее 11 цифр",
    )
    .refine(
      (val) => val.replace(/\D/g, "").length >= 11,
      "Телефон должен содержать не менее 11 цифр",
    ),
  website: z.string(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
