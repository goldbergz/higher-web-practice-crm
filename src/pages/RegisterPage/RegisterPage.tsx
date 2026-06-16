import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from "../../api";
import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";
import {
  registerDefaultValues,
  registerSections,
} from "../../utils/constants/сonstants";
import { registerSchema } from "../../utils/schemas/authSchemas";

import styles from "./RegisterPage.module.css";

import type { RegisterFormValues } from "../../utils/schemas/authSchemas";
import type React from "react";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      setAuthError(null);

      const profile = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        surname: data.surname,
        accName: data.accName,
      }).unwrap();

      dispatch(setUser(profile));
      navigate("/main");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setAuthError(
        error?.data?.message ?? "Ошибка регистрации. Попробуйте снова.",
      );
    }
  };

  return (
    <AuthLayout
      linkHref="/login"
      linkLabel="Войти в аккаунт"
      linkPrompt="Уже зарегистрированы?"
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>

        <Form<RegisterFormValues>
          ariaLabel="Форма регистрации"
          className={styles.form}
          defaultValues={registerDefaultValues}
          schema={registerSchema}
          sections={registerSections}
          onSubmit={handleSubmit}
        >
          <Button isLoading={isLoading} size="lg" type="submit">
            Зарегистрироваться
          </Button>
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

export default RegisterPage;
