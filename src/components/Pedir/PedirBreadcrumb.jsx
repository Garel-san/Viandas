import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { useEffect, useState } from "react";
import styles from "./PedirBreadcrumb.module.css";

export default function PedirBreadcrumb() {
  const navigate = useNavigate();
  const { checkoutStarted, step } = useCheckout();

  const [isSticky, setIsSticky] = useState(false);

  const handleGoHome = () => navigate("/");

  const currentStep = checkoutStarted ? step : 1;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Activa sticky apenas baja un poco
      if (y > 8 && !isSticky) {
        setIsSticky(true);
      }

      // SOLO vuelve al estado normal cuando está arriba del todo
      if (y === 0 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSticky]);

  return (
    <>
      {/* HEADER SOLO LOGO */}
      <header
        className={`${styles.wrapper} ${isSticky ? styles.headerHidden : ""}`}
      >
        <div
          className={styles.logo}
          onClick={handleGoHome}
          aria-label="Volver al inicio"
        >
          <img src="/Logo/logo.png" alt="Viandas Hotel del Prado" />
        </div>
      </header>

      {/* BARRA STICKY INDEPENDIENTE */}
      <div
        className={`${styles.flowSticky} ${
          isSticky ? styles.flowStickyActive : ""
        }`}
      >
        <nav className={styles.flowWrapper}>
          {/* DOTS + LINES */}
          <span
            className={`${styles.dot} ${styles.dot1} ${
              currentStep === 1 ? styles.active : ""
            }`}
          />
          <span className={`${styles.line} ${styles.line1}`} />
          <span
            className={`${styles.dot} ${styles.dot2} ${
              currentStep === 2 ? styles.active : ""
            }`}
          />
          <span className={`${styles.line} ${styles.line2}`} />
          <span
            className={`${styles.dot} ${styles.dot3} ${
              currentStep === 3 ? styles.active : ""
            }`}
          />

          {/* TEXTOS */}
          <span
            className={`${styles.text} ${styles.text1} ${
              currentStep === 1 ? styles.textActive : ""
            }`}
          >
            Elegir platos
          </span>
          <span
            className={`${styles.text} ${styles.text2} ${
              currentStep === 2 ? styles.textActive : ""
            }`}
          >
            Datos y pago
          </span>
          <span
            className={`${styles.text} ${styles.text3} ${
              currentStep === 3 ? styles.textActive : ""
            }`}
          >
            Confirmación
          </span>
        </nav>
      </div>
    </>
  );
}
