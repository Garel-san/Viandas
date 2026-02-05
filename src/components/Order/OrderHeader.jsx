import styles from "./OrderHeader.module.css";
import { useOrder } from "../../context/OrderDataContext";

export default function OrderHeader({ variant = "bar", totalViandas }) {
  const { openOrder, closeOrder } = useOrder();

  const isBar = variant === "bar";
  const isPanel = variant === "panel";

  const total = typeof totalViandas === "number" ? totalViandas : 0;

  return (
    <header
      className={`${styles.header} ${isBar ? styles.bar : styles.panel} ${
        isPanel ? styles.panelHeader : ""
      }`}
    >
      <div className={`${styles.left} ${isPanel ? styles.leftPanel : ""}`}>
        <h2 className={styles.title}>Tu pedido</h2>

        <span className={styles.subtitle}>
          {total} {total === 1 ? "vianda" : "viandas"}
        </span>
      </div>

      <div className={`${styles.right} ${isPanel ? styles.rightPanel : ""}`}>
        {isBar && (
          <button className={styles.primary} onClick={openOrder} type="button">
            Continuar
          </button>
        )}

        {isPanel && (
          <button
            className={styles.secondary}
            onClick={closeOrder}
            type="button"
          >
            Seguir pidiendo
          </button>
        )}
      </div>
    </header>
  );
}
