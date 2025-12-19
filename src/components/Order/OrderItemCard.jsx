import styles from "./OrderItemCard.module.css";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function OrderItemCard({
  item,
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
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(identity)}
          aria-label="Eliminar producto"
        >
          <FiTrash2 />
        </button>

        {/* Imagen */}
        <img src={item.image} alt={item.title} className={styles.image} />

        {/* Controles (3 secciones) */}
        <div className={styles.controlsOverlay}>
          {/* - gris */}
          <button
            className={`${styles.controlBtn} ${styles.decrement}`}
            onClick={() => onDecrement(identity)}
          >
            <FiMinus />
          </button>

          {/* contador blanco */}
          <span className={styles.counter}>{item.quantity}</span>

          {/* + naranja */}
          <button
            className={`${styles.controlBtn} ${styles.increment}`}
            onClick={() => onIncrement(identity)}
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* INFO DERECHA */}
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <span className={styles.size}>Tamaño: {item.size}</span>
      </div>
    </div>
  );
}
