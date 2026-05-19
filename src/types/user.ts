export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  password?: string;
};

export type UserProfile = User & {
  surname: string;
  accName: string;
  avatar?: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  surname: string;
  accName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UpdateProfilePayload = {
  email?: string;
  name?: string;
  password?: string;
};

export type ProfileFormValues = {
  name: string;
  surname: string;
  email: string;
  accName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type RegisterFormValues = {
  name: string;
  surname: string;
  email: string;
  accName: string;
  password: string;
  confirmPassword: string;
};

export type ValidationError = {
  message: string;
};

export type ValidationErrors<T> = Partial<Record<keyof T, ValidationError>>;
