import styles from "./OrderSummary.module.css";

import { useOrder } from "../../../context/OrderDataContext";
import { useCheckout } from "../../../context/CheckoutContext";

import OrderHeader from "./OrderHeader";
import OrderItemsList from "./OrderItemsList";
import OrderFooter from "./OrderFooter";

export default function OrderSummary() {
  const {
    orderItems,

    // derivados
    totalItems,
    subtotal,
    shipping,
    total,
    missingItems,
    canProceed,

    // handlers
    incrementItem,
    decrementItem,
    removeItem,
  } = useOrder();

  const { startCheckout, checkoutStarted } = useCheckout(); // 🔹 usamos estado

  return (
    <aside className={styles.sidebar}>
      {/* HEADER — visible en desktop como PANEL */}
      <OrderHeader variant="panel" totalViandas={totalItems} />

      {/* LISTA SCROLLEABLE */}
      <OrderItemsList
        orderItems={orderItems}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
        mode={checkoutStarted ? "readonly" : "editable"} // 🔹 CLAVE
      />

      {/* FOOTER FIJO */}
      <OrderFooter
        totalPedido={subtotal}
        envio={shipping}
        totalFinal={total}
        faltantesParaMinimo={missingItems}
        isMinReached={canProceed}
        onStartCheckout={startCheckout}
      />
    </aside>
  );
}
