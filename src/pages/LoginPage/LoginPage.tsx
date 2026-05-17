import React, { useState } from "react";

import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { LoginPayload, ValidationErrors } from "../../types";
import styles from "./LoginPage.module.css";
import { validateLoginForm } from "../../utils/formValidators";

const MOCK_USER: LoginPayload = {
  email: "ivanov@yandex.ru",
  password: "password123",
};

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors<LoginPayload>>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setAuthError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (
        formValues.email === MOCK_USER.email &&
        formValues.password === MOCK_USER.password
      ) {
        window.location.href = "/dashboard";
      } else {
        setAuthError("Неверный email или пароль");
      }
    }, 800);
  };

  return (
    <AuthLayout
      linkHref="/register"
      linkLabel="Зарегистрироваться"
      linkPrompt="У вас ещё нет аккаунта?"
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в аккаунт</h1>

        <form
          aria-label="Форма входа"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <Input
            autoComplete="email"
            error={errors.email?.message}
            label="Email или логин"
            name="email"
            onChange={handleChange}
            placeholder="ivanov@yandex.ru"
            required
            type="email"
            value={formValues.email}
          />

          <div className={styles.passwordWrapper}>
            <Input
              autoComplete="current-password"
              error={errors.password?.message}
              label="Пароль"
              name="password"
              onChange={handleChange}
              placeholder="••••••"
              required
              type="password"
              value={formValues.password}
            />
            <a className={styles.forgotLink} href="/forgot-password">
              Забыли пароль?
            </a>
          </div>

          {authError ? (
            <p className={styles.authError} role="alert">
              {authError}
            </p>
          ) : null}

          <Button isLoading={isLoading} size="lg" type="submit">
            Войти
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
