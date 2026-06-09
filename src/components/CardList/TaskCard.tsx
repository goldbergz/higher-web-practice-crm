import styles from "./CardList.module.css";

import type { TaskDisplay } from "../../types/task";
import type React from "react";

interface TaskCardProps {
  statusClassName?: string;
  task: TaskDisplay;
}

const TaskCard: React.FC<TaskCardProps> = ({ statusClassName, task }) => {
  const dueDateText =
    task.dueDate === "—" ? "—" : `выполнить до ${task.dueDate}`;

  return (
    <div className={`${styles.card} ${styles.cardTask}`}>
      <div className={`${styles.row} ${styles.rowStart} ${styles.gap16}`}>
        <div className={`${styles.col} ${styles.flex1} ${styles.gap3}`}>
          <span className={`${styles.text} ${styles.t14} ${styles.dark}`}>
            {task.title}
          </span>
          <span className={`${styles.text} ${styles.t12} ${styles.dark}`}>
            {task.deal}
          </span>
        </div>
        <span
          className={`${styles.text} ${styles.t12} ${styles.w60} ${statusClassName ?? ""}`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <div className={styles.row}>
          <span
            className={`${styles.text} ${styles.t14} ${styles.muted} ${styles.flex1}`}
          >
            {task.description}
          </span>
        </div>
      )}

      <div className={styles.row}>
        <span className={`${styles.text} ${styles.t12} ${styles.blue}`}>
          {dueDateText}
        </span>
      </div>

      <div className={`${styles.row} ${styles.rowEnd} ${styles.gap6}`}>
        <div className={`${styles.col} ${styles.flex1}`}>
          <span className={`${styles.text} ${styles.t14} ${styles.dark}`}>
            {task.assignee}
          </span>
          <span className={`${styles.text} ${styles.t12} ${styles.muted}`}>
            Исполнитель
          </span>
        </div>
        <span
          className={`${styles.text} ${styles.t12} ${styles.muted} ${styles.right} ${styles.w116}`}
        >
          {task.createdAt}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
