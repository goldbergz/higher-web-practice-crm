import { z } from "zod";

export const dealSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, "Введите сумму")
    .refine((val) => !isNaN(Number(val.replace(/\s/g, ""))), "Введите число")
    .refine(
      (val) => Number(val.replace(/\s/g, "")) > 0,
      "Сумма должна быть больше 0",
    ),
  clientId: z.string().trim().min(1, "Выберите клиента"),
  description: z.string().trim(),
  status: z.enum(["new", "in_progress", "cancelled"]),
  title: z.string().trim().min(1, "Введите название сделки"),
});

export type DealFormValues = z.infer<typeof dealSchema>;
