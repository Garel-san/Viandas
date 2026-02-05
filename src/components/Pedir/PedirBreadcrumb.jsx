import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./PedirBreadcrumb.module.css";

export default function PedirBreadcrumb() {
  const navigate = useNavigate();
  const { checkoutStarted, step } = useCheckout();

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);

  const handleLogoStepperClick = () => {
    navigate("/"); // no modificar rutas
  };

  const currentStep = checkoutStarted ? step : 1;

  const updateBreadcrumbHeightVar = () => {
    const el = containerRef.current;
    if (!el) return;
    const h = Math.ceil(el.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--pb-h", `${h}px`);
  };

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
     SCROLL (como el original)
  ========================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ==========================
     MEDIR ALTURA REAL DEL BREADCRUMB
     y exponerla como CSS var: --pb-h
  ========================== */
  useLayoutEffect(() => {
    updateBreadcrumbHeightVar();
  }, [isMobile, scrolled, checkoutStarted]);

  useEffect(() => {
    updateBreadcrumbHeightVar();

    const onResize = () => updateBreadcrumbHeightVar();
    window.addEventListener("resize", onResize);

    let ro;
    if (containerRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => updateBreadcrumbHeightVar());
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.orderStepperContainer} ${
        isMobile && scrolled ? styles.scrolled : ""
      }`}
    >
      {/* LOGO */}
      <div
        onClick={handleLogoStepperClick}
        className={styles.orderStepperLogo}
        style={{ cursor: "pointer" }}
        aria-label="Volver al inicio"
      >
        <img
          src="/Logo/logo.png"
          alt="Viandas Hotel del Prado"
          className={styles.orderStepperLogoImage}
        />
      </div>

      {/* WRAPPER */}
      <div className={styles.orderStepperWrapper}>
        <nav className={styles.orderStepper} aria-label="Checkout stepper">
          {/* STEP 1 */}
          <div className={styles.step}>
            <span
              className={`${styles.stepperIcon} ${
                currentStep >= 1 ? styles.stepperIconActive : ""
              }`}
              aria-hidden="true"
            >
              {currentStep >= 1 && <span className={styles.stepperIconInner} />}
            </span>

            <span
              className={`${styles.stepLabel} ${
                currentStep >= 1
                  ? styles.stepLabelActive
                  : styles.stepLabelDisabled
              }`}
            >
              Elegir platos
            </span>
          </div>

          {/* CONNECTOR 1 */}
          <span
            className={`${styles.connector} ${
              currentStep >= 2 ? styles.connectorActive : ""
            }`}
            aria-hidden="true"
          />

          {/* STEP 2 */}
          <div className={styles.step}>
            <span
              className={`${styles.stepperIcon} ${
                currentStep >= 2 ? styles.stepperIconActive : ""
              }`}
              aria-hidden="true"
            >
              {currentStep >= 2 && <span className={styles.stepperIconInner} />}
            </span>
            <span
              className={`${styles.stepLabel} ${
                currentStep >= 2
                  ? styles.stepLabelActive
                  : styles.stepLabelDisabled
              }`}
            >
              Datos y pago
            </span>
          </div>

          {/* CONNECTOR 2 */}
          <span
            className={`${styles.connector} ${
              currentStep >= 3 ? styles.connectorActive : ""
            }`}
            aria-hidden="true"
          />

          {/* STEP 3 */}
          <div className={styles.step}>
            <span
              className={`${styles.stepperIcon} ${
                currentStep >= 3 ? styles.stepperIconActive : ""
              }`}
              aria-hidden="true"
            >
              {currentStep >= 3 && <span className={styles.stepperIconInner} />}
            </span>
            <span
              className={`${styles.stepLabel} ${
                currentStep >= 3
                  ? styles.stepLabelActive
                  : styles.stepLabelDisabled
              }`}
            >
              Confirmación
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
