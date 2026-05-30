import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/AuthLayout/AuthLayuot";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  registerUser,
  selectUserLoading,
  setUserLoading,
} from "../../store/userSlice";
import { registerSchema } from "../../utils/schemas/authSchemas";

import styles from "./RegisterPage.module.css";

import type { RegisterFormValues } from "../../utils/schemas/authSchemas";
import type React from "react";
import {
  registerDefaultValues,
  registerSections,
} from "../../utils/constants/сonstants";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectUserLoading);

  const handleSubmit = (data: RegisterFormValues) => {
    dispatch(setUserLoading(true));

    setTimeout(() => {
      dispatch(setUserLoading(false));
      dispatch(
        registerUser({
          id: crypto.randomUUID(),
          email: data.email,
          name: data.name,
          surname: data.surname,
          accName: data.accName,
          createdAt: new Date().toISOString(),
        }),
      );
      navigate("/main");
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

        <Form<RegisterFormValues>
          ariaLabel="Форма регистрации"
          defaultValues={registerDefaultValues}
          schema={registerSchema}
          sections={registerSections}
          onSubmit={handleSubmit}
        >
          <Button isLoading={isLoading} size="lg" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
