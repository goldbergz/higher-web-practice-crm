import type { ColumnConfig } from "../components";
import type { Client } from "../types";

export const clientColumns: ColumnConfig<Client>[] = [
  { key: "name",      label: "Имя",              flex: "1 1 0", minWidth: "60px",  className: "cellName"    },
  { key: "phone",     label: "Телефон",           flex: "1 1 0", minWidth: "100px", className: ""            },
  { key: "email",     label: "Email",             flex: "1.3 1 0", minWidth: "120px", className: "cellEmail" },
  { key: "company",   label: "Название компании", flex: "1.2 1 0", minWidth: "100px", className: ""          },
  { key: "website",   label: "Сайт",             flex: "1.1 1 0", minWidth: "100px", className: ""           },
  { key: "comment",   label: "Комментарий",       flex: "2 1 0",  minWidth: "80px",  className: "cellComment"},
  { key: "createdAt", label: "Добавлен",          flex: "1 1 0",  minWidth: "80px",  className: "cellDate", align: "right"},
];