import styles from "./OrderSummary.module.css";
import { useOrder } from "../../context/OrderDataContext";

import OrderHeader from "./OrderHeader";
import OrderItemsList from "./OrderItemsList";
import OrderFooter from "./OrderFooter";

export default function OrderSummary({ onStartCheckout }) {
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

  return (
    <aside className={styles.sidebar}>
      {/* HEADER */}
      <OrderHeader totalViandas={totalItems} />

      {/* LISTA SCROLLEABLE */}
      <OrderItemsList
        orderItems={orderItems}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />

      {/* FOOTER FIJO */}
      <OrderFooter
        totalPedido={subtotal}
        envio={shipping}
        totalFinal={total}
        faltantesParaMinimo={missingItems}
        isMinReached={canProceed}
        onStartCheckout={onStartCheckout}
      />
    </aside>
  );
}
