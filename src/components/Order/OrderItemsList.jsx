import styles from "./OrderItemsList.module.css";
import OrderItemCard from "./OrderItemCard";

export default function OrderItemsList({
  orderItems,
  onIncrement,
  onDecrement,
  onRemove,
  mode = "editable",
}) {
  if (!orderItems.length) {
    return (
      <div className={styles.empty}>
        <img
          src="/Order/otra.svg"
          alt="No hay platos seleccionados"
          className={styles.emptyImage}
        />

        <p className={styles.emptyText}>
          No seleccionaste
          <br />
          ningún plato aún.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {orderItems.map((item) => (
        <OrderItemCard
          key={`${item.productId}-${item.size}-${item.garnishId}`}
          item={item}
          editable={mode === "editable"}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
