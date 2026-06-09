import type { ColumnConfig } from "../../components/DataList/types";
import type { DropdownOption } from "../../components/Dropdown/Dropdown";
import type {
  ClientActivityReportRow,
  DealsStageReportRow,
  NewClientReportRow,
  OverdueTaskReportRow,
  SalesReportRow,
} from "../../types/reports";

export type ReportTab = "sales" | "clients" | "tasks";

export const REPORT_TABS: {
  label: string;
  mobileLabel: string;
  value: ReportTab;
}[] = [
  {
    label: "Отчёты по продажам",
    mobileLabel: "По продажам",
    value: "sales",
  },
  {
    label: "Отчёты по клиентам",
    mobileLabel: "По клиентам",
    value: "clients",
  },
  {
    label: "Отчёты по задачам",
    mobileLabel: "По задачам",
    value: "tasks",
  },
];

export const PERIOD_OPTIONS: DropdownOption[] = [
  { label: "За неделю", value: "week" },
  { label: "За месяц", value: "month" },
  { label: "За квартал", value: "quarter" },
];

export const VIEW_OPTIONS: DropdownOption[] = [
  { label: "Списком", value: "list" },
];

export const SALES_REPORT_COLUMNS: ColumnConfig<SalesReportRow>[] = [
  {
    key: "dealId",
    label: "ID сделки",
    flex: "0 0 207px",
    maxWidth: "207px",
  },
  {
    key: "title",
    label: "Название",
    flex: "0 0 207px",
    maxWidth: "207px",
  },
  {
    key: "clientName",
    label: "Клиент",
    flex: "0 0 207px",
    maxWidth: "207px",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "0 0 207px",
    maxWidth: "207px",
    align: "right",
  },
  {
    key: "completedAt",
    label: "Дата завершения",
    flex: "0 0 207px",
    maxWidth: "207px",
    align: "right",
  },
];

export const DEAL_STAGES_COLUMNS: ColumnConfig<DealsStageReportRow>[] = [
  {
    key: "stage",
    label: "Этап сделки",
    flex: "0 0 345px",
    maxWidth: "345px",
  },
  {
    key: "dealsCount",
    label: "Количество сделок на этапе",
    flex: "0 0 345px",
    maxWidth: "345px",
  },
  {
    key: "totalAmount",
    label: "Общая сумма сделок на этапе",
    flex: "0 0 345px",
    maxWidth: "345px",
    align: "right",
  },
];

export const REPORTS_PAGE_SIZE = 10;

export const DEAL_STAGE_COLORS: Record<string, string> = {
  in_progress: "#1D4ED8",
  new: "#1F2937",
  cancelled: "#F59E0B",
  completed: "#16A34A",
};

export const DEAL_STAGE_ROW_COLORS: Record<string, string> = {
  in_progress: "#FFFFFF",
  new: "#EFF6FF",
  cancelled: "#FFF7ED",
  completed: "#F0FDF4",
};

export const NEW_CLIENTS_REPORT_COLUMNS: ColumnConfig<NewClientReportRow>[] = [
  {
    key: "clientId",
    label: "ID клиента",
    flex: "0 0 258px",
    maxWidth: "258px",
  },
  {
    key: "clientName",
    label: "Имя клиента",
    flex: "1 1 0",
    maxWidth: "258px",
  },
  {
    key: "company",
    label: "Компания",
    flex: "0 0 258px",
    maxWidth: "258px",
  },
  {
    key: "createdAt",
    label: "Дата добавления",
    flex: "0 0 258px",
    maxWidth: "258px",
    align: "right",
  },
];

export const CLIENT_ACTIVITY_REPORT_COLUMNS: ColumnConfig<ClientActivityReportRow>[] =
  [
    {
      key: "clientId",
      label: "ID клиента",
      flex: "0 0 255px",
      maxWidth: "255px",
    },
    {
      key: "clientName",
      label: "Имя клиента",
      flex: "0 0 255px",
      maxWidth: "255px",
    },
    {
      key: "dealsCount",
      label: "Количество сделок",
      flex: "0 0 255px",
      maxWidth: "255px",
    },
    {
      key: "completedTasks",
      label: "Завершённые задачи",
      flex: "0 0 255px",
      maxWidth: "255px",
    },
  ];

export const OVERDUE_TASKS_REPORT_COLUMNS: ColumnConfig<OverdueTaskReportRow>[] =
  [
    {
      key: "taskId",
      label: "ID задачи",
      flex: "0 0 207px",
      maxWidth: "207px",
    },
    {
      key: "title",
      label: "Название задачи",
      flex: "0 0 207px",
      maxWidth: "207px",
    },
    {
      key: "assigneeName",
      label: "Ответственный",
      flex: "0 0 207px",
      maxWidth: "207px",
    },
    {
      key: "status",
      label: "Статус",
      flex: "0 0 207px",
      maxWidth: "207px",
    },
    {
      key: "dueDate",
      label: "Дата срока выполенения",
      flex: "0 0 207px",
      maxWidth: "207px",
      align: "right",
    },
  ];
