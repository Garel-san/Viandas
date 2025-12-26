import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { useEffect, useState } from "react";
import styles from "./PedirBreadcrumb.module.css";

export default function PedirBreadcrumb() {
  const navigate = useNavigate();
  const { checkoutStarted, step } = useCheckout();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleGoHome = () => navigate("/");

  const currentStep = checkoutStarted ? step : 1;
  const completedSteps = checkoutStarted
    ? Array.from({ length: currentStep - 1 }, (_, i) => i + 1)
    : [];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);

    onScroll(); // estado inicial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.wrapper}>
      {/* LOGO */}
      <div
        className={`${styles.logo} ${isScrolled ? styles.logoHidden : ""}`}
        onClick={handleGoHome}
        aria-label="Volver al inicio"
      >
        <img src="/Logo/logo.png" alt="Viandas Hotel del Prado" />
      </div>

      {/* FLOW */}
      <nav className={styles.flow}>
        <Step
          label="Elegir platos"
          active={currentStep === 1}
          completed={completedSteps.includes(1)}
        />
        <Line />
        <Step
          label="Datos y pago"
          active={currentStep === 2}
          completed={completedSteps.includes(2)}
        />
        <Line />
        <Step
          label="Confirmación"
          active={currentStep === 3}
          completed={completedSteps.includes(3)}
        />
      </nav>
    </header>
  );
}

function Step({ label, active, completed }) {
  return (
    <div className={styles.step}>
      <span
        className={`${styles.dot} ${active ? styles.active : ""} ${
          completed ? styles.completed : ""
        }`}
      />
      <span
        className={`${styles.text} ${active ? styles.textActive : ""} ${
          completed ? styles.textCompleted : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className={styles.line} />;
}
