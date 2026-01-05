import styles from "./OrderItemCard.module.css";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function OrderItemCard({
  item,
  editable = true, // 🔹 NUEVO
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const identity = {
    productId: item.productId,
    size: item.size,
    garnishId: item.garnishId,
  };

  return (
    <div className={styles.card}>
      {/* IMAGEN + OVERLAYS */}
      <div className={styles.imageWrapper}>
        {/* Botón eliminar */}
        {editable && (
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(identity)}
            aria-label="Eliminar producto"
          >
            <FiTrash2 />
          </button>
        )}

        {/* Imagen */}
        <img src={item.image} alt={item.title} className={styles.image} />

        {/* CONTROLES / INFO CANTIDAD */}
        {editable ? (
          <div className={styles.controlsOverlay}>
            {/* - gris */}
            <button
              className={`${styles.controlBtn} ${styles.decrement}`}
              onClick={() => onDecrement(identity)}
            >
              <FiMinus />
            </button>

            {/* contador */}
            <span className={styles.counter}>{item.quantity}</span>

            {/* + naranja */}
            <button
              className={`${styles.controlBtn} ${styles.increment}`}
              onClick={() => onIncrement(identity)}
            >
              <FiPlus />
            </button>
          </div>
        ) : (
          <div className={styles.readonlyQuantity}>
            {item.quantity} {item.quantity === 1 ? "vianda" : "viandas"}
          </div>
        )}
      </div>

      {/* INFO DERECHA */}
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <span className={styles.size}>Tamaño: {item.size}</span>
      </div>
    </div>
  );
}
