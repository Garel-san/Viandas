import { useNavigate } from "react-router-dom";
import styles from "./PedirBreadcrumb.module.css";

export default function PedirBreadcrumb({
  currentStep = 1,
  completedSteps = [],
}) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      {/* Logo */}
      <div
        className={styles.logo}
        onClick={handleGoHome}
        style={{ cursor: "pointer" }}
        aria-label="Volver al inicio"
      >
        <img src="/logo.png" alt="Viandas Hotel del Prado" />
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
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
      </div>
    </div>
  );
}

function Step({ label, active, completed }) {
  return (
    <div className={styles.step}>
      <span
        className={`${styles.dot}
          ${active ? styles.active : ""}
          ${completed ? styles.completed : ""}`}
      />
      <span
        className={`${styles.text}
          ${active ? styles.textActive : ""}
          ${completed ? styles.textCompleted : ""}`}
      >
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className={styles.line} />;
}
