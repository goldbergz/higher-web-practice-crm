import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectUserError,
  selectUserLoading,
  setUser,
  setUserLoading,
} from "../../store/userSlice";
import { loginSchema } from "../../utils/schemas/authSchemas";
import {
  loginDefaultValues,
  loginSections,
} from "../../utils/constants/сonstants";

import styles from "./LoginPage.module.css";

import type { LoginFormValues } from "../../utils/schemas/authSchemas";
import type React from "react";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);
  const authError = useAppSelector(selectUserError);

  const handleSubmit = (data: LoginFormValues) => {
    dispatch(setUserLoading(true));

    setTimeout(() => {
      dispatch(setUserLoading(false));
      dispatch(
        setUser({
          id: "1",
          email: data.email,
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

        <Form<LoginFormValues>
          ariaLabel="Форма входа"
          defaultValues={loginDefaultValues}
          schema={loginSchema}
          sections={loginSections}
          onSubmit={handleSubmit}
        >
          <a className={styles.forgotLink} href="/forgot-password">
            Забыли пароль?
          </a>

          {authError ? (
            <p className={styles.authError} role="alert">
              {authError}
            </p>
          ) : null}

          <Button isLoading={isLoading} size="lg" type="submit">
            Войти
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
