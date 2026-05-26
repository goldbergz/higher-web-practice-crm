import React, { forwardRef } from "react";

import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, id, label, required, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <input
          ref={ref}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={required}
          className={[styles.input, error ? styles.inputError : "", className]
            .filter(Boolean)
            .join(" ")}
          id={inputId}
          required={required}
          {...rest}
        />
        {error ? (
          <p
            className={styles.errorMessage}
            id={`${inputId}-error`}
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
