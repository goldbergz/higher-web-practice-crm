import React, { useState } from "react";

import Avatar from "../../components/Avatar/Avatar";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import type { ProfileFormValues } from "../../types";
import styles from "./ProfilePage.module.css";
import { Button } from "../../components";

const MOCK_PROFILE: ProfileFormValues = {
  accName: "Yaropolk",
  confirmPassword: "",
  currentPassword: "",
  email: "ivanov@yandex.ru",
  name: "Ярополк",
  newPassword: "",
  surname: "Иванов",
};

const DEFAULT_AVATAR = "https://placehold.co/92x92";

const ProfilePage: React.FC = () => {
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);

  const handleAvatarChange = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setAvatarSrc(objectUrl);
  };

  const handleSubmit = (data: ProfileFormValues) => {
    void data;
  };

  const handleDeleteAccount = () => {
  // TODO: логика удаления
};

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Настройка аккаунта</h1>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <Avatar onAvatarChange={handleAvatarChange} src={avatarSrc} />
          <ProfileForm
            defaultValues={MOCK_PROFILE}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={styles.cardFooter}>
          <Button
    onClick={handleDeleteAccount}
    variant="ghost"
    size="sm"
  >
    Удалить аккаунт
  </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
