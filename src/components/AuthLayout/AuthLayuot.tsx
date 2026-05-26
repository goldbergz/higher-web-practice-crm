import React from "react";

import Logo from "../Logo/Logo";

import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  linkHref: string;
  linkLabel: string;
  linkPrompt: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  linkHref,
  linkLabel,
  linkPrompt,
}) => (
  <div className={styles.root}>
    <div aria-hidden="true" className={styles.blobGreen} />
    <div aria-hidden="true" className={styles.blobOrange} />
    <div aria-hidden="true" className={styles.blobBlue1} />
    <div aria-hidden="true" className={styles.blobBlue2} />

    <main className={styles.page}>
      <section aria-label="О платформе" className={styles.info}>
        <Logo />
        <div className={styles.infoText}>
          <p className={styles.desc}>
            Платформа для управления клиентами, сделками и задачами.
            <br />
            Эффективно управляйте бизнес-процессами, отслеживайте ключевые
            показатели и выстраивайте продуктивные отношения с клиентами.
          </p>
        </div>
        <p className={styles.switchPrompt}>
          {linkPrompt}{" "}
          <a className={styles.switchLink} href={linkHref}>
            {linkLabel}
          </a>
        </p>
      </section>

      <section className={styles.formSection}>{children}</section>
    </main>
  </div>
);

export default AuthLayout;
