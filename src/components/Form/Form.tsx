import type React from "react";
import { useEffect } from "react";
import {
  type DefaultValues,
  type FieldValues,
  type Path,
  type Resolver,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import styles from "./Form.module.css";

export type FieldConfig<T extends FieldValues> = {
  autoComplete?: string;
  label: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "password" | "textarea";
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
}

function Form<T extends FieldValues>({
  ariaLabel,
  children,
  defaultValues,
  onSubmit,
  schema,
  sections,
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

    if (field.type === "textarea") {
      return (
        <Textarea
          error={errorMessage}
          key={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          {...register(field.name)}
        />
      );
    }

    return (
      <Input
        autoComplete={field.autoComplete}
        error={errorMessage}
        key={field.name}
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
        <div className={styles.fieldRow} key={index}>
          {row.map(renderField)}
        </div>
      );
    }
    return renderField(row);
  };

  return (
    <form
      aria-label={ariaLabel}
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {sections.map((section, sectionIndex) => (
        <div className={styles.section} key={sectionIndex}>
          {section.title && (
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          )}
          <div className={styles.fields}>
            {section.fields.map(renderRow)}
          </div>
        </div>
      ))}
      {children && <div className={styles.actions}>{children}</div>}
    </form>
  );
}

export default Form;
export type { FormProps };
