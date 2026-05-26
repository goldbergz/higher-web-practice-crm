import type { ColumnConfig, FormSection } from "../components";
import type { Client, ProfileFormValues, RegisterFormValues } from "../types";
import type { DealDisplay } from "../types/deal";
import type { TaskDisplay } from "../types/task";
import type { LoginFormValues } from "./schemas/authSchemas";
import type { ClientFormValues } from "./schemas/clientSchema";

export const clientColumns: ColumnConfig<Client>[] = [
  {
    key: "name",
    label: "Имя",
    flex: "1 1 0",
    minWidth: "60px",
    className: "cellName",
  },
  {
    key: "phone",
    label: "Телефон",
    flex: "1 1 0",
    minWidth: "100px",
    className: "",
  },
  {
    key: "email",
    label: "Email",
    flex: "1.3 1 0",
    minWidth: "120px",
    className: "cellEmail",
  },
  {
    key: "company",
    label: "Название компании",
    flex: "1.2 1 0",
    minWidth: "100px",
    className: "",
  },
  {
    key: "website",
    label: "Сайт",
    flex: "1.1 1 0",
    minWidth: "100px",
    className: "",
  },
  {
    key: "comment",
    label: "Комментарий",
    flex: "2 1 0",
    minWidth: "80px",
    className: "cellComment",
  },
  {
    key: "createdAt",
    label: "Добавлен",
    flex: "1 1 0",
    minWidth: "80px",
    className: "cellDate",
    align: "right",
  },
];

export const profileSections: FormSection<ProfileFormValues>[] = [
  {
    fields: [
      [
        {
          autoComplete: "given-name",
          label: "Имя",
          name: "name",
          required: true,
        },
        {
          autoComplete: "family-name",
          label: "Фамилия",
          name: "surname",
          required: true,
        },
      ],
      [
        {
          autoComplete: "email",
          label: "Email",
          name: "email",
          required: true,
          type: "email",
        },
        {
          autoComplete: "username",
          label: "Имя аккаунта",
          name: "accName",
          required: true,
        },
      ],
    ],
  },
  {
    fields: [
      {
        autoComplete: "current-password",
        label: "Существующий пароль",
        name: "currentPassword",
        placeholder: "*******",
        type: "password",
      },
      [
        {
          autoComplete: "new-password",
          label: "Новый пароль",
          name: "newPassword",
          placeholder: "*******",
          type: "password",
        },
        {
          autoComplete: "new-password",
          label: "Повторите пароль",
          name: "confirmPassword",
          placeholder: "*******",
          type: "password",
        },
      ],
    ],
    title: "Пароль",
  },
];

export const emptyValues: ClientFormValues = {
  comment: "",
  company: "",
  email: "",
  name: "",
  phone: "",
  website: "",
};

export const clientSections: FormSection<ClientFormValues>[] = [
  {
    fields: [
      { label: "Имя", name: "name", placeholder: "Добрыня", required: true },
      [
        {
          label: "Телефон",
          name: "phone",
          placeholder: "+7 915 876-54-32",
          required: true,
          type: "tel",
        },
        {
          label: "Компания",
          name: "company",
          placeholder: "Доброград",
          required: true,
        },
      ],
      [
        { label: "Сайт", name: "website", placeholder: "www.dobrograd.ru" },
        {
          label: "Email",
          name: "email",
          placeholder: "dobrinia@yandex.ru",
          required: true,
          type: "email",
        },
      ],
      {
        label: "Комментарий",
        name: "comment",
        placeholder: "Прогнозируется рост активности.",
        type: "textarea",
      },
    ],
  },
];

export const loginSections: FormSection<LoginFormValues>[] = [
  {
    fields: [
      {
        autoComplete: "email",
        label: "Email или логин",
        name: "email",
        placeholder: "ivanov@yandex.ru",
        required: true,
        type: "email",
      },
      {
        autoComplete: "current-password",
        label: "Пароль",
        name: "password",
        placeholder: "••••••",
        required: true,
        type: "password",
      },
    ],
  },
];

export const loginDefaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export const registerSections: FormSection<RegisterFormValues>[] = [
  {
    fields: [
      {
        autoComplete: "name",
        label: "Имя",
        name: "name",
        placeholder: "Ярополк",
        required: true,
      },
      {
        autoComplete: "surname",
        label: "Фамилия",
        name: "surname",
        placeholder: "Иванов",
        required: true,
      },
      {
        autoComplete: "email",
        label: "Email",
        name: "email",
        placeholder: "ivanov@yandex.ru",
        required: true,
        type: "email",
      },
      {
        autoComplete: "accName",
        label: "Имя аккаунта",
        name: "accName",
        placeholder: "Yaropolk",
        required: true,
      },
      {
        autoComplete: "new-password",
        label: "Придумайте пароль",
        name: "password",
        placeholder: "******",
        required: true,
        type: "password",
      },
      {
        autoComplete: "new-password",
        label: "Повторите пароль",
        name: "confirmPassword",
        placeholder: "******",
        required: true,
        type: "password",
      },
    ],
  },
];

export const registerDefaultValues: RegisterFormValues = {
  accName: "",
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
  surname: "",
};

export const dealColumns: ColumnConfig<DealDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "2 1 0",
    minWidth: "140px",
    className: "cellName",
  },
  {
    key: "client",
    label: "Клиент",
    flex: "0.8 1 0",
    minWidth: "80px",
  },
  {
    key: "description",
    label: "Описание",
    flex: "2 1 0",
    minWidth: "100px",
  },
  {
    key: "status",
    label: "Этап (статус)",
    flex: "0.7 1 0",
    minWidth: "80px",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "0.8 1 0",
    minWidth: "80px",
    align: "right",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "0.9 1 0",
    minWidth: "100px",
    align: "right",
  },
  {
    key: "completedAt",
    label: "Дата завершения",
    flex: "1 1 0",
    minWidth: "100px",
    align: "right",
  },
];

export const taskColumns: ColumnConfig<TaskDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "2 1 0",
    minWidth: "140px",
    className: "cellName",
  },
  {
    key: "deal",
    label: "Сделка",
    flex: "1.2 1 0",
    minWidth: "100px",
  },
  {
    key: "description",
    label: "Описание",
    flex: "2 1 0",
    minWidth: "100px",
  },
  {
    key: "assignee",
    label: "Исполнитель",
    flex: "1 1 0",
    minWidth: "100px",
  },
  {
    key: "status",
    label: "Статус",
    flex: "0.7 1 0",
    minWidth: "80px",
  },
  {
    key: "dueDate",
    label: "Выполнить до",
    flex: "0.9 1 0",
    minWidth: "100px",
    align: "right",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "0.9 1 0",
    minWidth: "100px",
    align: "right",
  },
];
