import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { useEffect, useState } from "react";
import styles from "./PedirBreadcrumb.module.css";

export default function PedirBreadcrumb() {
  const navigate = useNavigate();
  const { checkoutStarted, step } = useCheckout();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleGoHome = () => navigate("/");

  const currentStep = checkoutStarted ? step : 1;

  /* ==========================
     DETECTAR MOBILE
  ========================== */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ==========================
     SCROLL
  ========================== */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* LOGO */}
      <div
        className={`${styles.logo} ${
          isMobile && isScrolled ? styles.logoHidden : ""
        }`}
        onClick={handleGoHome}
        aria-label="Volver al inicio"
      >
        <img src="/Logo/logo.png" alt="Viandas Hotel del Prado" />
      </div>

      {/* STEPPER */}
      <nav
        className={`${styles.flowWrapper} ${
          isMobile && isScrolled ? styles.flowSticky : ""
        }`}
      >
        {/* STEP 1 */}
        <span
          className={`${styles.dot} ${styles.dot1} ${
            currentStep >= 1 ? styles.active : ""
          }`}
        >
          <span
            className={`${styles.innerDot} ${
              currentStep >= 1 ? styles.innerActive : styles.innerInactive
            }`}
          />
        </span>

        {/* LINE 1 */}
        <span
          className={`${styles.line} ${styles.line1} ${
            currentStep >= 2 ? styles.lineActive : ""
          }`}
        />

        {/* STEP 2 */}
        <span
          className={`${styles.dot} ${styles.dot2} ${
            currentStep >= 2 ? styles.active : ""
          }`}
        >
          <span
            className={`${styles.innerDot} ${
              currentStep >= 2 ? styles.innerActive : styles.innerInactive
            }`}
          />
        </span>

        {/* LINE 2 */}
        <span
          className={`${styles.line} ${styles.line2} ${
            currentStep >= 3 ? styles.lineActive : ""
          }`}
        />

        {/* STEP 3 */}
        <span
          className={`${styles.dot} ${styles.dot3} ${
            currentStep >= 3 ? styles.active : ""
          }`}
        >
          <span
            className={`${styles.innerDot} ${
              currentStep >= 3 ? styles.innerActive : styles.innerInactive
            }`}
          />
        </span>

        {/* TEXTOS */}
        <span
          className={`${styles.text} ${styles.text1} ${
            currentStep >= 1 ? styles.textActive : ""
          }`}
        >
          Elegir platos
        </span>

        <span
          className={`${styles.text} ${styles.text2} ${
            currentStep >= 2 ? styles.textActive : ""
          }`}
        >
          Datos y pago
        </span>

        <span
          className={`${styles.text} ${styles.text3} ${
            currentStep >= 3 ? styles.textActive : ""
          }`}
        >
          Confirmación
        </span>
      </nav>
    </div>
  );
}
