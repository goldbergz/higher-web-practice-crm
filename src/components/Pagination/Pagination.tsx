import type React from "react";

import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className={styles.pagination}>
    <button
      aria-label="Предыдущая страница"
      className={styles.paginationButton}
      disabled={currentPage <= 1}
      type="button"
      onClick={() => onPageChange(currentPage - 1)}
    >
      <span className={styles.paginationButtonIcon}>
        <svg
          fill="none"
          height="8"
          viewBox="0 0 16 8"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7L8 1L1 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
    </button>
    <span className={styles.pageNumber}>{currentPage}</span>
    <button
      aria-label="Следующая страница"
      className={styles.paginationButton}
      disabled={currentPage >= totalPages}
      type="button"
      onClick={() => onPageChange(currentPage + 1)}
    >
      <span
        className={`${styles.paginationButtonIcon} ${styles.paginationButtonIconRight}`}
      >
        <svg
          fill="none"
          height="8"
          viewBox="0 0 16 8"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7L8 1L1 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
    </button>
  </div>
);

export default Pagination;
