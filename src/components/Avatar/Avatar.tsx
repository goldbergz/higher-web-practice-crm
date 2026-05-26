import React, { useRef } from "react";

import styles from "./Avatar.module.css";

interface AvatarProps {
  onAvatarChange?: (file: File) => void;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ onAvatarChange, src }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img alt="Аватар пользователя" className={styles.image} src={src} />
      <button
        aria-label="Изменить аватар"
        className={styles.editButton}
        type="button"
        onClick={handleEditClick}
      >
        <svg
          className={styles.editIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input
        ref={fileInputRef}
        accept="image/*"
        className={styles.hiddenInput}
        tabIndex={-1}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Avatar;
