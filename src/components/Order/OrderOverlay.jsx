import styles from "./OrderOverlay.module.css";
import { useOrder } from "../../context/OrderDataContext";

import OrderHeader from "./OrderHeader";
import OrderItemsList from "./OrderItemsList";
import OrderFooter from "./OrderFooter";

export default function OrderOverlay() {
  const {
    orderItems,
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
        {/* HEADER PANEL */}
        <OrderHeader variant="panel" />

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
