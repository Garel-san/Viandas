import styles from "./OrderHeader.module.css";
import { useOrder } from "../../context/OrderDataContext";

export default function OrderHeader({ totalViandas }) {
  const { openOrder } = useOrder();

  return (
    <header className={styles.header}>
      <div>
        <h2 className={styles.title}>Tu pedido</h2>
        <span className={styles.subtitle}>
          {totalViandas} {totalViandas === 1 ? "vianda" : "viandas"}
        </span>
      </div>

      {/* Botón mobile */}
      <button className={styles.openBtn} onClick={openOrder}>
        Ver pedido
      </button>
    </header>
  );
}
