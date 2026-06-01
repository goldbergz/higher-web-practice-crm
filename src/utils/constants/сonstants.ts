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
    flex: "0 0 95px",
    maxWidth: "95px",
    className: "cellName",
  },
  {
    key: "phone",
    label: "Телефон",
    flex: "0 0 136px",
    maxWidth: "136px",
    className: "",
  },
  {
    key: "email",
    label: "Email",
    flex: "0 0 176px",
    maxWidth: "176px",
    className: "cellEmail",
  },
  {
    key: "company",
    label: "Название компании",
    flex: "0 0 164px",
    maxWidth: "164px",
    className: "",
  },
  {
    key: "website",
    label: "Сайт",
    flex: "0 0 156px",
    maxWidth: "156px",
    className: "",
  },
  {
    key: "comment",
    label: "Комментарий",
    flex: "0 0 471px",
    maxWidth: "471px",
    className: "cellComment",
  },
  {
    key: "createdAt",
    label: "Добавлен",
    flex: "0 0 84px",
    maxWidth: "84px",
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
    flex: "0 0 296px",
    maxWidth: "296px",
    className: "cellName",
  },
  {
    key: "client",
    label: "Клиент",
    flex: "0 0 116px",
    maxWidth: "116px",
  },
  {
    key: "description",
    label: "Описание",
    flex: "1 1 394px",
    maxWidth: "394px",
  },
  {
    key: "status",
    label: "Этап (статус)",
    flex: "0 0 144px",
    maxWidth: "144px",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "0 0 88px",
    maxWidth: "88px",
    align: "right",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "0 0 115px",
    maxWidth: "115px",
    align: "right",
  },
  {
    key: "completedAt",
    label: "Дата завершения",
    flex: "0 0 133px",
    maxWidth: "133px",
    align: "right",
  },
];

export const dealColumnsMain: ColumnConfig<DealDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "0 0 556px",
    maxWidth: "556px",
    className: "cellName",
  },
  {
    key: "client",
    label: "Клиент",
    flex: "0 0 300px",
    maxWidth: "300px",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "0 0 140px",
    maxWidth: "140px",
  },
  {
    key: "status",
    label: "Статус",
    flex: "0 0 140px",
    maxWidth: "140px",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "0 0 120px",
    maxWidth: "120px",
    align: "right",
  },
];

export const taskColumns: ColumnConfig<TaskDisplay>[] = [
  {
    key: "title",
    label: "Название",
    flex: "0 0 196px",
    maxWidth: "196px",
    className: "cellName",
  },
  {
    key: "deal",
    label: "Сделка",
    flex: "0 0 164px",
    maxWidth: "164px",
  },
  {
    key: "description",
    label: "Описание",
    flex: "0 0 440px",
    maxWidth: "440px",
  },
  {
    key: "dueDate",
    label: "Выполнить до",
    flex: "0 0 144px",
    maxWidth: "144px",
  },
  {
    key: "assignee",
    label: "Исполнитель",
    flex: "1 1 120px",
    maxWidth: "120px",
  },
  {
    key: "status",
    label: "Статус",
    flex: "0 0 92px",
    maxWidth: "92px",
  },
  {
    key: "createdAt",
    label: "Дата создания",
    flex: "0 0 115px",
    maxWidth: "115px",
    align: "right",
  },
];
