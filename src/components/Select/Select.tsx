import React, { forwardRef } from "react";

import styles from "./Select.module.css";

import type { SelectOption } from "../Form/Form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      error,
      id,
      label,
      options,
      placeholder,
      required,
      ...rest
    },
    ref,
  ) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={selectId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <select
          ref={ref}
          aria-describedby={error ? `${selectId}-error` : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={required}
          className={[styles.select, error ? styles.selectError : "", className]
            .filter(Boolean)
            .join(" ")}
          id={selectId}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            className={styles.errorMessage}
            id={`${selectId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
