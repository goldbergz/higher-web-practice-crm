import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDeleteUserMutation, useUpdateUserMutation } from "../../api";
import { Button } from "../../components";
import Avatar from "../../components/Avatar/Avatar";
import ProfileForm from "../../components/Forms/ProfileForm";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout, selectCurrentUser, updateUser } from "../../store/userSlice";

import styles from "./ProfilePage.module.css";

import type { ProfileFormValues } from "../../types";

const DEFAULT_AVATAR = "https://placehold.co/92x92";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const [updateUserApi] = useUpdateUserMutation();
  const [deleteUserApi] = useDeleteUserMutation();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<string, string>>
  >({});

  const defaultValues: ProfileFormValues = {
    accName: currentUser?.accName ?? "",
    confirmPassword: "",
    currentPassword: "",
    email: currentUser?.email ?? "",
    name: currentUser?.name ?? "",
    newPassword: "",
    surname: currentUser?.surname ?? "",
  };

  const handleAvatarChange = async (file: File) => {
    const base64 = await fileToBase64(file);
    dispatch(updateUser({ avatar: base64 }));
  };

  const handleSubmit = async (data: ProfileFormValues) => {
    if (!currentUser) return;

    setServerErrors({});

    try {
      await updateUserApi({
        id: currentUser.id,
        changes: {
          email: data.email,
          name: data.name,
          ...(data.newPassword ? { password: data.newPassword } : {}),
        },
        currentPassword: data.newPassword ? data.currentPassword : undefined,
      }).unwrap();

      dispatch(
        updateUser({
          avatar: currentUser?.avatar,
          email: data.email,
          name: data.name,
          surname: data.surname,
          accName: data.accName,
          ...(data.newPassword ? { password: data.newPassword } : {}),
        }),
      );
    } catch (err) {
      const error = err as {
        data?: { message?: string; field?: string };
      };

      if (error?.data?.field) {
        setServerErrors({ [error.data.field]: error.data.message });
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    await deleteUserApi(currentUser.id);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Настройка аккаунта</h1>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Avatar
            src={currentUser?.avatar ?? DEFAULT_AVATAR}
            onAvatarChange={handleAvatarChange}
          />
          <ProfileForm
            defaultValues={defaultValues}
            serverErrors={serverErrors}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={styles.cardFooter}>
          <Button size="sm" variant="ghost" onClick={handleDeleteAccount}>
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
