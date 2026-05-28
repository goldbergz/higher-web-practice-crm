import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Dropdown.module.css";

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const ChevronIcon: React.FC = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const Dropdown: React.FC<DropdownProps> = ({ onChange, options, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={wrapperRef} className={styles.wrapper} onKeyDown={handleKeyDown}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={styles.trigger}
        type="button"
        onClick={handleToggle}
      >
        <span>{selectedOption?.label ?? ""}</span>
        <span
          className={[styles.triggerIcon, isOpen ? styles.triggerIconOpen : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <ChevronIcon />
        </span>
      </button>
      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              aria-selected={option.value === value}
              className={[
                styles.menuItem,
                option.value === value ? styles.menuItemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="option"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
