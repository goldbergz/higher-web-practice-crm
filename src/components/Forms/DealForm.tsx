import { dealSchema } from "../../utils/schemas/dealSchema";
import Button from "../Button/Button";
import Form, { type FormSection, type SelectOption } from "../Form/Form";

import type { Client } from "../../types";
import type { DealFormValues } from "../../utils/schemas/dealSchema";
import type React from "react";

interface DealFormProps {
  clients: Client[];
  defaultValues?: DealFormValues;
  onCancel: () => void;
  onComplete?: () => void;
  onSubmit: (data: DealFormValues) => void;
  submitLabel: string;
}

const STATUS_OPTIONS: SelectOption[] = [
  { label: "Новая", value: "new" },
  { label: "В работе", value: "in_progress" },
  { label: "Отменена", value: "cancelled" },
];

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
  const clientOptions = clients.map((c) => ({ label: c.name, value: c.id }));

  const dealSections: FormSection<DealFormValues>[] = [
    {
      fields: [
        [
          {
            label: "Название",
            name: "title",
            placeholder: "Заключение договора",
            required: true,
          },
          {
            label: "Клиент",
            name: "clientId",
            type: "select",
            options: clientOptions,
            placeholder: "Выберите клиента",
            required: true,
          },
        ],
        [
          {
            label: "Сумма",
            name: "amount",
            placeholder: "50 000",
            required: true,
          },
          {
            label: "Статус",
            name: "status",
            type: "select",
            options: STATUS_OPTIONS,
          },
        ],
        {
          label: "Описание",
          name: "description",
          placeholder:
            "Подготовка финальных условий для долгосрочного контракта.",
          type: "textarea",
        },
      ],
    },
  ];

  return (
    <Form<DealFormValues>
      ariaLabel="Форма сделки"
      defaultValues={defaultValues ?? emptyValues}
      schema={dealSchema}
      sections={dealSections}
      onSubmit={onSubmit}
    >
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
      {onComplete ? (
        <Button type="button" variant="secondary" onClick={onComplete}>
          Завершить сделку
        </Button>
      ) : (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отменить
        </Button>
      )}
    </Form>
  );
};

export default DealForm;
