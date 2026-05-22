import React, { useState } from "react";

import Avatar from "../../components/Avatar/Avatar";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import type { ProfileFormValues } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCurrentUser, updateUser } from "../../store/userSlice";
import styles from "./ProfilePage.module.css";
import { Button } from "../../components";

const DEFAULT_AVATAR = "https://placehold.co/92x92";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);

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
    setAvatarSrc(objectUrl);
  };

  const handleSubmit = (data: ProfileFormValues) => {
    dispatch(
      updateUser({
        email: data.email,
        name: data.name,
        surname: data.surname,
        accName: data.accName,
      }),
    );
  };

  const handleDeleteAccount = () => {
    // TODO: delete account logic
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Настройка аккаунта</h1>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Avatar onAvatarChange={handleAvatarChange} src={avatarSrc} />
          <ProfileForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={styles.cardFooter}>
          <Button
            onClick={handleDeleteAccount}
            size="sm"
            variant="ghost"
          >
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
