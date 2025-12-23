import styles from "./OrderHeader.module.css";
import { useOrder } from "../../context/OrderDataContext";

export default function OrderHeader({ variant = "bar", totalViandas }) {
  const { openOrder, closeOrder } = useOrder();

  const isBar = variant === "bar";
  const isPanel = variant === "panel";

  return (
    <header className={`${styles.header} ${isBar ? styles.bar : styles.panel}`}>
      <div className={styles.left}>
        <h2 className={styles.title}>Tu pedido</h2>
        {typeof totalViandas === "number" && (
          <span className={styles.subtitle}>
            {totalViandas} {totalViandas === 1 ? "vianda" : "viandas"}
          </span>
        )}
      </div>

      <div className={styles.right}>
        {isBar && (
          <button className={styles.primary} onClick={openOrder}>
            Ver pedido
          </button>
        )}

        {isPanel && (
          <button className={styles.secondary} onClick={closeOrder}>
            Seguir pidiendo
          </button>
        )}
      </div>
    </header>
  );
}
