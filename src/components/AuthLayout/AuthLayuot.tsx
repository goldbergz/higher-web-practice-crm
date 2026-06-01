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
    <svg
      className={styles.blobGreen}
      width="596"
      height="647"
      viewBox="0 0 596 647"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M493.955 150.241C444.613 257.696 269.6 176.712 160.419 222.077C79.9477 255.512 40.4748 403.227 -41.0806 372.546C-125.103 340.937 -86.3359 209.327 -106.209 121.772C-116.986 74.2905 -140.971 30.508 -129.453 -16.8004C-117.673 -65.1848 -84.7817 -103.571 -44.2883 -132.55C1.58379 -165.378 52.5744 -188.757 108.963 -187.423C185.078 -185.621 262.066 -174.149 319.307 -123.945C403.994 -49.6688 540.966 47.861 493.955 150.241Z"
        fill="#10B981"
      />
    </svg>

    <svg
      className={styles.blobOrange}
      width="634"
      height=" 528"
      viewBox="0 0 634  528"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.14817 227.768C7.35579 134.843 -28.5003 -2.74998 58.4862 -35.4382C149.971 -69.8169 204.43 80.4689 293.785 120.055C355.836 147.545 455.09 94.1455 486.634 154.238C518.445 214.842 420.45 267.765 406.492 334.772C390.587 411.128 452.437 500.189 402.152 559.808C345.141 627.402 237.384 667.41 156.986 630.595C78.4386 594.627 87.6272 482.964 57.5089 401.993C35.5995 343.092 7.00776 290.613 7.14817 227.768Z"
        fill="#F59E0B"
      />
    </svg>

    <svg
      className={styles.blobBlue1}
      width="440"
      height="471"
      viewBox="0 0 440 471"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M-192.588 179.041C-158.672 103.616 -142.697 -16.6281 -44.5975 1.91722C53.4468 20.4521 102.766 165.149 182.857 250.017C257.51 329.122 365.085 381.697 401.86 475C445.018 584.501 464.516 722.052 385.039 762.989C306.222 803.586 180.657 676.111 72.7503 644.516C-13.1001 619.379 -101.128 672.618 -171.107 600.15C-241.157 527.61 -200.279 439.488 -204.464 357.444C-207.758 292.877 -215.634 230.294 -192.588 179.041Z"
        fill="#2563EB"
      />
    </svg>

    <svg
      className={styles.blobBlue2}
      width="573"
      height="478"
      viewBox="0 0 573 478"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M131.615 464.534C76.0534 439.024 -12.7459 426.518 1.53209 354.105C15.8021 281.732 123.056 246.111 186.26 187.394C245.171 132.664 284.661 53.4427 353.849 26.7974C435.048 -4.47378 536.847 -18.0909 566.649 40.9003C596.204 99.4017 501.24 191.488 477.259 271.076C458.179 334.396 497.026 399.78 443.048 451.093C389.017 502.457 324.109 471.728 263.432 474.347C215.681 476.407 169.371 481.868 131.615 464.534Z"
        fill="#2563EB"
      />
    </svg>

    <main className={styles.page}>
      <section aria-label="О платформе" className={styles.info}>
        <div className={styles.top}>
          <Logo />
          <div className={styles.infoText}>
            <p className={styles.desc}>
              Платформа для управления клиентами, сделками и задачами.
              <br />
              Эффективно управляйте бизнес-процессами, отслеживайте ключевые
              показатели и выстраивайте продуктивные отношения с клиентами.
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.switchPrompt}>{linkPrompt} </p>
          <a className={styles.switchLink} href={linkHref}>
            {linkLabel}
          </a>
        </div>
      </section>
      <section className={styles.formSection}>
        <div className={styles.formCard}>{children}</div>
      </section>{" "}
    </main>
  </div>
);

export default AuthLayout;
