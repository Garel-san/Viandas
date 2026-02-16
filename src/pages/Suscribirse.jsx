import PedirBreadcrumb from "../components/-Pedir/PedirStepper";
import FaqAccordionSub from "../components/-Suscribirse/PreguntasFrecuentesSub";
import PlanSelector from "../components/-Suscribirse/PlanesDeSuscripcion";

import styles from "./Suscribirse.module.css";

export default function Suscribirse() {
  return (
    <div className={styles.page}>
      {/* ======================
          BREADCRUMB
      ====================== */}
      <PedirBreadcrumb />

      {/* ======================
          HEADER TEXTO
      ====================== */}
      <div className={styles.header}>
        <h1 className={styles.title}>Creá tu plan semanal de viandas</h1>
        <p className={styles.subtitle}>
          Ajustá tu menú de acuerdo a tus preferencias. Podés cambiarlas cuando
          sea.
        </p>
      </div>

      {/* ======================
          CONTENIDO
      ====================== */}
      <div className={styles.content}>
        <div className={styles.left}>
          <FaqAccordionSub />
        </div>

        <div className={styles.right}>
          <PlanSelector />
        </div>
      </div>
    </div>
  );
}
