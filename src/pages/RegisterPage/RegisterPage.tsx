import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectUserLoading, setUser, setUserLoading } from "../../store/userSlice";
import type { RegisterFormValues, ValidationErrors } from "../../types";
import { validateRegisterForm } from "../../utils/formValidators";
import styles from "./RegisterPage.module.css";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    surname: "",
    email: "",
    accName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors<RegisterFormValues>>(
    {},
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRegisterForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(setUserLoading(true));

    setTimeout(() => {
      dispatch(setUserLoading(false));
      dispatch(
        setUser({
          id: crypto.randomUUID(),
          email: formValues.email,
          name: formValues.name,
          surname: formValues.surname,
          accName: formValues.accName,
          createdAt: new Date().toISOString(),
        }),
      );
      navigate("/profile");
    }, 800);
  };

  return (
    <AuthLayout
      linkHref="/login"
      linkLabel="Войти в аккаунт"
      linkPrompt="Уже зарегистрированы?"
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>

        <form
          aria-label="Форма регистрации"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <Input
            autoComplete="name"
            error={errors.name?.message}
            label="Имя"
            name="name"
            onChange={handleChange}
            placeholder="Ярополк"
            required
            type="text"
            value={formValues.name}
          />

          <Input
            autoComplete="surname"
            error={errors.surname?.message}
            label="Фамилия"
            name="surname"
            onChange={handleChange}
            placeholder="Иванов"
            required
            type="text"
            value={formValues.surname}
          />

          <Input
            autoComplete="email"
            error={errors.email?.message}
            label="Email"
            name="email"
            onChange={handleChange}
            placeholder="ivanov@yandex.ru"
            required
            type="email"
            value={formValues.email}
          />

          <Input
            autoComplete="accName"
            error={errors.accName?.message}
            label="Имя аккаунта"
            name="accName"
            onChange={handleChange}
            placeholder="Yaropolk"
            required
            type="text"
            value={formValues.accName}
          />

          <Input
            autoComplete="new-password"
            error={errors.password?.message}
            label="Придумайте пароль"
            name="password"
            onChange={handleChange}
            placeholder="******"
            required
            type="password"
            value={formValues.password}
          />

          <Input
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            label="Повторите пароль"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="******"
            required
            type="password"
            value={formValues.confirmPassword}
          />

          <Button isLoading={isLoading} size="lg" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
