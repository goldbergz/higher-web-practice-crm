import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { useMediaQuery } from "../../helpers/useMediaQuery";
import LoginPage from "../LoginPage/LoginPage";

import styles from "./StartPage.module.css";

import type React from "react";

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 899px)");

  if (!isMobile) {
    return <LoginPage />;
  }

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Logo />
          <p className={styles.desc}>
            Платформа для управления клиентами, сделками и задачами.
            <br />
            Эффективно управляйте бизнес-процессами, отслеживайте ключевые
            показатели и выстраивайте продуктивные отношения с клиентами.
          </p>
        </div>

        <div className={styles.buttons}>
          <Button size="lg" onClick={() => navigate("/login")}>
            Войти
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            Регистрация
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StartPage;
