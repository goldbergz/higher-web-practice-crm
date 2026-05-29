import type { DealStatus } from "../../types/deal";

export const DEAL_STATUS_LABELS: Record<string, string> = {
  cancelled: "Отменена",
  completed: "Завершена",
  in_progress: "В работе",
  new: "Новая",
};

export const getDealRowStyleKey = (
  status: DealStatus,
): "new" | "completed" | "cancelled" | "in_progress" | null => {
  switch (status) {
    case "new":
      return "new";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "in_progress":
      return "in_progress";
    default:
      return null;
  }
};
