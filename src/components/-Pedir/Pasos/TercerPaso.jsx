import { useNavigate } from "react-router-dom";

import { useCheckout } from "../../../context/CheckoutContext";
import { useOrder } from "../../../context/OrderDataContext";

import styles from "./TercerPaso.module.css";

export default function PaymentSection() {
  const navigate = useNavigate();

  const { payment, delivery, selectPaymentMethod, confirmOrder, prevStep } =
    useCheckout();

  const { getOrderSnapshot } = useOrder();

  const isSpecificDelivery = delivery.mode === "specific";

  const handleSelect = (method) => {
    if (isSpecificDelivery && method !== "card") return;
    selectPaymentMethod(method);
  };

  const handleSubmit = () => {
    const orderSnapshot = getOrderSnapshot();
    const ok = confirmOrder(orderSnapshot);

    if (!ok) {
      alert("No se pudo confirmar el pedido. Verificá los datos.");
      return;
    }

    navigate("/success");
  };

  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>¿Cómo vas a abonar?</p>

      <div className={styles.methods}>
        <button
          type="button"
          className={`${styles.methodBtn} ${
            payment.method === "card" ? styles.active : ""
          }`}
          onClick={() => handleSelect("card")}
        >
          Pago online con tarjeta
        </button>

        <button
          type="button"
          disabled={isSpecificDelivery}
          className={`${styles.methodBtn} ${
            payment.method === "cash" ? styles.active : ""
          } ${isSpecificDelivery ? styles.disabled : ""}`}
          onClick={() => handleSelect("cash")}
        >
          Contraentrega – Efectivo
        </button>

        <button
          type="button"
          disabled={isSpecificDelivery}
          className={`${styles.methodBtn} ${
            payment.method === "pos" ? styles.active : ""
          } ${isSpecificDelivery ? styles.disabled : ""}`}
          onClick={() => handleSelect("pos")}
        >
          Contraentrega – POS
        </button>
      </div>

      {isSpecificDelivery && (
        <div className={styles.restrictionNotice}>
          Para entregas en horario específico solo se admite pago con tarjeta.
        </div>
      )}

      {payment.method === "card" && (
        <div className={styles.cardNotice}>
          Ingresá los datos de tu tarjeta (funcionalidad en desarrollo)
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleSubmit}
          disabled={!payment.method}
        >
          PROCEDER AL PAGO
        </button>

        <button type="button" className={styles.linkBtn} onClick={prevStep}>
          Volver
        </button>
      </div>
    </section>
  );
}
