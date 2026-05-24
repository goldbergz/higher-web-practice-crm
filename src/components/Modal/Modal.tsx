import type React from "react";
import { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

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
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="document"
      >
        <div className={styles.header}>
          <h2 className={styles.title} id="modal-title">
            {title}
          </h2>
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
