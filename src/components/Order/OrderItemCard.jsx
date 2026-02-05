import styles from "./OrderItemCard.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useProductsData } from "../../context/ProductsDataContext";

export default function OrderItemCard({
  item,
  editable = true,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const { products } = useProductsData();

  const identity = {
    productId: item.productId,
    size: item.size,
    garnishId: item.garnishId,
  };

  /* ======================
     RESOLVER GUARNICIÓN
  ====================== */
  let garnishLabel = null;

  if (item.garnishId) {
    const product = products.find((p) => p.id === item.productId);

    if (product && product.garnishes?.length) {
      const garnish = product.garnishes.find((g) => g.id === item.garnishId);

      if (garnish) {
        garnishLabel = garnish.label;
      }
    }
  }

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
            <MdDeleteOutline />
          </button>
        )}

        {/* Imagen */}
        <img src={item.image} alt={item.title} className={styles.image} />

        {/* CONTROLES / INFO CANTIDAD */}
        {editable ? (
          <div className={styles.controlsOverlay}>
            <button
              className={`${styles.controlBtn} ${styles.decrement}`}
              onClick={() => onDecrement(identity)}
            >
              <FiMinus />
            </button>

            <span className={styles.counter}>{item.quantity}</span>

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
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <p className={styles.title}>{item.title}</p>

          {garnishLabel && <p className={styles.garnish}>con {garnishLabel}</p>}

          <span className={styles.size}>Tamaño: {item.size}</span>
        </div>
      </div>
    </div>
  );
}
