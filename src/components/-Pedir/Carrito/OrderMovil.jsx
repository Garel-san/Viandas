import styles from "./OrderMovil.module.css";
import { useOrder } from "../../../context/OrderDataContext";
import { useCheckout } from "../../../context/CheckoutContext";

import OrderHeader from "./OrderHeader";
import OrderItemsList from "./OrderItemsList";
import OrderFooter from "./OrderFooter";

export default function OrderOverlay({ isOpen = false }) {
  const {
    orderItems,
    totalItems, // ✅ agregar
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

  const { checkoutStarted } = useCheckout();

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <aside className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {/* ✅ ahora pasa el total correcto */}
        <OrderHeader variant="panel" totalViandas={totalItems} />

        <OrderItemsList
          orderItems={orderItems}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
          mode={checkoutStarted ? "readonly" : "editable"}
        />

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
