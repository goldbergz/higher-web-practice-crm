import { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

import type React from "react";

interface ModalProps {
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  headerRight,
  isOpen,
  onClose,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        aria-labelledby="modal-title"
        aria-modal="true"
        className={styles.modal}
        role="dialog"
      >
        <div className={styles.header}>
          <div className={styles.headerTopRow}>
            <button
              aria-label="Закрыть"
              className={styles.backButton}
              type="button"
              onClick={onClose}
            >
              <svg
                fill="none"
                height="16"
                viewBox="0 0 18 16"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.08333 4L0.75 8L4.08333 12M0.75 8H16.75"
                  stroke="#1F2937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <h2 className={styles.title} id="modal-title">
              {title}
            </h2>
          </div>
          {headerRight && (
            <span className={styles.headerRight}>{headerRight}</span>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
