import styles from "./OrderItemsList.module.css";
import OrderItemCard from "./OrderItemCard";

export default function OrderItemsList({
  orderItems,
  onIncrement,
  onDecrement,
  onRemove,
  mode = "editable", // 🔹 NUEVO: modo del listado
}) {
  if (!orderItems.length) {
    return (
      <div className={styles.empty}>
        <img
          src="/Order/otra.png"
          alt="No hay platos seleccionados"
          className={styles.emptyImage}
        />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {orderItems.map((item) => (
        <OrderItemCard
          key={`${item.productId}-${item.size}-${item.garnishId}`}
          item={item}
          editable={mode === "editable"} // 🔹 NUEVO
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
