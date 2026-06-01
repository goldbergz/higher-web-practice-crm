import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUserMutation } from "../../api";
import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";
import {
  loginDefaultValues,
  loginSections,
} from "../../utils/constants/сonstants";
import { loginSchema } from "../../utils/schemas/authSchemas";

import styles from "./LoginPage.module.css";

import type { LoginFormValues } from "../../utils/schemas/authSchemas";
import type React from "react";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setAuthError(null);

      const profile = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setUser(profile));
      navigate("/main");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setAuthError(error?.data?.message ?? "Ошибка входа. Попробуйте снова.");
    }
  };

  return (
    <AuthLayout
      linkHref="/register"
      linkLabel="Зарегистрироваться"
      linkPrompt="У вас ещё нет аккаунта?"
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в аккаунт</h1>

        <Form<LoginFormValues>
          ariaLabel="Форма входа"
          className={styles.form}
          defaultValues={loginDefaultValues}
          schema={loginSchema}
          sections={loginSections}
          onSubmit={handleSubmit}
        >
          <div className={styles.formBottom}>
            <a className={styles.forgotLink} href="/forgot-password">
              Забыли пароль?
            </a>

            <Button isLoading={isLoading} size="lg" type="submit">
              Войти
            </Button>
          </div>
        </Form>
        {authError ? (
          <p className={styles.authError} role="alert">
            {authError}
          </p>
        ) : null}
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
