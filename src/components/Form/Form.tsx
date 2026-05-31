import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  type DefaultValues,
  type FieldValues,
  type Path,
  type Resolver,
  useForm,
} from "react-hook-form";

import Input from "../Input/Input";
import Select from "../Select/Select";
import Textarea from "../Textarea/Textarea";

import styles from "./Form.module.css";

import type React from "react";
import type { ZodType } from "zod";

export type SelectOption = {
  label: string;
  value: string;
};

export type FieldConfig<T extends FieldValues> = {
  autoComplete?: string;
  label: string;
  name: Path<T>;
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "password" | "textarea" | "select" | "date";
};

export type FieldRow<T extends FieldValues> = FieldConfig<T> | FieldConfig<T>[];

export type FormSection<T extends FieldValues> = {
  fields: FieldRow<T>[];
  title?: string;
};

interface FormProps<T extends FieldValues> {
  ariaLabel?: string;
  children?: React.ReactNode;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  schema: ZodType;
  sections: FormSection<T>[];
  serverErrors?: Partial<Record<string, string>>;
}

function Form<T extends FieldValues>({
  ariaLabel,
  children,
  defaultValues,
  onSubmit,
  schema,
  sections,
  serverErrors,
}: FormProps<T>) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<T>({
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as unknown as Resolver<T>,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const renderField = (field: FieldConfig<T>) => {
    const error = errors[field.name];
    const errorMessage = error?.message as string | undefined;
    const serverError = serverErrors?.[field.name as string];

    const displayError = serverError ?? errorMessage;

    if (field.type === "textarea") {
      return (
        <Textarea
          key={field.name}
          error={displayError}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          {...register(field.name)}
        />
      );
    }

    if (field.type === "select") {
      return (
        <Select
          key={field.name}
          error={displayError}
          label={field.label}
          options={field.options ?? []}
          placeholder={field.placeholder}
          required={field.required}
          {...register(field.name)}
        />
      );
    }

    return (
      <Input
        key={field.name}
        autoComplete={field.autoComplete}
        error={displayError}
        label={field.label}
        placeholder={field.placeholder}
        required={field.required}
        type={field.type ?? "text"}
        {...register(field.name)}
      />
    );
  };

  const renderRow = (row: FieldRow<T>, index: number) => {
    if (Array.isArray(row)) {
      return (
        <div key={index} className={styles.fieldRow}>
          {row.map(renderField)}
        </div>
      );
    }
    return renderField(row);
  };

  return (
    <form
      noValidate
      aria-label={ariaLabel}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          {section.title && (
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          )}
          <div className={styles.fields}>{section.fields.map(renderRow)}</div>
        </div>
      ))}
      {children && <div className={styles.actions}>{children}</div>}
    </form>
  );
}

export default Form;
export type { FormProps };
