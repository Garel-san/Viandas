import styles from "./OrderOverlay.module.css";
import { useOrder } from "../../context/OrderDataContext";
import { useCheckout } from "../../context/CheckoutContext";

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

  const { checkoutStarted } = useCheckout(); // 🔹 CLAVE

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
          mode={checkoutStarted ? "readonly" : "editable"} // 🔹 CLAVE
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
