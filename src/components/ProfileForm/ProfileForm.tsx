import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../Input/Input";
import type { ProfileFormValues } from "../../types";
import { profileSchema } from "../../utils/profileSchema";
import styles from "./ProfileForm.module.css";
import Button from "../Button/Button";

interface ProfileFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ProfileFormValues>({
    defaultValues,
    resolver: zodResolver(profileSchema),
  });

  return (
    <form
      aria-label="Форма настройки профиля"
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.fieldsSection}>
        <div className={styles.fieldRow}>
          <Input
            autoComplete="given-name"
            error={errors.name?.message}
            label="Имя"
            required
            {...register("name")}
          />
          <Input
            autoComplete="family-name"
            error={errors.surname?.message}
            label="Фамилия"
            required
            {...register("surname")}
          />
        </div>
        <div className={styles.fieldRow}>
          <Input
            autoComplete="email"
            error={errors.email?.message}
            label="Email"
            required
            type="email"
            {...register("email")}
          />
          <Input
            autoComplete="username"
            error={errors.accName?.message}
            label="Имя аккаунта"
            required
            {...register("accName")}
          />
        </div>
      </div>

      <div className={styles.passwordSection}>
        <h2 className={styles.passwordTitle}>Пароль</h2>
        <div className={styles.passwordFields}>
          <div className={styles.singleField}>
            <Input
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              label="Существующий пароль"
              placeholder="*******"
              type="password"
              {...register("currentPassword")}
            />
          </div>
          <div className={styles.fieldRow}>
            <Input
              autoComplete="new-password"
              error={errors.newPassword?.message}
              label="Новый пароль"
              placeholder="*******"
              type="password"
              {...register("newPassword")}
            />
            <Input
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              label="Повторите пароль"
              placeholder="*******"
              type="password"
              {...register("confirmPassword")}
            />
          </div>
        </div>
      </div>
      <Button
        isLoading={isSubmitting}
        type="submit"
      >
        Сохранить изменения
      </Button>
    </form>
  );
};

export default ProfileForm;
