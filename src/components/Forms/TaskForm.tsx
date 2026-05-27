import { taskSchema } from "../../utils/schemas/taskSchema";
import Button from "../Button/Button";
import Form from "../Form/Form";

import type { Deal } from "../../types";
import type { TaskFormValues } from "../../utils/schemas/taskSchema";
import type { FormSection } from "../Form/Form";
import type React from "react";

interface User {
  id: string;
  name: string;
}

interface TaskFormProps {
  deals: Deal[];
  users: User[];
  defaultValues?: TaskFormValues;
  onCancel: () => void;
  onComplete?: () => void;
  onSubmit: (data: TaskFormValues) => void;
  submitLabel: string;
}

const emptyValues: TaskFormValues = {
  title: "",
  dealId: "",
  description: "",
  dueDate: "",
  assigneeId: "",
  status: "new",
};

const STATUS_OPTIONS = [
  { label: "Новая", value: "new" },
  { label: "В работе", value: "in_progress" },
  { label: "Выполнена", value: "completed" },
];

const TaskForm: React.FC<TaskFormProps> = ({
  deals,
  users,
  defaultValues,
  onCancel,
  onComplete,
  onSubmit,
  submitLabel,
}) => {
  const dealOptions = deals.map((d) => ({ label: d.title, value: d.id }));
  const userOptions = users.map((u) => ({ label: u.name, value: u.id }));

  const taskSections: FormSection<TaskFormValues>[] = [
    {
      fields: [
        [
          {
            label: "Название",
            name: "title",
            placeholder: "Подготовить договор",
            required: true,
          },
          {
            label: "Статус",
            name: "status",
            type: "select",
            options: STATUS_OPTIONS,
            required: true,
          },
        ],
        [
          {
            label: "Исполнитель",
            name: "assigneeId",
            type: "select",
            options: userOptions,
            placeholder: "Выберите исполнителя",
            required: true,
          },
          {
            label: "Сделка",
            name: "dealId",
            type: "select",
            options: dealOptions,
            placeholder: "Не выбрана",
          },
        ],
        {
          label: "Выполнить до",
          name: "dueDate",
          type: "date",
        },
        {
          label: "Описание",
          name: "description",
          placeholder: "Описание задачи",
          type: "textarea",
        },
      ],
    },
  ];

  return (
    <Form<TaskFormValues>
      ariaLabel="Форма задачи"
      defaultValues={defaultValues ?? emptyValues}
      schema={taskSchema}
      sections={taskSections}
      onSubmit={onSubmit}
    >
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
      {onComplete ? (
        <Button type="button" variant="secondary" onClick={onComplete}>
          Выполнить задачу
        </Button>
      ) : (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отменить
        </Button>
      )}
    </Form>
  );
};

export default TaskForm;
