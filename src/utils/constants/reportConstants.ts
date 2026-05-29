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

export const REPORT_TABS: { label: string; value: ReportTab }[] = [
  { label: "Отчёты по продажам", value: "sales" },
  { label: "Отчёты по клиентам", value: "clients" },
  { label: "Отчёты по задачам", value: "tasks" },
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
    flex: "1 1 0",
    minWidth: "80px",
  },
  {
    key: "title",
    label: "Название",
    flex: "1 1 0",
    minWidth: "120px",
  },
  {
    key: "clientName",
    label: "Клиент",
    flex: "1 1 0",
    minWidth: "100px",
  },
  {
    key: "amount",
    label: "Сумма",
    flex: "1 1 0",
    minWidth: "100px",
    align: "right",
  },
  {
    key: "completedAt",
    label: "Дата завершения",
    flex: "1 1 0",
    minWidth: "120px",
    align: "right",
  },
];

export const DEAL_STAGES_COLUMNS: ColumnConfig<DealsStageReportRow>[] = [
  {
    key: "stage",
    label: "Этап сделки",
    flex: "1 1 0",
    minWidth: "120px",
  },
  {
    key: "dealsCount",
    label: "Количество сделок на этапе",
    flex: "1 1 0",
    minWidth: "120px",
  },
  {
    key: "totalAmount",
    label: "Общая сумма сделок на этапе",
    flex: "1 1 0",
    minWidth: "140px",
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
    flex: "1 1 0",
    minWidth: "80px",
  },
  {
    key: "clientName",
    label: "Имя клиента",
    flex: "1 1 0",
    minWidth: "120px",
  },
  {
    key: "company",
    label: "Компания",
    flex: "1 1 0",
    minWidth: "120px",
  },
  {
    key: "createdAt",
    label: "Дата добавления",
    flex: "1 1 0",
    minWidth: "120px",
    align: "right",
  },
];

export const CLIENT_ACTIVITY_REPORT_COLUMNS: ColumnConfig<ClientActivityReportRow>[] =
  [
    {
      key: "clientId",
      label: "ID клиента",
      flex: "1 1 0",
      minWidth: "80px",
    },
    {
      key: "clientName",
      label: "Имя клиента",
      flex: "1 1 0",
      minWidth: "120px",
    },
    {
      key: "dealsCount",
      label: "Количество сделок",
      flex: "1 1 0",
      minWidth: "120px",
      align: "right",
    },
    {
      key: "completedTasks",
      label: "Завершённые задачи",
      flex: "1 1 0",
      minWidth: "120px",
      align: "right",
    },
  ];

export const OVERDUE_TASKS_REPORT_COLUMNS: ColumnConfig<OverdueTaskReportRow>[] =
  [
    {
      key: "taskId",
      label: "ID задачи",
      flex: "1 1 0",
      minWidth: "80px",
    },
    {
      key: "title",
      label: "Название задачи",
      flex: "1 1 0",
      minWidth: "200px",
    },
    {
      key: "assigneeName",
      label: "Ответственный",
      flex: "1 1 0",
      minWidth: "100px",
    },
    {
      key: "status",
      label: "Статус",
      flex: "1 1 0",
      minWidth: "80px",
    },
    {
      key: "dueDate",
      label: "Дата срока выполенения",
      flex: "1 1 0",
      minWidth: "120px",
    },
  ];
