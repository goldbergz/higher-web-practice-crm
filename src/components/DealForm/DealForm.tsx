import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Client } from "../../types";
import type { DealFormValues } from "../../utils/schemas/dealSchema";
import { dealSchema } from "../../utils/schemas/dealSchema";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import styles from "./DealForm.module.css";

interface DealFormProps {
  clients: Client[];
  defaultValues?: DealFormValues;
  onCancel: () => void;
  onComplete?: () => void;
  onSubmit: (data: DealFormValues) => void;
  submitLabel: string;
}

const STATUS_OPTIONS = [
  { label: "Новая", value: "new" },
  { label: "В работе", value: "in_progress" },
  { label: "Отменена", value: "cancelled" },
] as const;

const emptyValues: DealFormValues = {
  amount: "",
  clientId: "",
  description: "",
  status: "new",
  title: "",
};

const DealForm: React.FC<DealFormProps> = ({
  clients,
  defaultValues,
  onCancel,
  onComplete,
  onSubmit,
  submitLabel,
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<DealFormValues>({
    defaultValues: defaultValues ?? emptyValues,
    resolver: zodResolver(dealSchema),
  });

  useEffect(() => {
    reset(defaultValues ?? emptyValues);
  }, [defaultValues, reset]);

  return (
    <form
      aria-label="Форма сделки"
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <Input
            error={errors.title?.message}
            label="Название"
            placeholder="Заключение договора"
            required
            {...register("title")}
          />
          <div className={styles.selectWrapper}>
            <label className={styles.label}>
              Клиент <span className={styles.required}>*</span>
            </label>
            <select
              className={`${styles.select} ${errors.clientId ? styles.selectError : ""}`}
              {...register("clientId")}
            >
              <option value="">Выберите клиента</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <span className={styles.error}>{errors.clientId.message}</span>
            )}
          </div>
        </div>
        <div className={styles.fieldRow}>
          <Input
            error={errors.amount?.message}
            label="Сумма"
            placeholder="50 000"
            required
            {...register("amount")}
          />
          <div className={styles.selectWrapper}>
            <label className={styles.label}>Статус</label>
            <select
              className={`${styles.select} ${errors.status ? styles.selectError : ""}`}
              {...register("status")}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className={styles.error}>{errors.status.message}</span>
            )}
          </div>
        </div>
        <Textarea
          error={errors.description?.message}
          label="Описание"
          placeholder="Подготовка финальных условий для долгосрочного контракта."
          {...register("description")}
        />
      </div>
      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
        {onComplete ? (
          <Button onClick={onComplete} type="button" variant="secondary">
            Завершить сделку
          </Button>
        ) : (
          <Button onClick={onCancel} type="button" variant="secondary">
            Отменить
          </Button>
        )}
      </div>
    </form>
  );
};

export default DealForm;
