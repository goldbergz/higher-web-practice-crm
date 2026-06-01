import type { ColumnConfig, FormSection } from "../../components";
import type {
  Client,
  ProfileFormValues,
  RegisterFormValues,
} from "../../types";
import type { DealDisplay } from "../../types/deal";
import type { TaskDisplay } from "../../types/task";
import type { LoginFormValues } from "../../utils/schemas/authSchemas";
import type { ClientFormValues } from "../../utils/schemas/clientSchema";

export const clientColumns: ColumnConfig<Client>[] = [
  {
    key: "name",
    label: "Имя",
    flex: "95 1 0",
    className: "cellName",
  },
  {
    key: "phone",
    label: "Телефон",
    flex: "136 1 0",
  },
  {
    key: "email",
    label: "Email",
    flex: "176 1 0",
    className: "cellEmail",
  },
  {
    key: "company",
    label: "Название компании",
    flex: "164 1 0",
  },
  {
    key: "website",
    label: "Сайт",
    flex: "156 1 0",
  },
  {
    key: "comment",
    label: "Комментарий",
    flex: "471 1 0",
    className: "cellComment",
  },
  {
    key: "createdAt",
    label: "Добавлен",
    flex: "84 1 0",
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
        placeholder: "******",
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
    flex: "296 1 0",
    className: "cellName",
  },
  {
    key: "client",
    label: "Клиент",
    flex: "116 1 0",
  },
  {
    key: "description",
    label: "Описание",
    flex: "394 1 0",
  },
  {
    key: "status",
    label: "Этап (статус)",
    flex: "144 1 0",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "88 1 0",
    align: "right",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "115 1 0",
    align: "right",
  },
  {
    key: "completedAt",
    label: "Дата завершения",
    flex: "133 1 0",
    align: "right",
  },
];

export const dealColumnsMain: ColumnConfig<DealDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "556 1 0",
    className: "cellName",
  },
  {
    key: "client",
    label: "Клиент",
    flex: "300 1 0",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "140 1 0",
  },
  {
    key: "status",
    label: "Статус",
    flex: "140 1 0",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "120 1 0",
    align: "right",
  },
];

export const taskColumns: ColumnConfig<TaskDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "196 1 0",
    className: "cellName",
  },
  {
    key: "deal",
    label: "Сделка",
    flex: "164 1 0",
  },
  {
    key: "description",
    label: "Описание",
    flex: "440 1 0",
  },
  {
    key: "dueDate",
    label: "Выполнить до",
    flex: "144 1 0",
  },
  {
    key: "assignee",
    label: "Исполнитель",
    flex: "120 1 0",
  },
  {
    key: "status",
    label: "Статус",
    flex: "92 1 0",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "115 1 0",
    align: "right",
  },
];
