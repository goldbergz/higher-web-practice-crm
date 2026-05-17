import type { LoginPayload, RegisterFormValues, ValidationErrors } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = (
  values: LoginPayload
): ValidationErrors<LoginPayload> => {
  const errors: ValidationErrors<LoginPayload> = {};

  if (!values.email.trim()) {
    errors.email = { message: "Введите email" };
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = { message: "Введите корректный email" };
  }

  if (!values.password) {
    errors.password = { message: "Введите пароль" };
  }

  return errors;
};

const MIN_PASSWORD_LENGTH = 8;
const REGISTERED_EMAILS = ["existing@yandex.ru", "admin@yaplex.com"];


export const validateRegisterForm = (
  values: RegisterFormValues
): ValidationErrors<RegisterFormValues> => {
  const errors: ValidationErrors<RegisterFormValues> = {};

  if (!values.name.trim()) {
    errors.name = { message: "Введите имя" };
  }

  if (!values.surname.trim()) {
    errors.surname = { message: "Введите фамилию" };
  }

  if (!values.email.trim()) {
    errors.email = { message: "Введите email" };
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = { message: "Введите корректный email" };
  } else if (REGISTERED_EMAILS.includes(values.email.toLowerCase())) {
    errors.email = { message: "Этот email уже зарегистрирован" };
  }

   if (!values.accName.trim()) {
    errors.accName = { message: "Введите имя аккаунта" };
  }

  if (!values.password) {
    errors.password = { message: "Введите пароль" };
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = {
      message: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов`,
    };
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = { message: "Повторите пароль" };
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = { message: "Пароли не совпадают" };
  }

  return errors;
};
