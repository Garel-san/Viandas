import styles from "./OrderOverlay.module.css";
import { useOrder } from "../../context/OrderDataContext";

import OrderItemsList from "./OrderItemsList";
import OrderFooter from "./OrderFooter";

export default function OrderOverlay() {
  const {
    orderItems,
    totalItems,
    subtotal,
    shipping,
    total,
    missingItems,
    canProceed,
    incrementItem,
    decrementItem,
    removeItem,
    closeOrder,
  } = useOrder();

  return (
    <div className={styles.overlay}>
      <aside className={styles.panel}>
        {/* HEADER PROPIO DEL OVERLAY */}
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Tu pedido</h2>
            <span className={styles.subtitle}>
              {totalItems} {totalItems === 1 ? "vianda" : "viandas"}
            </span>
          </div>

          <button
            className={styles.closeBtn}
            onClick={closeOrder}
            aria-label="Seguir pidiendo"
          >
            Seguir pidiendo
          </button>
        </header>

        {/* LISTA */}
        <OrderItemsList
          orderItems={orderItems}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
        />

        {/* FOOTER */}
        <OrderFooter
          totalPedido={subtotal}
          envio={shipping}
          totalFinal={total}
          faltantesParaMinimo={missingItems}
          isMinReached={canProceed}
          onStartCheckout={() => {
            closeOrder();
          }}
        />
      </aside>
    </div>
  );
}
