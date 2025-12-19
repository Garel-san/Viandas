import styles from "./OrderItemsList.module.css";
import OrderItemCard from "./OrderItemCard";

export default function OrderItemsList({
  orderItems,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  if (!orderItems.length) {
    return (
      <div className={styles.empty}>
        <img
          src="/out-of-stock.svg"
          alt="No hay productos"
          className={styles.emptyImage}
        />
        <p className={styles.emptyText}>
          No seleccionaste
          <br />
          ningun plato aun
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
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
