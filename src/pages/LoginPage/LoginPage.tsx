import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectUserError, selectUserLoading, setUser, setUserError, setUserLoading } from "../../store/userSlice";
import type { LoginPayload, ValidationErrors } from "../../types";
import { validateLoginForm } from "../../utils/formValidators";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);
  const authError = useAppSelector(selectUserError);

  const [formValues, setFormValues] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors<LoginPayload>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (authError) {
      dispatch(setUserError(null));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(setUserLoading(true));

    setTimeout(() => {
      dispatch(setUserLoading(false));
      dispatch(
        setUser({
          id: "1",
          email: formValues.email,
          name: "",
          surname: "",
          accName: "",
          createdAt: new Date().toISOString(),
        }),
      );
      navigate("/profile");
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
