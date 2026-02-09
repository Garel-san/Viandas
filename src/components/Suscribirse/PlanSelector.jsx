import { useState } from "react";
import styles from "./PlanSelector.module.css";
import AuthModal from "../Auth/AuthModal";

export default function PlanSelector() {
  const [planType, setPlanType] = useState("FIJO"); // FIJO | ALEATORIO
  const [plates, setPlates] = useState(14); // 5 | 9 | 14
  const [showAuth, setShowAuth] = useState(false);

  const pricePerPlate = 270;
  const total = plates * pricePerPlate;

  return (
    <>
      {/* Wrapper que SE ESTIRA */}
      <div className={styles.wrapper}>
        {/* Card con contenido fijo */}
        <div className={styles.card}>
          {/* ======================
              TIPO DE PLAN
          ====================== */}
          <p className={styles.label}>¿Cómo querés armar tu plan?</p>

          <div className={styles.segment}>
            {["FIJO", "ALEATORIO"].map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.segmentBtn} ${
                  planType === type ? styles.active : ""
                }`}
                onClick={() => setPlanType(type)}
              >
                {planType === type && <span className={styles.check}>✓</span>}
                {type}
              </button>
            ))}
          </div>

          {/* ======================
              PLATOS POR SEMANA
          ====================== */}
          <p className={styles.label}>¿Cuántos platos querés por semana?</p>

          <div className={styles.segment}>
            {[5, 9, 14].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.segmentBtn} ${
                  plates === n ? styles.active : ""
                }`}
                onClick={() => setPlates(n)}
              >
                {plates === n && <span className={styles.check}>✓</span>}
                {n}
              </button>
            ))}
          </div>

          {/* ======================
              RESUMEN
          ====================== */}
          <div className={styles.summary}>
            <div className={styles.summaryTop}>
              <span className={styles.price}>${pricePerPlate} por plato</span>
              <span className={styles.week}>{plates} platos por semana</span>
            </div>

            <hr />

            <div className={styles.row}>
              <span>Precio del paquete</span>
              <span>${total}</span>
            </div>

            <div className={styles.row}>
              <span>Envío</span>
              <span className={styles.free}>GRATIS</span>
            </div>

            <div className={styles.rowTotal}>
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button className={styles.cta} onClick={() => setShowAuth(true)}>
              Elegir este plan
            </button>
          </div>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
