import React, { forwardRef } from "react";

import styles from "./Textarea.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", error, id, label, required, ...rest }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={textareaId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <textarea
          aria-describedby={error ? `${textareaId}-error` : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={required}
          className={[
            styles.textarea,
            error ? styles.textareaError : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          id={textareaId}
          ref={ref}
          required={required}
          {...rest}
        />
        {error ? (
          <p
            className={styles.errorMessage}
            id={`${textareaId}-error`}
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
