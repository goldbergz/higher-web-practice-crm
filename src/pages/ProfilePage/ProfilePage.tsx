import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";
import Avatar from "../../components/Avatar/Avatar";
import ProfileForm from "../../components/Forms/ProfileForm";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteAccount,
  selectCurrentUser,
  updateUser,
} from "../../store/userSlice";

import styles from "./ProfilePage.module.css";

import type { ProfileFormValues } from "../../types";

const DEFAULT_AVATAR = "https://placehold.co/92x92";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  const defaultValues: ProfileFormValues = {
    accName: currentUser?.accName ?? "",
    confirmPassword: "",
    currentPassword: "",
    email: currentUser?.email ?? "",
    name: currentUser?.name ?? "",
    newPassword: "",
    surname: currentUser?.surname ?? "",
  };

  const handleAvatarChange = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    dispatch(updateUser({ avatar: objectUrl }));
  };

  const handleSubmit = (data: ProfileFormValues) => {
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
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
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
          <ProfileForm defaultValues={defaultValues} onSubmit={handleSubmit} />
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
